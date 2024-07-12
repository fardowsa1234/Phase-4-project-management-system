import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './component/UserList';
import UserDetail from './component/UserDetail';
import UserForm from './component/UserForm';
import ProjectList from './component/ProjectList';
import ProjectMembersList from './component/ProjectMembersList';
import Dashboard from './component/Dashboard';
import TaskList from './component/TaskList';
import SignupForm from './component/Signup';
import LoginForm from './component/Login';
import LogoutButton from './component/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const addUser = (user) => {
    console.log('Adding user:', user);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand">
              My App
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/projects" className="nav-link">
                    Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tasks" className="nav-link">
                    Tasks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/members" className="nav-link">
                    Project Members
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <LogoutButton />
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/users" element={<Users addUser={addUser} />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/members" element={<ProjectMembersList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/user-detail/:id" element={<UserDetail />} />
            {/* Add more routes for other components as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Users({ addUser }) {
  return (
    <div className="row">
      <div className="col-md-8">
        <UserList />
      </div>
      <div className="col-md-4">
        <UserForm addUser={addUser} />
      </div>
    </div>
  );
}

export default App;
