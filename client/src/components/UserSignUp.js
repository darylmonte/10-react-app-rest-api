import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from './Form';
import { Context } from '../Context';

const UserSignUp = ()=> {
    
   let history = useHistory();
   const context = useContext(Context);
   const [firstName, setFirstName] = useState();
   const [lastName, setLastName] = useState();
   const [emailAddress, setEmailAddress] = useState();
   const [password, setPassword] = useState();
   const [confirmPassword, setConfirmPassword] = useState();
   const [errors, setErrors] = useState([]);

   const change = (e) => {
      if (e.target.name === 'firstName') {
         setFirstName(e.target.value);
      } else if (e.target.name === 'lastName') {
         setLastName(e.target.value);
      } else if (e.target.name === 'emailAddress') {
         setEmailAddress(e.target.value);
      } else if (e.target.name === 'password') {
         setPassword(e.target.value);
      } else if (e.target.name === 'confirmPassword') {
         setConfirmPassword(e.target.value);
      } else {
         return;
      }
   }

   const submit = () =>{
      const user =     {  
         firstName,
         lastName,
         emailAddress,
         password,
         confirmPassword,
         errors
      };

      context.data.createUser(user)
         .then(errors => {
            if(errors.length){
               setErrors(errors);
            } else {
               context.actions.signIn(emailAddress, password)
               .then(() => { history.push('/') });
               console.log(`${firstName} was successfully signed up!`)
            }
         })
         .catch(err => {
            console.error(err);
            history.push('/error');
         });
   }
   
    // Cancel function routes back to main page when button is clicked
    const cancel = () =>{
       history.push('/');
    }

    
   return(
      <>
         <main>
            <div className="form--centered">
               <h2>Sign Up</h2>
               <Form 
                  cancel = {cancel}
                  errors = {errors}
                  submit = {submit}
                  submitButtonText = "Sign Up"
                  elements = {() => (
                     <React.Fragment>
                        <label htmlFor="firstName">First Name</label>
                        <input
                           id="firstName" 
                           name="firstName" 
                           type="text" 
                           label= "First Name"
                           onChange={change} 
                           value={firstName} 
                        />
                        
                        <label htmlFor="lastName">Last Name</label>
                        <input
                           id="lastName" 
                           name="lastName" 
                           type="text" 
                           onChange={change} 
                           value={lastName}                              
                        />
                        
                        <label htmlFor="emailAddress">Email Address</label>  
                        <input
                           id="emailAddress" 
                           name="emailAddress" 
                           type="emailAddress" 
                           onChange={change} 
                           value={emailAddress} 
                        />

                        <label htmlFor="password">Password</label>      
                        <input
                           id="password" 
                           name="password" 
                           type="password" 
                           onChange={change} 
                           value={password} 
                        />

                        <label htmlFor="confirmPassword">Confirm Password</label>   
                        <input
                           id="confirmPassword" 
                           name="confirmPassword" 
                           type="password" 
                           onChange={change} 
                           value={confirmPassword} 
                        />             
                     </React.Fragment>
                  )}
               />
               <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
         </main>
      </>
   );
}

export default UserSignUp;