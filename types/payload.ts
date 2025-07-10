export interface ReferralPayload {
  to: string;
  from: string;
  template: string;
  context: {
    user_first_name: string;
    referred_user_name: string;
    course_name: string;
    currency: string;
    referral_value: string;
    referral_tracking_page_url: string;
    recipient: string;
  };
}