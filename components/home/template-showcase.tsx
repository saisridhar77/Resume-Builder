import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TemplateShowcase() {
  const templates = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and simple design that focuses on content",
      imageUrl: "https://images.pexels.com/photos/97076/pexels-photo-97076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional layout perfect for corporate positions",
      imageUrl: "https://images.pexels.com/photos/97076/pexels-photo-97076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: "creative",
      name: "Creative",
      description: "Modern design ideal for creative industries",
      imageUrl: "https://images.pexels.com/photos/97076/pexels-photo-97076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Professional Resume Templates</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates
            to make your resume stand out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={template.imageUrl}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                  <Button asChild size="sm" className="mb-4">
                    <Link href={`/builder/new?template=${template.id}`}>
                      Use this template
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link href="/templates">View all templates</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}