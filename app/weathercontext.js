'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserPreferences, updateUserPreference } from './api/route';
// The context will manage the shared city and Weather data
const WeatherContext = createContext();

export function WeatherProvider ({children}) {
    const [weatherData, setWeatherData] = useState(null); // This will hold fetched weather data
    const [city, setCity] = useState(''); // This wull hold the city name
    const [unit, setUnit] = useState('imperial'); // This will hold the unit of temperature
    // const toggleUnit = (newUnit) => {
    //     setUnit(newUnit);
    //     localStorage.setItem('unit', newUnit);
    // }

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function loadUserPreferences() {
          if (isLoggedIn) {
            try {
              const { unit: userUnit } = await fetchUserPreferences();
              setUnit(userUnit || 'imperial');
            } catch (error) {
              console.error('Failed to fetch user preferences:', error);
            }
          } else {
            // For logged-out users, use `localStorage`
            const storedUnit = localStorage.getItem('unit');
            setUnit(storedUnit || 'imperial');
          }
        }
    
        loadUserPreferences();
      }, [isLoggedIn]);
    
      // Function to toggle the unit and persist it
      const toggleUnit = async (newUnit) => {
        setUnit(newUnit);
    
        if (isLoggedIn) {
          try {
            await updateUserPreference(newUnit); // Update user preferences via API
          } catch (error) {
            console.error('Failed to update unit for user:', error);
          }
        } else {
          localStorage.setItem('unit', newUnit); // Fallback for non-logged-in users
        }
      };

    return (
        <WeatherContext.Provider value={{weatherData, setWeatherData, city, setCity, unit, toggleUnit}}>
            {children}
        </WeatherContext.Provider>
    );
}

export function useWeather() {
    return useContext(WeatherContext);
}