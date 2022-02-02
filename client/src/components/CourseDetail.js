import React, {  useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import  { Context }  from '../Context';

const CourseDetail = ()=> {

    const history = useHistory();
    const { id } = useParams();
    const context = useContext(Context);  
    const authUser = context.authenticatedUser;
    const [courseDetails, setCourseDetails] = useState('');
    const [user, setUser] = useState('');
  
    useEffect(() => {       
        context.data.getCourse(id)
        .then(courseDetails => {
            if(courseDetails.id) {
                setCourseDetails(courseDetails);
                setUser(courseDetails.User);
            } else {
              history.push('/notfound');    
            }
        })
        .catch(err => history.push('/error') );
    }, [context.data, history, id])
       
    //calls and handles delete function 
    const handleDelete = () => {
        context.data.deleteCourse(id, authUser.emailAddress, authUser.password )
            .then(response => {
                if([]) {
                    console.log("Course was deleted successfully!");
                    history.push('/');
                } else if (response.status === 403) {
                    history.push('/forbidden');
                } else if (response.status === 404) {
                    history.push('/notfound');
                } else if (response.status === 500) {
                    history.push('/error');
                } else {
                    throw new Error();
                }
            }) 
            .catch(err => {
                console.error(err);
                history.push('/error');
            });
    };

   
    return (
        <>
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        { authUser && courseDetails.userId === authUser.userId 
                        ? ( 
                        <React.Fragment>
                        <Link className="button" to={`/courses/${courseDetails.id}/update`}>Update Course</Link> 
                        <button className="button" onClick={handleDelete} >Delete Course</button>
                        <Link className="button button-secondary" to="/">Return to List</Link> 
                        </React.Fragment>
                        ) : ( <Link className="button button-secondary" to="/">Return to List</Link> )
                        }
                    </div>
                </div>
                
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{courseDetails.title}</h4>
                                <p> By {user.firstName} {user.lastName}</p>
                                <p> {courseDetails.description} </p>
                            </div>

                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{courseDetails.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                <ReactMarkdown>{ courseDetails.materialsNeeded }</ReactMarkdown>
                                </ul>  
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
 
export default CourseDetail;