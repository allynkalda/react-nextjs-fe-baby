'use client'

import { addMeasurement } from '../../api/measurement.ts';
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

  const handleWeightSubmit = async (e) => {
    // Perform your form submission logic here
    e.preventDefault();
    const childInfo = JSON.parse(localStorage.getItem("selectedChild") ?? '{})')
    const today = new Date();

    const measurement = {
      childId: childInfo.id,
      date: today,
      weight,
      weightUnit: unit
    }

    try {
      const measurementAdded = await addMeasurement(measurement);
      console.log("measurementAdded", measurementAdded);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <form onSubmit={handleWeightSubmit}>
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
