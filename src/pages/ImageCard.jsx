import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { useState } from 'react';

const ImageCard = ({ item, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [isHovered, setIsHovered] = useState(false); // State to track hover

  return (
    <Grid
      container
      item
      xs={12}
      alignItems="center"
      justifyContent={index % 2 === 0 ? 'flex-start' : 'flex-end'}
      sx={{
        margin: '40px 0',
        marginLeft: index % 2 === 0 ? '20px' : 'auto',
        marginRight: index % 2 === 0 ? 'auto' : '20px',
      }}
    >
      <Grid item xs={5}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <Card
            sx={{
              position: 'relative',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
              },
            }}
            onMouseEnter={() => setIsHovered(true)} // Set hover state to true
            onMouseLeave={() => setIsHovered(false)} // Set hover state to false
          >
            <CardMedia
              component="img"
              height="300"
              image={`data:image/jpeg;base64,${item.imageFile}`}
              alt={item.eventName}
              sx={{
                objectFit: 'cover',
              }}
            />
            <CardContent
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                padding: '16px',
                opacity: isHovered ? 1 : 0, // Change opacity based on hover state
                transform: isHovered ? 'translateY(0)' : 'translateY(30px)', // Move up on hover
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                {item.eventName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default ImageCard;
