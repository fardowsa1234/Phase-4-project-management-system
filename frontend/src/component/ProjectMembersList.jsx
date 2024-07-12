import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, useTime, useTransform } from 'framer-motion';

function ProjectMembersList() {
  const [roles, setRoles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('/projects'); // Adjust URL to your backend API endpoint for roles
        if (!response.ok) {
          throw new Error('Failed to fetch roles');
        }
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects'); // Adjust URL to your backend API endpoint for projects
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/users'); // Adjust URL to your backend API endpoint for users
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await fetch('/tasks'); // Adjust URL to your backend API endpoint for tasks
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
    fetchRoles();
    fetchProjects();
    fetchUsers();
  }, []);

  const refreshRoles = () => {
    setRoles(); // Function to refresh roles
  };

  const time = useTime();
  const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });

  return (
    <div className="container mt-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Roles</h2>
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {roles.map(member => (
              <li key={member.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-sm font-medium text-indigo-600">
                    {member.user} - {member.project}
                  </p>
                  <div>
                    <span className="badge bg-success">{member.role}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-4">Add New Members</h3>
              <ProjectMembershipForm
                projects={projects}
                users={users}
                onMembersAdded={refreshRoles}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Display tasks here if needed */}
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-4">Tasks</h3>
              <ul className="list-group">
                {tasks.map(task => (
                  <li key={task.id} className="list-group-item">
                    <p>{task.title}</p>
                    {/* Add more task details if needed */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 order-md-last">
          <motion.div className="example-container d-flex justify-content-center align-items-center" style={{ width: 200, height: 200 }}>
            <motion.div style={{ rotate, width: 50, height: 50, backgroundColor: 'blue' }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProjectMembershipForm({ projects, users, onMembersAdded }) {
  const initialValues = { user_id: '', project_id: '', role: '' };

  const validationSchema = Yup.object({
    user_id: Yup.string().required('Required'),
    project_id: Yup.string().required('Required'),
    role: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch(`/projects/${values.project_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: values.user_id,
          role: values.role
        })
      });
      if (!response.ok) {
        throw new Error('Failed to add member');
      }
      onMembersAdded();
      resetForm();
    } catch (error) {
      console.error('Error adding member:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="user_id" className="form-label">User</label>
            <Field
              as="select"
              name="user_id"
              className="form-select"
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </Field>
            <ErrorMessage name="user_id" component="div" className="text-danger small" />
          </div>
          <div className="mb-3">
            <label htmlFor="project_id" className="form-label">Project</label>
            <Field
              as="select"
              name="project_id"
              className="form-select"
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </Field>
            <ErrorMessage name="project_id" component="div" className="text-danger small" />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <Field
              type="text"
              name="role"
              className="form-control"
            />
            <ErrorMessage name="role" component="div" className="text-danger small" />
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-primary ${isSubmitting ? 'disabled' : ''}`}
            >
              {isSubmitting ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                'Add Membership'
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ProjectMembersList;
