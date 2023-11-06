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
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function App() {
  
  const [movement, setMovement] = React.useState(0);
  const [activityAndDisease, setActivityAndDisease] = React.useState(0);
  const [dailyRoutines, setDailyRoutines] = React.useState(0);
  const [eating, setEating] = React.useState(0);
  const [awareness, setAwareness] = React.useState(0);

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

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, ml: 0 }}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Typography component="h1" variant="h3" sx={{ fontSize: 30, fontFamily: 'lightKanit', width: '50%' }}>
              1. การเคลื่อนไหว
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 300, width: '50%' }}>
              <InputLabel id="demo-simple-select-label-movement" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>การเคลื่อนไหว</InputLabel>
              <Select
                labelId="demo-simple-select-label-movement"
                id="demo-simple-select-movement"
                value={movement}
                label="การเคลื่อนไหว"
                sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                onChange={handleMovement}
              >
                <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>Select</MenuItem>
                <MenuItem value={1} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>เคลื่อนไหวปกติ</MenuItem>
                <MenuItem value={2} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ความสามารถในการเคลื่อนไหวลดลง</MenuItem>
                <MenuItem value={3} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>นั่งหรือนอนเป็นส่วนใหญ่</MenuItem>
                <MenuItem value={4} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>นอนอยู่บนเตียงเป็นส่วนใหญ่</MenuItem>
                <MenuItem value={5} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>นอนอยู่บนเตียงตลอดเวลา</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Typography component="h1" variant="h3" sx={{ fontSize: 30, fontFamily: 'lightKanit', width: '50%' }}>
              2. การปฏิบัติกิจกรรมและการดำเนินโรค
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 300, width: '50%' }}>
            <InputLabel id="demo-simple-select-label-activity" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>การปฏิบัติกิจกรรมและการดำเนินโรค</InputLabel>
            <Select
              labelId="demo-simple-select-label-activity"
              id="demo-simple-select-activity"
              value={activityAndDisease}
              label="การปฏิบัติกิจกรรมและการดำเนินโรค"
              sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
              onChange={handleActivityAndDisease}
            >
              {movement === 1 ? (
                <>
                  <MenuItem value={1} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ทำกิจกรรมและทำงานได้ตามปกติและไม่มีอาการของโรค</MenuItem>
                  <MenuItem value={2} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ทำกิจกรรมและทำงานได้ตามปกติและมีอาการของโรคบางอาการ</MenuItem>
                  <MenuItem value={3} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องออกแรงอย่างมากในการทำกิจกรรมตามปกติและมีอาการของโรคบางอาการ</MenuItem>
                  <MenuItem value={4} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ไม่สามารถทำงานได้ตามปกติและมีอาการของโรคอย่างมาก</MenuItem>
                  <MenuItem value={5} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ไม่สามารถทำงานอดิเรกหรืองานบ้านได้และมีอาการของโรคอย่างมาก</MenuItem>
                  <MenuItem value={6} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ไม่สามารถทำงานได้เลยและมีการลุกลามของโรค</MenuItem>
                  <MenuItem value={7} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค</MenuItem>
                  <MenuItem value={8} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค</MenuItem>
                </>
              ) : movement === 2 ? (
                <>
                  <MenuItem value={4} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ไม่สามารถทำงานได้ตามปกติและมีอาการของโรคอย่างมาก</MenuItem>
                  <MenuItem value={5} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ไม่สามารถทำงานอดิเรกหรืองานบ้านได้และมีอาการของโรคอย่างมาก</MenuItem>
                  <MenuItem value={6} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ไม่สามารถทำงานได้เลยและมีการลุกลามของโรค</MenuItem>
                  <MenuItem value={7} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค</MenuItem>
                  <MenuItem value={8} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค</MenuItem>
                </>
              ) : movement === 3 ? (
                <>
                  <MenuItem value={6} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ไม่สามารถทำงานได้เลยและมีการลุกลามของโรค</MenuItem>
                  <MenuItem value={7} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค</MenuItem>
                  <MenuItem value={8} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค</MenuItem>
                </>
               ) : movement === 4 ? (
                <>
                  <MenuItem value={7} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค</MenuItem>
                  <MenuItem value={8} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค</MenuItem>
                </>
               ) : movement === 5 ? (
                <>
                  <MenuItem value={8} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ไม่สามารถทำงานอดิเรกหรืองานบ้านได้และมีอาการของโรคอย่างมาก</MenuItem>
                </>
              ) : (
                <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>Select above first</MenuItem>
              )}
            </Select>
          </FormControl>
          </Box>

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Typography component="h1" variant="h3" sx={{ fontSize: 30, fontFamily: 'lightKanit', width: '50%' }}>
              3. การทำกิจกรรมประจำวัน
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 300, width: '50%' }}>
              <InputLabel id="demo-simple-select-label-daily" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>การทำกิจกรรมประจำวัน</InputLabel>
              <Select
                labelId="demo-simple-select-label-daily"
                id="demo-simple-select-daily"
                value={dailyRoutines}
                label="การทำกิจกรรมประจำวัน"
                sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                onChange={handleDailyRoutines}
              >
                 {activityAndDisease === 1 || activityAndDisease === 2 || activityAndDisease === 3 || activityAndDisease === 4 ? (
                <>
                  <MenuItem value={1} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ทำได้เอง</MenuItem>
                  <MenuItem value={2} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการช่วยเหลือเป็นบางครั้ง/บางเรื่อง</MenuItem>
                  <MenuItem value={3} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการความช่วยเหลือมากขึ้น</MenuItem>
                  <MenuItem value={4} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการความช่วยเหลือเป็นส่วนใหญ่</MenuItem>
                  <MenuItem value={5} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการความช่วยเหลือทั้งหมด</MenuItem>
                </>
              ) : activityAndDisease === 5 ? (
                <>
                  <MenuItem value={2} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการช่วยเหลือเป็นบางครั้ง/บางเรื่อง</MenuItem>
                  <MenuItem value={3} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการความช่วยเหลือมากขึ้น</MenuItem>
                  <MenuItem value={4} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการความช่วยเหลือเป็นส่วนใหญ่</MenuItem>
                  <MenuItem value={5} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการความช่วยเหลือทั้งหมด</MenuItem>
                </>
               ) : activityAndDisease === 6 ? (
                <>
                  <MenuItem value={3} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการความช่วยเหลือมากขึ้น</MenuItem>
                  <MenuItem value={4} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการความช่วยเหลือเป็นส่วนใหญ่</MenuItem>
                  <MenuItem value={5} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการความช่วยเหลือทั้งหมด</MenuItem>
                </>
               ) : activityAndDisease === 7 ? (
                <>
                  <MenuItem value={4} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการความช่วยเหลือเป็นส่วนใหญ่</MenuItem>
                  <MenuItem value={5} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการความช่วยเหลือทั้งหมด</MenuItem>
                </>
               ) : activityAndDisease === 8 ? (
                <>
                  <MenuItem value={5} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ต้องการความช่วยเหลือทั้งหมด</MenuItem>
                </>
              ) : (
                <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>Select above first</MenuItem>
              )}
              </Select>
            </FormControl>
          </Box>

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Typography component="h1" variant="h3" sx={{ fontSize: 30, fontFamily: 'lightKanit', width: '50%' }}>
              4. การรับประทานอาหาร
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 300, width: '50%' }}>
              <InputLabel id="demo-simple-select-label-eating" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>การรับประทานอาหาร</InputLabel>
              <Select
                labelId="demo-simple-select-label-eating"
                id="demo-simple-select-eating"
                value={eating}
                label="การรับประทานอาหาร"
                sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                onChange={handleEating}
              >
                {dailyRoutines === 1 && (activityAndDisease === 1 || activityAndDisease === 2) ? (
                <>
                <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>Select</MenuItem>
                <MenuItem value={1} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ปกติ</MenuItem>
                <MenuItem value={2} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}> ปกติ หรือ ลดลง</MenuItem>
                <MenuItem value={3} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>จิบน้ำได้เล็กน้อย</MenuItem>
                <MenuItem value={4} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>รับประทานอาหารทางปากไม่ได้</MenuItem>
                </>
              ) : (
                <>
                <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>Select</MenuItem>
                <MenuItem value={2} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}> ปกติ หรือ ลดลง</MenuItem>
                <MenuItem value={3} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>จิบน้ำได้เล็กน้อย</MenuItem>
                <MenuItem value={4} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>รับประทานอาหารทางปากไม่ได้</MenuItem>
                </>
              )}
              </Select>
            </FormControl>
          </Box>

          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Typography component="h1" variant="h3" sx={{ fontSize: 30, fontFamily: 'lightKanit', width: '50%' }}>
              5. ระดับความรู้สึกตัว
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 300, width: '50%' }}>
              <InputLabel id="demo-simple-select-label-awareness" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ระดับความรู้สึกตัว</InputLabel>
              <Select
                labelId="demo-simple-select-label-awareness"
                id="demo-simple-select-awareness"
                value={awareness}
                label="ระดับความรู้สึกตัว"
                sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                onChange={handleAwareness}
              >
              {(eating === 1 && dailyRoutines === 1) || (eating === 2 && dailyRoutines === 1) ? (
                <>
                <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>Select</MenuItem>
                <MenuItem value={1} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>รู้สึกตัวดี</MenuItem>
                <MenuItem value={2} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>รู้สึกตัวดี หรือ สับสน</MenuItem>
                <MenuItem value={3} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>รู้สึกตัวดี หรือ ง่วงซึม +/-สับสน</MenuItem>
                <MenuItem value={4} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ง่วงซึมหรือไม่รู้สึกตัว +/-สับสน</MenuItem>
                </>
              ) : (eating === 2 || eating === 3) && (dailyRoutines === 4 || dailyRoutines === 5) ? (
                <>
                <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>Select</MenuItem>
                <MenuItem value={3} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>รู้สึกตัวดี หรือ ง่วงซึม +/-สับสน</MenuItem>
                  </>
              ) : eating === 4 ? (
                <>
                <MenuItem value={4} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>ง่วงซึมหรือไม่รู้สึกตัว +/-สับสน</MenuItem>
                </>
              ) : (
                <>
                <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>Select</MenuItem>
                <MenuItem value={2} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>รู้สึกตัวดี หรือ สับสน</MenuItem>
                <MenuItem value={3} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>รู้สึกตัวดี หรือ ง่วงซึม +/-สับสน</MenuItem>
                </>
              )}
              </Select>
            </FormControl>
          </Box>
          

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
