// frontend/src/components/ui/Spinner.jsx
import { clsx } from 'clsx';

const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };

const Spinner = ({ size = 'md', className = '' }) => (
  <span
    role="status"
    aria-label="Loading"
    className={clsx(
      'inline-block rounded-full border-2 border-current border-t-transparent animate-spin',
      sizes[size],
      className
    )}
  />
);

export default Spinner;
