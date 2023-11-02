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
import './AssPPS.css';
import Swal from 'sweetalert2'
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';

function App() {
  
  const [movement, setMovement] = React.useState('90');
  const [activityAndDisease, setActivityAndDisease] = React.useState('90');
  const [dailyRoutines, setDailyRoutines] = React.useState('90');
  const [eating, setEating] = React.useState('90');
  const [awareness, setAwareness] = React.useState('90');

  const handleMovement = (event) => {
    setMovement(event.target.value);
  };

  const handleActivityAndDisease = (event) => {
    setActivityAndDisease(event.target.value);
  };

  const handleDailyRoutines = (event) => {
    setDailyRoutines(event.target.value);
  };

   const handleEating = (event) => {
    setEating(event.target.value);
  };

  const handleAwareness = (event) => {
    setAwareness(event.target.value);
  };

 
  const [decoded2, setPatient] = useState([]);
  
  useEffect(() => {
    const token2 = localStorage.getItem('token2');
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
        if (data.status === 'ok') {
          setPatient(data.decoded2);
          console.log(decoded2);
        }
      })
      .catch(error => console.log('error', error));
  }, [decoded2]); // เพิ่ม decoded2 เข้าไปในอาร์เรย์นี้  


const handleSubmit = async (event) => {
    event.preventDefault();
    const savedNrs = localStorage.getItem('nrs');
    const parsedNrs = JSON.parse(savedNrs);
    const savedActivity = localStorage.getItem('activity');
    const parsedActivity = JSON.parse(savedActivity);
    const savedEmotion = localStorage.getItem('emotion');
    const parsedEmotion = JSON.parse(savedEmotion);
    const savedWalk = localStorage.getItem('walk');
    const parsedWalk = JSON.parse(savedWalk);
    const savedWork = localStorage.getItem('work');
    const parsedWork = JSON.parse(savedWork);
    const savedRelationship = localStorage.getItem('relationship');
    const parsedRelationship = JSON.parse(savedRelationship);
    const savedSleep = localStorage.getItem('sleep');
    const parsedSleep = JSON.parse(savedSleep);
    const savedHappy = localStorage.getItem('happy');
    const parsedHappy = JSON.parse(savedHappy);
    const savedSs = localStorage.getItem('ss');
    const parsedSs = JSON.parse(savedSs);
    const savedNv = localStorage.getItem('nv');
    const parsedNv = JSON.parse(savedNv);
    const savedSfi72 = localStorage.getItem('sfi72');
    const parsedSfi72 = JSON.parse(savedSfi72);
    const savedSatisfied = localStorage.getItem('satisfied');
    const parsedSatisfied = JSON.parse(savedSatisfied);
    const jsonData = {
      patient_HN: decoded2.patient_HN,
      patient_fname: decoded2.patient_fname,
      patient_lname: decoded2.patient_lname,
      patient_status: decoded2.patient_status,
      patient_visit: decoded2.patient_visit,
      nrs: parsedNrs,
      activity: parsedActivity,
      emotion: parsedEmotion,
      walk: parsedWalk,
      work: parsedWork,
      relationship: parsedRelationship,
      sleep: parsedSleep,
      happy: parsedHappy,
      satisfied: parsedSatisfied,
      movement: movement,
      activityAndDisease: activityAndDisease,
      dailyRoutines: dailyRoutines,
      eating: eating,
      awareness: awareness, 
      ss: parsedSs,
      nv: parsedNv,
      sfi72: parsedSfi72,   
      assessor_fname: decoded.assessor_fname,
      assessor_lname: decoded.assessor_lname,
      assessment_status: "ยังไม่บันทึกออกจากระบบ"
    }
  fetch('http://localhost:7000/assessment' , {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
  })
  .then(response => response.json())
  .then(data => {
      if(data.status === 'pps100'){
        Swal.fire({
          icon: 'success',
          title: 'Your register has been saved',
          showConfirmButton: false,
          timer: 2000
          }).then((value) => {
            window.location = '/pps100'
          })
      }else if(data.status === 'pps90'){    
        Swal.fire({
          icon: 'success',
          title: 'Your register has been saved',
          showConfirmButton: false,
          timer: 2000
          }).then((value) => {
            window.location = '/pps90'
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

            <div className='ppsForm'>
            <Typography component="h1" variant="h3" x={{ fontSize: 35 }} fontFamily={'kanit'}>
            แบบประเมินระดับผู้ป่วยที่ได้รับการดูแลแบบประคับประคอง 
            </Typography>
          
            <Typography component="h1"  sx={{ fontSize: 35 }} fontFamily={'kanit'} marginTop={2}>
            ( Palliative Performance Scale for adult Suandok )
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 , ml: 30 }}>
            <div className="radioGroupsContainer">
            <div className="radioGroup">
            <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group-movement">การเคลื่อนไหว</FormLabel>
            <RadioGroup
              className="radioGroup" 
              aria-labelledby="demo-controlled-radio-buttons-group-movement"
              name="controlled-radio-buttons-group-movement"
              value={movement}
              onChange={handleMovement}
            >
              <FormControlLabel className="radioLabel" value="100" control={<Radio />} label="เคลื่อนไหวปกติ" style={{ fontFamily: 'kanit', fontSize: '16' }} />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ความสามารถในการเคลื่อนไหวลดลง" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="นั่งหรือนอนเป็นส่วนใหญ่" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="นอนอยู่บนเตียงตลอดเวลา" />
            </RadioGroup>
          </FormControl>
          </div>

          <div className="radioGroup">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group-activity">การปฏิบัติกิจกรรมและการดำเนินโรค</FormLabel>
            <RadioGroup
              className="radioGroup" 
              aria-labelledby="demo-controlled-radio-buttons-group-activity"
              name="controlled-radio-buttons-group-activity"
              value={activityAndDisease}
              onChange={handleActivityAndDisease}
            >
              <FormControlLabel className="radioLabel" value="100" control={<Radio />} label="ทำกิจกรรมและทำงานได้ตามปกติและไม่มีอาการของโรค" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ทำกิจกรรมและทำงานได้ตามปกติและมีอาการของโรคบางอาการ" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ต้องออกแรงอย่างมากในการทำกิจกรรมตามปกติและมีอาการของโรคบางอาการ" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ไม่สามารถทำงานได้ตามปกติและมีอาการของโรคอย่างมาก" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ไม่สามารถทำงานอดิเรกหรืองานบ้านได้และมีอาการของโรคอย่างมาก" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ไม่สามารถทำงานได้เลยและมีการลุกลามของโรค" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค" />
            </RadioGroup>
          </FormControl>
          </div>

          <div className="radioGroup">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group-daily">การกิจกรรมประจำวัน</FormLabel>
            <RadioGroup
              className="radioGroup" 
              aria-labelledby="demo-controlled-radio-buttons-group-daily"
              name="controlled-radio-buttons-group-daily"
              value={dailyRoutines}
              onChange={handleDailyRoutines}
            >
              <FormControlLabel className="radioLabel" value="100" control={<Radio />} label="ทำได้เอง" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ต้องการช่วยเหลือเป็นบางครั้ง/บางเรื่อง" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ต้องการความช่วยเหลือมากขึ้น" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ต้องการความช่วยเหลือเป็นส่วนใหญ่" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ต้องการความช่วยเหลือทั้งหมด" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ต้องการความช่วยเหลือเป็นส่วนใหญ่" />
            </RadioGroup>
          </FormControl>
          </div>

          <div className="radioGroup">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group-eating">การรับประทานอาหาร</FormLabel>
            <RadioGroup
              className="radioGroup" 
              aria-labelledby="demo-controlled-radio-buttons-group-eating"
              name="controlled-radio-buttons-group-eating"
              value={eating}
              onChange={handleEating}
            >
              <FormControlLabel className="radioLabel" value="100" control={<Radio />} label="ปกติ" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ปกติ หรือ ลดลง" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="จิบน้ำได้เล็กน้อย" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="รับประทานอาหารทางปากไม่ได้" />
            </RadioGroup>
          </FormControl>
          </div>

          <div className="radioGroup">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group-awareness">การรับประทานอาหาร</FormLabel>
            <RadioGroup
              className="radioGroup" 
              aria-labelledby="demo-controlled-radio-buttons-group-awareness"
              name="controlled-radio-buttons-group-awareness"
              value={awareness}
              onChange={handleAwareness}
            >
              <FormControlLabel className="radioLabel" value="100" control={<Radio />} label="รู้สึกตัวดี" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="รู้สึกตัวดี หรือ สับสน" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="รู้สึกตัวดี หรือ ง่วงซึม +/-สับสน" />
              <FormControlLabel className="radioLabel" value="90" control={<Radio />} label="ง่วงซึมหรือไม่รู้สึกตัว +/-สับสน" />
            </RadioGroup>
          </FormControl>
          </div>
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
