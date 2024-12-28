import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';
import ReviewBarChart2 from './ReviewBarChart2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReviewBarChart = () => {
  const [chartData, setChartData] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:8080/reviews/getreviews');
      const data = await response.json();

      const totalRatings = {
        registrationDeskRating: 0,
        waterManagementRating: 0,
        crowdManagementRating: 0,
        promotionsRating: 0,
        refreshmentsRating: 0,
        helpDeskRating: 0,
      };
      let count = data.length;

      data.forEach((review) => {
        totalRatings.registrationDeskRating += review.registrationDeskRating;
        totalRatings.waterManagementRating += review.waterManagementRating;
        totalRatings.crowdManagementRating += review.crowdManagementRating;
        totalRatings.promotionsRating += review.promotionsRating;
        totalRatings.refreshmentsRating += review.refreshmentsRating;
        totalRatings.helpDeskRating += review.helpDeskRating;
      });

      const averageRatings = {
        registrationDeskRating: totalRatings.registrationDeskRating / count,
        waterManagementRating: totalRatings.waterManagementRating / count,
        crowdManagementRating: totalRatings.crowdManagementRating / count,
        promotionsRating: totalRatings.promotionsRating / count,
        refreshmentsRating: totalRatings.refreshmentsRating / count,
        helpDeskRating: totalRatings.helpDeskRating / count,
      };

      setChartData({
        labels: [
          'Registration Desk',
          'Water Management',
          'Crowd Management',
          'Promotions',
          'Refreshments',
          'Help Desk',
        ],
        datasets: [
          {
            label: 'Average Ratings',
            data: [
              averageRatings.registrationDeskRating,
              averageRatings.waterManagementRating,
              averageRatings.crowdManagementRating,
              averageRatings.promotionsRating,
              averageRatings.refreshmentsRating,
              averageRatings.helpDeskRating,
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching review data:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (!chartData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={2}
    >
      <Typography variant="h4" gutterBottom>
        Average Event Ratings
      </Typography>
      <Box width={{ xs: '100%', md: '80%', lg: '60%' }} maxWidth="800px">
        <Bar
          data={chartData}
          options={{
              responsive: true,
            //  maintainAspectRatio: false, 
          
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
               
                text: 'Average Ratings for Event Roles',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 5,
              
              },
            },
          }}
        />
      </Box>
    </Box>
    <ReviewBarChart2 />
    </>
  );
};

export default ReviewBarChart;
