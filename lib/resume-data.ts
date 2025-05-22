import { ResumeData, TemplateType } from "./types";
import { v4 as uuidv4 } from "uuid";

export const createEmptyResume = (title: string = "Untitled Resume", template: TemplateType = "minimal"): ResumeData => {
  const now = new Date().toISOString();
  
  return {
    id: uuidv4(),
    title,
    createdAt: now,
    updatedAt: now,
    template,
    content: {
      basics: {
        name: "",
        label: "",
        email: "",
        phone: "",
        website: "",
        location: "",
        summary: "",
        profiles: []
      },
      work: [],
      education: [],
      skills: [],
      projects: [],
      awards: [],
      certificates: [],
      languages: [],
      interests: [],
      references: []
    }
  };
};

export const createSampleResume = (template: TemplateType = "minimal"): ResumeData => {
  const now = new Date().toISOString();
  
  return {
    id: uuidv4(),
    title: "Sample Resume",
    createdAt: now,
    updatedAt: now,
    template,
    content: {
      basics: {
        name: "John Doe",
        label: "Software Developer",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        website: "https://johndoe.com",
        location: "San Francisco, CA",
        summary: "Experienced software developer with a passion for building innovative applications. Skilled in JavaScript, TypeScript, React, and Node.js.",
        profiles: [
          {
            network: "LinkedIn",
            username: "johndoe",
            url: "https://linkedin.com/in/johndoe"
          },
          {
            network: "GitHub",
            username: "johndoe",
            url: "https://github.com/johndoe"
          }
        ]
      },
      work: [
        {
          id: uuidv4(),
          company: "Tech Innovations Inc.",
          position: "Senior Software Developer",
          website: "https://techinnovations.com",
          startDate: "2020-01",
          endDate: "Present",
          summary: "Lead developer for the company's flagship product, a customer relationship management system.",
          highlights: [
            "Architected and implemented a new frontend using React and TypeScript",
            "Improved application performance by 40%",
            "Mentored junior developers and conducted code reviews"
          ]
        },
        {
          id: uuidv4(),
          company: "Digital Solutions LLC",
          position: "Software Developer",
          website: "https://digitalsolutions.com",
          startDate: "2017-03",
          endDate: "2019-12",
          summary: "Worked on various web application projects for clients in finance and healthcare industries.",
          highlights: [
            "Developed responsive web applications using React",
            "Implemented RESTful APIs using Node.js and Express",
            "Collaborated with UX designers to improve user experience"
          ]
        }
      ],
      education: [
        {
          id: uuidv4(),
          institution: "University of California, Berkeley",
          area: "Computer Science",
          studyType: "Bachelor of Science",
          startDate: "2013-09",
          endDate: "2017-05",
          gpa: "3.8",
          courses: [
            "Data Structures and Algorithms",
            "Web Development",
            "Database Systems",
            "Artificial Intelligence"
          ]
        }
      ],
      skills: [
        {
          id: uuidv4(),
          name: "Frontend Development",
          level: "Expert",
          keywords: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"]
        },
        {
          id: uuidv4(),
          name: "Backend Development",
          level: "Advanced",
          keywords: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"]
        },
        {
          id: uuidv4(),
          name: "Tools & Methodologies",
          level: "Advanced",
          keywords: ["Git", "GitHub", "Docker", "CI/CD", "Agile", "Scrum"]
        }
      ],
      projects: [
        {
          id: uuidv4(),
          name: "E-commerce Platform",
          description: "A full-stack e-commerce platform with product management, shopping cart, and payment processing.",
          startDate: "2019-06",
          endDate: "2019-12",
          url: "https://github.com/johndoe/ecommerce",
          highlights: [
            "Built with React, Node.js, and MongoDB",
            "Implemented Stripe payment integration",
            "Designed responsive UI for mobile and desktop"
          ]
        }
      ],
      awards: [
        {
          id: uuidv4(),
          title: "Employee of the Year",
          date: "2021-12",
          awarder: "Tech Innovations Inc.",
          summary: "Recognized for outstanding contributions to the development team and product innovation."
        }
      ],
      certificates: [
        {
          id: uuidv4(),
          name: "AWS Certified Developer",
          date: "2020-05",
          issuer: "Amazon Web Services",
          url: "https://aws.amazon.com/certification/certified-developer-associate/"
        }
      ],
      languages: [
        {
          id: uuidv4(),
          language: "English",
          fluency: "Native"
        },
        {
          id: uuidv4(),
          language: "Spanish",
          fluency: "Intermediate"
        }
      ],
      interests: [
        {
          id: uuidv4(),
          name: "Open Source",
          keywords: ["Contributing", "GitHub", "Community"]
        },
        {
          id: uuidv4(),
          name: "Hiking",
          keywords: ["Nature", "Outdoors", "Adventure"]
        }
      ],
      references: [
        {
          id: uuidv4(),
          name: "Jane Smith, Engineering Manager at Tech Innovations",
          reference: "John is an exceptional developer with strong technical skills and a great team player."
        }
      ]
    }
  };
};