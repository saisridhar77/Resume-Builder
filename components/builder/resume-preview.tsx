"use client";

import { useTheme } from "next-themes";
import { ResumeData, TemplateType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface ResumePreviewProps {
  resume: ResumeData;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  
  // Render different templates based on the selected template
  const renderTemplate = () => {
    switch (resume.template) {
      case "minimal":
        return <MinimalTemplate resume={resume} isDarkMode={isDarkMode} />;
      case "professional":
        return <ProfessionalTemplate resume={resume} isDarkMode={isDarkMode} />;
      case "creative":
        return <CreativeTemplate resume={resume} isDarkMode={isDarkMode} />;
      case "modern":
        return <ModernTemplate resume={resume} isDarkMode={isDarkMode} />;
      case "executive":
        return <ExecutiveTemplate resume={resume} isDarkMode={isDarkMode} />;
      default:
        return <MinimalTemplate resume={resume} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 overflow-hidden shadow-lg">
        <div className="bg-white text-black h-full overflow-y-auto" id="resume-preview">
          {renderTemplate()}
        </div>
      </Card>
    </div>
  );
}

// Minimal Template
function MinimalTemplate({ resume, isDarkMode }: { resume: ResumeData; isDarkMode: boolean }) {
  const { basics, work, education, skills } = resume.content;
  
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{basics.name || "Your Name"}</h1>
        <p className="text-lg mb-3">{basics.label || "Professional Title"}</p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.website && <span>{basics.website}</span>}
          {basics.location && <span>{basics.location}</span>}
        </div>
      </header>
      
      {/* Summary */}
      {basics.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b mb-2 pb-1">Professional Summary</h2>
          <p className="text-sm">{basics.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {work.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b mb-2 pb-1">Work Experience</h2>
          <div className="space-y-4">
            {work.map((job, index) => (
              <div key={job.id || index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium">{job.position}</h3>
                  <div className="text-sm">{formatDateRange(job.startDate, job.endDate)}</div>
                </div>
                <div className="text-sm mb-1">{job.company}{job.website ? ` • ${job.website}` : ''}</div>
                {job.summary && <p className="text-sm mb-1">{job.summary}</p>}
                
                {job.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                    {job.highlights.map((highlight, hIndex) => (
                      <li key={hIndex}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b mb-2 pb-1">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={edu.id || index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium">{edu.institution}</h3>
                  <div className="text-sm">{formatDateRange(edu.startDate, edu.endDate)}</div>
                </div>
                <div className="text-sm">
                  {edu.studyType}{edu.area ? `, ${edu.area}` : ''}
                  {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                </div>
                
                {edu.courses.length > 0 && (
                  <div className="text-sm mt-1">
                    <span className="font-medium">Relevant Courses: </span>
                    {edu.courses.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b mb-2 pb-1">Skills</h2>
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div key={skill.id || index}>
                <div className="flex">
                  <h3 className="font-medium text-sm mr-2">{skill.name}</h3>
                  {skill.level && <span className="text-sm">({skill.level})</span>}
                </div>
                {skill.keywords.length > 0 && (
                  <p className="text-sm">{skill.keywords.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Professional Template
function ProfessionalTemplate({ resume, isDarkMode }: { resume: ResumeData; isDarkMode: boolean }) {
  const { basics, work, education, skills } = resume.content;
  
  return (
    <div className="max-w-4xl mx-auto font-sans">
      {/* Header */}
      <header className="bg-gray-800 text-white py-8 px-8">
        <h1 className="text-3xl font-bold mb-1">{basics.name || "Your Name"}</h1>
        <p className="text-xl mb-4">{basics.label || "Professional Title"}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {basics.email && <div className="flex items-center gap-2"><span className="font-semibold">Email:</span> {basics.email}</div>}
          {basics.phone && <div className="flex items-center gap-2"><span className="font-semibold">Phone:</span> {basics.phone}</div>}
          {basics.website && <div className="flex items-center gap-2"><span className="font-semibold">Website:</span> {basics.website}</div>}
          {basics.location && <div className="flex items-center gap-2"><span className="font-semibold">Location:</span> {basics.location}</div>}
        </div>
      </header>
      
      <div className="p-8">
        {/* Summary */}
        {basics.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Professional Summary</h2>
            <p className="text-sm">{basics.summary}</p>
          </section>
        )}
        
        {/* Experience */}
        {work.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Work Experience</h2>
            <div className="space-y-5">
              {work.map((job, index) => (
                <div key={job.id || index} className="border-l-4 border-gray-800 pl-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-lg">{job.position}</h3>
                    <div className="text-sm font-medium">{formatDateRange(job.startDate, job.endDate)}</div>
                  </div>
                  <div className="text-md font-semibold mb-2">{job.company}{job.website ? ` • ${job.website}` : ''}</div>
                  {job.summary && <p className="text-sm mb-2">{job.summary}</p>}
                  
                  {job.highlights.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                      {job.highlights.map((highlight, hIndex) => (
                        <li key={hIndex}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={edu.id || index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <div className="text-sm">{formatDateRange(edu.startDate, edu.endDate)}</div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{edu.studyType}</span>
                    {edu.area ? `, ${edu.area}` : ''}
                    {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                  </div>
                  
                  {edu.courses.length > 0 && (
                    <div className="text-sm mt-1">
                      <span className="font-medium">Relevant Courses: </span>
                      {edu.courses.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={skill.id || index} className="border p-3 rounded-md">
                  <h3 className="font-semibold text-md">{skill.name} {skill.level && <span>({skill.level})</span>}</h3>
                  {skill.keywords.length > 0 && (
                    <p className="text-sm">{skill.keywords.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Creative Template
function CreativeTemplate({ resume, isDarkMode }: { resume: ResumeData; isDarkMode: boolean }) {
  const { basics, work, education, skills } = resume.content;
  
  return (
    <div className="max-w-4xl mx-auto font-sans bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-10 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">{basics.name || "Your Name"}</h1>
          <p className="text-xl opacity-90 mb-6">{basics.label || "Professional Title"}</p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {basics.email && <span>{basics.email}</span>}
            {basics.phone && <span>{basics.phone}</span>}
            {basics.website && <span>{basics.website}</span>}
            {basics.location && <span>{basics.location}</span>}
          </div>
        </div>
      </header>
      
      <div className="p-10">
        {/* Summary */}
        {basics.summary && (
          <section className="mb-8 max-w-3xl mx-auto text-center">
            <p className="text-lg leading-relaxed italic">{basics.summary}</p>
          </section>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="md:col-span-2">
            {/* Experience */}
            {work.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-indigo-600 mb-6 after:content-[''] after:block after:w-20 after:h-1 after:bg-indigo-600 after:mt-2">Experience</h2>
                <div className="space-y-6">
                  {work.map((job, index) => (
                    <div key={job.id || index} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-indigo-600 before:rounded-full">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                        <h3 className="font-bold text-lg">{job.position}</h3>
                        <div className="text-sm text-gray-600">{formatDateRange(job.startDate, job.endDate)}</div>
                      </div>
                      <div className="text-md text-indigo-600 mb-2">{job.company}</div>
                      {job.summary && <p className="text-sm mb-2">{job.summary}</p>}
                      
                      {job.highlights.length > 0 && (
                        <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                          {job.highlights.map((highlight, hIndex) => (
                            <li key={hIndex}>{highlight}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Education */}
            {education.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-indigo-600 mb-6 after:content-[''] after:block after:w-20 after:h-1 after:bg-indigo-600 after:mt-2">Education</h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={edu.id || index} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-indigo-600 before:rounded-full">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                        <h3 className="font-bold">{edu.institution}</h3>
                        <div className="text-sm text-gray-600">{formatDateRange(edu.startDate, edu.endDate)}</div>
                      </div>
                      <div className="text-sm text-indigo-600">
                        {edu.studyType}{edu.area ? `, ${edu.area}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          <div>
            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-8 bg-gray-100 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-indigo-600 mb-6 after:content-[''] after:block after:w-10 after:h-1 after:bg-indigo-600 after:mt-2">Skills</h2>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={skill.id || index}>
                      <h3 className="font-bold text-md mb-2">{skill.name}</h3>
                      {skill.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {skill.keywords.map((keyword, kIndex) => (
                            <span key={kIndex} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Contact */}
            <section className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-600 mb-6 after:content-[''] after:block after:w-10 after:h-1 after:bg-indigo-600 after:mt-2">Contact</h2>
              <div className="space-y-3">
                {basics.email && (
                  <div>
                    <span className="font-semibold block">Email</span>
                    <span className="text-sm">{basics.email}</span>
                  </div>
                )}
                {basics.phone && (
                  <div>
                    <span className="font-semibold block">Phone</span>
                    <span className="text-sm">{basics.phone}</span>
                  </div>
                )}
                {basics.website && (
                  <div>
                    <span className="font-semibold block">Website</span>
                    <span className="text-sm">{basics.website}</span>
                  </div>
                )}
                {basics.location && (
                  <div>
                    <span className="font-semibold block">Location</span>
                    <span className="text-sm">{basics.location}</span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modern Template
function ModernTemplate({ resume, isDarkMode }: { resume: ResumeData; isDarkMode: boolean }) {
  const { basics, work, education, skills } = resume.content;
  
  return (
    <div className="max-w-4xl mx-auto font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Sidebar */}
        <div className="bg-gray-900 text-white p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-1">{basics.name || "Your Name"}</h1>
            <p className="text-lg text-gray-300 mb-4">{basics.label || "Professional Title"}</p>
          </div>
          
          <div className="space-y-6">
            {/* Contact Info */}
            <section>
              <h2 className="text-lg font-semibold mb-3 pb-1 border-b border-gray-700">Contact</h2>
              <div className="space-y-2 text-sm">
                {basics.email && <div><span className="text-gray-400">Email: </span>{basics.email}</div>}
                {basics.phone && <div><span className="text-gray-400">Phone: </span>{basics.phone}</div>}
                {basics.website && <div><span className="text-gray-400">Web: </span>{basics.website}</div>}
                {basics.location && <div><span className="text-gray-400">Location: </span>{basics.location}</div>}
              </div>
            </section>
            
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3 pb-1 border-b border-gray-700">Skills</h2>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={skill.id || index}>
                      <h3 className="font-medium text-sm">{skill.name}</h3>
                      {skill.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {skill.keywords.map((keyword, kIndex) => (
                            <span key={kIndex} className="bg-gray-800 text-xs px-2 py-1 rounded">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2 p-8">
          {/* Summary */}
          {basics.summary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Professional Summary</h2>
              <p className="text-sm">{basics.summary}</p>
            </section>
          )}
          
          {/* Experience */}
          {work.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-5">Experience</h2>
              <div className="space-y-6">
                {work.map((job, index) => (
                  <div key={job.id || index} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gray-200">
                    <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-gray-400"></div>
                    <div className="flex flex-col space-y-1">
                      <div className="text-sm text-gray-600">{formatDateRange(job.startDate, job.endDate)}</div>
                      <h3 className="font-bold text-lg">{job.position}</h3>
                      <div className="text-md text-gray-700 mb-2">{job.company}</div>
                    </div>
                    {job.summary && <p className="text-sm mb-3">{job.summary}</p>}
                    
                    {job.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        {job.highlights.map((highlight, hIndex) => (
                          <li key={hIndex}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-5">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id || index} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gray-200">
                    <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-gray-400"></div>
                    <div className="flex flex-col space-y-1">
                      <div className="text-sm text-gray-600">{formatDateRange(edu.startDate, edu.endDate)}</div>
                      <h3 className="font-bold">{edu.institution}</h3>
                      <div className="text-sm">
                        {edu.studyType}{edu.area ? `, ${edu.area}` : ''}
                        {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

// Executive Template
function ExecutiveTemplate({ resume, isDarkMode }: { resume: ResumeData; isDarkMode: boolean }) {
  const { basics, work, education, skills } = resume.content;
  
  return (
    <div className="max-w-4xl mx-auto font-serif">
      {/* Header */}
      <header className="py-8 px-8 border-b-2 border-gray-300">
        <h1 className="text-4xl font-bold tracking-wide text-center mb-2">{basics.name || "Your Name"}</h1>
        <p className="text-xl text-center text-gray-600 mb-6">{basics.label || "Professional Title"}</p>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.website && <span>{basics.website}</span>}
          {basics.location && <span>{basics.location}</span>}
        </div>
      </header>
      
      <div className="p-8">
        {/* Summary */}
        {basics.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-gray-700">Executive Summary</h2>
            <p className="text-base leading-relaxed">{basics.summary}</p>
          </section>
        )}
        
        {/* Experience */}
        {work.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide text-gray-700">Professional Experience</h2>
            <div className="space-y-8">
              {work.map((job, index) => (
                <div key={job.id || index}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h3 className="font-bold text-lg uppercase">{job.company}</h3>
                    <div className="text-sm italic">{formatDateRange(job.startDate, job.endDate)}</div>
                  </div>
                  <div className="text-md font-semibold mb-2">{job.position}</div>
                  {job.summary && <p className="text-base mb-3">{job.summary}</p>}
                  
                  {job.highlights.length > 0 && (
                    <ul className="list-disc list-outside text-base space-y-2 ml-5">
                      {job.highlights.map((highlight, hIndex) => (
                        <li key={hIndex}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-gray-700">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id || index}>
                    <h3 className="font-bold">{edu.institution}</h3>
                    <div className="text-base">
                      {edu.studyType}{edu.area ? `, ${edu.area}` : ''}
                    </div>
                    <div className="text-sm italic">
                      {formatDateRange(edu.startDate, edu.endDate)}
                      {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-gray-700">Core Competencies</h2>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={skill.id || index}>
                    <h3 className="font-bold text-base">{skill.name}</h3>
                    {skill.keywords.length > 0 && (
                      <p className="text-base">{skill.keywords.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper functions
function formatDateRange(startDate: string, endDate: string): string {
  const formattedStart = formatDate(startDate);
  const formattedEnd = endDate === "Present" ? "Present" : formatDate(endDate);
  
  if (!formattedStart && !formattedEnd) return "";
  if (!formattedStart) return formattedEnd;
  if (!formattedEnd) return formattedStart;
  
  return `${formattedStart} - ${formattedEnd}`;
}