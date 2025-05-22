"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { createEmptyResume, createSampleResume } from "@/lib/resume-data";
import { TemplateType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus } from "lucide-react";

export default function NewResumePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template") as TemplateType | null;
  
  const [resumeTitle, setResumeTitle] = useState("Untitled Resume");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(templateParam || "minimal");
  const [activeTab, setActiveTab] = useState<"blank" | "sample">("blank");

  useEffect(() => {
    if (templateParam) {
      setSelectedTemplate(templateParam);
    }
  }, [templateParam]);

  const handleCreateResume = () => {
    const resume = activeTab === "blank" 
      ? createEmptyResume(resumeTitle, selectedTemplate)
      : createSampleResume(selectedTemplate);
    
    // In a real app, we would save this to a database
    // For now, we'll simulate by saving to localStorage
    const savedResumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    savedResumes.push(resume);
    localStorage.setItem("resumes", JSON.stringify(savedResumes));
    
    // Navigate to the editor
    router.push(`/builder/${resume.id}`);
  };

  const templates: { id: TemplateType; name: string; description: string }[] = [
    { 
      id: "minimal", 
      name: "Minimal", 
      description: "Clean and simple design that focuses on content" 
    },
    { 
      id: "professional", 
      name: "Professional", 
      description: "Traditional layout perfect for corporate positions" 
    },
    { 
      id: "creative", 
      name: "Creative", 
      description: "Modern design ideal for creative industries" 
    },
    { 
      id: "modern", 
      name: "Modern", 
      description: "Contemporary design with a unique layout" 
    },
    { 
      id: "executive", 
      name: "Executive", 
      description: "Sophisticated design for senior positions" 
    }
  ];

  return (
    <div className="container max-w-4xl py-10 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Create New Resume</h1>
        <p className="text-muted-foreground">
          Start from scratch or use a sample resume as a template
        </p>
      </div>
      
      <Tabs defaultValue="blank" value={activeTab} onValueChange={(v) => setActiveTab(v as "blank" | "sample")}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="blank">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Blank Resume</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="sample">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Sample Resume</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <Card>
          <CardHeader>
            <CardTitle>Resume Details</CardTitle>
            <CardDescription>
              {activeTab === "blank" 
                ? "Create a resume from scratch" 
                : "Start with a sample resume that you can customize"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeTab === "blank" && (
              <div className="space-y-2">
                <Label htmlFor="title">Resume Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter a title for your resume" 
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  This is for your reference only and won't appear on your resume
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label>Select Template</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-md p-4 cursor-pointer transition-all hover:border-primary ${
                      selectedTemplate === template.id ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-muted-foreground">{template.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCreateResume} className="w-full">
              Create Resume
            </Button>
          </CardFooter>
        </Card>
      </Tabs>
    </div>
  );
}