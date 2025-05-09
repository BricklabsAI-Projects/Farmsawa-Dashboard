import { createClient } from '@supabase/supabase-js';

// These would typically come from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin types
export type AdminRole = 'super_admin' | 'admin';

export type Admin = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  created_at: string;
};

// User types
export type UserProfile = {
  id: string;
  name: string;
  phone_number: string;
  region: string;
  location: string;
  is_farmer: boolean;
  crops: string[];
  created_at: string;
};

// Supplier types
export type Supplier = {
  id: string;
  name: string;
  phone_number: string;
  address: string;
  products: string[];
  rating: number;
  review_count: number;
  created_at: string;
};

// Transaction types
export type Transaction = {
  id: string;
  user_id: string;
  user_name: string;
  supplier_id: string;
  supplier_name: string;
  product: string;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
};

// Market price types
export type MarketPrice = {
  id: string;
  crop: string;
  region: string;
  town: string;
  price_per_kg: number;
  price_per_bag: number;
  last_updated: string;
};

// Request types
export type Request = {
  id: string;
  user_id: string;
  type: 'crop_diagnosis' | 'market_price' | 'advisory' | 'order';
  status: 'pending' | 'completed';
  created_at: string;
};