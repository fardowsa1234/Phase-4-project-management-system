import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('http://localhost:5555/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const addTask = (task) => {
    fetch('http://localhost:5555/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(response => response.json())
      .then(() => fetchTasks())
      .catch(error => console.error('Error adding task:', error));
  };

  const updateTask = (task) => {
    fetch(`http://localhost:5555/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(response => response.json())
      .then(() => {
        fetchTasks();
        setEditingTask(null);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const deleteTask = (taskId) => {
    fetch(`http://localhost:5555/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => fetchTasks())
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const TaskForm = ({ onTaskAdded, onTaskUpdated, editingTask }) => {
    const initialValues = { name: '', description: '', due_date: '', project_id: '' };

    const validationSchema = Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      due_date: Yup.string().required('Required'),
      project_id: Yup.string().required('Required')  // Use string if project_id is a string, otherwise number if it's a number
    });

    const FormObserver = () => {
      const { setValues } = useFormikContext();

      useEffect(() => {
        if (editingTask) {
          setValues(editingTask);
        }
      }, [setValues]);

      return null;
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
      if (editingTask) {
        onTaskUpdated({ ...values, id: editingTask.id });
      } else {
        onTaskAdded(values);
      }
      resetForm();
      setSubmitting(false);
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-sm rounded px-4 pt-4 pb-4 mb-4">
            <FormObserver />
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-gray-700">
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="form-control"
              />
              <ErrorMessage name="name" component="div" className="text-danger small" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label text-gray-700">
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                className="form-control"
                rows="3"
              />
              <ErrorMessage name="description" component="div" className="text-danger small" />
            </div>
            <div className="mb-3">
              <label htmlFor="due_date" className="form-label text-gray-700">
                Due Date
              </label>
              <Field
                type="date"
                name="due_date"
                className="form-control"
              />
              <ErrorMessage name="due_date" component="div" className="text-danger small" />
            </div>
            <div className="mb-3">
              <label htmlFor="project_id" className="form-label text-gray-700">
                Project ID
              </label>
              <Field
                type="text"
                name="project_id"
                className="form-control"
              />
              <ErrorMessage name="project_id" component="div" className="text-danger small" />
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? 'Submitting...' : editingTask ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h2>
      <ul className="list-group mb-4">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item border-gray-200">
            <div className="px-4 py-4">
              <div className="d-flex justify-content-between">
                <h3 className="text-lg font-weight-bold text-gray-900">{task.name}</h3>
                <p className="mt-1 text-sm text-muted">Description: {task.description}</p>
              </div>
              <p className="mt-1 text-sm text-gray-600">Due Date: {task.due_date}</p>
              <button className="btn btn-secondary btn-sm mr-2" onClick={() => handleEditClick(task)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <TaskForm onTaskAdded={addTask} onTaskUpdated={updateTask} editingTask={editingTask} />
    </div>
  );
}

export default TaskList;
