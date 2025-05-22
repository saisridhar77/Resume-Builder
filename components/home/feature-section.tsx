import { 
  ClipboardList, 
  FileDown, 
  Layers, 
  Palette, 
  ShieldCheck, 
  Sparkles
} from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: "Multiple Templates",
      description: "Choose from a variety of professionally designed resume templates to match your personal style and industry."
    },
    {
      icon: <ClipboardList className="h-10 w-10 text-primary" />,
      title: "Easy to Use",
      description: "Our intuitive interface makes it simple to create, edit, and update your resume with just a few clicks."
    },
    {
      icon: <FileDown className="h-10 w-10 text-primary" />,
      title: "PDF Export",
      description: "Download your finished resume as a high-quality PDF file ready to share with potential employers."
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Live Preview",
      description: "See changes to your resume in real-time as you edit to ensure everything looks perfect."
    },
    {
      icon: <Palette className="h-10 w-10 text-primary" />,
      title: "Customizable",
      description: "Personalize fonts, colors, and layouts to make your resume stand out from the competition."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Secure",
      description: "Your data is securely stored and never shared with third parties without your permission."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Resume Builder?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform offers everything you need to create professional, eye-catching resumes
            that help you stand out in today's competitive job market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card border rounded-lg p-6 transition-all hover:shadow-md"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}