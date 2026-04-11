import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50 py-12">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-lg font-bold text-primary">Laso</span>
            <p className="mt-2 text-sm text-muted-foreground">
              Doctor-led weight loss &amp; diabetes care.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/#how-it-works" className="hover:text-primary">How It Works</Link></li>
              <li><Link to="/#programs" className="hover:text-primary">Programs</Link></li>
              <li><Link to="/quiz" className="hover:text-primary">Eligibility Quiz</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/support" className="hover:text-primary">Chat Support</Link></li>
              <li><Link to="/orders" className="hover:text-primary">Track Order</Link></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Contact</h4>
            <p className="text-sm text-muted-foreground">support@laso.health</p>
            <p className="mt-1 text-sm text-muted-foreground">+91 22 4000 1234</p>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>© 2026 Laso Health Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="mt-2">
            This platform does not replace emergency medical care. If you are experiencing a medical emergency, call 112.
          </p>
        </div>
      </div>
    </footer>
  );
}
