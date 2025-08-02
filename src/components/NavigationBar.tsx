import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

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
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { 
      name: 'Sectors', 
      href: '#sectors',
      dropdown: [
        'Telecom Services',
        'Civil Works',
        'Oil & Gas',
        'Water Pipeline Projects'
      ]
    },
    { name: 'Careers', href: '#careers' },
    { name: 'Blog / News', href: '#blog' },
    { name: 'Contact Us', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="text-2xl font-bold text-white">
              GTR<span className="text-primary">LLC</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  className="text-white hover:text-primary transition-colors duration-300 flex items-center gap-1 font-medium"
                  onMouseEnter={() => item.dropdown && setShowSectors(true)}
                  onMouseLeave={() => item.dropdown && setShowSectors(false)}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </a>
                
                {/* Dropdown */}
                {item.dropdown && (
                  <div 
                    className={`absolute top-full left-0 mt-2 w-64 glass-strong rounded-xl shadow-xl transition-all duration-300 ${
                      showSectors ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                    }`}
                    onMouseEnter={() => setShowSectors(true)}
                    onMouseLeave={() => setShowSectors(false)}
                  >
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem}
                        href={`#${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-6 py-3 text-white hover:text-primary hover:bg-white/10 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                      >
                        {subItem}
                      </a>
                    ))}
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-strong rounded-b-xl shadow-xl">
            {menuItems.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className="block px-6 py-4 text-white hover:text-primary hover:bg-white/10 transition-colors duration-200 border-b border-white/10 last:border-b-0"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
                {item.dropdown && (
                  <div className="pl-4 bg-white/5">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem}
                        href={`#${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-6 py-3 text-white/80 hover:text-primary hover:bg-white/10 transition-colors duration-200 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;