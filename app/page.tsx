'use client';

import { useState } from 'react';
import { sendReferralEmail } from '../lib/api';
import { ReferralPayload } from '../types/payload';

export default function HomePage() {
  const [form, setForm] = useState({
    user_first_name: '',
    referred_user_name: '',
    course_name: '',
    currency: '',
    referral_value: '',
    recipient: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const payload: ReferralPayload = {
      to: form.recipient,
      from: 'Medbuddy <info@medbuddyafrica.com>',
      template: 'medbuddy_referral_followup',
      context: {
        user_first_name: form.user_first_name,
        referred_user_name: form.referred_user_name,
        course_name: form.course_name,
        currency: form.currency,
        referral_value: form.referral_value,
        referral_tracking_page_url: 'https://medbuddyacademy.com/app/tracking',
        recipient: form.recipient,
      },
    };

    try {
      const response = await sendReferralEmail(payload);
      setMessage('Email sent successfully!');
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Send Referral Email</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="user_first_name" placeholder="Referrer's First Name" className="w-full border p-2" onChange={handleChange} required />
        <input type="text" name="referred_user_name" placeholder="Referred User's Name" className="w-full border p-2" onChange={handleChange} required />
        <input type="text" name="course_name" placeholder="Course Name" className="w-full border p-2" onChange={handleChange} required />

        <select name="currency" className="w-full border p-2" onChange={handleChange} required>
          <option value="">Choose your currency</option>
          <option value="USD">USD</option>
          <option value="NGN">NGN</option>
        </select>

        <input type="text" name="referral_value" placeholder="Referral Amount" className="w-full border p-2" onChange={handleChange} required />
        <input type="email" name="recipient" placeholder="Recipient Email" className="w-full border p-2" onChange={handleChange} required />

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2">
          {loading ? 'Sending...' : 'Send Email'}
        </button>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </main>
  );
}
