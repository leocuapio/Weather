'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useWeather } from '../weathercontext';
import {Box,
    Stack,
    Typography,
    Button,
    Modal,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Container,
    Grid2,
    AppBar,
    Toolbar,
    Link,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Paper,
    Divider,
    InputBase,
} from "@mui/material";
import { Tune } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';


export default function WeatherPage() {
    const [cityInput, setCityInput] = useState('');
    const {setWeatherData, setCity} = useWeather();
    const [error, setError] = useState(null); // Stores any error messages
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();
    const navigatetoweather = () => {
        router.push("/weather");
    };

    // Fetch weather data based on user input
    const fetchWeather = async () => {
        setError(null); // Reset the error message
        setWeatherData(null); // Clear old data

        if (!cityInput.trim()) {
            setError('City name is required.'); // Prevent empty city input
            setShowPopup(true);
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/weather?city=${cityInput.trim()}`); // Request Flask API

            if (response.ok) {
                const data = await response.json();
                if (data.error) {
                    setError(data.error); // Handle error returned by the API
                    setShowPopup(true);
                } else {
                    setWeatherData(data); // Populate weather data
                    setCityInput(cityInput.trim());
                    navigatetoweather();
                }
            } else {
                setError('Failed to fetch weather data. Please try again later!');
                setShowPopup(true); 
            }
        } catch (err) {
            console.error(err); // Log error for debugging
            setError('An error occurred. Please try again later!');
            setShowPopup(true);
        }
    };

        // const triggerError = () => {
        //     setError('City not found. Try again!');
        //     setShowPopup(true);
        // }

        const handleClosePopup = () => {
            setShowPopup(false);
        }


    return (
        <Box style={{}}>
<Paper
      component="form"
      sx={{ display: 'flex', alignItems: 'center', width: 300, borderRadius: 4, boxShadow: 1 }}
    >
      <InputBase
        placeholder="Enter city name"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === 'Enter') { // Checks if the pressed key is "Enter"
            e.preventDefault(); // Prevents any default behavior for Enter key (like form submission)
            fetchWeather(); // Calls your fetchWeather function
            }
        }}
        sx={{
          ml: 1,
          flex: 1,
          padding: '10px',
          fontSize: '16px',
        }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton onClick={fetchWeather} sx={{ p: '10px', color: '#007bff' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
            {/* Modal for Error Display */}
            <Modal
                open={showPopup}
                onClose={handleClosePopup}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box style={popupContentStyles}>
                <Typography variant="h6" gutterBottom>
                    Error
                </Typography>
                <Typography>{error}</Typography>
                <Button
                    onClick={handleClosePopup}
                    style={buttonStyles}
                >
                    Close
                </Button>
                </Box>
            </Modal>

            {/* Display Error Messages */}
            {/* {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} */}
        
        </Box>
    );
}
const popupStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };
  
  const popupContentStyles = {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  };
  
  const buttonStyles = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  