"use client";
import { useState } from "react";
import {
  Box,
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
  Divider,
  SecondaryAction,
} from "@mui/material";
import { useWeather } from "../weathercontext";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CompressIcon from "@mui/icons-material/Compress";
import AirIcon from "@mui/icons-material/Air";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import GetAppTwoToneIcon from "@mui/icons-material/GetAppTwoTone";

export default function WeatherPage() {
  const { weatherData, city, unit } = useWeather();

  const currentTime = new Date();
  const hours24 = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  
  // Convert 24-hour time to 12-hour format
  const hours12 = hours24 % 12 || 12; // Convert hour 0 to 12
  const period = hours24 >= 12 ? "PM" : "AM"; // Determine AM or PM
  
  const formattedTime = `${hours12.toString().padStart(2, "0")}:${minutes} ${period}`;

  const formatTime = (time) => {
    // Ensure 'time' is in a Date format or a valid timestamp
    const date = new Date(time * 1000); // Multiply by 1000 to convert to ms
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  const changeImage = (weatherstate) => {
    switch (weatherstate) {
      case "Clear":
        return "/images/sunny.jpg";
      case "Clouds":
        return "/images/cloudy.jpg";
      case "Rain":
        return "/images/raining.jpg";
      case "Snow":
        return "/images/snow.jpg";
    }
  };

  const capitalize = (str) => {
    return str
    .split(" ")  // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join the array back into a string
  }

  const tempunitsymbol = unit === "imperial" ? "°F" : "°C";
  const pressureunitsymbol = unit === "imperial" ? "in" : "hPa";
  const windunitsymbol = unit === "imperial" ? "mph" : "kph";

  return (
    <Box style={{ paddingTop: "130px" }}>
      
      {weatherData && (
        <Box
          style={{
            marginTop: "20px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3">{weatherData.city} Weather:</Typography>
         
        </Box>
      )}
      <Container
        sx={{
          width: "59%",
          backgroundColor: "white",
          padding: "0",
          borderRadius: "10px",
          marginTop: "20px",
          overflow: "hidden",
          height: "310px",
          position: "relative",
        }}
      >
        {" "}
        {weatherData && (
          <>
            {" "}
            <img
              src={changeImage(weatherData.weather_state)}
              alt="Weather"
              style={{
                width: "110%",
                height: "auto",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                marginLeft: "-5%",
              }}
            />{" "}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "1%",
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              }}
            >
              {" "}
              <Typography variant="h6">{weatherData.city} As of {formattedTime} EST </Typography>{" "}
            </div>{" "}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "12.5%",
                transform: "translate(-50%, -50%)",
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",

              }}
            >
              {" "}
              <Typography variant="h1">{unit === "imperial"
                ? `${weatherData.temperature_fahrenheit.toFixed(0)}`
                : `${weatherData.temperature_celsius.toFixed(0)}`
                }{tempunitsymbol}</Typography>{" "}
              <Typography variant="h6">{capitalize(weatherData.description)}</Typography>{" "}
            </div>{" "}
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              }}
            >
            </div>
          </>
        )}{" "}
      </Container>
      <Container
        sx={{
          width: "59%",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "40px",
        }}
      >
        {weatherData && (
          <Box>
            <Box sx={{ ml: 0.5 }}>
              <Typography variant="h6">
                Weather Today in {weatherData.city}{" "}
              </Typography>
              <Typography>Feels Like: </Typography>
              <Typography sx={{ fontSize: "3rem" }}>
                {unit === "imperial"
                ?  `${weatherData.feels_like_fahrenheit.toFixed(0)}`
                : `${weatherData.feels_like_celsius.toFixed(0)}`}{tempunitsymbol}
              </Typography>
            </Box>
            <Grid2 container spacing={8} columns={16}>
              <Grid2 size={8}>
                <List
                  sx={{
                    backgroundColor: "white",

                    borderRadius: "10px",
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                  aria-label="mailbox folders"
                >
                  <ListItem>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <DeviceThermostatIcon />
                      <ListItemText primary="High/Low" sx={{ ml: 1 }} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body1">
                        {unit === "imperial"
                        ?  `${weatherData.temp_max_fahrenheit.toFixed(0)}`
                        : `${weatherData.temp_max_celsius.toFixed(0)}`}
                        /
                        {unit === "imperial"
                        ?  `${weatherData.temp_min_fahrenheit.toFixed(0)}`
                        : `${weatherData.temp_min_celsius.toFixed(0)}`}{tempunitsymbol}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <WaterDropIcon />
                      <ListItemText primary="Humidity" sx={{ ml: 1 }} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body1">
                        {weatherData.humidity}%
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <CompressIcon />
                      <ListItemText primary="Pressure" sx={{ ml: 1 }} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body1">
                        {unit === "imperial"
                        ? `${weatherData.pressure_inHg.toFixed(2)}`
                        : `${weatherData.pressure_metric.toFixed(0)}`} {pressureunitsymbol}
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
              </Grid2>
              <Grid2 size={8}>
                <List
                  sx={{
                    backgroundColor: "white",
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                  aria-label="mailbox folders"
                >
                  <ListItem>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <AirIcon />
                      <ListItemText primary="Wind" sx={{ ml: 1 }} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body1">
                        {unit === "imperial"
                        ? `${weatherData.wind_speed.toFixed(2)}`
                        : `${weatherData.wind_metric.toFixed(2)}`} {windunitsymbol}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <UploadTwoToneIcon />
                      <ListItemText primary="Sunrise" sx={{ ml: 1 }} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body1">
                        {formatTime(weatherData.sunrise_time)}{" "}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <GetAppTwoToneIcon />
                      <ListItemText primary="Sunset" sx={{ ml: 1 }} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body1">
                        {formatTime(weatherData.sunset_time)}{" "}
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
              </Grid2>
            </Grid2>
          </Box>
        )}
      </Container>
    </Box>
  );
}
