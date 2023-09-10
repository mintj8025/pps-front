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
import './AssComferm.css';
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';

function App() {

const [decoded2, setPatient] = useState([]);
  
  useEffect(() => {
    const token2 = localStorage.getItem('token2')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token2);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

  fetch("http://localhost:7000/patientAuthen", requestOptions)
    .then(response => response.json())
    .then(data => {
        if(data.status === 'ok'){
        setPatient(data.decoded2)
        }
        console.log(data)          
      })
      })
    

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

  const handleYes = (event) => {
    window.location = '/assregister'
  }

  const handleRegister = (event) => {
    window.location = '/register'
  }

  const handleAssPatientFound = (event) => {
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
              {decoded.assessor_fname} {decoded.assessor_lname} <PermIdentityIcon  sx={{ fontSize: 35 }} /></Typography> </IconButton></div>
            
            <div className='sqare'>
            <div className='Title'>
            <Typography component="h1" variant="h3" fontFamily={'Kanit'}>
                คุณต้องการประเมินคนไข้คนนี้ใช่หรือไม่
            </Typography></div>

            <div className='info'>
            <Typography sx={{ fontSize: 25 , marginTop: 2 }}  fontFamily={'lightKanit'}>
                ชื่อ - นามสกุล
            </Typography>
            <Typography sx={{ fontSize: 23 }}  fontFamily={'lightKanit'} color={'#808080'}>
                {decoded2.patient_fname} {decoded2.patient_lname}
            </Typography>
            
            <Typography sx={{ fontSize: 25 , marginTop: 2 }}  fontFamily={'lightKanit'}>
                เลข HN
            </Typography>
            <Typography sx={{ fontSize: 23 }}  fontFamily={'lightKanit'} color={'#808080'}>
                {decoded2.patient_HN}
            </Typography>

            <Typography sx={{ fontSize: 25 , marginTop: 2 }}  fontFamily={'lightKanit'}>
                ประเมินไปแล้ว (ครั้ง)
            </Typography>
            <Typography sx={{ fontSize: 23 }}  fontFamily={'lightKanit'} color={'#808080'}>
                {decoded2.patient_visit}
            </Typography>
            </div>
           
              <Button
              size="large"
              type="submit"
              maxWidth= "45"
              variant="contained"
              sx={{ mt: 4, mb: 2 , ml:33 }}
              onClick={handleYes} 
            >
               <Typography variant="h5" component="div" fontFamily={'kanit'}>
                  ใช่
                </Typography>
            </Button>        
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
            <AssignmentIcon onClick={handleAssPatientFound} sx={{ fontSize: 40 }} style={{ color: 'disabled' }} />
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
