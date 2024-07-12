import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, useTime, useTransform } from 'framer-motion'; // Ensure this import statement is correct

function ProjectMembersList() {
  const [roles, setRoles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch roles
    fetch('/projects')
      .then(response => response.json())
      .then(data => setRoles(data))
      .catch(error => console.error('Error fetching members:', error));

    // Fetch projects
    fetch('/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));

    // Fetch users
    fetch('/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const refreshRoles = () => {
    fetch('/projects')
      .then(response => response.json())
      .then(data => setRoles(data))
      .catch(error => console.error('Error fetching members:', error));
  };

  const time = useTime();
  const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });

  return (
    <div className="container mt-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Roles</h2>
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {roles.map(members => (
              <li key={members.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-sm font-medium text-indigo-600">
                    {members.user} - {members.project}
                  </p>
                  <div>
                    <span className="badge bg-success">{members.role}</span>
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
                onMembershipAdded={refreshRoles}
              />
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

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    fetch(`/projects/${values.project_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: values.user_id,
        role: values.role
      })
    })
    .then(response => response.json())
    .then(() => {
      onMembersAdded();
      resetForm();
      setSubmitting(false);
    })
    .catch(error => {
      console.error('Error posting members:', error);
      setSubmitting(false);
    });
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
