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
import './Home.css';
import Swal from 'sweetalert2'
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

export function App() {
 
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // ส่งคำขอ HTTP ไปยังเซิร์ฟเวอร์ฐานข้อมูลของคุณเพื่อดึงข้อมูล
    fetch('http://localhost:7000/history') // เปลี่ยน URL ตามที่คุณตั้งค่า API
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
  };

  const slicedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

 
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

            <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Patient HN</TableCell>
                  <TableCell>Patient Status</TableCell>
                  <TableCell>Patient Visit</TableCell>
                  <TableCell>NRS</TableCell>
                  <TableCell>Activity</TableCell>
                  <TableCell>Emotion</TableCell>
                  <TableCell>Walk</TableCell>
                  <TableCell>Work</TableCell>
                  <TableCell>Relationship</TableCell>
                  <TableCell>Sleep</TableCell>
                  <TableCell>Happy</TableCell>
                  <TableCell>BPI</TableCell>
                  <TableCell>PPS</TableCell>
                  <TableCell>SS</TableCell>
                  <TableCell>NV</TableCell>
                  <TableCell>Sfi72</TableCell>
                  <TableCell>Date of First</TableCell>
                  <TableCell>Duration</TableCell>
                  {/* เพิ่มคอลัมน์อื่น ๆ ตามต้องการ */}
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedData.map((row) => (
                  <TableRow key={row.date}>
                  <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                    <TableCell>{row.patient_HN}</TableCell>
                    <TableCell>{row.patient_status}</TableCell>
                    <TableCell>{row.patient_visit}</TableCell>
                    <TableCell>{row.nrs}</TableCell>
                    <TableCell>{row.activity}</TableCell>
                    <TableCell>{row.emotion}</TableCell>
                    <TableCell>{row.walk}</TableCell>
                    <TableCell>{row.work}</TableCell>
                    <TableCell>{row.relationship}</TableCell>
                    <TableCell>{row.sleep}</TableCell>
                    <TableCell>{row.happy}</TableCell>
                    <TableCell>{row.bpi}</TableCell>
                    <TableCell>{row.pps}</TableCell>
                    <TableCell>{row.ss}</TableCell>
                    <TableCell>{row.nv}</TableCell>
                    <TableCell>{row.sfi72}</TableCell>
                    <TableCell>{new Date(row.date_of_first).toLocaleDateString()}</TableCell>
                    <TableCell>{row.duration}</TableCell>
                    {/* เพิ่มคอลัมน์อื่น ๆ ตามต้องการ */}
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
