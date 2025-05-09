import { UserProfile, Supplier, Transaction, MarketPrice, Request, Admin } from './supabase';

// Mock admins data
export const mockAdmins: Admin[] = [
  {
    id: '1',
    email: 'admin@farmsawa.com',
    name: 'Main Admin',
    role: 'super_admin',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'manager@farmsawa.com',
    name: 'Regional Manager',
    role: 'admin',
    created_at: '2025-02-15T00:00:00Z',
  }
];

// Demo credentials
export const demoCredentials = {
  email: 'demo@farmsawa.com',
  password: 'demo123456'
};

// Mock data for testing
export const mockUsers: UserProfile[] = [
  {
    id: '1',
    name: 'John Kamau',
    phone_number: '+254712345678',
    region: 'Central',
    location: 'Nyeri',
    is_farmer: true,
    crops: ['Maize', 'Beans', 'Potatoes'],
    created_at: '2025-01-15T08:30:00Z',
  },
  {
    id: '2',
    name: 'Sarah Odhiambo',
    phone_number: '+254723456789',
    region: 'Western',
    location: 'Kakamega',
    is_farmer: true,
    crops: ['Sugarcane', 'Maize'],
    created_at: '2025-01-20T10:15:00Z',
  },
  {
    id: '3',
    name: 'Daniel Kipchoge',
    phone_number: '+254734567890',
    region: 'Rift Valley',
    location: 'Eldoret',
    is_farmer: true,
    crops: ['Wheat', 'Maize', 'Potatoes'],
    created_at: '2025-02-05T14:45:00Z',
  },
  {
    id: '4',
    name: 'Mary Njeri',
    phone_number: '+254745678901',
    region: 'Eastern',
    location: 'Meru',
    is_farmer: true,
    crops: ['Tea', 'Coffee'],
    created_at: '2025-02-10T09:20:00Z',
  },
  {
    id: '5',
    name: 'Robert Omondi',
    phone_number: '+254756789012',
    region: 'Nyanza',
    location: 'Kisumu',
    is_farmer: true,
    crops: ['Rice', 'Vegetables'],
    created_at: '2025-03-01T11:30:00Z',
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Farmtech Solutions Ltd',
    phone_number: '+254712345678',
    address: 'Industrial Area, Nairobi',
    products: ['Fertilizers', 'Pesticides', 'Seeds'],
    rating: 4.8,
    review_count: 156,
    created_at: '2024-08-15T08:30:00Z',
  },
  {
    id: '2',
    name: 'AgriGrow Kenya Ltd',
    phone_number: '+254723456789',
    address: 'Kenyatta Avenue, Nakuru',
    products: ['Fertilizers', 'Farm Tools', 'Irrigation Equipment'],
    rating: 4.5,
    review_count: 98,
    created_at: '2024-09-20T10:15:00Z',
  },
  {
    id: '3',
    name: 'Seed Masters Ltd',
    phone_number: '+254734567890',
    address: 'Moi Avenue, Eldoret',
    products: ['Seeds', 'Seedlings', 'Organic Fertilizers'],
    rating: 4.7,
    review_count: 123,
    created_at: '2024-10-05T14:45:00Z',
  },
  {
    id: '4',
    name: 'Kenya Farmers Supply Co.',
    phone_number: '+254745678901',
    address: 'Biashara Street, Mombasa',
    products: ['Pesticides', 'Herbicides', 'Fungicides'],
    rating: 4.2,
    review_count: 87,
    created_at: '2024-11-10T09:20:00Z',
  },
  {
    id: '5',
    name: 'Greenpro Agri Solutions',
    phone_number: '+254756789012',
    address: 'Oginga Odinga Street, Kisumu',
    products: ['Organic Inputs', 'Bio-fertilizers', 'Farm Equipment'],
    rating: 4.6,
    review_count: 105,
    created_at: '2024-12-01T11:30:00Z',
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    user_id: '1',
    user_name: 'John Kamau',
    supplier_id: '1',
    supplier_name: 'Farmtech Solutions Ltd',
    product: 'NPK Fertilizer (50kg)',
    quantity: 2,
    total_amount: 7800,
    status: 'completed',
    date: '2025-04-15T08:30:00Z',
  },
  {
    id: '2',
    user_id: '2',
    user_name: 'Sarah Odhiambo',
    supplier_id: '2',
    supplier_name: 'AgriGrow Kenya Ltd',
    product: 'Maize Seeds (2kg)',
    quantity: 5,
    total_amount: 3500,
    status: 'completed',
    date: '2025-04-18T10:15:00Z',
  },
  {
    id: '3',
    user_id: '3',
    user_name: 'Daniel Kipchoge',
    supplier_id: '3',
    supplier_name: 'Seed Masters Ltd',
    product: 'Insecticide (1L)',
    quantity: 3,
    total_amount: 4200,
    status: 'pending',
    date: '2025-04-20T14:45:00Z',
  },
  {
    id: '4',
    user_id: '4',
    user_name: 'Mary Njeri',
    supplier_id: '4',
    supplier_name: 'Kenya Farmers Supply Co.',
    product: 'Fungicide (500ml)',
    quantity: 2,
    total_amount: 2800,
    status: 'completed',
    date: '2025-04-22T09:20:00Z',
  },
  {
    id: '5',
    user_id: '5',
    user_name: 'Robert Omondi',
    supplier_id: '5',
    supplier_name: 'Greenpro Agri Solutions',
    product: 'Organic Fertilizer (25kg)',
    quantity: 4,
    total_amount: 6000,
    status: 'cancelled',
    date: '2025-04-25T11:30:00Z',
  },
  {
    id: '6',
    user_id: '1',
    user_name: 'John Kamau',
    supplier_id: '2',
    supplier_name: 'AgriGrow Kenya Ltd',
    product: 'Irrigation Pipe (100m)',
    quantity: 1,
    total_amount: 5500,
    status: 'completed',
    date: '2025-04-28T13:45:00Z',
  },
  {
    id: '7',
    user_id: '2',
    user_name: 'Sarah Odhiambo',
    supplier_id: '3',
    supplier_name: 'Seed Masters Ltd',
    product: 'Bean Seeds (1kg)',
    quantity: 3,
    total_amount: 2100,
    status: 'pending',
    date: '2025-04-30T15:20:00Z',
  }
];

export const mockMarketPrices: MarketPrice[] = [
  {
    id: '1',
    crop: 'Maize',
    region: 'Central',
    town: 'Nyeri',
    price_per_kg: 45,
    price_per_bag: 4500,
    last_updated: '2025-05-01T08:30:00Z',
  },
  {
    id: '2',
    crop: 'Beans',
    region: 'Central',
    town: 'Nyeri',
    price_per_kg: 120,
    price_per_bag: 12000,
    last_updated: '2025-05-01T08:35:00Z',
  },
  {
    id: '3',
    crop: 'Potatoes',
    region: 'Central',
    town: 'Nyeri',
    price_per_kg: 35,
    price_per_bag: 3500,
    last_updated: '2025-05-01T08:40:00Z',
  },
  {
    id: '4',
    crop: 'Maize',
    region: 'Rift Valley',
    town: 'Nakuru',
    price_per_kg: 42,
    price_per_bag: 4200,
    last_updated: '2025-05-01T09:15:00Z',
  },
  {
    id: '5',
    crop: 'Wheat',
    region: 'Rift Valley',
    town: 'Eldoret',
    price_per_kg: 50,
    price_per_bag: 5000,
    last_updated: '2025-05-01T10:20:00Z',
  },
  {
    id: '6',
    crop: 'Rice',
    region: 'Nyanza',
    town: 'Kisumu',
    price_per_kg: 130,
    price_per_bag: 13000,
    last_updated: '2025-05-01T11:30:00Z',
  },
  {
    id: '7',
    crop: 'Coffee',
    region: 'Eastern',
    town: 'Meru',
    price_per_kg: 250,
    price_per_bag: 25000,
    last_updated: '2025-05-01T12:45:00Z',
  }
];

export const mockRequests: Request[] = [
  {
    id: '1',
    user_id: '1',
    type: 'crop_diagnosis',
    status: 'completed',
    created_at: '2025-04-28T08:30:00Z',
  },
  {
    id: '2',
    user_id: '2',
    type: 'market_price',
    status: 'completed',
    created_at: '2025-04-28T09:15:00Z',
  },
  {
    id: '3',
    user_id: '3',
    type: 'advisory',
    status: 'completed',
    created_at: '2025-04-28T10:20:00Z',
  },
  {
    id: '4',
    user_id: '4',
    type: 'order',
    status: 'pending',
    created_at: '2025-04-28T11:30:00Z',
  },
  {
    id: '5',
    user_id: '5',
    type: 'crop_diagnosis',
    status: 'completed',
    created_at: '2025-04-28T12:45:00Z',
  },
  {
    id: '6',
    user_id: '1',
    type: 'advisory',
    status: 'pending',
    created_at: '2025-04-28T13:50:00Z',
  },
  {
    id: '7',
    user_id: '2',
    type: 'market_price',
    status: 'completed',
    created_at: '2025-04-28T14:25:00Z',
  },
  {
    id: '8',
    user_id: '3',
    type: 'order',
    status: 'completed',
    created_at: '2025-04-28T15:10:00Z',
  },
  {
    id: '9',
    user_id: '4',
    type: 'crop_diagnosis',
    status: 'pending',
    created_at: '2025-04-28T16:05:00Z',
  },
  {
    id: '10',
    user_id: '5',
    type: 'advisory',
    status: 'completed',
    created_at: '2025-04-28T17:00:00Z',
  }
];

// Calculate statistics from mock data
export const getStatistics = () => {
  return {
    totalUsers: mockUsers.length,
    totalSuppliers: mockSuppliers.length,
    totalTransactions: mockTransactions.length,
    totalRequests: mockRequests.length,
    requestsByType: {
      crop_diagnosis: mockRequests.filter(r => r.type === 'crop_diagnosis').length,
      market_price: mockRequests.filter(r => r.type === 'market_price').length,
      advisory: mockRequests.filter(r => r.type === 'advisory').length,
      order: mockRequests.filter(r => r.type === 'order').length,
    },
    transactionsByStatus: {
      completed: mockTransactions.filter(t => t.status === 'completed').length,
      pending: mockTransactions.filter(t => t.status === 'pending').length,
      cancelled: mockTransactions.filter(t => t.status === 'cancelled').length,
    },
    totalSales: mockTransactions.reduce((sum, t) => sum + t.total_amount, 0),
  };
};

// Get data for charts
export const getChartData = () => {
  // Last 7 days for daily chart
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  // Mock daily request data
  const dailyRequests = last7Days.map(day => ({
    date: day,
    crop_diagnosis: Math.floor(Math.random() * 10) + 5,
    market_price: Math.floor(Math.random() * 15) + 10,
    advisory: Math.floor(Math.random() * 8) + 3,
    order: Math.floor(Math.random() * 5) + 1,
  }));

  // Mock monthly sales data
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const monthlySales = monthNames.map(month => ({
    month,
    sales: Math.floor(Math.random() * 100000) + 50000,
  }));

  return {
    dailyRequests,
    monthlySales,
  };
};