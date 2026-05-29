// frontend/src/components/ui/Input.jsx
import { clsx } from 'clsx';

const Input = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className = '',
  containerClassName = '',
  required,
  ...props
}) => {
  return (
    <div className={clsx('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-charcoal">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-stone pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          {...props}
          required={required}
          className={clsx(
            // DESIGN.MD: text-input — canvas bg, hairline-strong border, 8px rounded, 44px height
            'w-full h-[44px] bg-canvas border rounded-md px-4 text-base',
            'text-ink placeholder:text-muted',
            'transition-all duration-150',
            'focus:outline-none focus:ring-0 focus:border-primary focus:border-2',
            error
              ? 'border-error focus:border-error'
              : 'border-hairline-strong hover:border-stone',
            leftIcon  && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
        />
        {rightIcon && (
          <span className="absolute right-3 text-stone pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs text-error flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-stone">{hint}</p>
      )}
    </div>
  );
};

export default Input;
