# ✉️ EmailJS Integration & Setup Guide (BIM Earth)

By default, the **BIM Earth** website's booking and contact forms run in an offline simulation (Developer Sandbox Mode) to allow fluid front-end testing. To connect real, live emails so that visitors' messages arrive directly in your personal Gmail inbox (`dr.ajithkumargp@gmail.com`), follow this simple, free 5-minute setup.

---

## 🚀 Step 1: Create a Free EmailJS Account
1. Go to [https://www.emailjs.com](https://www.emailjs.com) and click **Sign Up For Free**.
2. Create an account and log in to your dashboard.

---

## 🔌 Step 2: Add Your Email Service (Gmail)
1. In your EmailJS dashboard, click **Email Services** on the left menu, then click **Add New Service**.
2. Choose **Gmail**.
3. Click **Connect Account** and log in with your Gmail account (`dr.ajithkumargp@gmail.com` or your preferred inbox).
4. Click **Create Service**.
5. Copy the **Service ID** (it will look like `service_xxxxxxx`). You will need this key later.

---

## 📝 Step 3: Create Your Email Template
To match the fields of the booking and contact forms, create a custom email template.

### A. For Contact Form Messages:
1. Click **Email Templates** in the left menu, then click **Create New Template**.
2. Customize the subject and body to look like this:
   - **Subject**: `New BIM Earth Contact Inquiry: {{subject}}`
   - **Body**:
     ```html
     You have received a new contact submission from the BIM Earth Website.

     Client Name: {{from_name}}
     Client Email: {{from_email}}
     Subject Category: {{subject}}

     Inquiry Message:
     ----------------------------------------
     {{message}}
     ----------------------------------------

     Sent from: BIM Earth Consultancy Portal
     ```
3. Set the **To Email** field (under the *Settings* tab of the template) to `dr.ajithkumargp@gmail.com`.
4. Click **Save** in the top right.
5. Copy the **Template ID** (it will look like `template_xxxxxxx`).

---

## 🔑 Step 4: Locate Your Public API Key
1. In your EmailJS dashboard, click **Account** or **API Keys** on the bottom-left menu.
2. Under the **API Keys** tab, copy the **Public Key** (it will look like `xxxxxxxxxxxxx`).

---

## 🔒 Step 5: Configure the Environment Variables

To activate the real mailing engine, enter these three keys into your deployment platform or workspace settings.

### Inside AI Studio Build (Dev Mode)
1. Click the **Settings** gear or **Secrets/Environment Panel** on the left menu of the AI Studio workspace.
2. Add the following three keys and paste your copied values:
   - `VITE_EMAILJS_SERVICE_ID` = `your_service_id`
   - `VITE_EMAILJS_TEMPLATE_ID` = `your_template_id`
   - `VITE_EMAILJS_PUBLIC_KEY` = `your_public_key`
3. Restart the preview/server. The contact forms will instantly switch from sandbox simulator mode to real, live emails!

### Inside Netlify or Production Hosting (Vercel / Cloud Run)
1. Go to your site dashboard in Netlify.
2. Navigate to **Site configuration** > **Environment variables**.
3. Add the three keys (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`) with their respective values.
4. Redeploy the site to apply the settings.

---

## 💡 Troubleshooting
- **No emails arriving?** Check your EmailJS dashboard's "History" tab to see if requests are failing. Ensure that your Gmail account permissions are still active.
- **Console errors?** Ensure that the variable names match exactly (all caps, prefixed with `VITE_`).
