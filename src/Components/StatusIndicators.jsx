import React from 'react';

function StatusIndicators() {
  return (
    <div className="status-indicators mb-3" style={{ display: 'flex', position: 'absolute', top: '10px', left: '10px' }}>
      <span style={{ marginRight: '15px' }}>
        <span className="indicator" style={{ backgroundColor: '#198754', display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', marginRight: '5px' }}></span> Success
      </span>
      <span style={{ marginRight: '15px' }}>
        <span className="indicator" style={{ backgroundColor: '#0d6efd', display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', marginRight: '5px' }}></span> Reserved
      </span>
      <span>
        <span className="indicator" style={{ backgroundColor: 'rgba(108, 117, 125, 0.8)', display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', marginRight: '5px' }}></span> Cancelled
      </span>
    </div>
  );
}

export default StatusIndicators;
