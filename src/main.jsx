// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import './index.css'
// import ChatBot from './BotPressChat';
// // import { LoginStudent } from './LoginStudent'
import App from './App'
// // import { Apps } from './App1'
// // import { UnAssigned } from './pages/UnAssigned'
// const theme = createTheme(); // You can customize the theme here if needed

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//        <ThemeProvider theme={theme}>
//           {/* <App /> */}
//           <ChatBot/>
//       </ThemeProvider>,
//   </StrictMode>,
// )
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';
import ChatBot from './BotPressChat'; // Assuming BotPressChat.jsx is in the same directory

const theme = createTheme(); // Customize the theme if needed

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* Uncomment the App component if needed */}
      <App />
      <ChatBot /> {/* Render the ChatBot component */}
    </ThemeProvider>
  </StrictMode>
);
