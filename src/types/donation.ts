export type CampaignCategory = 
  | 'clean-water'
  | 'education'
  | 'healthcare'
  | 'food-security'
  | 'climate'
  | 'emergency'
  | 'community';

export interface ImpactTier {
  id: string;
  amount: number;
  label: string;
  description: string;
  iconName?: string;
}

export interface Milestone {
  id: string;
  title: string;
  targetAmount: number;
  achieved: boolean;
  description: string;
}

export interface BudgetBreakdown {
  category: string;
  percentage: number;
  amount: number;
}

export interface CampaignUpdate {
  id: string;
  date: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
}

export interface DonorCheer {
  id: string;
  donorName: string;
  amount: number;
  currency: string;
  timestamp: string;
  message?: string;
  isAnonymous?: boolean;
  likesCount?: number;
}

export interface Campaign {
  id: string;
  title: string;
  tagline: string;
  category: CampaignCategory;
  location: string;
  country: string;
  organizer: {
    name: string;
    role: string;
    organization: string;
    avatarUrl: string;
    verified: boolean;
  };
  beneficiariesCount: number;
  beneficiariesDescription: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  daysLeft: number;
  donorCount: number;
  coverImage: string;
  galleryImages: string[];
  story: string;
  challenge: string;
  solution: string;
  budgetBreakdown: BudgetBreakdown[];
  impactTiers: ImpactTier[];
  milestones: Milestone[];
  updates: CampaignUpdate[];
  featured?: boolean;
  urgent?: boolean;
  createdAt: string;
}

export type PaymentMethodType = 'card' | 'mobile-money' | 'paypal' | 'bank-transfer';

export interface DonationRecord {
  id: string;
  campaignId: string;
  campaignTitle: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number;
  currency: string;
  frequency: 'one-time' | 'monthly';
  paymentMethod: PaymentMethodType;
  message?: string;
  isAnonymous: boolean;
  dedicatedTo?: string;
  timestamp: string;
  receiptNumber: string;
  taxDeductible: boolean;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'KES' | 'CAD' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateFromUSD: number; // e.g. 1 USD = 1.0, 1 USD = 130 KES
}
