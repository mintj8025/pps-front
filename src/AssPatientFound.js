import React, {useEffect , useState} from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UpdateIcon from '@mui/icons-material/Update';
import Typography from '@mui/material/Typography';
import './AssPatientFound.css';
import Swal from 'sweetalert2'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function App() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
        patient_fname: data.get('patient_fname'),
        patient_lname: data.get('patient_lname'),
        patient_HN: data.get('patient_HN'),
        patient_status: 'new',
        patient_visit: '0'
    }
    fetch('http://localhost:7000/patientFound' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
      if(data.status === 'ok'){
        localStorage.setItem('token2', data.token2);
        window.location = '/AssComferm'
      }else{
      Swal.fire({
          icon: 'error',
          title: 'Sorry...',
          text: (data.message),
        })
        }
      })
    .catch((error) => {
        console.error('Error:', error);
    })
  };

  const [isLoaded, setIsLoaded] = useState(true);
  const [decoded, setAssessor] = useState([]); 

  useEffect(() => {
    const token = localStorage.getItem('token')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

  fetch("http://localhost:7000/authen", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.status === 'ok'){
        setAssessor(result.decoded)
        setIsLoaded(false)
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Sorry...',
          text: 'Authen failed!',
        }).then((value) => {
          localStorage.removeItem('token');
          window.location = '/login'
        })
      }
      console.log(result)
    })
    .catch(error => console.log('error', error));
    }, [])

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/login'
  }

  const handleRegister = (event) => {
    window.location = '/register'
  }

  const handleAssessment = (event) => {
    window.location = '/asspatientfound'
  }

  if (isLoaded) return (<div>Loading</div>)
  else {
  return (
   <div>
            <div class="fullscreen-block">
            <div class="username">
            <IconButton
            sx={{color: 'black'}}>
              <Typography variant="h5" component="div" fontFamily={'lightkanit'}>
              {decoded.assessor_fname} {decoded.assessor_lname}<PermIdentityIcon  sx={{ fontSize: 35 }} /></Typography> </IconButton></div>
                
            <div className='assessmentAuth'>
            <Typography component="h1" variant="h3" fontFamily={'kanit'}>
              แบบประเมินผู้ป่วยที่มีความปวดจากโรคมะเร็ง
            </Typography>
            <Typography component="h1" variant="h3" fontFamily={'kanit'}>
              หน่วยระงับปวด โรงพยาบาลศิริราช
            </Typography>

            <Typography sx={{ fontSize: 25 , marginTop: 5 }} fontFamily={'lightkanit'}>
              เลข HN
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField 
              margin="normal"
              required
              fullWidth
              id="patient_HN"
              label="enter your HN"
              name="patient_HN"
              autoComplete="เลข HN"
              autoFocus
            />
           
              <Button
              size="large"
              type="submit"
              maxWidth= "45"
              variant="contained"
              sx={{ mt: 4, mb: 2 , ml:33 }}
            >
               <Typography variant="h5" component="div" fontFamily={'kanit'}>
                  ต่อไป
                </Typography>
            </Button>
          </Box>

            </div>

            <List sx={{ maxWidth: 180 , height: '97.4vh' , margin: '0' , bgcolor: '#5246E9' }}>           
            <div class="profile">
            <IconButton aria-label="Profile">
             <PermIdentityIcon  sx={{ fontSize: 40 }} color="disabled"/>
            </IconButton> 
            </div>          
            
            <div class="home">
            <IconButton aria-label="Home">
             <HomeIcon  sx={{ fontSize: 40 }} style={{ color: 'white' }} />
            </IconButton>      
            </div>

            <div class="register">
            <IconButton aria-label="Register">
            <PersonAddAltIcon onClick={handleRegister} sx={{ fontSize: 40 }} style={{ color: 'disabled' }} />
            </IconButton> 
            </div>

            <div class="assessment">
            <IconButton aria-label="Assessment">
            <AssignmentIcon onClick={handleAssessment} sx={{ fontSize: 40 }} style={{ color: 'disabled' }} />
            </IconButton> 
            </div>

            <div class="history">
            <IconButton aria-label="History">
            <UpdateIcon  sx={{ fontSize: 40 }} style={{ color: 'disabled' }} />
            </IconButton> 
            </div>
            
            <div class="logout">
            <IconButton aria-label="Logout">
             <LogoutIcon  onClick={handleLogout} sx={{ fontSize: 40 }} color="disabled"/>
            </IconButton>   
            </div>

            </List>

            </div> 
   </div>
  );
}
}

export default App;
