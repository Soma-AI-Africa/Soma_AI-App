import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';
import { FormDataContext } from './FormDataContext';

export const Onboarding18 = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormDataContext);
  const [sports, setSports] = useState(formData.sports || []);
  const [newSport, setNewSport] = useState('');

  const handleInputChange = (e) => {
    setNewSport(e.target.value);
  };

  const handleAddSport = () => {
    if (newSport.trim() !== '') {
      setSports([...sports, newSport.trim()]);
      setNewSport('');
    }
  };

  const handleRemoveSport = (index) => {
    const updatedSports = [...sports];
    updatedSports.splice(index, 1);
    setSports(updatedSports);
  };

  const handleContinue = () => {
    setFormData({ ...formData, sports });
    navigate('/onboarding19');
  };

  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, [setFormData]);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="onboarding-screen">
      <div className="pause-icon">{/* Pause icon */}</div>
      <div className="progress-bar">
        <div className="progress" style={{ width: '90%' }}></div> {/* Example width */}
      </div>

      <p className="section-title">~ Extracurricular activities</p>
      <h2>Sports? (optional)</h2>

      <div className="addable-input-container">
        <input
          type="text"
          className="input-field"
          placeholder="E.g Football"
          value={newSport}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={handleAddSport} aria-label="Add sport">Add</button>
      </div>

      {/* Display added sports */}
      <ul className="added-items-list">
        {sports.map((sport, index) => (
          <li key={index} className="added-item">
            {sport}
            <button className="remove-button" onClick={() => handleRemoveSport(index)} aria-label={`Remove ${sport}`}>
              ×
            </button>
          </li>
        ))}
      </ul>

      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
      <button className="later-button" onClick={() => navigate('/home')}>
        I will do this later
      </button>
    </div>
  );
};
