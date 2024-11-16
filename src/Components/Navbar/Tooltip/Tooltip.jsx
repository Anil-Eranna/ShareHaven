import React, { useState } from 'react';

// Tooltip Component
const Tooltip = ({ content, placement = "bottom", children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  // Dynamic styles based on placement
  const tooltipStyles = {
    top: {
      position: 'absolute',
      bottom: '125%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    bottom: {
      position: 'absolute',
      top: '125%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div style={{ ...tooltipStyles[placement], ...styles.tooltip }}>
          {content}
        </div>
      )}
    </div>
  );
};

// Tooltip Styling
const styles = {
  tooltip: {
    backgroundColor: 'black',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    zIndex: 1000,
  },
};

export default Tooltip;
