export interface StatItem{
    label:string;
    value:string | number;
}

export interface PartnerLogo{
    name:string;
    src:string;
}


export interface DomainItem {
  id: string;
  icon: string;        
  name: string;       
}

export interface SegmentationCard {
  id: string;
  imageSrc: string;
  category: string;   
  subtitle: string;    
}


export interface AudienceCard {
  id: string;
  icon: string;
  title: string;      
  description: string;
}


export interface DeliveryStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}


export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}


export interface FAQGroup {
  category: string;
  items: FAQItem[];
}

export interface Testimonial {
  id: string;
  logoSrc: string;
  logoAlt: string;
  quote: string;
  organization: string;
}

export interface EnquiryPayload {
  fullName: string;
  workEmail: string;
  organizationName: string;
  phoneNumber: string;
  message: string;
}





export interface EnquiryResponse {
  success: boolean;
  message: string;
}






export interface EnquiryError {
  success: false;
  message: string;
  code?: string;
}


