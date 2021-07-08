import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";
import InputTodo from "./InputTodo";


const Client = ({setAuth1}) => {
  const [todos, setTodos] = useState([]);
  const [sonumber, setSearch] = useState("");
  const [username, setName] = useState("");
  
  //delete todo function
//This function can delete it
  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(test => test.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
//get the company's info by using the username 
  const getTodos = async (username) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/company/${username}`);
      const jsonData = await response.json();
      //console.log(jsonData);

      setTodos(jsonData);
     
      //console.log(todos);
    } catch (err) {
      console.error(err.message);
    }
  };
//get the username from the login page
  const getUser = async () =>{
    try {
      const res = await fetch("http://localhost:5000/dashboard/client", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      
      setName(parseData.username);
      
      
    } catch (err) {
      console.error(err.message);
    }
  };
//reset button 
  const reset = async ()=>{
    try {
      
      const response1 = await fetch(`http://localhost:5000/todos/company/${username}`);
      const jsonData1 = await response1.json();

      setTodos(jsonData1);
    } catch (err) {
      console.error(err.message);
    }
  }
//search function by using username and sonumber
  const getsonumber = async (username,sonumber) => {
    try {
      
      const response1 = await fetch(`http://localhost:5000/${username}/${sonumber}`);
      const jsonData1 = await response1.json();

      setTodos(jsonData1);
    } catch (err) {
      console.error(err.message);
    }
  };
//logout button
  const logout = async e =>{
    try {
      e.preventDefault();
      localStorage.removeItem("token");
      setAuth1(false);
      
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUser();
    getTodos(username);
  }, [username]);

  //console.log(todos);
  return (
    <Fragment>
      {" "}
      <p align="right">
//     logout part
      <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
      </button>
      </p>
      <br></br>
//    search part
      <label>Search SO number:</label>
      <input
        type="text" 
        name="search"
        placeholder = "Search here"
        className="form-control"
        value={sonumber}
        onChange={e => setSearch(e.target.value)}
      />
       
      <button onClick={() => getsonumber(username,sonumber) }className="btn btn-primary">
        Search
      </button>

      <button onClick={() => reset() }className="btn btn-primary ml-3">
        Reset
      </button>
      
      //listtodo part
      <table class="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th>SO number</th>
            <th>AWB</th>
            <th>Date 日期</th>
            
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}

          {todos.map(test => (
            <tr key={test.todo_id}>
              <td>{test.sonumber}</td>
              <td>{test.awh}</td>
              <td>{test.pdate}</td>
           
            </tr>
          ))}
        </tbody>
      </table>
      
    </Fragment>
  );
};

export default Client;
