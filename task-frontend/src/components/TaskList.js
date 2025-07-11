import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'LOW',
    status: 'PENDING',
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    axios.get("http://localhost:8080/task")
      .then(response => setTasks(response.data));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8080/task/${id}`).then(() => loadTasks());
  };

  const startEditing = (task) => {
    setEditingTaskId(task.taskId);
    setUpdatedTask(task);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
  };

  const handleUpdateChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const saveUpdate = () => {
    axios.put(`http://localhost:8080/task/${editingTaskId}`, updatedTask)
      .then(() => {
        setEditingTaskId(null);
        loadTasks();
      });
  };

  return (
    <div className="mt-4">
      <h5>All Tasks</h5>
      <table className="table table-bordered mt-2">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            editingTaskId === task.taskId ? (
              <tr key={task.taskId}>
                <td><input name="title" value={updatedTask.title} onChange={handleUpdateChange} className="form-control" /></td>
                <td><input name="description" value={updatedTask.description} onChange={handleUpdateChange} className="form-control" /></td>
                <td><input type="date" name="dueDate" value={updatedTask.dueDate} onChange={handleUpdateChange} className="form-control" /></td>
                <td>
                  <select name="priority" value={updatedTask.priority} onChange={handleUpdateChange} className="form-control">
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                  </select>
                </td>
                <td>
                  <select name="status" value={updatedTask.status} onChange={handleUpdateChange} className="form-control">
                    <option>PENDING</option>
                    <option>IN_PROGRESS</option>
                    <option>COMPLETED</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-success btn-sm me-1" onClick={saveUpdate}>Save</button>
                  <button className="btn btn-secondary btn-sm" onClick={cancelEditing}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={task.taskId}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-1" onClick={() => startEditing(task)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.taskId)}>Delete</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
