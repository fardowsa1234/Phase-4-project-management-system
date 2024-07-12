import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './component/UserList';
import UserDetail from './component/UserDetail';
import UserForm from './component/UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const addUser = (user) => {
    console.log('Adding user:', user);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              My App
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add-user" className="nav-link">
                    Add User
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users addUser={addUser} />} />
            <Route path="/add-user" element={<UserForm addUser={addUser} />} />
            <Route path="/user-detail/:id" element={<UserDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Users({ addUser }) {
  return (
    <div>
      <UserForm addUser={addUser} />
      <UserList />
    </div>
  );
}

export default App;
