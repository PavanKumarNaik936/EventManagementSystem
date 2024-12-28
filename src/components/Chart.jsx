import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

const ChartComponent = () => {
  const [barData, setBarData] = useState(new Array(12).fill(0)); // Initialize with 12 months
  const [pieData, setPieData] = useState([0, 0, 0]); // SAC, DEPARTEMENT, GROUND

  useEffect(() => {
    fetch('http://localhost:8080/form/events')
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP error! status: ${response.status}. Response: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        const newBarData = new Array(12).fill(0); // Reset bar data for each fetch
        const newPieData = { SAC: 0, DEPARTEMENT: 0, GROUND: 0 }; // Reset pie data for each fetch

        data.forEach(event => {
          // Extract month from eventDate and convert to 1-based index
          const date = new Date(event.eventDate);
          const monthIndex = date.getMonth() + 1; // Adjust for 1-based index
          
          if (monthIndex >= 1 && monthIndex <= 12) {
            newBarData[monthIndex - 1] += 1; // Increment count for the month
          }

          if (newPieData[event.eventVenue] !== undefined) {
            newPieData[event.eventVenue] += 1; // Increment count for the venue
          }
        });

        setBarData(newBarData);
        setPieData([newPieData.SAC, newPieData.DEPARTEMENT, newPieData.GROUND]);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Number of Events',
        data: barData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['SAC', 'DEPARTEMENT', 'GROUND'],
    datasets: [
      {
        label: 'Event Venues',
        data: pieData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Event Data',
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Event Venue Distribution',
      },
    },
  };

  return (
    <div>
      <div style={{ width: '60%', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Monthly Event Distribution</h2>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
      <div style={{ width: '30%', margin: '0 auto' }}>
        <h2 style={{ fontSize: '24px' }}>Event Venue Utilization</h2>
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
    </div>
  );
};

export default ChartComponent;
