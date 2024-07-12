import React, { useEffect, useRef } from 'react';
import ChartJS from 'chart.js/auto';

const Chart = ({ data, type }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    const ctx = chartRef.current.getContext('2d');
    new ChartJS(ctx, {
      type: type || 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Count',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [data, type]);

  return <canvas ref={chartRef} className="chart-canvas" />;
};

export default Chart;
