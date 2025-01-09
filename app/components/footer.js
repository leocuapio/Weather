"use client";

import { useState } from "react";
import { Box, Grid, TextField, Button, Typography, IconButton, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubscribe = () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");
        console.log("Subscribed with email:", email);
        setEmail("");
    };

    return (
        <Box sx={{ backgroundColor: "#3C3C3C", color: "#fff", padding: "2rem 0", marginTop: "5rem" }}>
            <Box sx={{ textAlign: "center", marginBottom: "1rem" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    ClearView Weather
                </Typography>
                <Typography variant="body1" component="p" sx={{ maxWidth: "600px", margin: "0 auto" }}>
                Get real-time weather updates, share your findings, and connect with others. Join us for the latest weather trends and subscribe for exclusive updates
                </Typography>
                {/* Subscription Form */}
                <Grid container justifyContent="center" alignItems="center" spacing={2} marginTop={1}>
                    <Grid item xs={12} sm={8} md={6}>
                        <Box position="relative">
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <TextField
                                    variant="outlined"
                                    label="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={Boolean(error)}
                                    fullWidth
                                    style={{ maxWidth: "350px", color: "white" }}
                                    InputProps={{
                                        style: { color: "white" }, // Text color inside the TextField
                                    }}
                                    InputLabelProps={{
                                        style: { color: "white" }, // Label color of the TextField
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "white", // Default border color
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "white", // Border color on hover
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "white", // Border color when focused
                                            },
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    style={{ marginLeft: "16px", borderRadius: "20px" }}
                                    onClick={handleSubscribe}
                                    sx={{ backgroundColor: "#7182B2" }}
                                >
                                    Subscribe
                                </Button>
                            </Box>
                            {error && (
                                <Typography
                                    variant="caption"
                                    color="error"
                                    style={{
                                        position: "absolute",
                                        bottom: "-20px", // Position the error below the text field
                                    }}
                                >
                                    {error}
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Typography variant="caption" display="block" style={{ marginTop: "1rem" }}>
                    See our <Link href="#">Terms and Conditions</Link>
                </Typography>
            </Box>
            <Box sx={{ textAlign: "center", marginBottom: "1rem" }}>
                <Typography variant="body2" component="p">
                    © 2025 by LC. All Rights Reserved.
                </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
                <IconButton color="inherit" href="https://facebook.com">
                    <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" href="https://twitter.com">
                    <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" href="https://linkedin.com">
                    <LinkedInIcon />
                </IconButton>
                <IconButton color="inherit" href="https://instagram.com">
                    <InstagramIcon />
                </IconButton>
            </Box>
        </Box>
    );
}