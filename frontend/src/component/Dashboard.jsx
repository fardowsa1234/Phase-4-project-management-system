import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import { fetchUsers, fetchProjects, fetchTasks, fetchProjectMembers } from './ProjectMembersList'; // Assume these functions fetch data

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);

  useEffect(() => {
    // Fetch data for users, projects, tasks, project members
    const fetchData = async () => {
      const usersData = await fetchUsers();
      const projectsData = await fetchProjects();
      const tasksData = await fetchTasks();
      const membersData = await fetchProjectMembers();

      setUsers(usersData);
      setProjects(projectsData);
      setTasks(tasksData);
      setProjectMembers(membersData);
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <h1 className="mt-4 mb-4">Dashboard</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <Chart data={users} type="pie" />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Projects</h5>
              <Chart data={projects} type="line" />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tasks</h5>
              <Chart data={tasks} type="bar" />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Project Members</h5>
              <Chart data={projectMembers} type="pie" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
