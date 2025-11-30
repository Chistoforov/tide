import React from 'react';

interface TideIconProps {
  type: 'high' | 'low';
  className?: string;
}

export const TideIcon: React.FC<TideIconProps> = ({ type, className = '' }) => {
  if (type === 'high') {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 14.5C2 14.5 4 12.5 6 12.5C8 12.5 10 14.5 12 14.5C14 14.5 16 12.5 18 12.5C20 12.5 22 14.5 22 14.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M2 18.5C2 18.5 4 16.5 6 16.5C8 16.5 10 18.5 12 18.5C14 18.5 16 16.5 18 16.5C20 16.5 22 18.5 22 18.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 8L12 3M12 3L9 6M12 3L15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 10.5C2 10.5 4 8.5 6 8.5C8 8.5 10 10.5 12 10.5C14 10.5 16 8.5 18 8.5C20 8.5 22 10.5 22 10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 16L12 21M12 21L9 18M12 21L15 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};


