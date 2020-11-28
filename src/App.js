import './App.css';
import React from 'react';
import Task from './Task.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [tasks, setTasks] = React.useState(() => {
    const loading = window.localStorage.getItem('todoList');
    if (loading)
      return JSON.parse(loading);
    else
      return [];
  });

  React.useEffect(() => {
    window.localStorage.setItem('todoList', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    const el = e.currentTarget;
    const text = el.inputText.value;
    el.inputText.value = "";
    const obj = {
      name: text,
      id: Date.now(),
      status: "pending", //pending, inProgress, completed
    }
    setTasks([...tasks, obj]);
  }

  const [searchText, setSearchText] = React.useState('');
  const [searchFilter, setSearchFilter] = React.useState('all');

  function markTask(taskId) {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        if (t.status === "completed") //UN-Marking task if it is already completed
          t.status = "pending";
        else {
          t.status = "completed";
        }
      }
      return t;
    }));
  }

  function inProgressTask(taskId) {
    setTasks(tasks.map(t => {
      if (t.id === taskId)
        if (t.status === "inProgress") //UN-Marking task if it is already in progress
          t.status = "pending";
        else
          t.status = "inProgress";

      return t;
    }));
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter(t => t.id !== taskId));
  }

  function searchFilterCheck(searchValue, value) {
    return (value.toLowerCase().includes(searchValue.toLowerCase()));
  }

  function Pending() {
    if (searchFilter === "all" || searchFilter === "pending")
      return (
        tasks.filter(t => t.status === "pending").filter(t => searchFilterCheck(searchText, t.name)).map((t, index) => {
          return (
            <li key={t.id} className={`task ${index % 2 !== 0 ? "taskDark" : ""}`}>
              <Task task={t} deleteTask={deleteTask} markTask={markTask} inProgressTask={inProgressTask} icon={faCircle} />
            </li>
          );
        })
      );
    return null;
  }

  function InProgress() {
    if (searchFilter === "all" || searchFilter === "inProgress")
      return (tasks.filter(t => t.status === "inProgress").filter(t => searchFilterCheck(searchText, t.name)).map(t => {
        return (
          <li key={t.id} className={`task inProgress`}>
            <Task task={t} deleteTask={deleteTask} markTask={markTask} inProgressTask={inProgressTask} icon={faExclamationCircle} />
          </li>
        );
      }));
    return null;
  }

  function Completed() {
    if (searchFilter === "all" || searchFilter === "completed")
      return (tasks.filter(t => t.status === "completed").filter(t => searchFilterCheck(searchText, t.name)).map(t => {
        return (
          <li key={t.id} className={`task completed`}>
            <Task task={t} deleteTask={deleteTask} markTask={markTask} inProgressTask={inProgressTask} icon={faCheckCircle} />
          </li>
        );
      }));
    return null;
  }

  function checkIfResultsDontExist() {
    if (
      tasks
        .filter(t => (t.status === searchFilter || searchFilter === "all"))
        .filter(t => searchFilterCheck(searchText, t.name))
        .length === 0
    )
      return true;
    else
      return false;
  }

  return (
    <div className="wrapper">

      <h1>TO DO</h1>
      <div className="inputWrapper">
        <form onSubmit={addTask} autoComplete="off">
          <input type="text" name="inputText" required />
          <button type="submit">ADD</button>
        </form>

        <div className="searchBar">
          <input type="text" name="searchText" onChange={(e) => setSearchText(e.target.value)} />
          <FontAwesomeIcon icon={faSearch} />
        </div>

        <select name="filter" id="filter" onChange={(e) => setSearchFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
        </select>

      </div>

      <ul className="taskHolder">

        <InProgress />
        <Pending />
        <Completed />

      </ul>
      <p className="nothingToShowMessage">{checkIfResultsDontExist() ? "Nothing to show here" : null}</p>
    </div>
  );

} //APP

export default App;