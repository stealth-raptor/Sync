import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import {
    Card,
    Box,
    CardContent,
    Typography,
    IconButton,
    Container,
    CssBaseline,
    Grid
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (e) {
                console.log(e);
            }
        };

        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <Box
            sx={{
                backgroundColor: '#1c1d25',
                minHeight: '100vh',
                color: 'white',
                py: 6,
            }}
        >
            <CssBaseline />
            <Container maxWidth="md">
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                        Your Meeting History
                    </Typography>
                    <IconButton
                        onClick={() => routeTo('/home')}
                        sx={{
                            color: 'white',
                            backgroundColor: '#1e2133',
                            '&:hover': { backgroundColor: '#2c2f4a' }
                        }}
                    >
                        <HomeIcon />
                    </IconButton>
                </Box>

                {meetings.length > 0 ? (
                    <Grid container spacing={3}>
                        {meetings.map((e, i) => (
                            <Grid item xs={12} sm={6} key={i}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: '#1e2133',
                                        color: 'white',
                                        border: '1px solid #333',
                                        borderRadius: 2,
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                                            Code: {e.meetingCode}
                                        </Typography>
                                        <Typography sx={{ mt: 1 }} color="gray">
                                            Date: {formatDate(e.date)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography sx={{ mt: 4 }} color="gray">
                        No meeting history found.
                    </Typography>
                )}
            </Container>
        </Box>
    );
}
