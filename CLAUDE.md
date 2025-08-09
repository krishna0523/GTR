# GTR LLC Website Development - Claude Context

## Project Overview
Professional infrastructure company website for Grand Technical Resources LLC (GTR LLC) built with React, TypeScript, Vite, and Tailwind CSS. The website showcases GTR LLC's expertise in telecommunications, civil works, oil & gas, and water pipeline infrastructure projects in Oman.

## Technology Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Shadcn/UI components
- **Routing**: React Router
- **3D Graphics**: WebGL shaders, Spline 3D scenes
- **Forms**: Web3Forms API integration
- **Hosting**: Vercel

## Development Timeline & Major Features Implemented

### 1. Initial Setup & Structure
- Created React TypeScript project with Vite
- Implemented responsive navigation and routing
- Added fade-in animations to page headers (except home page)
- Structured pages: Home, About, Telecom, Civil Works, Oil & Gas, Water Pipeline, Careers, Contact

### 2. Background Animation Enhancements
- **About Page**: Replaced cable background with home page video effect using "Sequence 03.mp4"
- **Telecom Page**: Implemented advanced WebGL shader background with interactive cable animations
- **Oil & Gas Page**: Integrated Spline 3D background with cursor light overlay
- **Water Pipeline Page**: Added Spline 3D background integration

### 3. Interactive Effects & Animations
- **WebGL Shader System**: Created sophisticated cable animations with wave motion, electrical pulses, and data flow particles
- **Cursor Interactions**: Implemented torch-like circular cursor light with interactive effects:
  - Small round torch effect (0.05 core radius, 0.1 glow radius)
  - Cable attraction and brightening when cursor approaches
  - Ripple effects and mouse influence on cable distortion
- **Performance Optimizations**: GPU-accelerated rendering, throttled scroll events

### 4. Form Integration & Email Functionality
- **Web3Forms Integration**: Configured both contact and careers forms with access key: `56d56f92-16c3-47bb-9ea0-184604fca28d`
- **Contact Form**: Full project inquiry form with validation and success states
- **Careers Form**: Comprehensive job application form with file upload capabilities
- **Form Fixes**: Removed problematic resume upload functionality, added proper error handling and validation
- **Email Consolidation**: Standardized all communications to `office@gtrinfra.com`

### 5. Navigation & UX Improvements
- **Fixed 404 Errors**: Replaced HTML anchor tags with React Router Links for proper SPA navigation
- **Scroll Functionality**: Added smooth scroll-to-form feature for "Apply for this Position" buttons
- **Testimonials Cleanup**: Removed company names from reviews section for cleaner presentation

### 6. Content & Data Management
- **Job Openings**: Added structured job listings with requirements and descriptions
- **Company Benefits**: Implemented benefits section with icons and detailed descriptions
- **Contact Information**: Centralized contact details with proper formatting
- **Professional Presentations**: Enhanced visual hierarchy and content organization

## File Structure & Key Components

### Core Pages
- `/src/pages/Home.tsx` - Landing page with hero section and overview
- `/src/pages/About.tsx` - Company information with video background
- `/src/pages/Telecom.tsx` - Telecommunications services with WebGL shader background
- `/src/pages/CivilWorks.tsx` - Civil engineering services
- `/src/pages/OilGas.tsx` - Oil & gas services with Spline 3D background
- `/src/pages/WaterPipeline.tsx` - Water pipeline services with Spline 3D background
- `/src/pages/Careers.tsx` - Job opportunities and application form
- `/src/pages/Contact.tsx` - Contact information and project inquiry form

### Background Components
- `/src/components/ShaderCableBackground.tsx` - Advanced WebGL shader with interactive cables
- `/src/components/WaveCableBackground.tsx` - Canvas-based wave motion effects
- `/src/components/CursorLight.tsx` - Clean cursor torch light component
- `/src/components/VideoBackground.tsx` - Video background with configurable sources

### Form Components
- `/src/components/ContactSection.tsx` - Project inquiry form with Web3Forms integration
- `/src/components/CareersSection.tsx` - Job application form with validation
- Both forms include comprehensive validation, loading states, and success feedback

## Technical Implementation Details

### WebGL Shader Effects (Telecom Page)
- **Fragment Shader**: Complex visual effects including cable generation, wave distortion, electrical pulses, data flow particles
- **Interactive Features**: Mouse-based torch light, cable attraction, ripple effects
- **Performance**: GPU-accelerated rendering with proper resource management
- **Visual Design**: 4 cables positioned on left and right sides, avoiding center text area

### Spline 3D Integration
- **Oil & Gas Page**: Scene URL `https://prod.spline.design/5rewS4K16RKYFVCc/scene.splinecode`
- **Water Pipeline Page**: Scene URL `https://prod.spline.design/Wr7WHRPqXFFiCyRk/scene.splinecode`
- **Implementation**: Proper z-index layering (-z-20 for 3D scene, -z-10 for cursor light, z-10 for content)

### Cursor Light System
- **Design**: Small, perfectly circular torch effect following mouse cursor
- **Specifications**: Core radius 0.05, glow radius 0.1, blue-white color scheme
- **Interaction**: Cable brightening and attraction effects within 0.15 radius
- **Performance**: Optimized WebGL rendering with proper cleanup

### Animation Specifications
- **Wave Motion**: Slower-paced animations (reduced time multipliers by ~50%)
- **Cable Properties**: Reduced color intensity and effect strength for professional appearance
- **Scroll Integration**: Wave amplitude changes based on scroll progress
- **Mouse Influence**: Dynamic cable distortion near cursor position

## Form Configuration

### Web3Forms Setup
```javascript
// Access Key
access_key: '56d56f92-16c3-47bb-9ea0-184604fca28d'

// Contact Form Fields
- Full Name, Email, Phone, Company, Project Type, Budget, Message

// Careers Form Fields  
- Personal: Full Name, Email, Phone, Current Location
- Professional: Position, Experience Level, Education, Availability, Expected Salary
- Additional: Portfolio/LinkedIn URL, Cover Letter
```

### Email Integration
- **Primary Email**: `office@gtrinfra.com` (consolidated across all communications)
- **Form Processing**: Real-time validation, loading states, success confirmation
- **Error Handling**: Comprehensive error messages with fallback contact information

## Design System & Styling

### Visual Theme
- **Color Scheme**: Dark theme with blue/cyan accent colors (`primary`, `accent`)
- **Glass Morphism**: Translucent cards with backdrop blur effects
- **Typography**: Clean, professional fonts with proper hierarchy
- **Animations**: Smooth transitions, fade-ins, hover effects

### Responsive Design
- **Mobile First**: All components optimized for mobile devices
- **Breakpoints**: Proper responsive layouts using Tailwind CSS breakpoints
- **Touch Interactions**: Optimized for mobile touch interfaces
- **Performance**: Optimized images and lazy loading where applicable

## Known Issues & Solutions

### Resolved Issues
1. **404 Navigation Errors**: Fixed by replacing `<a href>` with React Router `<Link to>`
2. **Form Submission Failures**: Resolved through Web3Forms API integration
3. **Resume Upload Errors**: Fixed by removing file upload functionality
4. **Email Inconsistencies**: Consolidated to single `office@gtrinfra.com` address
5. **Overexposed Lighting**: Reduced shader effect intensity and background brightness
6. **Performance**: Optimized animations with throttled events and GPU acceleration

### Current Status
- All major features implemented and functional
- Forms working correctly with Web3Forms integration
- Interactive effects optimized for professional appearance
- 3D backgrounds successfully integrated on Oil & Gas and Water Pipeline pages
- WebGL shader effects active on Telecom page with cursor interactions

## Deployment & Hosting
- **Platform**: Vercel
- **Build Command**: `npm run build`
- **Environment**: Production-ready with optimized assets
- **Domain**: Connected to GTR LLC infrastructure

## Development Commands
```bash
# Development server
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install

# Add Spline integration
npm install @splinetool/react-spline
```

## Future Enhancement Opportunities
1. **Additional Interactive Effects**: Click-based particle explosions, scroll-based cursor modifications
2. **3D Scene Expansion**: Custom Spline scenes for remaining pages
3. **Performance Analytics**: Integration with monitoring tools
4. **SEO Optimization**: Meta tags, structured data, sitemap generation
5. **Accessibility**: Enhanced keyboard navigation, screen reader support
6. **Animation Presets**: Configurable animation intensity settings

## Git Repository
- **Repository**: GTR LLC website codebase
- **Branch Strategy**: Main branch for production releases
- **Commit Convention**: Descriptive messages with co-authoring attribution to Claude Code

## Contact & Support
- **Technical Support**: Available through Claude Code
- **Business Contact**: office@gtrinfra.com
- **Phone**: +968 9863 2229
- **Location**: Muscat, Sultanate of Oman

---
*Last Updated: 2025-01-06*
*Generated with Claude Code - Professional AI Development Assistant*