import { Link } from 'react-router-dom';

interface NavbarProps {
  title?: string;
}

const Navbar = ({ title = 'Photo Gallery' }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-xl font-semibold text-accent-500">
              {title}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 