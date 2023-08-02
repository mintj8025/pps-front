import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import img1 from './img/bloom-scientist-with-clipboard.png';
import './Login.css';
import Swal from 'sweetalert2'

const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
        assessor_username: data.get('assessor_username'),
        assessor_password: data.get('assessor_password'),
    }
    fetch('https://enchanting-fatigues-bull.cyclic.app/login' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'ok'){
          Swal.fire({
            title: 'Login success!',
            icon: 'success',
          }).then((value) => {
            localStorage.setItem('token', data.token);
            window.location = '/home'
          })
          }else{
            Swal.fire({
              title: 'Login failed!',
              icon: 'error',
            })
          }
    })
    .catch((error) => {
        console.error('Error:', error);
    })
  };

  return (
    <div className='App'>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{alignSelf: "center",
             marginTop: 100,
             fontSize: 32,
             color: 'black',
             fontWeight: 'bold', }}>
              SirirajPain
              </div>
              <div style={{alignSelf: "center",
             fontSize: 64,
             color: 'black',
            fontWeight: 'bold', }}>
              ยินดีต้อนรับ!
              </div>
              
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField 
              margin="normal"
              required
              fullWidth
              id="assessor_username"
              label="enter your email"
              name="assessor_username"
              autoComplete="email"
              autoFocus
            />

            <TextField
        
              margin="normal"
              required
              fullWidth
              name="assessor_password"
              label="enter your password"
              type="password"
              id="assessor_password"
              autoComplete="current-password"
            />
           
              <Button
              size="large"
              type="submit"
              maxWidth= "45"
              variant="contained"
              sx={{ mt: 3, mb: 2 , ml:18}}
            >
               <Typography variant="h5" component="div" fontFamily={'kanit'}>
                  เข้าสู่ระบบ
                </Typography>
            </Button>

            <Grid container>
              <Grid item xs>
             </Grid>
              <Grid item>

              <img style={{ 
                width: 226, 
                height: 295,
                position: 'absolute',
                marginTop: -190,
                right: 280
              }} 
              src={img1} className="App-logo" alt="img1" />

              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}