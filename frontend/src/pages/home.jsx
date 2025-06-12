import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth.jsx';
import { useNavigate } from 'react-router-dom';
import { IconButton, Button, TextField, Box, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext.jsx';

const HomeComponent = () => {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState('');
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1c1d25',
        minHeight: '100vh',
        color: 'white',
        px: 4,
        py: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 6,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily:'Electrolize'}}>
          Sync
        </Typography>

        <Box display="flex" gap={2} alignItems="center">
          <IconButton
            onClick={() => navigate('/history')}
            sx={{
              color: 'white',
              backgroundColor: '#1e2133',
              px: 2,
              borderRadius: 2,
              '&:hover': { backgroundColor: '#2c2f4a' },
            }}
          >
            <Typography variant="body1">History</Typography>
          </IconButton>

          <Button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/auth');
            }}
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                backgroundColor: '#2c2f4a',
                borderColor: '#888',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, md: 6 },
          py: 4,
        }}
      >
        {/* Left Panel */}
        <Box sx={{ mb: { xs: 4, md: 0 }, width: { xs: '100%', md: '45%' } }}>
          <Typography variant="h3" sx={{ mb: 3 , fontWeight:800}}>
            Hello!
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Meeting Code"
              variant="outlined"
              onChange={(e) => setMeetingCode(e.target.value)}
              InputProps={{
                sx: {
                  color: 'white',
                  borderColor: 'white',
                },
              }}
              InputLabelProps={{
                sx: { color: 'gray' },
              }}
              sx={{
                input: { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#555',
                  },
                  '&:hover fieldset': {
                    borderColor: '#aaa',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
            />

            <Button
              onClick={handleJoinVideoCall}
              variant="contained"
              sx={{
                backgroundColor: '#1e88e5',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              Join Video Call
            </Button>
          </Box>
        </Box>

        {/* Right Panel */}
        <Box sx={{ width: { xs: '100%', md: '45%' } }}>
          <img
            src="/image.svg"
            alt="Meeting illustration"
            style={{ width: '90%', borderRadius: '16px' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default withAuth(HomeComponent);
