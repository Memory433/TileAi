import { Link, useLocation } from "wouter";
import { useUser } from "@/hooks/use-user";

export default function Sidebar() {
  const [location] = useLocation();
  const { user } = useUser();
  
  return (
    <div className="hidden md:flex md:w-64 flex-col bg-black h-screen fixed">
      <div className="p-5">
        <div className="flex items-center space-x-2">
          <span className="text-primary text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
              <line x1="8" y1="2" x2="8" y2="18"/>
              <line x1="16" y1="6" x2="16" y2="22"/>
            </svg>
          </span>
          <h1 className="text-white text-xl font-bold">TileAI</h1>
        </div>
      </div>
      
      <nav className="flex-grow mt-6">
        <ul className="space-y-2 px-3">
          <li>
            <Link href="/">
              <a className={`flex items-center py-3 px-4 rounded-lg transition-all
                ${location === '/' 
                  ? 'text-primary bg-surface' 
                  : 'text-muted-foreground hover:text-primary'}`}>
                <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span>Home</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/chat">
              <a className={`flex items-center py-3 px-4 rounded-lg transition-all
                ${location === '/chat' 
                  ? 'text-primary bg-surface' 
                  : 'text-muted-foreground hover:text-primary'}`}>
                <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>AI Chat</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/calculator">
              <a className={`flex items-center py-3 px-4 rounded-lg transition-all
                ${location === '/calculator' 
                  ? 'text-primary bg-surface' 
                  : 'text-muted-foreground hover:text-primary'}`}>
                <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <span>Tile Calculator</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/order">
              <a className={`flex items-center py-3 px-4 rounded-lg transition-all
                ${location === '/order' 
                  ? 'text-primary bg-surface' 
                  : 'text-muted-foreground hover:text-primary'}`}>
                <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"/>
                  <circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                <span>Order</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      
      {user && (
        <div className="p-5 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <span className="font-medium">{user.initial}</span>
            </div>
            <span className="text-white font-medium">{user.username}</span>
          </div>
        </div>
      )}
    </div>
  );
}
