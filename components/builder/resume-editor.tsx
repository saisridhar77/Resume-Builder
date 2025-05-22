"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ResumeData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";

interface ResumeEditorProps {
  resume: ResumeData;
  onUpdate: (resume: ResumeData) => void;
}

export default function ResumeEditor({ resume, onUpdate }: ResumeEditorProps) {
  // Create a deep copy of the resume to work with
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  
  // Function to update the resume data
  const handleUpdate = (updatedResume: ResumeData) => {
    onUpdate({
      ...updatedResume,
      updatedAt: new Date().toISOString(),
    });
  };

  // Update basic information
  const updateBasics = (field: string, value: string) => {
    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        basics: {
          ...resume.content.basics,
          [field]: value,
        },
      },
    };
    handleUpdate(updatedResume);
  };

  // Add/remove social profile
  const addProfile = () => {
    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        basics: {
          ...resume.content.basics,
          profiles: [
            ...resume.content.basics.profiles,
            { network: "", username: "", url: "" },
          ],
        },
      },
    };
    handleUpdate(updatedResume);
  };

  const updateProfile = (index: number, field: string, value: string) => {
    const updatedProfiles = [...resume.content.basics.profiles];
    updatedProfiles[index] = {
      ...updatedProfiles[index],
      [field]: value,
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        basics: {
          ...resume.content.basics,
          profiles: updatedProfiles,
        },
      },
    };
    handleUpdate(updatedResume);
  };

  const removeProfile = (index: number) => {
    const updatedProfiles = [...resume.content.basics.profiles];
    updatedProfiles.splice(index, 1);

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        basics: {
          ...resume.content.basics,
          profiles: updatedProfiles,
        },
      },
    };
    handleUpdate(updatedResume);
  };

  // Work Experience Section
  const addWorkExperience = () => {
    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        work: [
          ...resume.content.work,
          {
            id: uuidv4(),
            company: "",
            position: "",
            website: "",
            startDate: "",
            endDate: "",
            summary: "",
            highlights: [],
          },
        ],
      },
    };
    handleUpdate(updatedResume);
  };

  const updateWorkExperience = (index: number, field: string, value: string) => {
    const updatedWork = [...resume.content.work];
    updatedWork[index] = {
      ...updatedWork[index],
      [field]: value,
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        work: updatedWork,
      },
    };
    handleUpdate(updatedResume);
  };

  const removeWorkExperience = (index: number) => {
    const updatedWork = [...resume.content.work];
    updatedWork.splice(index, 1);

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        work: updatedWork,
      },
    };
    handleUpdate(updatedResume);
  };

  const addWorkHighlight = (workIndex: number) => {
    const updatedWork = [...resume.content.work];
    updatedWork[workIndex] = {
      ...updatedWork[workIndex],
      highlights: [...updatedWork[workIndex].highlights, ""],
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        work: updatedWork,
      },
    };
    handleUpdate(updatedResume);
  };

  const updateWorkHighlight = (workIndex: number, highlightIndex: number, value: string) => {
    const updatedWork = [...resume.content.work];
    const updatedHighlights = [...updatedWork[workIndex].highlights];
    updatedHighlights[highlightIndex] = value;
    
    updatedWork[workIndex] = {
      ...updatedWork[workIndex],
      highlights: updatedHighlights,
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        work: updatedWork,
      },
    };
    handleUpdate(updatedResume);
  };

  const removeWorkHighlight = (workIndex: number, highlightIndex: number) => {
    const updatedWork = [...resume.content.work];
    const updatedHighlights = [...updatedWork[workIndex].highlights];
    updatedHighlights.splice(highlightIndex, 1);
    
    updatedWork[workIndex] = {
      ...updatedWork[workIndex],
      highlights: updatedHighlights,
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        work: updatedWork,
      },
    };
    handleUpdate(updatedResume);
  };

  // Education Section
  const addEducation = () => {
    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        education: [
          ...resume.content.education,
          {
            id: uuidv4(),
            institution: "",
            area: "",
            studyType: "",
            startDate: "",
            endDate: "",
            gpa: "",
            courses: [],
          },
        ],
      },
    };
    handleUpdate(updatedResume);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...resume.content.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        education: updatedEducation,
      },
    };
    handleUpdate(updatedResume);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...resume.content.education];
    updatedEducation.splice(index, 1);

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        education: updatedEducation,
      },
    };
    handleUpdate(updatedResume);
  };

  const addCourse = (educationIndex: number) => {
    const updatedEducation = [...resume.content.education];
    updatedEducation[educationIndex] = {
      ...updatedEducation[educationIndex],
      courses: [...updatedEducation[educationIndex].courses, ""],
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        education: updatedEducation,
      },
    };
    handleUpdate(updatedResume);
  };

  const updateCourse = (educationIndex: number, courseIndex: number, value: string) => {
    const updatedEducation = [...resume.content.education];
    const updatedCourses = [...updatedEducation[educationIndex].courses];
    updatedCourses[courseIndex] = value;
    
    updatedEducation[educationIndex] = {
      ...updatedEducation[educationIndex],
      courses: updatedCourses,
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        education: updatedEducation,
      },
    };
    handleUpdate(updatedResume);
  };

  const removeCourse = (educationIndex: number, courseIndex: number) => {
    const updatedEducation = [...resume.content.education];
    const updatedCourses = [...updatedEducation[educationIndex].courses];
    updatedCourses.splice(courseIndex, 1);
    
    updatedEducation[educationIndex] = {
      ...updatedEducation[educationIndex],
      courses: updatedCourses,
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        education: updatedEducation,
      },
    };
    handleUpdate(updatedResume);
  };

  // Skills Section
  const addSkill = () => {
    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        skills: [
          ...resume.content.skills,
          {
            id: uuidv4(),
            name: "",
            level: "",
            keywords: [],
          },
        ],
      },
    };
    handleUpdate(updatedResume);
  };

  const updateSkill = (index: number, field: string, value: string) => {
    const updatedSkills = [...resume.content.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value,
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        skills: updatedSkills,
      },
    };
    handleUpdate(updatedResume);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...resume.content.skills];
    updatedSkills.splice(index, 1);

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        skills: updatedSkills,
      },
    };
    handleUpdate(updatedResume);
  };

  const addSkillKeyword = (skillIndex: number) => {
    const updatedSkills = [...resume.content.skills];
    updatedSkills[skillIndex] = {
      ...updatedSkills[skillIndex],
      keywords: [...updatedSkills[skillIndex].keywords, ""],
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        skills: updatedSkills,
      },
    };
    handleUpdate(updatedResume);
  };

  const updateSkillKeyword = (skillIndex: number, keywordIndex: number, value: string) => {
    const updatedSkills = [...resume.content.skills];
    const updatedKeywords = [...updatedSkills[skillIndex].keywords];
    updatedKeywords[keywordIndex] = value;
    
    updatedSkills[skillIndex] = {
      ...updatedSkills[skillIndex],
      keywords: updatedKeywords,
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        skills: updatedSkills,
      },
    };
    handleUpdate(updatedResume);
  };

  const removeSkillKeyword = (skillIndex: number, keywordIndex: number) => {
    const updatedSkills = [...resume.content.skills];
    const updatedKeywords = [...updatedSkills[skillIndex].keywords];
    updatedKeywords.splice(keywordIndex, 1);
    
    updatedSkills[skillIndex] = {
      ...updatedSkills[skillIndex],
      keywords: updatedKeywords,
    };

    const updatedResume = {
      ...resume,
      content: {
        ...resume.content,
        skills: updatedSkills,
      },
    };
    handleUpdate(updatedResume);
  };

  return (
    <div className="p-6">
      <Accordion type="multiple" value={expandedSections} onValueChange={setExpandedSections} className="space-y-4">
        {/* Basic Information */}
        <AccordionItem value="basics" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
            Personal Information
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  value={resume.content.basics.name} 
                  onChange={(e) => updateBasics("name", e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="label">Job Title</Label>
                <Input 
                  id="label"
                  value={resume.content.basics.label} 
                  onChange={(e) => updateBasics("label", e.target.value)}
                  placeholder="Software Developer"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={resume.content.basics.email} 
                    onChange={(e) => updateBasics("email", e.target.value)}
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone"
                    value={resume.content.basics.phone} 
                    onChange={(e) => updateBasics("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website"
                    value={resume.content.basics.website} 
                    onChange={(e) => updateBasics("website", e.target.value)}
                    placeholder="https://johndoe.com"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    value={resume.content.basics.location} 
                    onChange={(e) => updateBasics("location", e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea 
                  id="summary"
                  value={resume.content.basics.summary} 
                  onChange={(e) => updateBasics("summary", e.target.value)}
                  placeholder="A brief summary of your professional background and career goals"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Social Profiles</Label>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={addProfile}
                    className="h-8"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Profile
                  </Button>
                </div>

                {resume.content.basics.profiles.length === 0 && (
                  <div className="text-sm text-muted-foreground italic">
                    No social profiles added yet. Click "Add Profile" to add one.
                  </div>
                )}

                {resume.content.basics.profiles.map((profile, profileIndex) => (
                  <Card key={profileIndex} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">
                          {profile.network || "New Profile"}
                        </CardTitle>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove this social profile from your resume.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => removeProfile(profileIndex)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      <div className="grid gap-2">
                        <Label htmlFor={`profile-network-${profileIndex}`}>Network</Label>
                        <Input 
                          id={`profile-network-${profileIndex}`}
                          value={profile.network} 
                          onChange={(e) => updateProfile(profileIndex, "network", e.target.value)}
                          placeholder="LinkedIn, GitHub, Twitter, etc."
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`profile-username-${profileIndex}`}>Username</Label>
                        <Input 
                          id={`profile-username-${profileIndex}`}
                          value={profile.username} 
                          onChange={(e) => updateProfile(profileIndex, "username", e.target.value)}
                          placeholder="johndoe"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`profile-url-${profileIndex}`}>URL</Label>
                        <Input 
                          id={`profile-url-${profileIndex}`}
                          value={profile.url} 
                          onChange={(e) => updateProfile(profileIndex, "url", e.target.value)}
                          placeholder="https://linkedin.com/in/johndoe"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Work Experience */}
        <AccordionItem value="work" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
            Work Experience
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={addWorkExperience}
                  className="h-8"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Experience
                </Button>
              </div>

              {resume.content.work.length === 0 && (
                <div className="text-sm text-muted-foreground italic">
                  No work experience added yet. Click "Add Experience" to add a position.
                </div>
              )}

              {resume.content.work.map((work, workIndex) => (
                <Card key={work.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">
                        {work.position ? `${work.position}${work.company ? ` at ${work.company}` : ''}` : "New Position"}
                      </CardTitle>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove this work experience from your resume.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => removeWorkExperience(workIndex)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Company</Label>
                        <Input 
                          value={work.company} 
                          onChange={(e) => updateWorkExperience(workIndex, "company", e.target.value)}
                          placeholder="Company name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Position</Label>
                        <Input 
                          value={work.position} 
                          onChange={(e) => updateWorkExperience(workIndex, "position", e.target.value)}
                          placeholder="Job title"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Start Date</Label>
                        <Input 
                          value={work.startDate} 
                          onChange={(e) => updateWorkExperience(workIndex, "startDate", e.target.value)}
                          placeholder="YYYY-MM (e.g., 2020-01)"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>End Date</Label>
                        <Input 
                          value={work.endDate} 
                          onChange={(e) => updateWorkExperience(workIndex, "endDate", e.target.value)}
                          placeholder="YYYY-MM or Present"
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Website</Label>
                      <Input 
                        value={work.website} 
                        onChange={(e) => updateWorkExperience(workIndex, "website", e.target.value)}
                        placeholder="https://company.com"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Summary</Label>
                      <Textarea 
                        value={work.summary} 
                        onChange={(e) => updateWorkExperience(workIndex, "summary", e.target.value)}
                        placeholder="Brief description of your role and responsibilities"
                        className="min-h-[80px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Highlights</Label>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7"
                          onClick={() => addWorkHighlight(workIndex)}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add
                        </Button>
                      </div>
                      
                      {work.highlights.length === 0 && (
                        <div className="text-sm text-muted-foreground italic">
                          No highlights added yet.
                        </div>
                      )}
                      
                      {work.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center gap-2">
                          <Input 
                            value={highlight} 
                            onChange={(e) => updateWorkHighlight(workIndex, highlightIndex, e.target.value)}
                            placeholder="Key achievement or responsibility"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeWorkHighlight(workIndex, highlightIndex)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Education */}
        <AccordionItem value="education" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
            Education
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={addEducation}
                  className="h-8"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </Button>
              </div>

              {resume.content.education.length === 0 && (
                <div className="text-sm text-muted-foreground italic">
                  No education added yet. Click "Add Education" to add your educational background.
                </div>
              )}

              {resume.content.education.map((education, educationIndex) => (
                <Card key={education.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">
                        {education.institution || "New Education"}
                      </CardTitle>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove this education entry from your resume.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => removeEducation(educationIndex)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="grid gap-2">
                      <Label>Institution</Label>
                      <Input 
                        value={education.institution} 
                        onChange={(e) => updateEducation(educationIndex, "institution", e.target.value)}
                        placeholder="University name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Degree</Label>
                        <Input 
                          value={education.studyType} 
                          onChange={(e) => updateEducation(educationIndex, "studyType", e.target.value)}
                          placeholder="Bachelor of Science, Master's, etc."
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Field of Study</Label>
                        <Input 
                          value={education.area} 
                          onChange={(e) => updateEducation(educationIndex, "area", e.target.value)}
                          placeholder="Computer Science, Business, etc."
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label>Start Date</Label>
                        <Input 
                          value={education.startDate} 
                          onChange={(e) => updateEducation(educationIndex, "startDate", e.target.value)}
                          placeholder="YYYY-MM"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>End Date</Label>
                        <Input 
                          value={education.endDate} 
                          onChange={(e) => updateEducation(educationIndex, "endDate", e.target.value)}
                          placeholder="YYYY-MM or Present"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>GPA</Label>
                        <Input 
                          value={education.gpa} 
                          onChange={(e) => updateEducation(educationIndex, "gpa", e.target.value)}
                          placeholder="3.8"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Courses</Label>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7"
                          onClick={() => addCourse(educationIndex)}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add
                        </Button>
                      </div>
                      
                      {education.courses.length === 0 && (
                        <div className="text-sm text-muted-foreground italic">
                          No courses added yet.
                        </div>
                      )}
                      
                      {education.courses.map((course, courseIndex) => (
                        <div key={courseIndex} className="flex items-center gap-2">
                          <Input 
                            value={course} 
                            onChange={(e) => updateCourse(educationIndex, courseIndex, e.target.value)}
                            placeholder="Course name"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeCourse(educationIndex, courseIndex)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Skills */}
        <AccordionItem value="skills" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
            Skills
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={addSkill}
                  className="h-8"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Skill Category
                </Button>
              </div>

              {resume.content.skills.length === 0 && (
                <div className="text-sm text-muted-foreground italic">
                  No skills added yet. Click "Add Skill Category" to add your skills.
                </div>
              )}

              {resume.content.skills.map((skill, skillIndex) => (
                <Card key={skill.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">
                        {skill.name || "New Skill Category"}
                      </CardTitle>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove this skill category from your resume.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => removeSkill(skillIndex)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Skill Category</Label>
                        <Input 
                          value={skill.name} 
                          onChange={(e) => updateSkill(skillIndex, "name", e.target.value)}
                          placeholder="e.g., Programming Languages, Design, Marketing"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Proficiency Level</Label>
                        <Input 
                          value={skill.level} 
                          onChange={(e) => updateSkill(skillIndex, "level", e.target.value)}
                          placeholder="Beginner, Intermediate, Advanced, Expert"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Keywords</Label>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7"
                          onClick={() => addSkillKeyword(skillIndex)}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add
                        </Button>
                      </div>
                      
                      {skill.keywords.length === 0 && (
                        <div className="text-sm text-muted-foreground italic">
                          No keywords added yet.
                        </div>
                      )}
                      
                      {skill.keywords.map((keyword, keywordIndex) => (
                        <div key={keywordIndex} className="flex items-center gap-2">
                          <Input 
                            value={keyword} 
                            onChange={(e) => updateSkillKeyword(skillIndex, keywordIndex, e.target.value)}
                            placeholder="e.g., JavaScript, Photoshop, SEO"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeSkillKeyword(skillIndex, keywordIndex)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}