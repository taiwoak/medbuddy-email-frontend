'use client';

import { useState } from 'react';
import { sendReferralEmail } from '../../lib/api';
import { ReferralPayload } from '../../types/payload';
import Modal  from './modal';
import Image from 'next/image';
import logo from '../images/logo.svg'

export default function Form() {
  const [form, setForm] = useState({
    user_first_name: '',
    referred_user_name: '',
    course_name: '',
    currency: '',
    referral_value: '',
    recipient: '',
  });
  const [modalType, setModalType] = useState<'success' | 'error' | ''>('');
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
      const response = await sendReferralEmail(payload); // Your existing API call
      setMessage('Email sent successfully!');
      setModalType('success');
    } catch (error: any) {
      setMessage(error.message || 'Something went wrong!');
      setModalType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <div className="flex justify-center mb-4">
        <a href="https://medbuddyacademy.com" target="_blank" rel="noopener noreferrer">
            <Image
            src={logo}
            alt="Medbuddy Logo"
            width={196}
            height={51.7}
            />
        </a>
      </div>
      <h1 className="text-xl font-bold mb-6">Send Referral Email to Users</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="user_first_name" className="block mb-1 font-medium">User's First Name</label>
          <input type="text" name="user_first_name" id="user_first_name" className="w-full border p-2 field" onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="referred_user_name" className="block mb-1 font-medium">Referred User's Name</label>
          <input type="text" name="referred_user_name" id="referred_user_name" className="w-full border p-2 field" onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="course_name" className="block mb-1 font-medium">Course Name</label>
          <input type="text" name="course_name" id="course_name" className="w-full border p-2 field" onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="currency" className="block mb-1 font-medium">Currency</label>
          <select name="currency" id="currency" className="w-full border p-2 field" onChange={handleChange} required>
            <option value="">Choose the currency</option>
            <option value="USD">USD</option>
            <option value="NGN">NGN</option>
          </select>
        </div>

        <div>
          <label htmlFor="referral_value" className="block mb-1 font-medium">Referral Amount</label>
          <input type="text" name="referral_value" id="referral_value" className="w-full border p-2 field" onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="recipient" className="block mb-1 font-medium">Recipient Email</label>
          <input type="email" name="recipient" id="recipient" className="w-full border p-2 field" onChange={handleChange} required />
        </div>

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 cursor-pointer field">
          {loading ? 'Sending...' : 'Send Email'}
        </button>

        {message && modalType && (
        <Modal message={message} type={modalType as 'success' | 'error'} onClose={() => { setMessage(''); setModalType(''); }} />
        )}
      </form>
    </main>
  );
}
