import { AppBar, Container, Toolbar, Button, Typography, Box } from "@mui/material";
import Link from 'next/link';
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <Container maxWidth="100vw">


            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
                <Typography variant="h4" gutterBottom>
                    Sign Up
                </Typography>
                <SignUp />
            </Box>
        </Container>
    );
}