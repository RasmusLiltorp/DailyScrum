import ClientHero from './ClientHero';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="absolute top-4 right-4">
        <Link 
          href="https://github.com/RasmusLiltorp/DailyScrum" 
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-circle"
          aria-label="View source code on GitHub"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </Link>
      </div>
      
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-600 text-transparent bg-clip-text pb-2">DailyScrum</h1>
          <p className="py-6">
            A lightweight, anonymous, login-free web application for conducting daily standups in teams. Create a lobby with one click, share the code, and hold your standup without hassle.
          </p>
          
          <ClientHero />
          
          <div className="mt-12 text-sm opacity-70">
            <p>All data is automatically deleted within 2 hours to ensure privacy and GDPR compliance.</p>
            
            <div className="mt-4 flex justify-center items-center">
              <Link 
                href="https://github.com/RasmusLiltorp/DailyScrum" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Open-source on GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}