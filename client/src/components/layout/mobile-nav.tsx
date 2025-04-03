import { Link } from "wouter";

interface MobileNavProps {
  currentPath: string;
}

export default function MobileNav({ currentPath }: MobileNavProps) {
  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden bg-black p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-primary text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                <line x1="8" y1="2" x2="8" y2="18"/>
                <line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
            </span>
            <h1 className="text-white text-lg font-bold">TileAI</h1>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-6 py-3 z-10">
        <ul className="flex justify-between">
          <li>
            <Link href="/">
              <a className="flex flex-col items-center text-sm">
                <svg 
                  className={`w-5 h-5 mb-1 ${currentPath === '/' ? 'text-primary' : 'text-muted-foreground'}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span className={currentPath === '/' ? 'text-primary' : 'text-muted-foreground'}>Home</span>
              </a>
            </Link>
          </li>
          
          <li>
            <Link href="/chat">
              <a className="flex flex-col items-center text-sm">
                <svg 
                  className={`w-5 h-5 mb-1 ${currentPath === '/chat' ? 'text-primary' : 'text-muted-foreground'}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span className={currentPath === '/chat' ? 'text-primary' : 'text-muted-foreground'}>Chat</span>
              </a>
            </Link>
          </li>
          
          <li>
            <Link href="/calculator">
              <a className="flex flex-col items-center text-sm">
                <svg 
                  className={`w-5 h-5 mb-1 ${currentPath === '/calculator' ? 'text-primary' : 'text-muted-foreground'}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="4" y="2" width="16" height="20" rx="2"/>
                  <line x1="8" x2="16" y1="6" y2="6"/>
                  <line x1="16" x2="16" y1="14" y2="18"/>
                  <path d="M16 10h.01"/>
                  <path d="M12 10h.01"/>
                  <path d="M8 10h.01"/>
                  <path d="M12 14h.01"/>
                  <path d="M8 14h.01"/>
                  <path d="M8 18h.01"/>
                  <path d="M12 18h.01"/>
                </svg>
                <span className={currentPath === '/calculator' ? 'text-primary' : 'text-muted-foreground'}>Calculator</span>
              </a>
            </Link>
          </li>
          
          <li>
            <Link href="/order">
              <a className="flex flex-col items-center text-sm">
                <svg 
                  className={`w-5 h-5 mb-1 ${currentPath === '/order' ? 'text-primary' : 'text-muted-foreground'}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1"/>
                  <circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                <span className={currentPath === '/order' ? 'text-primary' : 'text-muted-foreground'}>Order</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
