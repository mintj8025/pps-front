import React, {useEffect , useState} from 'react';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UpdateIcon from '@mui/icons-material/Update';
import Typography from '@mui/material/Typography';
import './AssRegister.css';
import Swal from 'sweetalert2'

function App() {

  const [selectedValue, setSelectedValue] = React.useState('0');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("nrs", JSON.stringify(selectedValue));
    window.location = '/AssPps'
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
              {decoded.assessor_fname} {decoded.assessor_lname}<PermIdentityIcon  sx={{ fontSize: 35 }} /></Typography> </IconButton></div>
            
            <div className='assessmentForm'>
            <Typography component="h1" variant="h3" fontFamily={'kanit'}>
            ประเมินว่าคะแนนความปวดโดยเฉลี่ย ในรอบ 7 วันที่ผ่านมา
            </Typography>
          
            <Typography component="h1"  sx={{ fontSize: 35 }} fontFamily={'kanit'} marginTop={2}>
            โปรดเลือกความปวดที่ผ่านมา
            </Typography>
           
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <div className='radioForm'>
            <Radio
              {...controlProps('0')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 80,
                },
                color: '#33AC74',
                '&.Mui-checked': {
                 color: '#33AC74',
                },
              }}
            />

            <Radio
              {...controlProps('1')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 80,
                },
                color: '#33AC74',
                '&.Mui-checked': {
                 color: '#33AC74',
                },
              }}
            />

            <Radio
              {...controlProps('2')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 80,
                },
                color: '#33AC74',
                '&.Mui-checked': {
                 color: '#33AC74',
                },
              }}
            />

            <Radio
              {...controlProps('3')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 80,
                },
                color: '#3DC988',
                '&.Mui-checked': {
                 color: '#3DC988',
                },
              }}
            />
            
            <Radio
              {...controlProps('4')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 80,
                },
                color: '#3DC988',
                '&.Mui-checked': {
                 color: '#3DC988',
                },
              }}
            />
            
            <Radio
              {...controlProps('5')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 80,
                },
                color: '#737B89',
                '&.Mui-checked': {
                 color: '#737B89',
                },
              }}
            />

            <Radio
              {...controlProps('6')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 80,
                },
                color: '#F69994',
                '&.Mui-checked': {
                 color: '#F69994',
                },
              }}
            />

            <Radio
              {...controlProps('7')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 80,
                },
                color: '#F69994',
                '&.Mui-checked': {
                 color: '#F69994',
                },
              }}
            />

            <Radio
              {...controlProps('8')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 80,
                },
                color: '#F26660',
                '&.Mui-checked': {
                 color: '#F26660',
                },
              }}
            />

            <Radio
              {...controlProps('9')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 80,
                },
                color: '#F26660',
                '&.Mui-checked': {
                 color: '#F26660',
                },
              }}
            />

            <Radio
              {...controlProps('10')}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 80,
                },
                color: '#E92623',
                '&.Mui-checked': {
                 color: '#E92623',
                },
              }}
            />

            <Button
                type="submit"
                maxWidth= "45"
                variant="contained"
                sx={{ mt: 4, mb: 2 , ml:33}}
              >
                <Typography variant="h5" fontFamily={'kanit'}>
                ต่อไป
                </Typography>
              </Button>
            </div>
            </Box>

            <Typography style={{display: 'inline-block'}} fontFamily={'kanit'} fontSize={35} marginLeft={4}>0</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>1</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>2</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>3</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>4</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>5</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>6</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>7</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>8</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>9</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={8} fontFamily={'kanit'}>10</Typography>

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
