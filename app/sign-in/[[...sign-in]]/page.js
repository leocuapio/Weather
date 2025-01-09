import { AppBar, Container, Toolbar, Button, Typography, Box } from "@mui/material";
import Link from 'next/link';
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <Container maxWidth="100vw">
        
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" paddingTop={10} >
                <Typography variant="h4" gutterBottom>
                    Sign In
                </Typography>
                <SignIn />
            </Box>
        </Container>
    );
}