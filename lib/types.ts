export type ResumeData = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  template: TemplateType;
  content: ResumeContent;
}

export type ResumeContent = {
  basics: {
    name: string;
    label: string;
    email: string;
    phone: string;
    website: string;
    location: string;
    summary: string;
    profiles: {
      network: string;
      username: string;
      url: string;
    }[];
  };
  work: {
    id: string;
    company: string;
    position: string;
    website: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
  }[];
  education: {
    id: string;
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    gpa: string;
    courses: string[];
  }[];
  skills: {
    id: string;
    name: string;
    level: string;
    keywords: string[];
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    url: string;
    highlights: string[];
  }[];
  awards: {
    id: string;
    title: string;
    date: string;
    awarder: string;
    summary: string;
  }[];
  certificates: {
    id: string;
    name: string;
    date: string;
    issuer: string;
    url: string;
  }[];
  languages: {
    id: string;
    language: string;
    fluency: string;
  }[];
  interests: {
    id: string;
    name: string;
    keywords: string[];
  }[];
  references: {
    id: string;
    name: string;
    reference: string;
  }[];
}

export type TemplateType = "minimal" | "professional" | "creative" | "modern" | "executive";