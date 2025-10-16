import React from 'react';
import './ToggleSwitch.css';

function ToggleSwitch({ label, checked, onChange }) {
  return (
    <div className="toggle-switch-container">
      <label>{label}</label>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;