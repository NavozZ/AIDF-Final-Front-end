import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import { Globe, Menu, X, Code, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoaded, sessionClaims } = useAuth();
  const location = useLocation();

  let isAdmin = false;
  if (isLoaded && sessionClaims) {
    isAdmin = sessionClaims.metadata?.role === "admin";
  }

  const closeMenu = () => setIsMenuOpen(false);

  const navLink = (to, label) => {
    const isActive = to === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(to);
    return (
      <Link
        to={to}
        className={`transition-colors ${
          isActive
            ? "text-white font-semibold border-b-2 border-primary pb-0.5"
            : "text-gray-300 hover:text-white"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 sm:px-8 flex items-center justify-between shadow-lg">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/Logo.png" alt="Evergreen Logo" className="w-40 h-auto" />
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center space-x-6">
        {navLink("/", "Home")}
        {navLink("/hotels", "Hotels")}
        {isAdmin && (
          <Link
            to="/admin"
            className={`font-bold flex items-center space-x-1 transition-colors ${
              location.pathname.startsWith("/admin")
                ? "text-red-300"
                : "text-red-400 hover:text-red-300"
            }`}
          >
            <Code className="h-4 w-4" />
            <span>Admin</span>
          </Link>
        )}
      </div>

      {/* Desktop auth */}
      <div className="hidden md:flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="text-xs text-gray-300 hover:text-white">
          <Globe className="h-4 w-4 mr-1" /> EN
        </Button>
        <SignedOut>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/sign-in" className="text-gray-300 hover:text-white">Log In</Link>
          </Button>
          <Button size="sm" className="bg-white text-black hover:bg-gray-200" asChild>
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button size="sm" variant="ghost" asChild>
            <Link
              to="/account"
              className={`flex items-center gap-1 ${
                location.pathname === "/account" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              <User className="h-4 w-4" />
              <span>Account</span>
            </Link>
          </Button>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-xl bg-gray-900 border border-gray-800 shadow-xl py-3 px-4 z-50">
            <div className="flex flex-col space-y-4 py-2">
              <Link to="/" onClick={closeMenu} className="text-sm text-gray-300 hover:text-white">Home</Link>
              <Link to="/hotels" onClick={closeMenu} className="text-sm text-gray-300 hover:text-white">Hotels</Link>
              {isAdmin && (
                <Link to="/admin" onClick={closeMenu} className="text-sm text-red-400 hover:text-red-300 flex items-center gap-2">
                  <Code className="h-4 w-4" /><span>Admin Dashboard</span>
                </Link>
              )}
              <SignedOut>
                <Link to="/sign-in" onClick={closeMenu} className="text-sm text-gray-300 hover:text-white">Log In</Link>
                <Button size="sm" className="bg-white text-black hover:bg-gray-200 w-full mt-1" asChild>
                  <Link to="/sign-up" onClick={closeMenu}>Sign Up</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Link to="/account" onClick={closeMenu} className="text-sm text-gray-300 hover:text-white">My Account</Link>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
