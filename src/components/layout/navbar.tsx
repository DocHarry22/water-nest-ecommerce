"use client";

import Link from "next/link";
import { ShoppingCart, User, Search, Menu, LogOut, Settings, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navConfig, siteConfig } from "@/config/site";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";

export function Navbar() {
  const { data: session, status } = useSession();
  const { itemCount } = useCart();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Profile Menu */}
            <div className="relative" ref={menuRef}>
              {status === "authenticated" ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    aria-label="Account"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{session?.user?.name || "User"}</p>
                        <p className="text-xs text-gray-600 truncate">{session?.user?.email}</p>
                      </div>
                      
                      {session?.user?.role === "ADMIN" && (
                        <Link 
                          href="/admin" 
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors font-medium"
                        >
                          <Settings className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      
                      {session?.user?.role === "STAFF" && (
                        <Link 
                          href="/staff/dashboard" 
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors font-medium"
                        >
                          <Package className="h-4 w-4" />
                          Staff Dashboard
                        </Link>
                      )}
                      
                      {session?.user?.role === "CUSTOMER" && (
                        <Link 
                          href="/dashboard" 
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User className="h-4 w-4" />
                          My Dashboard
                        </Link>
                      )}
                      
                      <Link 
                        href="/dashboard?tab=orders" 
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Package className="h-4 w-4" />
                        My Orders
                      </Link>
                      
                      <Link 
                        href="/dashboard?tab=settings" 
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                      
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button 
                          onClick={handleSignOut}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/auth/login">
                  <Button variant="ghost" size="icon" aria-label="Sign In">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" aria-label="Shopping Cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {item.title}
                </Link>
              ))}
              
              {/* Mobile Auth Links */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {status === "authenticated" ? (
                  <>
                    <div className="px-4 py-2 mb-2">
                      <p className="text-sm font-medium text-gray-900">{session?.user?.name || "User"}</p>
                      <p className="text-xs text-gray-600">{session?.user?.email}</p>
                    </div>
                    
                    {session?.user?.role === "ADMIN" && (
                      <Link 
                        href="/admin" 
                        onClick={() => setShowMobileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                        Admin Dashboard
                      </Link>
                    )}
                    
                    {session?.user?.role === "STAFF" && (
                      <Link 
                        href="/staff/dashboard" 
                        onClick={() => setShowMobileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Package className="h-5 w-5" />
                        Staff Dashboard
                      </Link>
                    )}
                    
                    {session?.user?.role === "CUSTOMER" && (
                      <Link 
                        href="/dashboard" 
                        onClick={() => setShowMobileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <User className="h-5 w-5" />
                        My Dashboard
                      </Link>
                    )}
                    
                    <Link 
                      href="/dashboard?tab=orders" 
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Package className="h-5 w-5" />
                      My Orders
                    </Link>
                    
                    <Link 
                      href="/dashboard?tab=settings" 
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Settings className="h-5 w-5" />
                      Settings
                    </Link>
                    
                    <button 
                      onClick={() => {
                        setShowMobileMenu(false);
                        handleSignOut();
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full mt-2"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/auth/login" 
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <User className="h-5 w-5" />
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
