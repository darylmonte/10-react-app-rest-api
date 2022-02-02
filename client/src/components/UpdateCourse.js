import React, {  useState, useEffect, useContext } from 'react';
import  { Context }  from '../Context';
import { useHistory, useParams } from 'react-router-dom';
import Form from './Form';

const UpdateCourse = () => {

  const context = useContext(Context);
  let history = useHistory();
  const { id } = useParams();
  const authUser = context.authenticatedUser;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [estimatedTime, setEstimatedTime] = useState();
  const [materialsNeeded, setMaterialsNeeded] = useState();
  const [userId,   ] = useState(context.authenticatedUser.userId);
  const [errors, setErrors] = useState([]);
  const [courseDetails, setCourseDetails] = useState('');
    
  // sets state of course details and handles errors routes
  useEffect(() => {
    context.data.getCourse(id)
      .then(courseDetails => {
        if(!courseDetails.id) {
          history.push('/notfound')
        } else if (authUser.userId !== courseDetails.userId) {
          history.push('/forbidden');
        } else {
          setCourseDetails(courseDetails)
        } 
      })
      .catch(err => history.push('/error') );
  }, [context.data, history, id, authUser.id, authUser.userId, userId ])
   
  // updates elements values on change event
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

  // Submit function that updates course associated with authenticated user and handles errors redirects 
  const submit = () => {

    const courseDetails = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      errors
    };
    
    context.data.updateCourse(courseDetails, id, authUser.emailAddress, authUser.password)
      .then( errors => {
        if(errors.length) {
          setErrors(errors)
        } else {
          console.log("Course was successfully updated!");
          history.push('/')
        }
      })
      .catch(err => {
        console.error(err);
        history.push('/error');
      }
    );

  }
  
  const cancel = () =>{
    history.push(`/courses/${courseDetails.id}`);
  }

  return (
      <>
        <main>
            <div className="wrap">
              <h2>Update Course</h2>
              <Form
                cancel = {cancel}
                errors = {errors}
                submit = {submit} 
                submitButtonText = "Update Course"
                elements= {()=> (
                  <React.Fragment>
                    <div className="main--flex">
                      <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input 
                          id="courseTitle"
                          name="courseTitle"
                          type="text" 
                          defaultValue={courseDetails.title}
                          onInput= { change }
                        />

                        <p>By {authUser.firstName} {authUser.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea 
                          id="courseDescription"  
                          name="courseDescription" 
                          defaultValue= {courseDetails.description}
                          onInput= { change }    
                        />
                      </div>
                      <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                          id="estimatedTime" 
                          name="estimatedTime" 
                          type="text"
                          defaultValue={courseDetails.estimatedTime}
                          onChange={change} 
                        />
          
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea 
                          id="materialsNeeded" 
                          name="materialsNeeded"
                          defaultValue={courseDetails.materialsNeeded} 
                          onChange={change}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                )}  
              />
            </div>
        </main>
      </>
  )
}

export default UpdateCourse;