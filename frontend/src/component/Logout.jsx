import React from 'react';
import axios from 'axios';

const Logout = () => {
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5555/logout');
            alert(response.data.message);
        } catch (error) {
            console.error('Logout Error:', error); // Handle error response
        }
    };

    return (
        <button type="submit" className="btn btn-primary" onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
