import React, { useEffect } from 'react';

const BotPressChat = () => {
  useEffect(() => {
    // Create the script element for Botpress webchat
    const botpressScript = document.createElement('script');
    botpressScript.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js'; // Load the Botpress webchat script
    botpressScript.async = true;

    const configScript = document.createElement('script');
    configScript.src = 'https://files.bpcontent.cloud/2024/10/24/18/20241024183814-FG0BNOPK.js'; // Your additional configuration script
    configScript.async = true;

    // Append the Botpress script to the document body first
    document.body.appendChild(botpressScript);

    // Set up a function to run when the Botpress script loads
    botpressScript.onload = () => {
      if (window.botpress) {
        // Now append the configuration script after botpress has loaded
        document.body.appendChild(configScript);

        // Set up a function to run when the config script loads
        configScript.onload = () => {
          // Now you can initialize Botpress
          window.botpress.init({
            botId: '58a1c409-2734-4417-bcd2-75091802e3f6', // Your bot ID
            clientId: '32bf31dc-9dcf-42aa-b58e-0f551188fa8c', // Your client ID
            // Add any additional options if needed
          });
        };
      } else {
        console.error('Botpress is not defined.');
      }
    };

    // Clean up script when component unmounts
    return () => {
      // Remove botpressScript if it's in the document
      if (botpressScript.parentNode) {
        document.body.removeChild(botpressScript);
      }
      // Remove configScript if it's in the document
      if (configScript.parentNode) {
        document.body.removeChild(configScript);
      }
    };
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div>
      {/* <h2>Chat with our Bot!</h2> */}
      {/* You can add any additional UI here if needed */}
    </div>
  );
};

export default BotPressChat;
