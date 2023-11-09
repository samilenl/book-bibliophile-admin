import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import PropTypes from "prop-types"

const ChartComponent = ({background, fill, label, dataset}) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy the previous Chart instance
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: `${label ? label : ""}`,
            data: [...dataset],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: `${background}`,
            borderWidth: 2,
            fill: {
                target: 'origin',
                above: `${fill}`,
                below: 'rgb(0, 0, 0, 0)'
            },
            tension: 0.4,
          },
        ],
      },
      options: {
        scales: {
          y: {
           display: false,
           ticks: {
            stepSize: 25, // The interval between each tick
            min: 0, // The minimum value for the y-axis
            max: 100, // The maximum value for the y-axis
          },
          },
          x: {
            display: false, // Remove the x-axis labels
          },
        },
        plugins: {
            legend: {
              display: false, // Remove the legend
            },
            layout: {
                padding: 0, // Remove padding
                margin: 0,
            },
        },
        elements: {
            point: {
              radius: 0.1, // Remove the points on the line
            },
        },
      },
    });
  }, [background, dataset, fill, label]);

  return <canvas ref={chartRef} />;
};

ChartComponent.propTypes = {
    background: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    dataset: PropTypes.array.isRequired
}

export default ChartComponent;
