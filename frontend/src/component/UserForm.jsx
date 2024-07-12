import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ addUser }) => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate form submission
    setTimeout(() => {
      // Assuming addUser is a function that adds the user to the state
      addUser(values);
      resetForm();
      setSubmitting(false);
    }, 500); // Simulating a delay to mimic async behavior
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-sm rounded p-4">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <Field type="text" id="username" name="username" className="form-control" />
              <ErrorMessage name="username" component="div" className="text-danger small" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <Field type="email" id="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger small" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field type="password" id="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger small" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
