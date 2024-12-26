import React from 'react';

const UserIcon: React.FC = () => {
  return (
    <svg width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          .cls-1 {
            fill: none;
            stroke: rgba(255, 255, 255, 0.43);
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 2px;
          }
        `}</style>
      </defs>
      <g id="user">
        <circle className="cls-1" cx="16" cy="9" r="5"/>
        <path className="cls-1" d="M8,28V20a2,2,0,0,1,2-2H22a2,2,0,0,1,2,2v8"/>
      </g>
    </svg>
  );
};

export default UserIcon;