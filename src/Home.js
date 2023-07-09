import React, {useEffect} from 'react';
import Button from '@mui/material/Button';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('https://enchanting-fatigues-bull.cyclic.app/authen' , {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
      },
  })
  .then(response => response.json())
  .then(data => {
      if(data.status == 'ok'){
       //   alert('authen sucess')
      }else{
          alert('authen failed')
          localStorage.removeItem('token');
          window.location = '/login'
      }
  })
  .catch((error) => {
      console.error('Error:', error);
  })
  }, [])

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/login'
  }

  return (
   <div>
      <Button variant="contained">Home</Button>    
      <Button variant="contained" onClick={handleLogout}>Logout</Button>    
   </div>
  );
}

export default App;
