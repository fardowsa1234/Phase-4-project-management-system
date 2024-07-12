import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './component/UserList';
import UserDetail from './component/UserDetail';
import TaskList from './component/TaskList';
import ProjectList from './component/ProjectList';
import ProjectMembershipList from './component/ProjectMembersList';
import UserForm from './component/UserForm';
<<<<<<< HEAD
import ProjectList from './component/ProjectList';
import ProjectMembersList from './component/ProjectMembersList';
import Dashboard from './component/Dashboard';
import TaskList from './component/TaskList';
import SignupForm from './component/Signup';
import LoginForm from './component/Login';
import LogoutButton from './component/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
=======
>>>>>>> dev

function App() {
  const addUser = (user) => {
    console.log('Adding user:', user);
  };

  return (
    <Router>
<<<<<<< HEAD
      <div className="min-h-screen bg-gray-100">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand">
              PMS
            </Link>
=======
      <div className="min-vh-100 bg-custom-light"> {/* Use custom class bg-custom-light */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
          <div className="container">
            <NavLink to="/" className="navbar-brand">My App</NavLink>
>>>>>>> dev
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
<<<<<<< HEAD
=======
               
>>>>>>> dev
                <li className="nav-item">
                  <NavLink to="/tasks" className="nav-link">Tasks</NavLink>
                </li>
                <li className="nav-item">
<<<<<<< HEAD
                  <Link to="/projects" className="nav-link">
                    Projects
                  </Link>
=======
                  <NavLink to="/projects" className="nav-link">Projects</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/memberships" className="nav-link">Memberships</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/add-user" className="nav-link">Add User</NavLink>
>>>>>>> dev
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
<<<<<<< HEAD
            <Route path="/users" element={<Users addUser={addUser} />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/members" element={<ProjectMembersList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/user-detail/:id" element={<UserDetail />} />
            {/* Add more routes for other components as needed */}
=======
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/memberships" element={<ProjectMembershipList />} />
            <Route path="/add-user" element={<UserForm addUser={addUser} />} />
>>>>>>> dev
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
<<<<<<< HEAD
    <div className="row">
      <div className="col-md-8">
        <UserList />
      </div>
      <div className="col-md-4">
        <UserForm addUser={addUser} />
      </div>
=======
    <div className="text-center">
      <h1 className="display-4">Project Management System</h1>
      <p className="lead">Manage your users, tasks, projects, and memberships all in one place.</p>
>>>>>>> dev
    </div>
  );
}

export default App;
