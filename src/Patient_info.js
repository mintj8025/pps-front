import React, { useEffect, useState } from 'react';
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
import Swal from 'sweetalert2';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Avatar } from '@mui/material';

const CustomToolbar = (props) => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
    <GridToolbarDensitySelector />
    <CustomExportButton {...props} />
  </GridToolbarContainer>
);

const CustomExportButton = (props) => (
  <GridToolbarExport
    {...props}
    csvOptions={{
      fileName: 'export-ประวัติการประเมิน.csv',
      utf8WithBom: true,
    }}
  />
);

export function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7000/patient_info')
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.results);
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล: ' + error);
      });
  }, []);

  const columns = [
    {
      flex: 0.1,
      minWidth: 100,
      align: 'center',
      renderCell: (params) => <Avatar>{params.row.avatar}</Avatar>,
    },
    { field: 'patient_HN', headerName: 'HN', flex: 1, minWidth: 100 },
    { field: 'patient_fname', headerName: 'Firstname', flex: 1, minWidth: 140 },
    { field: 'patient_lname', headerName: 'Lastname', flex: 1, minWidth: 140 },
    { field: 'patient_status', headerName: 'Status', flex: 1, minWidth: 80 },
    { field: 'patient_visit', headerName: 'Visit', flex: 1, minWidth: 50 },
    {
      field: 'date',
      headerName: 'Last Assessment Date',
      flex: 1,
      minWidth: 170,
      valueGetter: (params) => new Date(params.row.date).toLocaleDateString(),
    },
    {
      field: 'date_of_first',
      headerName: 'Date of first',
      flex: 1,
      minWidth: 100,
      valueGetter: (params) => new Date(params.row.date_of_first).toLocaleDateString(),
    },
    { field: 'duration', headerName: 'Duration', flex: 1, minWidth: 90, align: 'center' },
  ];

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (params) => {
    setSelectedRow(params.row.patient_HN === selectedRow ? null : params.row.patient_HN);
  };


  const [isLoaded, setIsLoaded] = useState(true);
  const [decoded, setAssessor] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://localhost:7000/authen', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok') {
          setAssessor(result.decoded);
          setIsLoaded(false);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Sorry...',
            text: 'Authen failed!',
          }).then((value) => {
            localStorage.removeItem('token');
            window.location = '/login';
          });
        }
        console.log(result);
      })
      .catch((error) => console.log('error', error));
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/login';
  };

  const handleRegister = (event) => {
    window.location = '/register';
  };

  const handleAssPatientFound = (event) => {
    window.location = '/asspatientfound';
  };

  if (isLoaded) return <div>Loading</div>;
  else {
    return (
      <div>
        <div class="fullscreen-block">
          <div class="username">
            <IconButton sx={{ color: 'black' }}>
              <Typography variant="h5" component="div" fontFamily={'lightkanit'}>
                {decoded.assessor_fname} {decoded.assessor_lname}
                <PermIdentityIcon sx={{ fontSize: 35 }} />
              </Typography>
            </IconButton>
          </div>

          <div className='assessmentForm'>
            <Typography component="h1" variant="h3" fontFamily={'kanit'}>
              ประวัติการประเมิน
            </Typography>

            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => row.patient_HN}
              components={{
                Toolbar: CustomToolbar,
              }}
              rowThreshold={0}
              onRowClick={handleRowClick}
            />


            </div>

          <div className='navbar' sx={{position: 'sticky'}}>
          <List sx={{ maxWidth: 180, height: '97.4vh', margin: '0', bgcolor: '#5246E9' }}>
            <div class="profile">
              <IconButton aria-label="Profile">
                <PermIdentityIcon sx={{ fontSize: 40 }} color="disabled" />
              </IconButton>
            </div>

            <div class="home">
              <IconButton aria-label="Home">
                <HomeIcon sx={{ fontSize: 40 }} style={{ color: 'white' }} />
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
                <UpdateIcon sx={{ fontSize: 40 }} style={{ color: 'disabled' }} />
              </IconButton>
            </div>

            <div class="logout">
              <IconButton aria-label="Logout">
                <LogoutIcon onClick={handleLogout} sx={{ fontSize: 40 }} color="disabled" />
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