import type { EnquiryPayload, EnquiryResponse, EnquiryError } from '@/types';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function submitEnquiry(
  payload: EnquiryPayload
): Promise<EnquiryResponse | EnquiryError> {
  try {
   
    await delay(1000 + Math.random() * 1000);

    
    return {
      success: true,
      message: 'Thank you! We will get in touch with you shortly.',
    };

    
  } catch (e) {
    
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
      code: 'NETWORK_ERROR',
    };
  }
}