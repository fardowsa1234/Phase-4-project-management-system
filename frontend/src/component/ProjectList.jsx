import React, { useState, useEffect } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', start_date: '', end_date: '' });
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch('http://localhost:5555/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProject) {
      updateProject(editingProject.id, newProject);
    } else {
      createProject(newProject);
    }
  };

  const createProject = (project) => {
    fetch('http://localhost:5555/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(response => response.json())
      .then(data => {
        setProjects([...projects, data]);
        setNewProject({ name: '', description: '', start_date: '', end_date: '' }); // Reset the form
      })
      .catch(error => console.error('Error posting project:', error));
  };

  const updateProject = (id, project) => {
    fetch(`http://localhost:5555/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(response => response.json())
      .then(data => {
        setProjects(projects.map(p => (p.id === id ? data : p)));
        setNewProject({ name: '', description: '', start_date: '', end_date: '' }); // Reset the form
        setEditingProject(null);
      })
      .catch(error => console.error('Error updating project:', error));
  };

  const deleteProject = (id) => {
    fetch(`http://localhost:5555/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => setProjects(projects.filter(p => p.id !== id)))
      .catch(error => console.error('Error deleting project:', error));
  };

  const handleEditClick = (project) => {
    setNewProject(project);
    setEditingProject(project);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 gap-4">
        {projects.map(project => (
          <div key={project.id} className="col mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title h5 font-weight-bold text-gray-900">{project.name}</h3>
                <p className="card-text text-sm text-muted">{project.description}</p>
                <p className="card-text text-sm text-muted">Start Date: {project.start_date}</p>
                <p className="card-text text-sm text-muted">End Date: {project.end_date}</p>
                <button className="btn btn-secondary btn-sm mr-2" onClick={() => handleEditClick(project)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteProject(project.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6">{editingProject ? 'Edit Project' : 'Add a New Project'}</h2>
      <form onSubmit={handleSubmit} className="card shadow-sm p-4">
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label font-weight-bold text-gray-700">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            placeholder="Enter project name"
            value={newProject.name}
            onChange={e => setNewProject({ ...newProject, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectDescription" className="form-label font-weight-bold text-gray-700">Description</label>
          <textarea
            className="form-control"
            id="projectDescription"
            rows="3"
            placeholder="Enter project description"
            value={newProject.description}
            onChange={e => setNewProject({ ...newProject, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label font-weight-bold text-gray-700">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={newProject.start_date}
            onChange={e => setNewProject({ ...newProject, start_date: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label font-weight-bold text-gray-700">End Date</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={newProject.end_date}
            onChange={e => setNewProject({ ...newProject, end_date: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{editingProject ? 'Update Project' : 'Add Project'}</button>
      </form>
    </div>
  );
}

export default ProjectList;
