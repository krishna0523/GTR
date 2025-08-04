import { Linkedin, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'About', href: '/#about', isRoute: true },
    { name: 'Sectors', href: '/#sectors', isRoute: true },
    { name: 'Careers', href: '/careers', isRoute: true },
    { name: 'Blog', href: '/#blog', isRoute: true },
    { name: 'Contact', href: '/contact', isRoute: true }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const contactInfo = [
    { icon: MapPin, text: 'PO Box: 133, PC: 1124, Muscat, Sultanate of Oman' },
    { icon: Phone, text: '+968 9863 2229' },
    { icon: Mail, text: 'soma@gtrinfra.com' }
  ];

  return (
    <footer className="relative py-16 px-6 mt-24">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      <div className="relative z-10 container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/logo white.png" 
                alt="GTR LLC" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-white/80 text-lg mb-6 leading-relaxed max-w-md">
              Building Reliable Infrastructure for Tomorrow
            </p>
            <p className="text-white/70 leading-relaxed">
              Grand Technical Resources LLC is committed to delivering world-class infrastructure solutions 
              across telecommunications, civil works, and pipeline projects throughout the Sultanate of Oman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link 
                      to={link.href}
                      className="text-white/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      href={link.href}
                      className="text-white/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6">Contact Info</h4>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-start gap-3 text-white/70">
                    <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-white/60 text-center md:text-left">
              © 2025 Grand Technical Resources LLC. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 hover:bg-primary/20 border border-white/20 hover:border-primary/50 rounded-full flex items-center justify-center text-white/70 hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Additional Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">
            Empowering Oman's digital transformation through innovative infrastructure solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;