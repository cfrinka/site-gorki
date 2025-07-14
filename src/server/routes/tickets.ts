import { Router } from "express";
import Stripe from "stripe";
import { body, validationResult } from "express-validator";
import { generateQRCode } from "../utils/qrcode";
import { sendTicketEmail } from "../utils/email";
import bodyParser from "body-parser";

const router = Router();

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY as string);

// POST /api/tickets/purchase
router.post("/purchase", body("email").isEmail(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: process.env.VITE_STRIPE_PRODUCT_KEY,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: { email },
    });
    res.json({ url: session.url });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Stripe session creation failed", details: err });
  }
});

// Stripe webhook endpoint
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig as string,
        process.env.VITE_STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email;
      const ticketId = session.id;
      // Generate QR code for ticket
      const qrCode = await generateQRCode(ticketId);
      // Send email with QR code
      await sendTicketEmail(
        email!,
        "Seu ingresso para o evento",
        "Obrigado pela compra! Apresente este QR Code na entrada.",
        qrCode
      );
      // Optionally: store ticketId/email in DB for validation
    }
    res.json({ received: true });
  }
);

export default router;
