import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/signup', formData);
      alert('Signup successful!');
      console.log(response.data); // Handle response data as needed
      // Optionally reset form fields
      setFormData({
        username: '',
        email: '',
        password: '',
        bio: ''
      });
    } catch (error) {
      alert('Signup failed. Please try again.');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea
            className="form-control"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
