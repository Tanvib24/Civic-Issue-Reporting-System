export interface User {
  id: string;
  email: string;
  role: 'admin' | 'staff' | 'citizen';
  name: string;
  points: number;
  created_at: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'submitted' | 'acknowledged' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lat: number;
  lng: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  assigned_dept?: string;
  assigned_staff?: string;
}

export interface Assignment {
  id: string;
  issue_id: string;
  assigned_to: string;
  assigned_by: string;
  created_at: string;
}

export interface Comment {
  id: string;
  issue_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user_name: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Mock Users
export const mockUsers: User[] = [
  { id: '1', email: 'admin@city.gov', role: 'admin', name: 'Maheen Meshram', points: 0, created_at: '2024-01-15' },
  { id: '2', email: 'staff@city.gov', role: 'staff', name: 'Tanvi Bandebuche', points: 0, created_at: '2024-01-20' },
  { id: '3', email: 'atharv.jaiswal@email.com', role: 'citizen', name: 'Atharv Jaiswal', points: 850, created_at: '2024-02-01' },
  { id: '4', email: 'sumukh.chourasia@email.com', role: 'citizen', name: 'Sumukh Chourasia', points: 720, created_at: '2024-02-05' },
  { id: '5', email: 'mrudang.wanjari@email.com', role: 'citizen', name: 'Mrudang Wanjari', points: 640, created_at: '2024-02-10' },
];

// Mock Issues
export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Pothole on Wardha Road',
    description: 'Large pothole causing traffic issues near Airport Metro Station',
    category: 'roads',
    status: 'in_progress',
    priority: 'high',
    lat: 21.1155,
    lng: 79.0646,
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-02T14:30:00Z',
    user_id: '3',
    assigned_dept: 'Public Works',
    assigned_staff: '2'
  },
  {
    id: '2',
    title: 'Broken Streetlight',
    description: 'Streetlight has been out for 3 days near Sitabuldi Main Square',
    category: 'lighting',
    status: 'acknowledged',
    priority: 'medium',
    lat: 21.1509,
    lng: 79.0882,
    created_at: '2024-03-02T08:15:00Z',
    updated_at: '2024-03-02T09:00:00Z',
    user_id: '4',
    assigned_dept: 'Electrical'
  },
  {
    id: '3',
    title: 'Graffiti on Municipal Office',
    description: 'Vandalism spotted near Nagpur Municipal Corporation building',
    category: 'vandalism',
    status: 'resolved',
    priority: 'low',
    lat: 21.1490,
    lng: 79.0822,
    created_at: '2024-02-28T16:20:00Z',
    updated_at: '2024-03-01T11:45:00Z',
    user_id: '5',
    assigned_dept: 'Maintenance'
  },
  {
    id: '4',
    title: 'Overflowing Trash Bin',
    description: 'Public trash bin overflowing at Futala Lake area',
    category: 'waste',
    status: 'submitted',
    priority: 'medium',
    lat: 21.1652,
    lng: 79.0471,
    created_at: '2024-03-03T12:00:00Z',
    updated_at: '2024-03-03T12:00:00Z',
    user_id: '3'
  },
  {
    id: '5',
    title: 'Water Main Leak',
    description: 'Water leaking near Gandhibagh Garden, flooding street area',
    category: 'utilities',
    status: 'submitted',
    priority: 'urgent',
    lat: 21.1497,
    lng: 79.1116,
    created_at: '2024-03-03T14:30:00Z',
    updated_at: '2024-03-03T14:35:00Z',
    user_id: '4',
    assigned_dept: 'Water Department'
  }
];


// Mock Comments
export const mockComments: Comment[] = [
  {
    id: '1',
    issue_id: '1',
    user_id: '2',
    content: 'Issue has been assigned to our road crew. Expected completion by end of week.',
    created_at: '2024-03-02T14:30:00Z',
    user_name: 'Atharv Jaiswal'
  },
  {
    id: '2',
    issue_id: '2',
    user_id: '1',
    content: 'We have received your report and scheduled for inspection tomorrow.',
    created_at: '2024-03-02T09:00:00Z',
    user_name: 'Sumukh Chourasia'
  }
];

// Mock Badges
export const mockBadges: Badge[] = [
  { id: '1', name: 'First Reporter', description: 'First issue reported', icon: '🏆' },
  { id: '2', name: 'Community Guardian', description: '10+ issues reported', icon: '🛡️' },
  { id: '3', name: 'Civic Hero', description: '50+ issues reported', icon: '⭐' }
];

// Mock Current User
export const mockCurrentUser: User = mockUsers[0]; // Admin user

// Analytics Mock Data
export const mockAnalytics = {
  totalIssues: 127,
  openIssues: 34,
  resolvedIssues: 93,
  avgResolutionTime: 2.5, // days
  
  categoryStats: [
    { name: 'Roads', value: 45, color: '#3B82F6' },
    { name: 'Lighting', value: 28, color: '#10B981' },
    { name: 'Waste', value: 22, color: '#F59E0B' },
    { name: 'Utilities', value: 18, color: '#EF4444' },
    { name: 'Vandalism', value: 14, color: '#8B5CF6' }
  ],
  
  monthlyTrends: [
    { month: 'Jan', reported: 25, resolved: 22 },
    { month: 'Feb', reported: 30, resolved: 28 },
    { month: 'Mar', reported: 35, resolved: 32 },
    { month: 'Apr', reported: 28, resolved: 25 },
    { month: 'May', reported: 32, resolved: 30 },
    { month: 'Jun', reported: 27, resolved: 29 }
  ],

  departmentPerformance: [
    { dept: 'Public Works', avgTime: 3.2, issues: 45 },
    { dept: 'Electrical', avgTime: 2.1, issues: 28 },
    { dept: 'Maintenance', avgTime: 1.8, issues: 22 },
    { dept: 'Water Dept', avgTime: 4.5, issues: 18 }
  ]
};