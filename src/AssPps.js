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
import './AssPps.css';
import Swal from 'sweetalert2'
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { positions } from '@mui/system';


function App() {

  const [activity, setActivity] = React.useState('0');
  const [emotion, setEmotion] = React.useState('0');
  const [walk, setWalk] = React.useState('0');
  const [work, setWork] = React.useState('0');
  const [relationship, setRelationship] = React.useState('0');
  const [sleep, setSleep] = React.useState('0');
  const [happy, setHappy] = React.useState('0');


  
  const handleActivity = (event) => {
    setActivity(event.target.value);
  };

  const handleEmotion = (event) => {
    setEmotion(event.target.value);
  };

  const handleWalk = (event) => {
    setWalk(event.target.value);
  };

  const handleWork = (event) => {
    setWork(event.target.value);
  };

  const handleRelationship = (event) => {
    setRelationship(event.target.value);
  };
  
  const handleSleep = (event) => {
    setSleep(event.target.value);
  };

  const handleHappy = (event) => {
    setHappy(event.target.value);
  };

  const controlProps1 = (item) => ({
    checked: activity === item,
    onChange: handleActivity,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps2 = (item) => ({
    checked: emotion === item,
    onChange: handleEmotion,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps3 = (item) => ({
    checked: walk === item,
    onChange: handleWalk,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps4 = (item) => ({
    checked: work === item,
    onChange: handleWork,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps5 = (item) => ({
    checked: relationship === item,
    onChange: handleRelationship,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps6 = (item) => ({
    checked: sleep === item,
    onChange: handleSleep,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps7 = (item) => ({
    checked: happy === item,
    onChange: handleHappy,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("activity", JSON.stringify(activity));
    localStorage.setItem("emotion", JSON.stringify(emotion));
    localStorage.setItem("walk", JSON.stringify(walk));
    localStorage.setItem("work", JSON.stringify(work));
    localStorage.setItem("relationship", JSON.stringify(relationship));
    localStorage.setItem("sleep", JSON.stringify(sleep));
    localStorage.setItem("happy", JSON.stringify(happy));
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
                
           <div className='ppsForm'>
           <Typography component="h1" sx={{ fontSize: 30 }} align="center" marginLeft={'20px'} color={'#737B89'} fontFamily={'kanit'}>
           การประเมินว่าใน 7 วันที่ผ่านมา อาการปวดนั้นได้รบกวน
           </Typography>
          
            <Typography component="h1"  sx={{ fontSize: 30 }} align="center" marginLeft={'20px'} color={'#737B89'} fontFamily={'kanit'}>
            การดำเนินชีวิตประจำวันของคนไข้ในด้านต่างๆมากน้อยเพียงใด
            </Typography>

            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            1. กิจกรรมโดยทั่วไป
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <div className='radioActivity'>
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
              {...controlProps1('4')}
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
              {...controlProps1('5')}
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
              {...controlProps1('6')}
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
              {...controlProps1('7')}
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
              {...controlProps1('8')}
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
              {...controlProps1('9')}
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
              {...controlProps1('10')}
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

            <Typography style={{display: 'inline-block'}} fontFamily={'kanit'} fontSize={35} marginLeft={6}>0</Typography>
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

            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            2. อารมณ์
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <div className='radioEmotion'>
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
            
            <Radio
              {...controlProps2('4')}
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
              {...controlProps2('5')}
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
              {...controlProps2('6')}
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
              {...controlProps2('7')}
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
              {...controlProps2('8')}
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
              {...controlProps2('9')}
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
              {...controlProps2('10')}
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

            <Typography style={{display: 'inline-block'}} fontFamily={'kanit'} fontSize={35} marginLeft={6}>0</Typography>
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
            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            3. ความสามารถในการเดิน
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <div className='radioWalk'>
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
            
            <Radio
              {...controlProps3('5')}
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
              {...controlProps3('6')}
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
              {...controlProps3('7')}
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
              {...controlProps3('8')}
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
              {...controlProps3('9')}
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
              {...controlProps3('10')}
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

            <Typography style={{display: 'inline-block'}} fontFamily={'kanit'} fontSize={35} marginLeft={6}>0</Typography>
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

            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            4. งานประจำวัน
            </Typography>
            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            (ทั้งงานประจำนอกบ้านและงานบ้าน)
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <div className='radioWork'>
            <Radio
              {...controlProps4('0')}
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
              {...controlProps4('1')}
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
              {...controlProps4('2')}
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
              {...controlProps4('3')}
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
              {...controlProps4('4')}
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
              {...controlProps4('5')}
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
              {...controlProps4('6')}
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
              {...controlProps4('7')}
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
              {...controlProps4('8')}
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
              {...controlProps4('9')}
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
              {...controlProps4('10')}
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

            <Typography style={{display: 'inline-block'}} fontFamily={'kanit'} fontSize={35} marginLeft={6}>0</Typography>
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
            
            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            5. ความสัมพันธ์กับผู้อื่น
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <div className='radioRelationship'>
            <Radio
              {...controlProps5('0')}
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
              {...controlProps5('1')}
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
              {...controlProps5('2')}
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
              {...controlProps5('3')}
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
              {...controlProps5('4')}
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
              {...controlProps5('5')}
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
              {...controlProps5('6')}
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
              {...controlProps5('7')}
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
              {...controlProps5('8')}
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
              {...controlProps5('9')}
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
              {...controlProps5('10')}
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

            <Typography style={{display: 'inline-block'}} fontFamily={'kanit'} fontSize={35} marginLeft={6}>0</Typography>
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

            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            6. การนอนหลับ
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <div className='radioSleep'>
            <Radio
              {...controlProps6('0')}
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
              {...controlProps6('1')}
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
              {...controlProps6('2')}
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
              {...controlProps6('3')}
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
              {...controlProps6('4')}
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
              {...controlProps6('5')}
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
              {...controlProps6('6')}
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
              {...controlProps6('7')}
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
              {...controlProps6('8')}
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
              {...controlProps6('9')}
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
              {...controlProps6('10')}
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

            <Typography style={{display: 'inline-block'}} fontFamily={'kanit'} fontSize={35} marginLeft={6}>0</Typography>
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
            
            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            7. ความสุขในชีวิตประจำวัน
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <div className='radioSleep'>
            <Radio
              {...controlProps7('0')}
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
              {...controlProps7('1')}
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
              {...controlProps7('2')}
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
              {...controlProps7('3')}
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
              {...controlProps7('4')}
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
              {...controlProps7('5')}
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
              {...controlProps7('6')}
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
              {...controlProps7('7')}
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
              {...controlProps7('8')}
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
              {...controlProps7('9')}
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
              {...controlProps7('10')}
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

            <Typography style={{display: 'inline-block'}} fontFamily={'kanit'} fontSize={35} marginLeft={6}>0</Typography>
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
          </Box>
           </div>

            <div className='navbar' sx={{positions: 'sticky'}}>
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
   </div>
  );
}
}

export default App;
