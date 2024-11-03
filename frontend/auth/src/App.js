import logo from './logo.svg';
import './App.css';
import Headers from './components/headers.js';
import Footer from './components/footers.js';
import bg from './img/neon.jpg';
import { Box } from '@mui/material';
import { useEffect } from 'react';
function App() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column"
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
