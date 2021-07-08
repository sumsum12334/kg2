import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ListTodos from "./ListTodos";
import { Link } from "react-router-dom";


const LoginStaff = ({setAuth2}) => {
  const [inputs, setLogin] = useState({
    username: "",
    password: ""
  });
  const { username, password } = inputs;

  const onChange = e =>
    setLogin({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async(e) => {
    e.preventDefault();
    try {
      const body = { username, password };
      const response = await fetch(
        "http://localhost:5000/auth/login/staff",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();
      
      if (parseRes.jwtToken){
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth2(true);
      }else{
        setAuth2(false);
      }
    

    } catch (err) {
      console.error(err.message);
    }
  }; 

  // const getStaff = async e => {
  //     try {
  //       const response = await fetch("http://localhost:5000/staff");
  //       const jsonData = await response.json();
  
  //       setLogin(jsonData);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  // };

  return (
      <Fragment>
        <div className="jumbotron mt-5">
        <h1 className="text-center mt-5">Staff Login Page</h1>

          <form onSubmit={onSubmitForm}>
          <label>Username</label>
          <br></br>
          <input
          type="text" 
          name="username"
          placeholder = "username"
          className="form-control mt-3"
          value={username}
          onChange={e => onChange(e)}
          />
          <br></br>
          <label>Password</label>
          <br></br>
          <input
          type="password" 
          name="password"
          placeholder = "password"
          className="form-control mt-3"
          value={password}
          onChange={e => onChange(e)}
          />
          <br></br>
          <br></br>
          <button className="btn btn-success btn-block">Login</button>
          <Link to="/test" className="btn btn-success btn-block"> Cancel </Link>
          <br></br>
         
          </form>
          </div>
        
        
        
      </Fragment>
    );



};
export default LoginStaff;