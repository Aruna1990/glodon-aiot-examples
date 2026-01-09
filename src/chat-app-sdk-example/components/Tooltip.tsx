import { useState } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export const Tooltip = ({ content, children, position = 'top' }: TooltipProps) => {
  const [show, setShow] = useState(false);

  const getTooltipStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      padding: '10px 12px',
      background: '#333',
      color: 'white',
      fontSize: '13px',
      borderRadius: '6px',
      whiteSpace: 'normal',
      width: '280px',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      lineHeight: '1.6',
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
        };
      case 'right':
        return {
          ...baseStyle,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px',
        };
      case 'bottom':
        return {
          ...baseStyle,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px',
        };
      case 'left':
        return {
          ...baseStyle,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px',
        };
      default:
        return baseStyle;
    }
  };

  const getArrowStyle = (): React.CSSProperties => {
    const baseArrow: React.CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
    };

    switch (position) {
      case 'top':
        return {
          ...baseArrow,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid #333',
        };
      case 'right':
        return {
          ...baseArrow,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderRight: '6px solid #333',
        };
      case 'bottom':
        return {
          ...baseArrow,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderBottom: '6px solid #333',
        };
      case 'left':
        return {
          ...baseArrow,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderLeft: '6px solid #333',
        };
      default:
        return baseArrow;
    }
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div style={getTooltipStyle()}>
          {content}
          <div style={getArrowStyle()} />
        </div>
      )}
    </div>
  );
};

