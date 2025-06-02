import React from 'react';
import './DesktopOnlyMessage.scss';

const DesktopOnlyMessage: React.FC = () => {
  return (
    <div className="desktop-only-message">
      <h1>Desktop Only</h1>
      <p>
        This application is optimized for desktop use. Please access it from a
        desktop computer for the best experience.
      </p>
    </div>
  );
};

export default DesktopOnlyMessage;
