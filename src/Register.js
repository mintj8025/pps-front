import React, {useEffect , useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      patient_fname: data.get('patient_fname'),
      patient_lname: data.get('patient_lname'),
      patient_HN: data.get('patient_HN'),
      patient_status: "new"
  }
  
  fetch('https://enchanting-fatigues-bull.cyclic.app/register_patient' , {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
  })
  .then(response => response.json())
  .then(data => {
      if(data.status === 'ok'){
          localStorage.setItem('token', data.token);
          window.location = '/home'
          alert('register sucess')
      }else{
          alert('register failed')
      }
  })
  .catch((error) => {
      console.error('Error:', error);
  })
};
  


  return (       
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Typography component="h1" variant="h5">
            ลงทะเบียนคนไข้ใหม่
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="patient_fname"
                  required
                  fullWidth
                  id="patient_fname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="patient_lname"
                  label="Last Name"
                  name="patient_lname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="patient_HN"
                  label="Email Address"
                  name="patient_HN"
                  autoComplete="email"
                />
              </Grid>             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}