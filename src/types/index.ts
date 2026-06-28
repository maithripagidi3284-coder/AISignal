export interface Company {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  category: string;
  stage: string;
  headcount: string;
  founded: number;
  location: string;
  website: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  tags: string[];
  upvotes: number;
  comments: number;
  trending?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: string;
  salary: string;
  equity?: string;
  postedAt: string;
  category: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  postedAt: string;
  comments: number;
  companyLogo: string;
}