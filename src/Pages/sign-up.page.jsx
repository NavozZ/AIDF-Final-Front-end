import { SignUp } from "@clerk/clerk-react";
import { Globe } from "lucide-react";

const SignUpPage = () => {
  return (
    <main className="min-h-screen flex">
      {/* Left: Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 flex-col justify-between p-12">
        <div className="flex items-center space-x-2">
          <img src="/Logo.png" alt="Logo" className="w-36 h-auto" />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Join thousands of<br />happy travellers.
          </h2>
          <p className="text-gray-400 text-lg">
            Create your free account to start booking hotels, track your stays, and get personalised recommendations.
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Globe className="w-4 h-4" />
          <span>Trusted by travellers worldwide</span>
        </div>
      </div>

      {/* Right: Clerk widget */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-background">
        <SignUp
          appearance={{
            elements: {
              card: "shadow-none border border-border bg-card",
              headerTitle: "text-card-foreground",
              headerSubtitle: "text-muted-foreground",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
              footerActionLink: "text-blue-500 hover:text-blue-400",
            },
          }}
        />
      </div>
    </main>
  );
};

export default SignUpPage;
