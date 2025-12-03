export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  salaryRange: string;
  description: string;
  requirements: string[];
  postedAt: string;
  isRemote: boolean;
  logoUrl?: string; // Optional generated placeholder
}

export interface UserProfile {
  name: string;
  email: string;
  experience: string;
  skills: string;
}

export interface SearchFilters {
  query: string;
  location: string;
}
