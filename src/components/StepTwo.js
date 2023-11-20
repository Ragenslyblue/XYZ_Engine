// StepTwo.js
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Chart from 'chart.js/auto';


const StepTwo = ({ formData, setFormData, csvData, nextStep, setManualMinMax }) => {
  const [file, setFile] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [manualMinMax, setManualMinMaxState] = useState({
    maxX: '',
    minX: '',
    maxY: '',
    minY: '',
    maxZ: '',
    minZ: '',
  });

  useEffect(() => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const csvValues = result.data;
          const xValues = csvValues
            .map((row) => parseFloat(row[1]))
            .filter((value) => !isNaN(value));
          const maxX = Math.max(...xValues);
          const yValues = csvValues
            .map((row) => parseFloat(row[2]))
            .filter((value) => !isNaN(value));
          const maxY = Math.max(...yValues);
          const zValues = csvValues
            .map((row) => parseFloat(row[3]))
            .filter((value) => !isNaN(value));
          const maxZ = Math.max(...zValues);
          setFormData({
            ...formData,
            maxX,
            minX: Math.min(...xValues),
            maxY,
            minY: Math.min(...yValues),
            maxZ,
            minZ: Math.min(...zValues),
          });
        },
      });
    }
  }, [file, setFormData]);

  useEffect(() => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const csvValues = result.data;
          const kpValues = csvValues
            .map((row) => parseFloat(row[0]))
            .filter((value) => !isNaN(value));
          const xValues = csvValues
            .map((row) => parseFloat(row[1]))
            .filter((value) => !isNaN(value));
          const chartData = kpValues.map((kp, index) => ({
            x: kp,
            y: xValues[index],
          }));

          setChartData(chartData);
        },
      });
    }
  }, [file]);

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById('myChart').getContext('2d');

      new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'X values',
              data: chartData,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'KP',
              },
            },
            y: {
              title: {
                display: true,
                text: 'X',
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleManualMinMaxChange = (e) => {
    const { name, value } = e.target;
    setManualMinMaxState((prevManualMinMax) => ({ ...prevManualMinMax, [name]: value }));
  };

  const handleNext = () => {
    setManualMinMax(manualMinMax); // Update manualMinMax in App.js
    nextStep();
  };

  return (
    <div className='step_one'>
      <h2>Step 2</h2>
      <div>
        <label>Project Name:</label>
        <span>{formData.projectName}</span>
      </div>
      <div>
        <label>Project Description:</label>
        <span>{formData.projectDescription}</span>
      </div>
      <div>
        <label>Client:</label>
        <span>{formData.client}</span>
      </div>
      <div>
        <label>Contractor:</label>
        <span>{formData.contractor}</span>
      </div>
      <div>
        <label className='upload-file'>File Upload:</label>
        <input type="file" onChange={handleFileChange} />
        <br />
        {file ?
        <canvas id="myChart" width="400" height="200"></canvas>
        : null}
      </div>
      <div>
        <label>max_X:</label>
        {file ? <span>{formData.maxX}</span> : <input type="number" name="maxX" value={manualMinMax.maxX} onChange={handleManualMinMaxChange} />}
      </div>
      <div>
        <label>min_X:</label>
        {file ? <span>{formData.minX}</span> : <input type="number" name="minX" value={manualMinMax.minX} onChange={handleManualMinMaxChange} />}
      </div>
      <div>
        <label>max_Y:</label>
        {file ? <span>{formData.maxY}</span> : <input type="number" name="maxY" value={manualMinMax.maxY} onChange={handleManualMinMaxChange} />}
      </div>
      <div>
        <label>min_Y:</label>
        {file ? <span>{formData.minY}</span> : <input type="number" name="minY" value={manualMinMax.minY} onChange={handleManualMinMaxChange} />}
      </div>
      <div>
        <label>max_Z:</label>
        {file ? <span>{formData.maxZ}</span> : <input type="number" name="maxZ" value={manualMinMax.maxZ} onChange={handleManualMinMaxChange} />}
      </div>
      <div>
        <label>min_Z:</label>
        {file ? <span>{formData.minZ}</span> : <input type="number" name="minZ" value={manualMinMax.minZ} onChange={handleManualMinMaxChange} />}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default StepTwo;
