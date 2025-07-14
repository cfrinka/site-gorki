# gorki-site

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3718da04-4023-4d53-9d7f-3025fb82aef2

## How can I edit this code?

You can edit this project using your preferred IDE, directly in GitHub, or using GitHub Codespaces.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3718da04-4023-4d53-9d7f-3025fb82aef2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Deploying on Easypanel with Nixpacks

This project is compatible with [Easypanel](https://easypanel.io/) and [Nixpacks](https://nixpacks.com/).

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node.js version:** 18 or higher

No extra configuration is needed. Nixpacks will detect the Vite setup and build the project into the `dist` directory, which will be served as static files.

If you use a custom domain or need to set environment variables, configure them in the Easypanel dashboard as needed.
