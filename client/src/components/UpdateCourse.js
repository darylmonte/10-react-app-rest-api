import React, {  useState, useEffect, useContext } from 'react';
import  { Context }  from '../Context';
import { useHistory, useParams } from 'react-router-dom';
import Form from './Form';

const UpdateCourse = () => {

  const context = useContext(Context);
  let history = useHistory();
  const { id } = useParams();
  const authUser = context.authenticatedUser;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
  // const [userId] = useState(context.authenticatedUser.userId);
  const [errors, setErrors] = useState([]);
  // const [courseDetails, setCourseDetails] = useState('');
    
  // sets state of course details and handles errors routes
  useEffect(() => {
    context.data.getCourse(id)
      .then(response => {
        if(response.message) {
          history.push('/notfound')
        } else if (response.userId !== authUser.id) {
          history.push('/forbidden');
        } else {
          setTitle(response.title);
					setDescription(response.description);
					setEstimatedTime(response.estimatedTime);
					setMaterialsNeeded(response.materialsNeeded);
					setFirstName(response.User.firstName);
					setLastName(response.User.lastName);
        } 
      })
      .catch(err => {
        console.error(err);
        history.push('/error');  
      });
  }, [context, history, id])
   
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

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    };
    
    context.data.updateCourse(course, id, authUser.emailAddress, authUser.password)
      .then( response => {
        if(response.length) {
          setErrors(response);
        } else {
          console.log("Course was successfully updated!");
          history.push(`/courses/${id}`)
        }
      })
      .catch(err => {
        console.error(err);
        history.push('/error');
      }
    );

  }
  
  const cancel = () =>{
    history.push(`/courses/${id}`);
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
                          defaultValue={title}
                          onInput= { change }
                        />

                        <p>By {firstName} {lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea 
                          id="courseDescription"  
                          name="courseDescription" 
                          defaultValue= {description}
                          onInput= { change }    
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
                )}  
              />
            </div>
        </main>
      </>
  )
}

export default UpdateCourse;