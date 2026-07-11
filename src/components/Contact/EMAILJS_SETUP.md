# Wiring the contact form to your Gmail (EmailJS)

The form itself is already coded to send through EmailJS — you just need
to create a free EmailJS account and paste 3 values into `.env`.

## 1. Create an EmailJS account
Go to https://dashboard.emailjs.com/sign-up and sign up (free tier: 200 emails/month).

## 2. Connect your Gmail
- In the dashboard, go to **Email Services → Add New Service**.
- Choose **Gmail**, connect `sivaramcharan55@gmail.com`, and authorize it.
- Copy the generated **Service ID** (e.g. `service_abc1234`).

## 3. Create an email template
- Go to **Email Templates → Create New Template**.
- Set the **To Email** field to `sivaramcharan55@gmail.com` (so every submission lands in your inbox).
- Set **From Name** to `{{from_name}} via Portfolio` (so it's obvious in your inbox that it came from the site, not a random sender).
- Set **Reply To** to `{{from_email}}` (so hitting "Reply" in Gmail replies straight to the visitor, not to yourself).
- In the template body, use these variables (the code already sends them):
  - `{{from_name}}` — visitor's name
  - `{{from_email}}` — visitor's email
  - `{{message}}` — their message
- Save, then copy the **Template ID** (e.g. `template_xyz789`).

## 4. Get your Public Key
- Go to **Account → General**.
- Copy the **Public Key**.

## 5. Fill in `.env`
Open `.env` in the project root and paste your three values:
```
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Restart `npm run dev` after editing `.env` (Vite only reads env vars at startup).

## 6. If you deploy (Vercel/Netlify/etc.)
Add the same three `VITE_EMAILJS_*` variables in your host's environment
variable settings — `.env` is gitignored and won't be deployed automatically.

## Testing
Fill out the contact form on the live site and submit — the email should
arrive in your Gmail within a few seconds, with "Reply-To" already set to
the visitor's address.
