import { useState } from "react";

const Checkout = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", quantity: 1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 h-full min-h-0">
      <div className="rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center justify-center bg-gray-50 px-4 h-full min-h-0">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Checkout
        </h1>
        {submitted ? (
          <div className="text-center">
            <div className="text-green-600 text-2xl font-semibold mb-4">
              Compra realizada com sucesso!
            </div>
            <p className="text-gray-700">
              Você receberá um e-mail com os detalhes do seu ingresso.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nome
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Quantidade de ingressos
              </label>
              <input
                type="number"
                name="quantity"
                min={1}
                value={form.quantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg shadow hover:bg-yellow-600 transition-colors duration-200 text-lg"
            >
              Finalizar Compra
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;
