import React, { useContext } from 'react';

import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createWithEmailPassword, handleGoogleSignIn, handleGoogleSignOut, initializeFirebaseFramework, signInWithEmailPassword } from './loginManager';


initializeFirebaseFramework();
const Login = () => {
    const [newUser,setNewUser]=useState(false);
    const [user,setUser]=useState({
        isSignedIn:false,
        name:'',
        email:'',
        photo:'',
        
    })
    
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
    
    const GoogleSignIn=()=>{
        handleGoogleSignIn()
        .then(res=>{
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);
        })
    }

    const GoogleSignOut=()=>{
        handleGoogleSignOut()
        .then(res=>{
            setUser(res);
            setLoggedInUser(res);
        })
    }
    
    const handleBlur=(e)=>{
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
          }
          if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber =  /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
          }
          if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
          }
    }
    const handleSubmit=(e)=>{
        if(newUser && user.email && user.password){
            createWithEmailPassword(user.name,user.email,user.password)
            .then(res=>{
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);

            })
        }
        if(!newUser && user.email && user.password){
            
              signInWithEmailPassword(user.email,user.password)
              .then(res=>{
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);

              })
            
          }
e.preventDefault();
    }
    
    return (
        <div>
            {
                user.isSignedIn?<button onClick={GoogleSignOut}>SignOut</button>:<button onClick={GoogleSignIn}>SignIn</button>
            }
            
            {
                user.isSignedIn && <div>
                    <p>Welcome {user.name}</p> 
                    <p>Email: {user.email}</p>
                    <img src={user.photo} alt=""/>

                         </div>
            }
            {/* <div>
                <p>Name:{user.name}</p>
                <p>Email:{user.email}</p>
                <p>Password:{user.password}</p>
            </div> */}
            <br/>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
            <label htmlFor="newUser">New User Sign up</label>
            <form onSubmit={handleSubmit}>
            { newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
            <br/>
                <input name="email" type="text" onBlur={handleBlur} placeholder="Your email"/>
                <br/>
                <input type="password" name="password" onBlur={handleBlur} placeholder="Password"/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
            {
                user.success?<p style={{color:'green'}}>user {newUser?'created':'logged in'} successfully</p>:<p style={{color:'red'}}>{user.error}</p>
            }
            
        </div>
    );
};

export default Login;