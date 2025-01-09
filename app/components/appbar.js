"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AppBarsearch from "./appbarsearch";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useWeather } from "../weathercontext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: "#6a84b3", // Add this here if the toolbar is the issue
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "3px 12px",
}));

export default function Home({}) {
  // Move the useState here
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Use the weather context hook to get the unit and toggle function
  const { unit, toggleUnit, setIsLoggedIn } = useWeather();

  const handleChange = (event) => {
    toggleUnit(event.target.value);
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          backgroundColor: "transparent",
          backgroundImage: "none",
          mt: "calc(var(--template-frame-height, 0px) + 28px)",
        }}
      >
        <Container maxWidth="xl">
          <StyledToolbar
            variant="dense"
            disableGutters
            sx={{
              position: "relative", // Required to enable absolute positioning for children
              backgroundColor: "#6a84b3",
            }}
          >
            {/* Logo Section */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button onClick={() => router.push("/")}>
                <img
                  src="/images/logo3.png"
                  alt="logo"
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                />
              </Button>
            </Box>

            {/* Center Section - Search */}
            <Box
              sx={{
                position: "absolute", // Center it relative to the AppBar
                left: "50%", // Move to the center horizontally
                transform: "translateX(-50%)", // Adjust to perfectly align the center
                display: "flex",
                justifyContent: "center",
              }}
            >
              <AppBarsearch />
            </Box>

            {/* Right Section - Unit Selector and Icons */}
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto", paddingRight: "16px" }}
            >
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 140, // Increased the minimum width for the dropdown
                  "& .MuiInputBase-input": {
                    fontSize: "1.2rem", // Increase text size
                    color: "white", // Change text color to white
                  },
                  "& .MuiSelect-icon": {
                    color: "white", // Change the icon color to white
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none", // No border
                    },
                  },
                }}
                size="small"
              >
                <InputLabel sx={{ color: "white", fontSize: "1.2rem"
                 }}></InputLabel>
                <Select
                  labelId="unit-select-label"
                  id="unit-select"
                  value={unit}
                  label="System"
                  onChange={handleChange}
                  sx={{
                    fontSize: "1.2rem", // Ensure dropdown font size matches
                    color: "white", // Change text color in the dropdown
                  }}
                >
                  <MenuItem value="imperial">Imperial (°F)</MenuItem>
                  <MenuItem value="metric">Metric (°C)</MenuItem>
                </Select>
              </FormControl>
              <SignedOut>
                <IconButton
                  aria-label="account"
                  href="/sign-up"
                  sx={{
                    fontSize: "2rem", // Adjust the font size for a larger icon
                    color: "inherit", // Inherit or customize color
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: "3rem" }} />{" "}
                  {/* Enlarged icon */}
                </IconButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButton: {
                        width: "48px", // Set desired width
                        height: "48px", // Set desired height
                      },
                      userButtonAvatarBox: {
                        width: "35px", // Size for the avatar inside
                        height: "35px",
                      },
                    },
                  }}
                />
              </SignedIn>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
    </>
  );
}
