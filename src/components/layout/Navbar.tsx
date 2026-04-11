import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Programs', href: '/#programs' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Support', href: '/support' },
  { label: 'Orders', href: '/orders' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">Laso</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">Health</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === l.href ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/quiz">
            <Button size="sm">Check Eligibility</Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/quiz" onClick={() => setOpen(false)}>
              <Button className="w-full" size="sm">Check Eligibility</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
