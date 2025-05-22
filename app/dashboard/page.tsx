"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ResumeData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { FileText, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { toast } = useToast();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we would fetch this from an API
    const savedResumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    setResumes(savedResumes);
  }, []);

  const handleDelete = (id: string) => {
    const updatedResumes = resumes.filter(resume => resume.id !== id);
    localStorage.setItem("resumes", JSON.stringify(updatedResumes));
    setResumes(updatedResumes);
    setDeleteId(null);
    
    toast({
      title: "Resume deleted",
      description: "Your resume has been deleted successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-xl font-bold">My Resumes</h1>
          </div>
        </div>
      </header>

      <main className="container py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Manage your resumes and create new ones.
            </p>
          </div>
          <Button asChild>
            <Link href="/builder/new">
              <Plus className="h-4 w-4 mr-2" />
              Create Resume
            </Link>
          </Button>
        </div>

        {resumes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto w-fit mb-4">
                <FileText className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No resumes yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first resume to get started.
              </p>
              <Button asChild>
                <Link href="/builder/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Resume
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id}>
                <CardHeader>
                  <CardTitle>{resume.title}</CardTitle>
                  <CardDescription>
                    Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Template: {resume.template}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline">
                    <Link href={`/builder/${resume.id}`}>
                      Edit Resume
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-destructive"
                    onClick={() => setDeleteId(resume.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
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
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}