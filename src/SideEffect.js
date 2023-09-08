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
import './SideEffect.css';
import Swal from 'sweetalert2'
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function App() {
  
  const [ss, setSs] = React.useState('0');
  const [nv, setNv] = React.useState('0');
  const [sfi72, setSfi72] = React.useState('0');

  const handleSs = (event) => {
    setSs(event.target.value);
  };

  const handleNv = (event) => {
    setNv(event.target.value);
  };

  const handleSfi72 = (event) => {
    setSfi72(event.target.value);
  };

  const controlProps1 = (item) => ({
    checked: ss === item,
    onChange: handleSs,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps2 = (item) => ({
    checked: nv === item,
    onChange: handleNv,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps3 = (item) => ({
    checked: sfi72 === item,
    onChange: handleSfi72,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    const savedNrs = localStorage.getItem('nrs');
    const parsedNrs = JSON.parse(savedNrs);
    const jsonData = {
      nrs: parsedNrs
    }
  fetch('http://localhost:7000/nrstest' , {
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
          icon: 'success',
          title: 'Your register has been saved',
          showConfirmButton: false,
          timer: 2000
          }).then((value) => {
            window.location = '/home'
          })
      }else{
        alert(data.message)
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
                
           <div className='sideEffectForm'>
           <Typography component="h1" sx={{ fontSize: 30 }} align="center" marginLeft={'20px'} color={'#737B89'} fontFamily={'kanit'}>
           ผลข้างเคียง
           </Typography>

            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'10'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            1. Sedation score
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 , ml: 30 }}>
            <div className='radioSedation'>
            <Radio
              {...controlProps1('0')}
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
              {...controlProps1('1')}
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
              {...controlProps1('2')}
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
              {...controlProps1('3')}
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
              {...controlProps1('S')}
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

            </div>

            <div className='label1'>
            <Typography style={{display: 'inline-block'}} fontFamily={'kanit'} fontSize={35} marginLeft={5}>0</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>1</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>2</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>3</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>S</Typography>
            </div>

            <div className='description1'>
            <Typography  fontSize={25} marginTop={2} marginLeft={5} fontFamily={'kanit'}>0 = ตื่นรู้ตัวดี</Typography>
            <Typography  fontSize={25} marginLeft={5} fontFamily={'kanit'}>1 = ง่วงเล็กน้อย</Typography>
            <Typography  fontSize={25} marginLeft={5} fontFamily={'kanit'}>2 = ง่วงปานกลาง ปลุกตื่นง่าย</Typography>
            <Typography  fontSize={25} marginLeft={5} fontFamily={'kanit'}>3 = ง่วงมาก ปลุกไม่ตื่น</Typography>
            <Typography  fontSize={25} marginLeft={5} fontFamily={'kanit'}>S = ไม่ตื่น</Typography>
            </div>

            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'10'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            2. คลื่นไส้ อาเจียน
            </Typography>

            <div className='radioPuke'>
            <Radio
              {...controlProps2('0')}
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
              {...controlProps2('1')}
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
              {...controlProps2('2')}
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
              {...controlProps2('3')}
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
            

            </div>

            <div className='label2'>
            <Typography style={{display: 'inline-block'}} fontFamily={'kanit'} fontSize={35} marginLeft={5}>0</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>1</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>2</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>3</Typography>
            </div>

            <div className='description2'>
            <Typography  fontSize={25} marginTop={2} marginLeft={5} fontFamily={'kanit'}>0 = ไม่มีอาการ</Typography>
            <Typography  fontSize={25} marginLeft={5} fontFamily={'kanit'}>1 = มีอาการเล็กน้อยไม่ต้องการรักษา</Typography>
            <Typography  fontSize={25} marginLeft={5} fontFamily={'kanit'}>2 = มีอาการและต้องการรักษาและสามารถควบคุมอาการได้ด้วยยา</Typography>
            <Typography  fontSize={25} marginLeft={5} fontFamily={'kanit'}>3 = มีอาการและต้องการรักษาและไม่สามารถควบคุมได้ด้วยยา</Typography>
            </div>

            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'10'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            3. ท้องผูก (sfi72)
            </Typography>

            <div className='radioSfi72'>
            <Radio
              {...controlProps3('0')}
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
              {...controlProps3('1')}
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
              {...controlProps3('2')}
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
              {...controlProps3('3')}
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
              {...controlProps3('4')}
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

            </div>

            <div className='label3'>
            <Typography style={{display: 'inline-block'}} fontFamily={'kanit'} fontSize={35} marginLeft={5}>0</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>1</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>2</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>3</Typography>
            <Typography style={{display: 'inline-block'}} fontSize={35} marginLeft={10} fontFamily={'kanit'}>4</Typography>
            </div>

            <div className='description3'>
            <Typography  fontSize={25} marginTop={2} marginLeft={5} fontFamily={'kanit'}>0 = มีการถ่ายอุจจาระภายใน 72 ชั่วโมงที่ผ่านมา</Typography>
            <Typography  fontSize={25} marginLeft={5} fontFamily={'kanit'}>1 = ไม่มีอาการถ่ายอุจจาระกายใน 72 ชั่วโมงที่ผ่านมา (ท้องผูกเล็กน้อย)</Typography>
            <Typography  fontSize={25} marginLeft={5} fontFamily={'kanit'}>2 = ไม่มีการถ่ายอุจจาระภายใน 72 ชั่วโมงถึงแม้ว่าจะได้รับยาระบาย 3 ชนิด</Typography>
            <Typography  fontSize={25} marginLeft={5} fontFamily={'kanit'}>3 = ไม่มีการถ่ายอุจจาระภายใน 72 ชั่วมโมงถึงแม้ว่าจะได้รับยาระบายมากกว่า 3 ชนิดขึ้นไป</Typography>
            <Typography  fontSize={25} marginLeft={5} fontFamily={'kanit'}>4 = ไม่มีการถ่ายอุจจาระและมีอาการท้องอืดถึงแม้ว่าจะได้รับยาระบายทั้งหมด</Typography>
            </div>

            <Button
                type="submit"
                maxWidth= "45"
                variant="contained"
                sx={{ mt: 4, mb: 2 , ml:33}}
              >
                <Typography variant="h5" fontFamily={'kanit'}>
                  ประเมิน
                </Typography>
              </Button>
          </Box>
           </div>

            <div className='navbar' sx={{position: 'sticky'}}>
            <List sx={{maxWidth: 180 , height: '97.4vh' , margin: '0' , bgcolor: '#5246E9' }}>           
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
   </div>
  );
}
}

export default App;
