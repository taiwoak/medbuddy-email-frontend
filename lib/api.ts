export async function sendReferralEmail(payload: any): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-mail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to send email: ${res.statusText}`);
  }

  return await res.json();
}