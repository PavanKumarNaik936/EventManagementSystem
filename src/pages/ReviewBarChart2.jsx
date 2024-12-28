import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReviewBarChart2 = () => {
  const [chartData, setChartData] = useState(null);

  // Function to fetch data from backend
  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:8080/reviews/getreviews');
      const data = await response.json();

      // Object to hold the total ratings and count of reviews per event
      const eventRatings = {};

      // Accumulate ratings and count occurrences for each event
      data.forEach((review) => {
        if (!eventRatings[review.eventName]) {
          eventRatings[review.eventName] = {
            totalRating: 0,
            count: 0,
          };
        }
        eventRatings[review.eventName].totalRating += review.overallRating;
        eventRatings[review.eventName].count += 1;
      });

      // Calculate the average ratings for each event
      const eventNames = Object.keys(eventRatings);
      const averageRatings = eventNames.map((eventName) => {
        const { totalRating, count } = eventRatings[eventName];
        return totalRating / count; // Calculate average rating
      });

      // Set up the data for the chart
      setChartData({
        labels: eventNames, // Unique event names
        datasets: [
          {
            label: 'Average Overall Rating',
            data: averageRatings,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching review data:', error);
    }
  };

  useEffect(() => {
    fetchReviews(); // Fetch data on component mount
  }, []);

  if (!chartData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      padding={2}
    >
      <Typography variant="h4" gutterBottom>
        Average Overall Ratings by Event
      </Typography>
      <Box width={{ xs: '100%', md: '80%', lg: '60%' }} maxWidth="800px">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Average Overall Ratings for Events',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 5, // Assuming ratings are out of 5
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ReviewBarChart2;
