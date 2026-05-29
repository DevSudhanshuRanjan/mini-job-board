// frontend/src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <p className="font-mono text-8xl font-bold text-hairline mb-4">404</p>
    <h1 className="font-semibold text-h3 text-ink mb-2">Page Not Found</h1>
    <p className="text-steel text-sm mb-8">The page you're looking for doesn't exist or was moved.</p>
    <Button as={Link} to="/" variant="primary" leftIcon={<ArrowLeft size={15} />}>
      Back to Jobs
    </Button>
  </div>
);

export default NotFoundPage;
