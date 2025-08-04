import { useState } from 'react';
import { Send, CheckCircle, Users, Award, Heart, Briefcase, GraduationCap, MapPin, Calendar, FileText, Upload, X } from 'lucide-react';

const CareersSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    education: '',
    currentLocation: '',
    availability: '',
    expectedSalary: '',
    coverLetter: '',
    resume: null as File | null,
    portfolio: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    // Reset form after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        education: '',
        currentLocation: '',
        availability: '',
        expectedSalary: '',
        coverLetter: '',
        resume: null,
        portfolio: ''
      });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      resume: null
    }));
  };

  const jobOpenings = [
    {
      title: 'Senior Fiber Optic Technician',
      department: 'Telecommunications',
      location: 'Muscat, Oman',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead fiber optic installation and maintenance projects across Oman\'s telecommunications infrastructure.',
      requirements: ['Bachelor\'s degree in Telecommunications/Electrical Engineering', '5+ years fiber optic experience', 'Knowledge of FTTH technologies', 'Fluent in English and Arabic']
    },
    {
      title: 'Civil Engineer - Infrastructure',
      department: 'Civil Works',
      location: 'Muscat, Oman',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Design and oversee civil engineering projects including roads, utilities, and infrastructure development.',
      requirements: ['Bachelor\'s degree in Civil Engineering', '3+ years infrastructure experience', 'AutoCAD and design software proficiency', 'Project management skills']
    },
    {
      title: 'Pipeline Installation Specialist',
      department: 'Oil & Gas',
      location: 'Sohar, Oman',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Specialize in pipeline installation, maintenance, and quality control for oil & gas projects.',
      requirements: ['Mechanical/Chemical Engineering degree', 'Pipeline welding certification', '4+ years O&G experience', 'Safety certification (NEBOSH preferred)']
    },
    {
      title: 'Project Manager - Telecommunications',
      department: 'Project Management',
      location: 'Muscat, Oman',
      type: 'Full-time',
      experience: '7+ years',
      description: 'Manage large-scale telecommunications infrastructure projects from planning to completion.',
      requirements: ['PMP certification preferred', '7+ years project management', 'Telecommunications background', 'Strong leadership skills']
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, annual health checkups, and wellness programs for you and your family.'
    },
    {
      icon: GraduationCap,
      title: 'Professional Development',
      description: 'Continuous learning opportunities, certifications, training programs, and career advancement paths.'
    },
    {
      icon: Award,
      title: 'Recognition & Rewards',
      description: 'Performance-based bonuses, employee recognition programs, and competitive salary packages.'
    },
    {
      icon: Users,
      title: 'Team Environment',
      description: 'Collaborative work culture, team building activities, and supportive leadership across all levels.'
    }
  ];

  const positions = [
    'Fiber Optic Technician',
    'Civil Engineer',
    'Pipeline Specialist',
    'Project Manager',
    'Network Engineer',
    'Quality Control Inspector',
    'Safety Coordinator',
    'Business Development',
    'Other'
  ];

  const experienceLevels = [
    'Fresh Graduate (0-1 years)',
    'Junior (1-3 years)',
    'Mid-level (3-5 years)',
    'Senior (5-8 years)',
    'Expert (8+ years)'
  ];

  const educationLevels = [
    'High School Diploma',
    'Technical Certificate',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD/Doctorate'
  ];

  if (isSubmitted) {
    return (
      <section id="careers" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card text-center animate-scale-in">
            <CheckCircle className="w-24 h-24 text-primary mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-4">Application Submitted Successfully!</h3>
            <p className="text-xl text-white/80 mb-6">
              Thank you for your interest in joining the GTR LLC team. Our HR department will review your application and get back to you within 5-7 business days.
            </p>
            <div className="glass-button inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent">
              <CheckCircle className="w-5 h-5" />
              We'll be in touch soon
            </div>
            <p className="text-white/60 mt-4 text-sm">
              Keep an eye on your email for updates on your application status.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="careers" className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            Join Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8 animate-slide-up">
            Are you interested in working with us? Fill out the form below and we'll get back to you soon.
          </p>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Build your career with Oman's leading infrastructure company. Join a team of passionate professionals 
            dedicated to transforming the nation's digital and physical infrastructure.
          </p>
        </div>

        {/* Why Work With Us Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why Choose <span className="text-primary">GTR LLC</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="glass-card text-center group hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 text-primary flex items-center justify-center">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Openings */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Current <span className="text-primary">Openings</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobOpenings.map((job, index) => (
              <div key={index} className="glass-card hover:glass-card-hover transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-primary font-medium">{job.department}</p>
                  </div>
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {job.experience}
                  </div>
                </div>
                
                <p className="text-white/80 mb-4 leading-relaxed">{job.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Key Requirements:</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    {job.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="glass-button text-sm bg-gradient-to-r from-primary to-accent hover:scale-105 w-full">
                  Apply for this Position
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Submit Your <span className="text-primary">Application</span>
            </h2>
            <p className="text-xl text-white/80">
              Ready to join our team? Fill out the comprehensive application form below.
            </p>
          </div>

          <div className="glass-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="border-b border-white/20 pb-6">
                <h3 className="text-2xl font-semibold text-white mb-6">Personal Information</h3>
                
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
                    <label htmlFor="currentLocation" className="block text-white/80 text-sm font-medium mb-2">
                      Current Location *
                    </label>
                    <input
                      type="text"
                      id="currentLocation"
                      name="currentLocation"
                      required
                      value={formData.currentLocation}
                      onChange={handleChange}
                      className="glass-input w-full"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="border-b border-white/20 pb-6">
                <h3 className="text-2xl font-semibold text-white mb-6">Professional Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="position" className="block text-white/80 text-sm font-medium mb-2">
                      Position of Interest *
                    </label>
                    <select
                      id="position"
                      name="position"
                      required
                      value={formData.position}
                      onChange={handleChange}
                      className="glass-input w-full"
                    >
                      <option value="">Select position</option>
                      {positions.map((pos) => (
                        <option key={pos} value={pos} className="bg-gray-800 text-white">
                          {pos}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-white/80 text-sm font-medium mb-2">
                      Experience Level *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="glass-input w-full"
                    >
                      <option value="">Select experience level</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level} className="bg-gray-800 text-white">
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label htmlFor="education" className="block text-white/80 text-sm font-medium mb-2">
                      Education Level *
                    </label>
                    <select
                      id="education"
                      name="education"
                      required
                      value={formData.education}
                      onChange={handleChange}
                      className="glass-input w-full"
                    >
                      <option value="">Select education level</option>
                      {educationLevels.map((level) => (
                        <option key={level} value={level} className="bg-gray-800 text-white">
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="availability" className="block text-white/80 text-sm font-medium mb-2">
                      Availability *
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      required
                      value={formData.availability}
                      onChange={handleChange}
                      className="glass-input w-full"
                    >
                      <option value="">Select availability</option>
                      <option value="immediate" className="bg-gray-800 text-white">Immediate</option>
                      <option value="2-weeks" className="bg-gray-800 text-white">2 weeks notice</option>
                      <option value="1-month" className="bg-gray-800 text-white">1 month notice</option>
                      <option value="2-months" className="bg-gray-800 text-white">2+ months</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="expectedSalary" className="block text-white/80 text-sm font-medium mb-2">
                    Expected Salary (Optional)
                  </label>
                  <input
                    type="text"
                    id="expectedSalary"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    className="glass-input w-full"
                    placeholder="e.g., OMR 1,500 per month"
                  />
                </div>
              </div>

              {/* Documents and Portfolio */}
              <div className="border-b border-white/20 pb-6">
                <h3 className="text-2xl font-semibold text-white mb-6">Documents & Portfolio</h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="resume" className="block text-white/80 text-sm font-medium mb-2">
                      Resume/CV * (PDF, DOC, DOCX - Max 5MB)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        required={!formData.resume}
                      />
                      <label
                        htmlFor="resume"
                        className="glass-input w-full cursor-pointer flex items-center justify-center gap-3 py-8 border-2 border-dashed border-white/30 hover:border-primary/50 transition-colors"
                      >
                        <Upload className="w-6 h-6 text-white/60" />
                        <span className="text-white/80">
                          {formData.resume ? formData.resume.name : 'Click to upload your resume'}
                        </span>
                      </label>
                      {formData.resume && (
                        <button
                          type="button"
                          onClick={removeFile}
                          className="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="portfolio" className="block text-white/80 text-sm font-medium mb-2">
                      Portfolio/LinkedIn URL (Optional)
                    </label>
                    <input
                      type="url"
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      className="glass-input w-full"
                      placeholder="https://linkedin.com/in/yourprofile or portfolio website"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label htmlFor="coverLetter" className="block text-white/80 text-sm font-medium mb-2">
                  Cover Letter *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className="glass-input w-full resize-none"
                  placeholder="Tell us why you want to work with GTR LLC, your relevant experience, and what makes you a great fit for this role..."
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
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>
                
                <p className="text-white/60 text-sm text-center max-w-md">
                  By submitting this application, you agree to our privacy policy. 
                  We'll review your application and respond within 5-7 business days.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-20 text-center">
          <div className="glass-card max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Questions About Working at GTR LLC?
            </h3>
            <p className="text-white/80 mb-6 text-lg leading-relaxed">
              We're here to help! If you have any questions about our open positions, 
              company culture, or application process, don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="mailto:careers@gtrinfra.com"
                className="glass-button text-lg bg-gradient-to-r from-primary to-accent hover:scale-105 inline-flex items-center gap-3"
              >
                <Send className="w-5 h-5" />
                careers@gtrinfra.com
              </a>
              <a 
                href="tel:+96898632229"
                className="glass-button text-lg border-2 border-primary hover:bg-primary/20 inline-flex items-center gap-3"
              >
                <Briefcase className="w-5 h-5" />
                Call HR Department
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;