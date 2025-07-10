# Medbuddy Email Automation Frontend

This is a Next.js App Router-based frontend that provides a simple form UI for triggering automated referral emails via a Django backend and n8n workflow integration.

## Features

- Built with **Next.js (App Router)** and **Tailwind CSS**
- Collects referral data via form
- Sends form data to Django backend for email workflow automation
- Displays success and error messages using custom modals
- Responsive and user-friendly design

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/taiwoak/medbuddy-email-frontend.git
cd medbuddy-email-frontend
```

2. **Install Dependencies:**

```bash
npm install
```

## Environmental Variable

Create a .env file in the project root:

```bash
NEXT_PUBLIC_API_BASE_URL=yourbackendURL
```

## Running Locally

```bash
npm run dev
```

Visit http://localhost:3000 in your browser.

## Notes

Make sure your backend (/send-mail endpoint) is running before testing.

Form fields include:

- Referrer's First Name

- Referred User's Name

- Course Name

- Currency (USD / NGN)

- Referral Amount

- Recipient Email

## Author

Built by Taiwo Akerele

## License

This project is open-source and available under the MIT License.