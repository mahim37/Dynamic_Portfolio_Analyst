import React from 'react';
import Plot from 'react-plotly.js';

const CandlestickChart = ({ chartData }) => {
  return (
    <div>
      <Plot data={chartData} 
            
      />
    </div>
  );
};

export default CandlestickChart;
