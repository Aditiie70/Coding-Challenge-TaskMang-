import React, { useState } from 'react';
import axios from 'axios';

function AddTask() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'LOW',
    status: 'PENDING'
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/task", task)
      .then(() => {
        setTask({ title: '', description: '', dueDate: '', priority: 'LOW', status: 'PENDING' });
        window.location.reload(); 
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5>Add Task</h5>
      <div className="row">
        <div className="col-md-4">
          <input className="form-control mb-2" type="text" name="title" placeholder="Title" value={task.title} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control mb-2" type="text" name="description" placeholder="Description" value={task.description} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <input className="form-control mb-2" type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <select className="form-control mb-2" name="priority" value={task.priority} onChange={handleChange}>
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-control mb-2" name="status" value={task.status} onChange={handleChange}>
            <option>PENDING</option>
            <option>IN_PROGRESS</option>
            <option>COMPLETED</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-success w-100">Add Task</button>
        </div>
      </div>
    </form>
  );
}

export default AddTask;
