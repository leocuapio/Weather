'use client';
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import CloudIcon from "@mui/icons-material/Cloud";

export default function Home() {
  const [funFact, setFunFact] = useState(
    "Click the button to learn something new!"
  );

  const facts = [
    "The highest temperature ever recorded on Earth was 134°F (56.7°C) in Death Valley, California.",
    "The coldest temperature ever recorded was -128.6°F (-89.2°C) at Vostok Station in Antarctica.",
    "Lightning can heat the air around it to temperatures five times hotter than the sun's surface.",
    "The city of Yuma, Arizona, gets over 4,000 hours of sunshine per year, making it the sunniest place on Earth.",
    "Mount Waialeale in Hawaii is one of the wettest places on Earth, with an average of 450 inches of rain per year.",
    "Snowflakes can fall at a speed of 1 to 6 feet per second.",
    "The fastest wind speed ever recorded was 253 mph during a tornado in Oklahoma in 1999.",
    "The Sahara Desert can experience temperatures as low as -6°F (-21°C) at night.",
    "The Great Barrier Reef in Australia is the largest living structure on Earth.",
    "Tokyo, Japan, is the most populous city in the world, with over 37 million residents.",
    "The Amazon Rainforest produces 20% of the world's oxygen supply.",
    "The Dead Sea is the lowest point on Earth, at 1,410 feet below sea level.",
    "Venice, Italy, is built on more than 100 small islands in a lagoon in the Adriatic Sea.",
    "The city of Reykjavik, Iceland, uses geothermal energy to heat its buildings and water.",
    "The world's longest river, the Nile, flows through 11 countries in Africa."
  ];

  const generateFact = () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setFunFact(facts[randomIndex]);
  };

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "13rem",

      }}
    >
      <Box sx={{ textAlign: "center", mb: 6 }}>
        {/* Hero Section */}
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2, color: "#2e3b55" }}>
          ClearView:<br />Weather at Your Fingertips
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#555", maxWidth: "600px", margin: "0 auto" }}
        >
          Get real-time weather updates for any city in the world. Stay informed about the current conditions instantly.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 4,
          mb: 6,
        }}
      >
        {/* Step Cards */}
        <Card
          sx={{
            maxWidth: 300,
            boxShadow: 6,
            borderRadius: "16px",
            background: "linear-gradient(135deg, #7182B2, #4A569D)",
            color: "#fff",
            transition: "transform 0.3s ease",
            '&:hover': {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <LoginIcon sx={{ fontSize: 50, color: "#fff", mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Login/Signup
            </Typography>
            <Typography variant="body2">
              Create an account or log in to get personalized weather updates.
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            maxWidth: 300,
            boxShadow: 6,
            borderRadius: "16px",
            background: "linear-gradient(135deg, #7182B2, #4A569D)",
            color: "#fff",
            transition: "transform 0.3s ease",
            '&:hover': {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <SearchIcon sx={{ fontSize: 50, color: "#fff", mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Search Your City
            </Typography>
            <Typography variant="body2">
              Enter the name of your city to fetch accurate weather details.
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            maxWidth: 300,
            boxShadow: 6,
            borderRadius: "16px",
            background: "linear-gradient(135deg, #7182B2, #4A569D)",
            color: "#fff",
            transition: "transform 0.3s ease",
            '&:hover': {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <CloudIcon sx={{ fontSize: 50, color: "#fff", mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Get Weather Details
            </Typography>
            <Typography variant="body2">
              Instantly view the real-time weather data for your selected city.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Fun Fact Generator Section */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="body1"
          sx={{
            color: "#555",
            mb: 4,
            fontStyle: "italic",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          "{funFact}"
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7182B2",
            color: "#ffffff",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "0.8rem 2rem",
            '&:hover': {
              backgroundColor: "#4A569D",
            },
          }}
          onClick={generateFact}
        >
          Generate Fun Fact
        </Button>
      </Box>
    </Box>
  );
}
