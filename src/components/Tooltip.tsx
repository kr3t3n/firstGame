import React, { useState, useRef, useEffect, forwardRef } from 'react';

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactElement;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({ content, children }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      {React.cloneElement(children, {
        onMouseEnter: () => setIsVisible(true),
        onMouseLeave: () => setIsVisible(false),
      })}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 px-2 py-1 text-xs font-normal text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
          style={{
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '5px',
            maxWidth: 'calc(100vw - 20px)',
            width: 'max-content',
            minWidth: '150px',
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
});

export default Tooltip;