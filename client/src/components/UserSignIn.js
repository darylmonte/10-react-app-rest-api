import React, { useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Form from './Form'
import  { Context }  from '../Context';

const UserSignIn = () => {
  
  const context = useContext(Context);
  let history = useHistory();
  const location = useLocation();
  const [emailAddress, setEmailAddress] = useState(""); 
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
   
  // updates elements values on change event
  const change = (e) =>{
    if (e.target.name === "emailAddress") {
      setEmailAddress(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      return;
    }
  }
    
  // calls data for authenticated users from API 
  const submit = () => {
    const { from } = location.state || {from: { pathname: '/'}};
    context.actions.signIn(emailAddress, password)
      .then(user => {
        if(user === null){
          setErrors(()=> {
            return {errors: ['Sign in was unsuccessful'] };
          });
        } else {
          history.push(from);
          console.log(`SUCCESS! ${emailAddress} is logged in!`);
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      });
  }

  const cancel = () =>{
    history.push('/');
  }


  return(
    <>
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form
            cancel= {cancel}
            errors= {errors}
            submit= {submit}
            submitButtonText = "Sign In"
            elements= {() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value= {emailAddress}
                  onChange={change}
                  placeholder= "Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value= {password}
                  onChange={change}
                  placeholder= "Password" 
                />
              </React.Fragment>
            )}
          />
            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
        </div>
      </main>
    </>
  );
}

export default UserSignIn;