// StepOne.js
import React, { useState } from 'react';

const StepOne = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    nextStep();
  };

  return (
    <div className='step_one'>
      <h2>Step 1</h2>
      <div>
        <label>Project Name:</label>
        <input type="text" name="projectName" onChange={handleChange} />
      </div>
      <div>
        <label>Project Description:</label>
        <input type="text" name="projectDescription" onChange={handleChange} />
      </div>
      <div>
        <label>Client:</label>
        <input type="text" name="client" onChange={handleChange} />
      </div>
      <div>
        <label>Contractor:</label>
        <input type="text" name="contractor" onChange={handleChange} />
      </div>
      <button 
      disabled={!formData.projectName || !formData.projectDescription || !formData.client || !formData.contractor} 
      className={formData.projectName && formData.projectDescription && formData.client && formData.contractor ? 'enabled' : 'disabled'}
      onClick={handleNext}>Next</button>
    </div>
  );
};

export default StepOne;
