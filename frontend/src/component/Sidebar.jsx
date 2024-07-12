import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faTasks,
  faProjectDiagram,
  faUsersCog
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="../Sidebar.css" className="nav-link">
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            Users
          </a>
        </li>
        <li className="nav-item">
          <a href="../Sidebar.css" className="nav-link">
            <FontAwesomeIcon icon={faTasks} className="me-2" />
            Tasks
          </a>
        </li>
        <li className="nav-item">
          <a href="../Sidebar.css" className="nav-link">
            <FontAwesomeIcon icon={faProjectDiagram} className="me-2" />
            Projects
          </a>
        </li>
        <li className="nav-item">
          <a href="../Sidebar.css" className="nav-link">
            <FontAwesomeIcon icon={faUsersCog} className="me-2" />
            Project Members
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
