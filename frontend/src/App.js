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

function App() {
  const addUser = (user) => {
    console.log('Adding user:', user);
  };

  return (
    <Router>
      <div className="min-vh-100 bg-custom-light"> {/* Use custom class bg-custom-light */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
          <div className="container">
            <NavLink to="/" className="navbar-brand">My App</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
               
                <li className="nav-item">
                  <NavLink to="/tasks" className="nav-link">Tasks</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/projects" className="nav-link">Projects</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/memberships" className="nav-link">Memberships</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/add-user" className="nav-link">Add User</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/memberships" element={<ProjectMembershipList />} />
            <Route path="/add-user" element={<UserForm addUser={addUser} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="text-center">
      <h1 className="display-4">Welcome to My App</h1>
      <p className="lead">Manage your users, tasks, projects, and memberships all in one place.</p>
    </div>
  );
}

export default App;