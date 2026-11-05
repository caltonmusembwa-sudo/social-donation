export type ActiveTab = 
  | 'home' 
  | 'about' 
  | 'projects' 
  | 'gallery'
  | 'events' 
  | 'news' 
  | 'school-zone' 
  | 'pledge' 
  | 'ads' 
  | 'transparency' 
  | 'proposal' 
  | 'admin';

export interface SupplyPledgeTier {
  id: string;
  name: string;
  supplyQuantity: string;
  unitLabel: string;
  icon: string;
  description: string;
  tag: string;
  itemsIncluded: string[];
}

export type PledgeDeliveryMethod = 'dropoff_school' | 'interact_pickup' | 'dispatch_courier';

export interface SchoolLeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  level: string;
  location: string;
  progressPercent: number;
  itemsPledgedCount: number;
  targetCount: number;
  metricLabel: string;
  studentsSupported: number;
  coordinator: string;
  lat?: number;
  lng?: number;
}

export interface SuccessStory {
  id: string;
  title: string;
  quote: string;
  author: string;
  role: string;
  school: string;
  impact: string;
  image: string;
  fullStory: string;
}

export interface CompletedPledge {
  id: string;
  pledgeCertificateNumber: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  tierId: string;
  tierName: string;
  quantityUnits: number;
  supplyDescription: string;
  deliveryMethod: PledgeDeliveryMethod;
  dropoffLocation?: string;
  scheduledDate?: string;
  dedicatedSchool?: string;
  dedicatedStudent?: string;
  notes?: string;
  timestamp: string;
  status: 'Pledge Confirmed · Awaiting Handover' | 'Delivered to Students';
}

export interface SchoolRegistrationRequest {
  id: string;
  schoolName: string;
  level: 'Primary' | 'Junior / Middle' | 'High School';
  location: string;
  contactPerson: string;
  contactRole: string;
  email: string;
  phone: string;
  estimatedStudents: number;
  primaryNeed: string;
  timestamp: string;
}

export interface ClubContentItem {
  id: string;
  type: 'project' | 'event' | 'news';
  title: string;
  body: string;
  image_url?: string;
  event_date?: string;
  published: boolean;
  created_at: string;
}

export interface AdminProfile {
  email: string;
  isAdmin: boolean;
  role: string;
}

export interface AdCreative {
  id: string;
  platform: 'spotify' | 'youtube' | 'linkedin' | 'netlify' | 'instagram';
  platformName: string;
  icon: string;
  badgeColor: string;
  format: string;
  headline: string;
  targetAudience: string;
  scriptOrCopy: string;
  voiceoverOrVisualDirection?: string;
  callToAction: string;
  targetUrl: string;
  specs: string;
  accountLaunchUrl: string;
  connectedAccount: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Campus & Teachers' | 'Student Leaders' | 'Partner Visits' | 'Facilities & Drives';
  imageUrl: string;
  caption: string;
  featured?: boolean;
}

