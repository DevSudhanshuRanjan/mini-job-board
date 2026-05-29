// frontend/src/utils/formatters.js

/**
 * Format a date string as a relative time (e.g., "2 days ago").
 */
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now  = new Date();
  const diff = now - date;

  const minutes = Math.floor(diff / 60000);
  const hours   = Math.floor(diff / 3600000);
  const days    = Math.floor(diff / 86400000);
  const weeks   = Math.floor(days / 7);
  const months  = Math.floor(days / 30);

  if (minutes < 1)   return 'Just now';
  if (minutes < 60)  return `${minutes}m ago`;
  if (hours < 24)    return `${hours}h ago`;
  if (days < 7)      return `${days}d ago`;
  if (weeks < 4)     return `${weeks}w ago`;
  if (months < 12)   return `${months}mo ago`;

  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

/**
 * Format a date as a readable full date.
 */
export const formatFullDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
};

/**
 * Truncate text to a given number of characters.
 */
export const truncate = (text, maxLength = 160) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
};

/**
 * Get the badge style for a job type — uses DESIGN.MD Notion palette.
 */
export const getTypeStyle = (type) => {
  const styles = {
    'Remote':  { bg: 'bg-tint-mint',     text: 'text-brand-green',      border: 'border-brand-green/20' },
    'On-site': { bg: 'bg-tint-peach',    text: 'text-brand-orange',     border: 'border-brand-orange/20' },
    'Hybrid':  { bg: 'bg-tint-lavender', text: 'text-brand-purple',     border: 'border-brand-purple/20' },
  };
  return styles[type] || styles['Remote'];
};

/**
 * Capitalize first letter of a string.
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
