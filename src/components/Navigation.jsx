import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import { Globe, Menu, X, Code, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoaded, sessionClaims } = useAuth();

  // Admin check
  let isAdmin = false;
  if (isLoaded && sessionClaims) {
    isAdmin = sessionClaims.metadata?.role === "admin";
  }

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 sm:px-8 flex items-center justify-between shadow-lg backdrop-blur-md">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/Logo.png" alt="Evergreen Logo" className="w-40 h-auto" />
      </Link>

      {/* Desktop Menu */}
      <div className="flex items-center space-x-6">
        <Button variant="ghost" size="sm" className="text-xs hover:text-gray-300">
          <Globe className="h-5 w-5 mr-2" />
          EN
        </Button>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/hotels" className="hover:text-gray-200">Hotels</Link>

          {isAdmin && (
            <Link to="/admin" className="text-red-400 hover:text-red-300 font-bold flex items-center space-x-1">
              <Code className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-6">
          <SignedOut>
            <Button variant="ghost" size="sm">
              <Link to="/sign-in">Log In</Link>
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-200">
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Button size="sm" variant="ghost">
              <Link to="/account" className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>Account</span>
              </Link>
            </Button>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-xl bg-gray-900 border border-gray-800 shadow-xl py-3 px-4">
            <div className="flex flex-col space-y-4 py-2">
              <Link to="/" onClick={closeMenu} className="text-sm hover:text-gray-300">Home</Link>
              <Link to="/hotels" onClick={closeMenu} className="text-sm hover:text-gray-300">Hotels</Link>

              {isAdmin && (
                <Link to="/admin" onClick={closeMenu} className="text-sm text-red-400 hover:text-red-300 flex items-center space-x-2">
                  <Code className="h-4 w-4" />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              <Button variant="ghost" size="sm" className="justify-start">
                <Globe className="h-4 w-4 mr-2" />
                EN
              </Button>

              <SignedOut>
                <Link to="/sign-in" onClick={closeMenu} className="text-sm hover:text-gray-300">
                  Log In
                </Link>
                <Button size="sm" className="bg-white text-black hover:bg-gray-200 w-full mt-3" asChild>
                  <Link to="/sign-up" onClick={closeMenu}>Sign Up</Link>
                </Button>
              </SignedOut>

              <SignedIn>
                <Link to="/account" onClick={closeMenu} className="text-sm hover:text-gray-300">
                  My Account
                </Link>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
