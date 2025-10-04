import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Globe, X } from "lucide-react";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  return (
    <nav className="z-50 fixed top-0 left-0 w-full bg-transparent text-white py-4 px-6 sm:px-8 flex flex-col items-center justify-between shadow-lg transition-all duration-300 backdrop-blur-md">
      {/* Top Row: EN, Logo, Log In, Sign Up */}
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center space-x-6">
          <Button variant="ghost" size="sm" className="text-xs hover:text-gray-300 transition-all duration-300">
            <Globe className="h-5 w-5 mr-2" />
            EN
          </Button>
        </div>

        {/* Logo in the Middle */}
        <a href="/" className="flex justify-center items-center text-center flex-grow">
          <img src="/Logo.png" alt="Evergreen Logo" className="w-40 h-auto" />
        </a>

        {/* Log In and Sign Up on the Right */}
        <div className="flex items-center space-x-6">
          <Button variant="ghost" size="sm" className="text-xs hover:text-gray-300 transition-all duration-300">
            <a href="/sign-in" className="hover:text-black">
              Log In
            </a>
          </Button>
          <Button size="sm" className="bg-white text-black hover:bg-gray-200 text-xs transition-all duration-300">
            <a href="/sign-up">Sign Up</a>
          </Button>
        </div>
      </div>

      {/* Second Row: Navbar Items (Home, Book Hotel, Destinations) */}
      <div className="flex justify-center space-x-8 mb-2 w-full text-base font-medium">
        <a
          href="/"
          className="text-white hover:text-gray-200 transition-all duration-300 relative before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-white before:scale-x-0 before:origin-bottom-left hover:before:scale-x-100 before:transition-all before:duration-300"
        >
          Home
        </a>
        <a
          href="/book-hotel"
          className="text-white hover:text-gray-200 transition-all duration-300 relative before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-white before:scale-x-0 before:origin-bottom-left hover:before:scale-x-100 before:transition-all before:duration-300"
        >
          Book Hotel
        </a>
        <a
          href="/destinations"
          className="text-white hover:text-gray-200 transition-all duration-300 relative before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] before:bg-white before:scale-x-0 before:origin-bottom-left hover:before:scale-x-100 before:transition-all before:duration-300"
        >
          Destinations
        </a>
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
            ref={menuRef}
            className="absolute right-0 mt-2 w-56 rounded-xl bg-black border border-gray-800 shadow-xl py-3 px-4 transition-all duration-300 transform animate-in fade-in slide-in-from-top-5"
            style={{ top: "calc(100% + 8px)" }}
          >
            <div className="flex flex-col space-y-4 py-2">
              <a href="/" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
              <a href="/book-hotel" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Book Hotel
              </a>
              <a href="/destinations" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Destinations
              </a>
              <a href="/policy" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Policy
              </a>
              <a href="/company" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Company
              </a>
              <div className="h-px bg-white/30 my-2"></div>
              <Button variant="ghost" size="sm" className="justify-start h-8 px-3 text-sm font-medium">
                <Globe className="h-4 w-4 mr-2" />
                EN
              </Button>
              <a href="/sign-in" className="text-sm font-medium hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Log In
              </a>
              <Button size="sm" className="bg-white text-black hover:bg-gray-200 w-full mt-3" asChild onClick={() => setIsMenuOpen(false)}>
                <a href="/sign-up">Sign Up</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
