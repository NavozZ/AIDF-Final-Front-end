import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const count = useSelector((state) => state.counter);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 sm:px-8 flex items-center justify-between shadow-lg transition-all duration-300 backdrop-blur-md">
      {/* Left Side: Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/Logo.png" alt="Evergreen Logo" className="w-40 h-auto" />
      </Link>

      {/* Right Side: Links and Buttons */}
      <div className="flex items-center space-x-6">
        {/* EN Button */}
        <Button variant="ghost" size="sm" className="text-xs hover:text-gray-300 transition-all duration-300">
          <Globe className="h-5 w-5 mr-2" />
          EN
        </Button>

        {/* Links for Desktop */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          
          {/* <p>{count}</p> */}
        </div>

        {/* Log In and Sign Up Buttons */}
        <div className="flex items-center space-x-6">
          <SignedOut>
            <Button variant="ghost" size="sm" className="text-xs hover:text-gray-300 transition-all duration-300">
              <Link to="/sign-in" className="hover:text-black">Log In</Link>
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-200 text-xs transition-all duration-300">
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <UserButton />
            <Button size="sm" className="bg-white text-black hover:bg-gray-200 text-xs transition-all duration-300">
              <Link to="/account">My Account</Link>
            </Button>
          </SignedIn>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="relative md:hidden">
        <Button variant="ghost" size="icon" className="relative z-20 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
        </Button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div
            className="absolute right-0 mt-2 w-56 rounded-xl bg-gray-900 border border-gray-800 shadow-xl py-3 px-4 transition-all duration-300 transform animate-in fade-in slide-in-from-top-5"
            style={{ top: "calc(100% + 8px)" }}
          >
            <div className="flex flex-col space-y-4 py-2">
              <Link to="/" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/book-hotel" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Book Hotel
              </Link>
              <Link to="/destinations" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Destinations
              </Link>
              <Link to="/policy" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Policy
              </Link>
              <Link to="/company" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Company
              </Link>
              <div className="h-px bg-white/30 my-2"></div>

              {/* Language Button */}
              <Button variant="ghost" size="sm" className="justify-start h-8 px-3 text-sm font-medium">
                <Globe className="h-4 w-4 mr-2" />
                EN
              </Button>

              {/* Log In and Sign Up Buttons in Mobile Menu */}
              <SignedOut>
                <Link to="/sign-in" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Log In
                </Link>
                <Button size="sm" className="bg-white text-black hover:bg-gray-200 w-full mt-3" asChild onClick={() => setIsMenuOpen(false)}>
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </SignedOut>

              {/* Signed In Account Button */}
              <SignedIn>
                <Link to="/account" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
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
