"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ResumeData } from "@/lib/types";
import ResumeEditor from "@/components/builder/resume-editor";
import ResumePreview from "@/components/builder/resume-preview";
import BuilderHeader from "@/components/builder/builder-header";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();
  
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch this from an API
    // For now, we'll simulate by loading from localStorage
    const savedResumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    const foundResume = savedResumes.find((r: ResumeData) => r.id === id);
    
    if (foundResume) {
      setResume(foundResume);
    } else {
      toast({
        title: "Resume not found",
        description: "The resume you're looking for doesn't exist.",
        variant: "destructive",
      });
      router.push("/dashboard");
    }
    
    setLoading(false);
  }, [id, router, toast]);

  const handleSaveResume = (updatedResume: ResumeData) => {
    // Update state
    setResume(updatedResume);
    
    // In a real app, we would save this to a database
    // For now, we'll simulate by saving to localStorage
    const savedResumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    const updatedResumes = savedResumes.map((r: ResumeData) => 
      r.id === updatedResume.id ? updatedResume : r
    );
    
    localStorage.setItem("resumes", JSON.stringify(updatedResumes));
    
    toast({
      title: "Resume saved",
      description: "Your changes have been saved successfully.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-16 border-b">
          <Skeleton className="h-16 w-full" />
        </div>
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-4rem)]">
          <ResizablePanel defaultSize={40}>
            <Skeleton className="h-full w-full" />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={60}>
            <Skeleton className="h-full w-full" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BuilderHeader resume={resume} onSave={handleSaveResume} />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="h-full overflow-y-auto">
            <ResumeEditor resume={resume} onUpdate={handleSaveResume} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="h-full overflow-y-auto p-4 bg-muted/50">
            <ResumePreview resume={resume} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}