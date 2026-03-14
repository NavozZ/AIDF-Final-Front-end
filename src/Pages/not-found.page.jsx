import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Hotel } from "lucide-react";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Big 404 */}
      <div className="relative mb-6">
        <p className="text-[10rem] font-extrabold leading-none text-primary opacity-10 select-none">
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <Hotel className="w-20 h-20 text-primary opacity-60" />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-3">Page not found</h1>
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild>
          <Link to="/">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/hotels">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Browse Hotels
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
