import { LucideCrop as LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

export const Pickaxe = forwardRef<SVGSVGElement, LucideProps>(
  ({ color = 'currentColor', size = 24, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="m14 10-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 7" />
        <path d="M16 2v6l-5.5 5.5" />
        <path d="M5 14.5 7.5 17" />
        <path d="M10 16c-2.5 1.5-3 2-3.5 2.5" />
        <path d="m16 2 6 6h-6Z" />
      </svg>
    );
  }
);

Pickaxe.displayName = 'Pickaxe';