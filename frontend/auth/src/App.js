import logo from './logo.svg';
import './App.css';
import Headers from './components/headers.js';
import Footer from './components/footers.js';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import bg from './img/bg.jpg';
function App() {
  return (
    <Box 
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Headers />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
