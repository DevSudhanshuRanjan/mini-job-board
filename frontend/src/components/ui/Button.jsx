// frontend/src/components/ui/Button.jsx
import { clsx } from 'clsx';
import Spinner from './Spinner.jsx';

const variants = {
  primary:   'bg-primary text-on-primary font-medium hover:bg-primary-pressed shadow-subtle hover:shadow-card',
  dark:      'bg-ink-deep text-on-dark font-medium hover:bg-charcoal',
  secondary: 'bg-canvas border border-hairline-strong text-ink hover:bg-surface',
  ghost:     'bg-transparent text-steel hover:text-ink hover:bg-surface',
  danger:    'bg-canvas border border-error/30 text-error hover:bg-error/5',
  'on-dark': 'bg-on-dark text-ink font-medium hover:bg-surface-soft',
};

const sizes = {
  sm:  'h-8 px-3 text-sm gap-1.5',
  md:  'h-[44px] px-[18px] text-sm gap-2',
  lg:  'h-12 px-6 text-base gap-2',
  icon:'h-[44px] w-[44px] p-0',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  leftIcon,
  rightIcon,
  as: Component = 'button',
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <Component
      {...props}
      disabled={Component === 'button' ? isDisabled : undefined}
      className={clsx(
        // Base — DESIGN.MD: 8px rounded buttons, NOT pills
        'inline-flex items-center justify-center rounded-md font-sans',
        'transition-all duration-150 ease-out cursor-pointer',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
        'select-none',
        // Variant
        variants[variant],
        // Size
        sizes[size],
        // Disabled
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
    >
      {loading ? (
        <Spinner size="sm" />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </Component>
  );
};

export default Button;
