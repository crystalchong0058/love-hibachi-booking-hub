# 4 U Sake Hibachi Catering Website

This is the official website for 4 U Sake Hibachi Catering, featuring booking functionality, service information, and more.

## Features

- Responsive design for all devices
- Online booking system
- Email notifications for bookings
- Service and pricing information
- FAQ section
- Contact form
- Subscription system for discounts and coupons
- Admin page for managing bookings

## Project info

**URL**: https://lovable.dev/projects/5ebae29f-0a96-45ce-8d26-e29d7d1a684f

## Deployment Instructions

### Deploying to Vercel

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up using GitHub, GitLab, Bitbucket, or email

2. **Install Vercel CLI (Optional)**
   ```bash
   npm install -g vercel
   ```

3. **Deploy Your Project**

   **Option 1: Deploy using Vercel CLI**
   ```bash
   # Navigate to your project directory
   cd /Users/crystal/Desktop/love-hibachi-booking-hub

   # Login to Vercel
   vercel login

   # Deploy
   vercel

   # For production deployment
   vercel --prod
   ```

   **Option 2: Deploy via Vercel Dashboard**
   - Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Configure your project:
     - Framework Preset: Vite
     - Build Command: `npm run build` (should be detected automatically)
     - Output Directory: `dist` (should be detected automatically)
     - Install Command: `npm install` (should be detected automatically)
   - Add any environment variables if needed
   - Click "Deploy"

4. **Configure Environment Variables**
   - Go to your project settings in Vercel
   - Click on "Environment Variables"
   - Add your EmailJS keys:
     - `EMAILJS_PUBLIC_KEY`: Your EmailJS public key
     - `EMAILJS_SERVICE_ID`: Your EmailJS service ID
     - `EMAILJS_TEMPLATE_ID`: Your EmailJS template ID for bookings
     - `EMAILJS_SUBSCRIBER_TEMPLATE_ID`: Your EmailJS template ID for subscribers

5. **Configure Custom Domain (Optional)**
   - Go to your project dashboard on Vercel
   - Click on "Domains"
   - Add your custom domain
   - Follow the instructions to set up DNS records

## EmailJS Templates

### Subscriber Template
You need to create a template in EmailJS for subscriber notifications. Use the template in `emailjs-templates/subscriber-template.html` as a reference.

## Admin Access

### Availability Management
- Access the availability management page at `/admin/availability`

## Development

### Running Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
npm run build
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- EmailJS
- Vercel Serverless Functions

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/5ebae29f-0a96-45ce-8d26-e29d7d1a684f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

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
