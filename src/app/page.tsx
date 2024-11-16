'use client'

import { Dialog } from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const careers = [
  {
    name: 'Software Developer',
    salary: '¥300,000 - ¥450,000',
    description: 'Develops and maintains software applications across various platforms.',
    skills: ['Programming', 'Problem-solving', 'Teamwork', 'Version Control'],
    fit: 'Analytical, detail-oriented, enjoys coding and continuous learning',
    link: 'https://www.linkedin.com/jobs/software-developer'
  },
  {
    name: 'Game Developer',
    salary: '¥350,000 - ¥550,000',
    description: "Designs and develops video games for various platforms.",
    skills: ['Game Design', 'Programming (C++, C#)', '3D Modeling', 'Problem-solving'],
    fit: "Creative thinker with a passion for gaming and storytelling.",
    link: "https://www.linkedin.com/jobs/game-developer"
  },
  {
    name: 'Data Scientist',
    salary: '¥350,000 - ¥500,000',
    description: 'Analyzes complex data to drive business decisions and strategy.',
    skills: ['Statistics', 'Machine Learning', 'Data Visualization', 'Python/R'],
    fit: 'Curious, analytical, enjoys working with data and deriving insights',
    link: 'https://www.linkedin.com/jobs/data-scientist'
  },
  {
    name: 'Cybersecurity Analyst',
    salary: '¥320,000 - ¥480,000',
    description: 'Protects systems and networks from cyber threats and implements security measures.',
    skills: ['Network Security', 'Risk Management', 'Incident Response', 'Ethical Hacking'],
    fit: 'Vigilant, proactive, enjoys solving complex security challenges',
    link: 'https://www.linkedin.com/jobs/cybersecurity-analyst'
  },
  {
    name: 'IT Support Specialist',
    salary: '¥280,000 - ¥400,000',
    description: 'Provides technical support and ensures smooth operation of IT systems.',
    skills: ['Technical Support', 'Communication', 'Problem-solving', 'Customer Service'],
    fit: 'Patient, good communicator, enjoys helping others with technology',
    link: 'https://www.linkedin.com/jobs/it-support-specialist'
  },
  {
    name: 'Web Developer',
    salary: '¥310,000 - ¥460,000',
    description: 'Creates responsive and user-friendly websites and web applications.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React/Angular/Vue'],
    fit: 'Creative, detail-oriented, enjoys web design and user experience',
    link: 'https://www.linkedin.com/jobs/web-developer'
  },
  {
    name: 'Network Administrator',
    salary: '¥330,000 - ¥470,000',
    description: 'Manages and optimizes computer networks for performance and security.',
    skills: ['Networking', 'Troubleshooting', 'Security', 'Cloud Infrastructure'],
    fit: 'Organized, methodical, enjoys working with complex network systems',
    link: 'https://www.linkedin.com/jobs/network-administrator'
  },
  {
    name: 'DevOps Engineer',
    salary: '¥340,000 - ¥500,000',
    description: 'Bridges development and operations to improve deployment frequency and reliability.',
    skills: ['CI/CD', 'Containerization', 'Automation', 'Cloud Platforms'],
    fit: 'Adaptable, process-oriented, enjoys optimizing development workflows',
    link: 'https://www.linkedin.com/jobs/devops-engineer'
  },
  {
    name: 'UI/UX Designer',
    salary: '¥300,000 - ¥450,000',
    description: 'Creates intuitive and visually appealing user interfaces for digital products.',
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    fit: 'Creative, empathetic, enjoys crafting user-centered designs',
    link: 'https://www.linkedin.com/jobs/ui-ux-designer'
  },
  {
    name: 'Cloud Architect',
    salary: '¥400,000 - ¥600,000',
    description: 'Designs and oversees the implementation of cloud computing strategies.',
    skills: ['Cloud Platforms', 'System Design', 'Security', 'Cost Optimization'],
    fit: "Strategic thinker, technically proficient, enjoys solving complex infrastructure challenges",
    link: "https://www.linkedin.com/jobs/cloud-architect"
  },
  {
      name:'Machine Learning Engineer',
      salary:'¥380,000 - ¥550,000',
      description:'Develops algorithms that enable machines to learn from data.',
      skills:['Machine Learning','Deep Learning','Python','Model Deployment'],
      fit:'Innovative thinker who enjoys working with AI technologies.',
      link:'https://www.linkedin.com/jobs/machine-learning-engineer'
  },
  
  {
      name:'Product Manager',
      salary:'¥400,000 - ¥600,000',
      description:'Oversees product development from conception to launch.',
      skills:['Product Strategy','Market Research','Communication','Agile Methodologies'],
      fit:'Visionary leader who can balance business needs with technical capabilities.',
      link:'https://www.linkedin.com/jobs/product-manager'
  },
  {
      name:'Systems Analyst',
      salary:'¥350,000 - ¥500,000',
      description:'Evaluates and improves IT systems to meet business goals.',
      skills:['Systems Analysis','Problem-solving','Technical Documentation','Stakeholder Engagement'],
      fit:'Analytical thinker who enjoys optimizing processes.',
      link:'https://www.linkedin.com/jobs/systems-analyst'
  },
  {
      name:'Database Administrator',
      salary:'¥340,000 - ¥500,000',
      description:'Manages databases to ensure their integrity and performance.',
      skills:['SQL','Database Management','Performance Tuning','Backup/Recovery'],
      fit:'Detail-oriented with strong organizational skills who enjoys data management.',
      link:'https://www.linkedin.com/jobs/database-administrator'
  },
  {
      name:'SEO Specialist',
      salary:'¥280,000 - ¥420,000',
      description:'Optimizes website content to improve search engine rankings.',
      skills:['SEO Strategies','Keyword Research','Analytics Tools','Content Marketing'],
      fit:'Creative thinker who is passionate about digital marketing.',
      link:'https://www.linkedin.com/jobs/seo-specialist'
  },

  {
     name:'Blockchain Developer',
     salary:'¥400,000 - ¥600,000',
     description:'Designs and develops blockchain-based solutions for various applications.',
     skills:['Blockchain Technology','Smart Contracts','Cryptography','Decentralized Applications (DApps)'],
     fit:'Forward-thinking developer interested in emerging technologies.',
     link:'https://www.linkedin.com/jobs/blockchain-developer'
   }, 
   {
    name: 'AI Ethics Specialist',
    salary: '¥350,000 - ¥520,000',
    description: 'Ensures ethical considerations in AI development and implementation.',
    skills: ['AI Technology', 'Ethics', 'Policy Development', 'Risk Assessment'],
    fit: "Thoughtful professional with a strong moral compass and interest in technology's societal impact.",
    link: 'https://www.linkedin.com/jobs/ai-ethics-specialist'
  },
  {
    name: 'Quantum Computing Researcher',
    salary: '¥400,000 - ¥600,000',
    description: 'Conducts research and develops applications in quantum computing.',
    skills: ['Quantum Mechanics', 'Programming', 'Mathematics', 'Problem-solving'],
    fit: 'Innovative thinker with a passion for cutting-edge technology and complex problem-solving.',
    link: 'https://www.linkedin.com/jobs/quantum-computing-researcher'
  }
]

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#' },
  { name: 'Services', href: '#' },
  { name: 'Contact', href: '#' },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <header className='bg-white shadow-md'>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' aria-label='Global'>
          <div className='flex justify-between items-center py-6 md:justify-start md:space-x-10'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <a href='#'>
                <span className='sr-only'>CareerFit</span>
                <img className='h-12 w-auto sm:h-16' src='/images/logo.png' alt='CareerFit Logo' />
              </a>
            </div>
            <div className='-mr-2 -my-2 md:hidden'>
              <button
                type='button'
                className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className='sr-only'>Open menu</span>
                {mobileMenuOpen ? <X className='h-6 w-6' aria-hidden='true' /> : <Menu className='h-6 w-6' aria-hidden='true' />}
              </button>
            </div>
            <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className='text-base font-medium text-gray-500 hover:text-gray-900 mx-4'>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </nav>
        {/* Mobile menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className='flex-grow'>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='px-4 py-6 sm:px-0'>
            <h1 className='text-4xl font-bold text-center text-gray-900 mb-2'>CareerFit</h1>
            <p className='text-center text-xl text-gray-600 mb-12'>Find Your Perfect IT Career Path</p>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {careers.map((career) => (
                <a key={career.name} href={career.link} target='_blank' rel='noopener noreferrer' className='block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1'>
                  <div className='p-6'>
                    <h2 className='text-xl font-semibold text-indigo-600 mb-2'>{career.name}</h2>
                    <p className='text-gray-600 mb-4'>Salary: {career.salary}</p>
                    <p className='text-gray-700 mb-4'>{career.description}</p>
                    <p className='text-gray-600 mb-2'>Skills: {career.skills.join(', ')}</p>
                    <p className='text-gray-600'>Fit: {career.fit}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About CareerFit</h3>
              <p className="text-sm text-gray-300">CareerFit is your ultimate guide to navigating the IT job market. We help professionals find their perfect career match in the ever-evolving tech industry.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="text-sm">
                <li className="mb-2"><a href="#" className="hover:text-blue-400">Career Advice</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-400">Job Listings</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-400">Skill Assessments</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-400">Industry Trends</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-sm text-gray-300">123 Tech Plaza, Silicon Valley</p>
              <p className="text-sm text-gray-300">California, 94000</p>
              <p className="text-sm text-gray-300">Email: info@careerfit.com</p>
              <p className="text-sm text-gray-300">Phone: (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-400">&copy; 2024 CareerFit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}