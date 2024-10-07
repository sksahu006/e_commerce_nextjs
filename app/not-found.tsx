import React from 'react';
import Link from 'next/link';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="eyes">
          <div className="eye">
            <div className="eyePupil"></div>
          </div>
          <div className="eye">
            <div className="eyePupil"></div>
          </div>
        </div>
        <div className="moon"></div>
        <h1 className="not-found-title">Looks Like You're Lost</h1>
        <p className="not-found-description">404 Error</p>
        <Link href="/" className="not-found-button">
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;