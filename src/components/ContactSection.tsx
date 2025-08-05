import { useState, useEffect } from 'react';
import { Send, CheckCircle, MapPin, Phone, Mail, Clock, Building2, Users } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Send form data to Formspree (replace YOUR_FORM_ID with actual formspree form ID)
      const response = await fetch('https://formspree.io/f/office@gtrinfra.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message,
          _subject: `New Project Inquiry from ${formData.fullName}`,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setIsLoading(false);
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ 
            fullName: '', 
            email: '', 
            phone: '', 
            company: '', 
            projectType: '', 
            budget: '', 
            message: '' 
          });
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setIsLoading(false);
      // You could add error state handling here
      alert('There was an error submitting the form. Please try again or contact us directly.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      details: ['PO Box: 133, PC: 1124', 'Muscat, Sultanate of Oman'],
      color: 'text-blue-400'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+968 9863 2229', 'Available 24/7'],
      color: 'text-green-400'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['office@gtrinfra.com'],
      color: 'text-purple-400'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Sunday - Thursday', '8:00 AM - 6:00 PM', 'Friday: 8:00 AM - 12:00 PM'],
      color: 'text-orange-400'
    }
  ];

  const projectTypes = [
    'Fiber Optic Installation',
    'Civil Engineering',
    'Pipeline Construction',
    'Telecommunications Infrastructure',
    'Network Expansion',
    'Maintenance Services',
    'Other'
  ];

  const budgetRanges = [
    'Under OMR 10,000',
    'OMR 10,000 - 50,000',
    'OMR 50,000 - 100,000',
    'OMR 100,000 - 500,000',
    'Over OMR 500,000',
    'To be discussed'
  ];

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card text-center animate-scale-in">
            <CheckCircle className="w-24 h-24 text-primary mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-4">Message Sent Successfully!</h3>
            <p className="text-xl text-white/80 mb-6">
              Thank you for reaching out to GTR LLC. Our team will review your project details and get back to you within 24 hours.
            </p>
            <div className="glass-button inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent">
              <CheckCircle className="w-5 h-5" />
              We'll be in touch soon
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let's Build Your <span className="text-primary">Vision</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your infrastructure project into reality? 
            Connect with our expert team and let's create something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>
            
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="glass-card hover:glass-card-hover transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-white/10 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                      {item.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-white/70 text-sm leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quick Stats */}
            <div className="glass-card">
              <h4 className="text-xl font-semibold text-white mb-4">Why Choose GTR LLC?</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="text-white/80">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-white/80">500+ Projects Completed</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-white/80">99% Client Satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card">
              <h2 className="text-4xl font-bold text-white mb-8">Submit Your Project Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="border-b border-white/20 pb-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-white/80 text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="glass-input w-full"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="glass-input w-full"
                      placeholder="Enter your email"
                    />
                  </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="phone" className="block text-white/80 text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="glass-input w-full"
                        placeholder="+968 9863 2229"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-white/80 text-sm font-medium mb-2">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="glass-input w-full"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Information */}
                <div className="border-b border-white/20 pb-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Project Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block text-white/80 text-sm font-medium mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="glass-input w-full"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-gray-800 text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                    <div>
                      <label htmlFor="budget" className="block text-white/80 text-sm font-medium mb-2">
                        Estimated Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="glass-input w-full"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range} className="bg-gray-800 text-white">
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="glass-input w-full resize-none"
                    placeholder="Please describe your project requirements, timeline, location, and any specific needs..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col items-center gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="glass-button text-lg bg-gradient-to-r from-primary to-accent hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3 min-w-[250px] justify-center py-4"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting Project Details...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Project Details
                      </>
                    )}
                  </button>
                  
                  <p className="text-white/60 text-sm text-center max-w-md">
                    By submitting this form, you agree to our privacy policy. 
                    We'll review your project details and respond within 24 hours.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Additional CTA Section */}
        <div className="mt-20 text-center">
          <div className="glass-strong rounded-2xl p-6 shadow-2xl">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Infrastructure?
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of satisfied clients who have trusted GTR LLC with their critical infrastructure projects. 
              From concept to completion, we deliver excellence at every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="tel:+96898632229"
                className="glass-button text-lg bg-gradient-to-r from-primary to-accent hover:scale-105 inline-flex items-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Call Now for Immediate Support
              </a>
              <a 
                href="mailto:office@gtrinfra.com"
                className="glass-button text-lg border-2 border-primary hover:bg-primary/20 inline-flex items-center gap-3"
              >
                <Mail className="w-5 h-5" />
                Email Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;