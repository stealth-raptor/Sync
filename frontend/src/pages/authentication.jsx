import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import { useContext, useState } from 'react';
import httpStatus from "http-status";


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {



    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                let result = await handleLogin(username, password)
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {

            console.log(err);
            // const message = err.response.data.message;
            // setError(message);
        }
    }
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1c1d25',
            },
            secondary: {
                main: '#1e2133',
            },
            background: {
                default: '#1c1d25',
                paper: '#1e2133',
            },
            text: {
                primary: '#ffffff',
            },
        },
    });


    return (

        <ThemeProvider theme={darkTheme}>
            <Grid
                container
                component="main"
                sx={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#1c1d25',
                }}
            >
                <CssBaseline />

                <Grid
                    component={Paper}
                    elevation={6}
                    square
                    sx={{
                        backgroundColor: '#1c1d2f',
                        p: 4,
                        borderRadius: 2,
                        width: { xs: '90%', sm: '400px' },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: 'white',
                        }}
                    >
                        <br />

                        <div>
                            <Button
                                variant={formState === 0 ? 'contained' : 'outlined'}
                                onClick={() => setFormState(0)}
                                sx={{ mx: 1,  color:'white', borderColor:'white'}}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant={formState === 1 ? 'contained' : 'outlined'}
                                onClick={() => setFormState(1)}
                                sx={{ mx: 1 ,   color:'white', borderColor:'white'}}
                            >
                                Sign Up
                            </Button>
                        </div>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                name="fullName"
                                value={name}
                                autoFocus={formState === 1}
                                onChange={(e) => setName(e.target.value)}
                                style={{ display: formState === 1 ? 'block' : 'none' }}
                                sx={{
                                    '& label.Mui-focused': { color: 'white' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'grey' },
                                        '&:hover fieldset': { borderColor: 'white' },
                                        '&.Mui-focused fieldset': { borderColor: 'white' },
                                    },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    '& label.Mui-focused': { color: 'white' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'grey' },
                                        '&:hover fieldset': { borderColor: 'white' },
                                        '&.Mui-focused fieldset': { borderColor: 'white' },
                                    },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    '& label.Mui-focused': { color: 'white' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'grey' },
                                        '&:hover fieldset': { borderColor: 'white' },
                                        '&.Mui-focused fieldset': { borderColor: 'white' },
                                    },
                                }}
                            />

                            <p style={{ color: 'red' }}>{error}</p>

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? 'Sign In' : 'Sign Up'}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar open={open} autoHideDuration={4000} message={message} />
        </ThemeProvider>

    );
}