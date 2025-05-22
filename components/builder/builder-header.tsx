"use client";

import { generatePDF } from "@/lib/pdf";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ResumeData, TemplateType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { FileText, Download, ArrowLeft, MoreVertical, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BuilderHeader({ 
  resume, 
  onSave 
}: { 
  resume: ResumeData; 
  onSave: (resume: ResumeData) => void;
}) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [title, setTitle] = useState(resume.title);
  const [template, setTemplate] = useState<TemplateType>(resume.template);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  
  const handleTitleBlur = () => {
    if (title !== resume.title) {
      const updatedResume = { ...resume, title };
      onSave(updatedResume);
    }
  };
  
  const handleTemplateChange = (value: TemplateType) => {
    setTemplate(value);
    const updatedResume = { ...resume, template: value };
    onSave(updatedResume);
  };
  
  const handleExportPDF = async () => {
    toast({
      title: "PDF Export",
      description: "Your resume is being prepared for download.",
    });
    
    try {
      await generatePDF();
      toast({
        title: "PDF Ready",
        description: "Your resume has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteResume = () => {
    // In a real app, we would delete this from a database
    // For now, we'll simulate by deleting from localStorage
    const savedResumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    const updatedResumes = savedResumes.filter((r: ResumeData) => r.id !== resume.id);
    localStorage.setItem("resumes", JSON.stringify(updatedResumes));
    
    toast({
      title: "Resume deleted",
      description: "Your resume has been deleted.",
    });
    
    router.push("/dashboard");
  };

  return (
    <header className="border-b bg-background z-10">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <Input
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              className="h-9 w-[200px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={template} onValueChange={handleTemplateChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleExportPDF} className="gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          
          <ModeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                Back to Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Resume
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteResume}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}