import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import ReviewBarChart from '../pages/ReviewBarChart';

const ChartComponent = () => {
  const [barData, setBarData] = useState(new Array(12).fill(0)); // Initialize with 12 months
  const [pieData, setPieData] = useState([{ name: 'SAC', value: 0 }, { name: 'DEPARTMENT', value: 0 }, { name: 'GROUND', value: 0 }]); // Initialize pie data

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
        const newPieData = { SAC: 0, DEPARTMENT: 0, GROUND: 0 }; // Reset pie data for each fetch

        data.forEach(event => {
          // Extract month from eventDate and convert to 1-based index
          const date = new Date(event.eventDate);
          const monthIndex = date.getMonth(); // Zero-based index

          if (monthIndex >= 0 && monthIndex < 12) {
            newBarData[monthIndex] += 1; // Increment count for the month
          }

          if (newPieData[event.eventVenue] !== undefined) {
            newPieData[event.eventVenue] += 1; // Increment count for the venue
          }
        });

        setBarData(newBarData);
        setPieData([
          { name: 'SAC', value: newPieData.SAC },
          { name: 'DEPARTMENT', value: newPieData.DEPARTMENT },
          { name: 'GROUND', value: newPieData.GROUND },
        ]);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <>
    <div>
      <div style={{ width: '60%', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Monthly Event Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData.map((count, index) => ({ month: index + 1, count }))}>
            <XAxis dataKey="month" tickFormatter={(month) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month - 1]} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="rgba(75, 192, 192, 0.6)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: '30%', margin: '0 auto' }}>
        <br/><br/>
        <h2 style={{ fontSize: '24px' }}>Event Venue Utilization</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={{xs:80,md:150}} fill="#8884d8" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#ff6384', '#36a2eb', '#ffce56'][index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    <ReviewBarChart />
    </>
  );
};

export default ChartComponent;
