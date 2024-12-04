'use client'

import React, { useState } from 'react';

export default function BabyWeightInputForm() {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg'); // Default to kg
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  });

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Weight: ${weight} ${unit}, Date: ${date}`);
    // Perform your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="weight">Baby Weight:</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={weight}
          onChange={handleWeightChange}
          placeholder="Enter weight"
          required
        />
      </div>
      <div>
        <label htmlFor="unit">Unit:</label>
        <select id="unit" name="unit" value={unit} onChange={handleUnitChange}>
          <option value="kg">Kilograms (kg)</option>
          <option value="lbs">Pounds (lbs)</option>
        </select>
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleDateChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
