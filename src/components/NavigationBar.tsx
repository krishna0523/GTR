import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSectors, setShowSectors] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'About Us', href: '/about', isRoute: true },
    { 
      name: 'Sectors', 
      href: '/#sectors',
      isRoute: true,
      dropdown: [
        { name: 'Telecom Services', href: '/telecom' },
        { name: 'Civil Works', href: '/civil-works' },
        { name: 'Oil & Gas', href: '/oil-gas' },
        { name: 'Water Pipeline Projects', href: '/water-pipeline' }
      ]
    },
    { name: 'Careers', href: '/careers', isRoute: true },
    { name: 'Contact Us', href: '/contact', isRoute: true }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo white.png" 
                alt="GTR LLC" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className="text-white hover:text-primary transition-colors duration-300 flex items-center gap-1 font-medium"
                    onMouseEnter={() => item.dropdown && setShowSectors(true)}
                    onMouseLeave={() => item.dropdown && setShowSectors(false)}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="text-white hover:text-primary transition-colors duration-300 flex items-center gap-1 font-medium"
                    onMouseEnter={() => item.dropdown && setShowSectors(true)}
                    onMouseLeave={() => item.dropdown && setShowSectors(false)}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </a>
                )}
                
                {/* Dropdown */}
                {item.dropdown && (
                  <div 
                    className={`absolute top-full left-0 mt-3 w-72 bg-black/75 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 transition-all duration-300 ${
                      showSectors ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                    }`}
                    onMouseEnter={() => setShowSectors(true)}
                    onMouseLeave={() => setShowSectors(false)}
                  >
                    <div className="py-1">
                      {item.dropdown.map((subItem, index) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-5 py-2.5 text-white hover:bg-white/10 hover:text-primary transition-all duration-200 font-medium text-sm border-b border-white/10 last:border-b-0"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <>
            {/* Full-screen backdrop */}
            <div 
              className="md:hidden"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)', /* iOS Safari */
                zIndex: 9999
              }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu content */}
            <div 
              className="md:hidden absolute top-full left-0 right-0 rounded-b-xl shadow-xl border-t border-white/20"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 10000
              }}
            >
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.isRoute ? (
                  <Link
                    to={item.href}
                    className="block px-6 py-4 text-white hover:text-primary hover:bg-white/10 transition-colors duration-200 border-b border-white/10 last:border-b-0"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="block px-6 py-4 text-white hover:text-primary hover:bg-white/10 transition-colors duration-200 border-b border-white/10 last:border-b-0"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                )}
                {item.dropdown && (
                  <div className="bg-white/10 border-t border-white/10">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block px-8 py-3 text-white/90 hover:text-primary hover:bg-white/15 transition-colors duration-200 text-sm font-medium border-b border-white/5 last:border-b-0"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;