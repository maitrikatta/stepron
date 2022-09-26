import React from 'react';

function EmptyList() {
  return (
    <div
      style={{
        height: '50px',
        fontSize: '16px',
        lineHeight: '50px',
        textAlign: 'center',
        backgroundColor: 'rgba(243, 91, 91, 0.8)',
      }}
    >
      List is empty, feel free to add new user
    </div>
  );
}

export default EmptyList;
