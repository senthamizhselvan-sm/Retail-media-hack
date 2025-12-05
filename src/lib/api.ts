// This is a mock API service that can be replaced with real backend calls

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  token?: string
}

export interface DashboardStats {
  creativesGenerated: number
  streakDays: number
  xpPoints: number
  badges: string[]
}

export interface Creative {
  id: number
  title: string
  platform: 'Amazon' | 'Flipkart' | 'YouTube' | 'Instagram' | 'Facebook'
  date: string
  status: 'approved' | 'pending' | 'rejected'
  thumbnail?: string
}

// Mock data for frontend testing
export const mockUser: User = {
  id: 'user_12345',
  name: 'John Doe',
  email: 'john@example.com',
  token: 'mock_jwt_token'
}

export const mockStats: DashboardStats = {
  creativesGenerated: 42,
  streakDays: 7,
  xpPoints: 1250,
  badges: ['🚀 Starter', '🎨 Designer', '⚡ Speedster', '🏆 Pro']
}

export const mockCreatives: Creative[] = [
  { id: 1, title: 'Amazon Headphones Ad', platform: 'Amazon', date: '2 hours ago', status: 'approved' },
  { id: 2, title: 'YouTube Gaming Thumbnail', platform: 'YouTube', date: '1 day ago', status: 'pending' },
  { id: 3, title: 'Instagram Fashion Post', platform: 'Instagram', date: '3 days ago', status: 'approved' },
  { id: 4, title: 'Flipkart Sale Banner', platform: 'Flipkart', date: '1 week ago', status: 'approved' },
  { id: 5, title: 'Facebook Product Ad', platform: 'Facebook', date: '2 weeks ago', status: 'rejected' }
]

// Mock API functions - Replace these with real API calls
export const api = {
  // Authentication
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    // TODO: Replace with real API call
    console.log('API: Login called with', { email, password })
    return {
      user: mockUser,
      token: 'mock_jwt_token_' + Date.now()
    }
  },

  signup: async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
    // TODO: Replace with real API call
    console.log('API: Signup called with', { name, email, password })
    return {
      user: { ...mockUser, name, email },
      token: 'mock_jwt_token_' + Date.now()
    }
  },

  logout: async (): Promise<void> => {
    // TODO: Replace with real API call
    console.log('API: Logout called')
  },

  // Dashboard data
  getDashboardStats: async (): Promise<DashboardStats> => {
    // TODO: Replace with real API call
    console.log('API: Getting dashboard stats')
    return mockStats
  },

  getRecentCreatives: async (): Promise<Creative[]> => {
    // TODO: Replace with real API call
    console.log('API: Getting recent creatives')
    return mockCreatives
  },

  // Creative operations
  createCreative: async (data: any): Promise<Creative> => {
    // TODO: Replace with real API call
    console.log('API: Creating creative with', data)
    return {
      id: Date.now(),
      title: data.title || 'New Creative',
      platform: data.platform || 'Amazon',
      date: 'Just now',
      status: 'pending',
      thumbnail: data.thumbnail
    }
  },

  deleteCreative: async (id: number): Promise<void> => {
    // TODO: Replace with real API call
    console.log('API: Deleting creative', id)
  }
}