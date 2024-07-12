import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function LogoutButton() {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout');
      alert(response.data.message);
      // Handle successful logout (e.g., redirect to login page, update state)
      history.push('/login');
    } catch (error) {
      alert('Error logging out');
    }
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
