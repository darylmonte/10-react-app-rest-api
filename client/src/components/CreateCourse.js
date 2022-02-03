import React, {  useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import  { Context }  from '../Context';
import Form from './Form';

const CreateCourse = () => {

   const context = useContext(Context);
   let history = useHistory();
   const location = useLocation();
   const { from } = location.state || { from: { pathname: "/" } }
   const authUser = context.authenticatedUser;
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [estimatedTime, setEstimatedTime] = useState('');
   const [materialsNeeded, setMaterialsNeeded] = useState('');
   // const [userId] = useState(context.authenticatedUser.userId);
   const [errors, setErrors] = useState([]);

  const change = (e) => {
    if (e.target.name === 'courseTitle'){
      setTitle(e.target.value); 
      } else if (e.target.name === 'courseDescription') {
        setDescription(e.target.value);
      } else if (e.target.name === 'estimatedTime') {
        setEstimatedTime(e.target.value);
      } else if (e.target.name === 'materialsNeeded') {
        setMaterialsNeeded(e.target.value);
      } else {
        return;
      }
  }

  // creates new course associated with authenticated user
  const submit = (e) => {
    
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id
    };
    
    context.data.createCourse(course, authUser.emailAddress, authUser.password)
      .then( errors => {
        if(errors.length) {
          setErrors(errors);
        } else {
          console.log("Course was successfully created!");
          history.push("/");
        }
      })
      .catch(err => {
        console.error(err);
        history.push('/error');  
      }); 
  }
  
  // return back to main page when button is clicked
  const cancel = () => {
    history.push(from);
  }

  return (
    <>
      <main> 
        <div className="wrap">
          <h2>Create Course</h2>
          <Form  
            cancel = {cancel}
            errors = {errors}
            submit = {submit} 
            submitButtonText = "Create Course"
            elements= {() => (
              <React.Fragment>
                <div className= "main--flex">
                  <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input 
                      id="courseTitle" 
                      name="courseTitle" 
                      type="text" 
                      defaultValue={title}
                      onChange={change}
                    />

                    <p>By {`${authUser.firstName} ${authUser.lastName}`}</p> 

                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea 
                      id="courseDescription" 
                      name="courseDescription"
                      defaultValue={description} 
                      onChange={change}  
                    />
                  </div>
                  <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input 
                      id="estimatedTime" 
                      name="estimatedTime"
                      type="text" 
                      defaultValue={estimatedTime}
                      onChange={change}
                    />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea 
                      id="materialsNeeded" 
                      name="materialsNeeded" 
                      defaultValue={materialsNeeded} 
                      onChange={change}  
                    />
                  </div>
                </div>
              </React.Fragment>
            )} />
        </div>
      </main>
    </>
  );
}

export default CreateCourse;