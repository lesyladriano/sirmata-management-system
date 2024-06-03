import React from 'react';

const BarsCross = ({ open, onClick }) => {
  return (
    <div className={`bars-cross text-xs pt-2  ${open ? 'open' : ''}`} onClick={onClick}>
      <div id="nav-icon1" className={`${open ? 'open' : ''}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default BarsCross;
