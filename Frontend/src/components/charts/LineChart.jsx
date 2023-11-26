import React from 'react';
import Plot from 'react-plotly.js';

const CandlestickChart = ({ chartData }) => {
  return (
    <div>
      <Plot  data={chartData}
       layout={{
        paper_bgcolor: '#f7e4ca',
        hoverlabel: {
          bordercolor: '#f7e4ca',
        },
        geo: {
          scope: 'world',
          projection: {
            type: 'robinson',
          },
        },
        height: 400,
        width: 400,
      }} />
    </div>
  );
};

export default CandlestickChart;
