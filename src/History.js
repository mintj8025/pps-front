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
import './History.css';
import Swal from 'sweetalert2'
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export function App() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  useEffect(() => {
    fetch('http://localhost:7000/history') 
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.results);
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล: ' + error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
  // เพิ่มรหัสที่รีเซ็ต state ของ checkbox ที่นี่
  };

  const slicedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
 
  const [selectAll, setSelectAll] = useState(false);
  const [showDate, setShowDate] = useState(true);
  const [showPatientHN, setShowPatientHN] = useState(true);
  const [showPatientFname, setShowPatientFname] = useState(false);
  const [showPatientLname, setShowPatientLname] = useState(false);
  const [showPatientStatus, setShowPatientStatus] = useState(false);
  const [showPatientVisit, setShowPatientVisit] = useState(false);
  const [showAssessmentStatus, setShowAssessmentStatus] = useState(false);
  const [showNrs, setShowNrs] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showEmotion, setShowEmotion] = useState(false);
  const [showWalk, setShowWalk] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showRelationship, setShowRelationship] = useState(false);
  const [showSleep, setShowSleep] = useState(false);
  const [showHappy, setShowHappy] = useState(false);
  const [showSatisfied, setShowSatisfied] = useState(false);
  const [showBpi, setShowBpi] = useState(false);
  const [showPps, setShowPps] = useState(false);
  const [showSs, setShowSs] = useState(false);
  const [showNv, setShowNv] = useState(false);
  const [showSfi72, setShowSfi72] = useState(false);
  const [showDateOfFirst, setShowDateOfFirst] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showAssessorFname, setShowAssessorFname] = useState(false);
  const [showAssessorLname, setShowAssessorLname] = useState(false);


  const handleChangeCheckbox = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case 'date':
        setShowDate(checked);
        break;
      case 'patientHN':
        setShowPatientHN(checked);
        break;
      case 'patientFname':
        setShowPatientFname(checked);
        break;
      case 'patientLname':
        setShowPatientLname(checked);
        break;
      case 'patientStatus':
        setShowPatientStatus(checked);
        break;
      case 'patientVisit':
        setShowPatientVisit(checked);
        break;
      case 'assessmentStatus':
        setShowAssessmentStatus(checked);
        break;
      case 'nrs':
        setShowNrs(checked);
        break;
      case 'activity':
        setShowActivity(checked);
        break;
      case 'emotion':
        setShowEmotion(checked);
        break;
      case 'walk':
        setShowWalk(checked);
        break;
      case 'work':
        setShowWork(checked);
        break;
      case 'relationship':
        setShowRelationship(checked);
        break;
      case 'sleep':
        setShowSleep(checked);
        break;
      case 'happy':
        setShowHappy(checked);
        break;
      case 'satisfied':
        setShowSatisfied(checked);
        break;
      case 'bpi':
        setShowBpi(checked);
        break;
      case 'pps':
        setShowPps(checked);
        break;
      case 'ss':
        setShowSs(checked);
        break;
      case 'nv':
        setShowNv(checked);
        break;
      case 'sfi72':
        setShowSfi72(checked);
        break;
      case 'dateOfFirst':
        setShowDateOfFirst(checked);
        break;
      case 'duration':
        setShowDuration(checked);
        break;
      case 'assessorFname':
        setShowAssessorFname(checked);
        break;
      case 'assessorLname':
        setShowAssessorLname(checked);
        break;
        case 'selectAll':
          setSelectAll(checked);
          setShowDate(checked);
          setShowPatientHN(checked);
          setShowPatientFname(checked);
          setShowPatientLname(checked);
          setShowPatientStatus(checked);
          setShowPatientVisit(checked);
          setShowAssessmentStatus(checked);
          setShowNrs(checked);
          setShowActivity(checked);
          setShowEmotion(checked);
          setShowWalk(checked);
          setShowWork(checked);
          setShowRelationship(checked);
          setShowSleep(checked);
          setShowHappy(checked);
          setShowSatisfied(checked);
          setShowBpi(checked);
          setShowPps(checked);
          setShowSs(checked);
          setShowNv(checked);
          setShowSfi72(checked);
          setShowDateOfFirst(checked);
          setShowDuration(checked);
          setShowAssessorFname(checked);
          setShowAssessorLname(checked);  
          break;
      default:
        break;
    }
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
            ประวัติการประเมิน
            </Typography>

            <FormGroup aria-label="position" row>
            <FormControlLabel
              control={<Checkbox checked={selectAll} onChange={handleChangeCheckbox} name="selectAll" />}
              label="Select All"
              style={{
                fontWeight: 'bold', // ตัวอย่าง: ทำให้ตัวหนา
                color: 'blue', // ตัวอย่าง: เปลี่ยนสีข้อความเป็นสีน้ำเงิน
                // เพิ่มสไตล์เพิ่มเติมตามต้องการ
              }}            />
            <FormControlLabel
              control={<Checkbox checked={showDate} onChange={handleChangeCheckbox} name="date" />}
              label="Date"
            />
            <FormControlLabel
              control={<Checkbox checked={showPatientHN} onChange={handleChangeCheckbox} name="patientHN" />}
              label="HN"
            />
            <FormControlLabel
              control={<Checkbox checked={showPatientFname} onChange={handleChangeCheckbox} name="patientFname" />}
              label="Firstname"
            />
            <FormControlLabel
              control={<Checkbox checked={showPatientLname} onChange={handleChangeCheckbox} name="patientLname" />}
              label="Lastname"
            />
            <FormControlLabel
              control={<Checkbox checked={showPatientStatus} onChange={handleChangeCheckbox} name="patientStatus" />}
              label="Status"
            />
            <FormControlLabel
              control={<Checkbox checked={showPatientVisit} onChange={handleChangeCheckbox} name="patientVisit" />}
              label="Visit"
            />
            <FormControlLabel
              control={<Checkbox checked={showAssessmentStatus} onChange={handleChangeCheckbox} name="assessmentStatus" />}
              label="Assessment Status"
            />
            <FormControlLabel
              control={<Checkbox checked={showNrs} onChange={handleChangeCheckbox} name="nrs" />}
              label="NRS"
            />
            <FormControlLabel
              control={<Checkbox checked={showActivity} onChange={handleChangeCheckbox} name="activity" />}
              label="กิจกรรม"
            />
            <FormControlLabel
              control={<Checkbox checked={showEmotion} onChange={handleChangeCheckbox} name="emotion" />}
              label="อารมณ์"
            />
            <FormControlLabel
              control={<Checkbox checked={showWalk} onChange={handleChangeCheckbox} name="walk" />}
              label="การเดิน"
            />
            <FormControlLabel
              control={<Checkbox checked={showWork} onChange={handleChangeCheckbox} name="work" />}
              label="งาน"
            />
            <FormControlLabel
              control={<Checkbox checked={showRelationship} onChange={handleChangeCheckbox} name="relationship" />}
              label="ความสัมพันธ์"
            />
            <FormControlLabel
              control={<Checkbox checked={showSleep} onChange={handleChangeCheckbox} name="sleep" />}
              label="การนอน"
            />
            <FormControlLabel
              control={<Checkbox checked={showHappy} onChange={handleChangeCheckbox} name="happy" />}
              label="ความสุข"
            />
            <FormControlLabel
              control={<Checkbox checked={showSatisfied} onChange={handleChangeCheckbox} name="satisfied" />}
              label="ความพึงพอใจ"
            />
            <FormControlLabel
              control={<Checkbox checked={showBpi} onChange={handleChangeCheckbox} name="bpi" />}
              label="BPI"
            />
            <FormControlLabel
              control={<Checkbox checked={showPps} onChange={handleChangeCheckbox} name="pps" />}
              label="PPS"
            />
            <FormControlLabel
              control={<Checkbox checked={showSs} onChange={handleChangeCheckbox} name="ss" />}
              label="SS"
            />
            <FormControlLabel
              control={<Checkbox checked={showNv} onChange={handleChangeCheckbox} name="nv" />}
              label="NV"
            />
            <FormControlLabel
              control={<Checkbox checked={showSfi72} onChange={handleChangeCheckbox} name="sfi72" />}
              label="Sfi72"
            />
            <FormControlLabel
              control={<Checkbox checked={showDateOfFirst} onChange={handleChangeCheckbox} name="dateOfFirst" />}
              label="Date of first visit"
            />
            <FormControlLabel
              control={<Checkbox checked={showDuration} onChange={handleChangeCheckbox} name="duration" />}
              label="Duration"
            />
            <FormControlLabel
              control={<Checkbox checked={showAssessorFname} onChange={handleChangeCheckbox} name="assessorFname" />}
              label="Assessor Firstname"
            />
            <FormControlLabel
              control={<Checkbox checked={showAssessorLname} onChange={handleChangeCheckbox} name="assessorLname" />}
              label="Assessor Lastname"
            />
          </FormGroup>

            <TableContainer component={Paper}>
            <Table>
            <TableHead>
              <TableRow>
                {showDate && <TableCell>Date</TableCell>}
                {showPatientHN && <TableCell>HN</TableCell>}
                {showPatientFname && <TableCell>Firstname</TableCell>}
                {showPatientLname && <TableCell>Lastname</TableCell>}
                {showPatientStatus && <TableCell>Status</TableCell>}
                {showPatientVisit && <TableCell>Visit</TableCell>}
                {showAssessmentStatus && <TableCell>Assessment Status</TableCell>}
                {showNrs && <TableCell>NRS</TableCell>}
                {showActivity && <TableCell>กิจกรรม</TableCell>}
                {showEmotion && <TableCell>อารมณ์</TableCell>}
                {showWalk && <TableCell>การเดิน</TableCell>}
                {showWork && <TableCell>งาน</TableCell>}
                {showRelationship && <TableCell>ความสัมพันธ์</TableCell>}
                {showSleep && <TableCell>การนอน</TableCell>}
                {showHappy && <TableCell>ความสุข</TableCell>}
                {showSatisfied && <TableCell>ความพึงพอใจ</TableCell>}
                {showBpi && <TableCell>BPI</TableCell>}
                {showPps && <TableCell>PPS</TableCell>}
                {showSs && <TableCell>SS</TableCell>}
                {showNv && <TableCell>NV</TableCell>}
                {showSfi72 && <TableCell>Sfi72</TableCell>}
                {showDateOfFirst && <TableCell>Date of first visit</TableCell>}
                {showDuration && <TableCell>Duration</TableCell>}
                {showAssessorFname && <TableCell>Assessor Firstname</TableCell>}
                {showAssessorLname && <TableCell>Assessor Lastname</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {slicedData.sort((a, b) => {
                  if (a.date < b.date) return -1;
                  if (a.date > b.date) return 1;
                  return 0;
                }).map((row) => (
                  <TableRow key={row.date}>
                    {showDate && (
                      <TableCell>
                        {showDate ? new Date(row.date).toLocaleDateString() : null}
                      </TableCell>
                    )}
                    {showPatientHN && (
                      <TableCell>
                        {showPatientHN ? row.patient_HN : null}
                      </TableCell>
                    )}
                    {showPatientFname && (
                      <TableCell>
                        {showPatientFname ? row.patient_fname : null}
                      </TableCell>
                    )}
                    {showPatientLname && (
                      <TableCell>
                        {showPatientLname ? row.patient_lname : null}
                      </TableCell>
                    )}
                    {showPatientStatus && (
                      <TableCell>
                        {showPatientStatus ? row.patient_status : null}
                      </TableCell>
                    )}
                    {showPatientVisit && (
                      <TableCell>
                        {showPatientVisit ? row.patient_visit : null}
                      </TableCell>
                    )}
                    {showAssessmentStatus && (
                      <TableCell>
                        {showAssessmentStatus ? row.assessment_status : null}
                      </TableCell>
                    )}
                    {showNrs && (
                      <TableCell>
                        {showNrs ? row.nrs : null}
                      </TableCell>
                    )}
                    {showActivity && (
                      <TableCell>
                        {showActivity ? row.activity : null}
                      </TableCell>
                    )}
                    {showEmotion && (
                      <TableCell>
                        {showEmotion ? row.emotion : null}
                      </TableCell>
                    )}
                    {showWalk && (
                      <TableCell>
                        {showWalk ? row.walk : null}
                      </TableCell>
                    )}
                    {showWork && (
                      <TableCell>
                        {showWork ? row.work : null}
                      </TableCell>
                    )}
                    {showRelationship && (
                      <TableCell>
                        {showRelationship ? row.relationship : null}
                      </TableCell>
                    )}
                    {showSleep && (
                      <TableCell>
                        {showSleep ? row.sleep : null}
                      </TableCell>
                    )}
                    {showHappy && (
                      <TableCell>
                        {showHappy ? row.happy : null}
                      </TableCell>
                    )}
                    {showSatisfied && (
                      <TableCell>
                        {showSatisfied ? row.satisfied : null}
                      </TableCell>
                    )}
                    {showBpi && (
                      <TableCell>
                        {showBpi ? row.bpi : null}
                      </TableCell>
                    )}
                    {showPps && (
                      <TableCell>
                        {showPps ? row.pps : null}
                      </TableCell>
                    )}
                    {showSs && (
                      <TableCell>
                        {showSs ? row.ss : null}
                      </TableCell>
                    )}
                    {showNv && (
                      <TableCell>
                        {showNv ? row.nv : null}
                      </TableCell>
                    )}
                    {showSfi72 && (
                      <TableCell>
                        {showSfi72 ? row.sfi72 : null}
                      </TableCell>
                    )}
                    {showDateOfFirst && (
                      <TableCell>
                        {showDateOfFirst ? new Date(row.date_of_first).toLocaleDateString() : null}
                      </TableCell>
                    )}
                    {showDuration && (
                      <TableCell>
                        {showDuration ? row.duration : null}
                      </TableCell>
                    )}
                    {showAssessorFname && (
                      <TableCell>
                        {showAssessorFname ? row.assessor_fname : null}
                      </TableCell>
                    )}
                    {showAssessorLname && (
                      <TableCell>
                        {showAssessorLname ? row.assessor_lname : null}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>

            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
