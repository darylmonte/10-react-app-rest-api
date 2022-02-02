import React, {useContext} from 'react';
import  { Context }  from '../Context';
import { Link } from 'react-router-dom';


// Stateless function component, displays menu bar that includes buttons for signing in and signing up (if there's not an authenticated user) or the user's name and a button for signing out (if there's an authenticated user).
const Header = () => {
   const context = useContext(Context);
   const authUser = context.authenticatedUser;
   
    return(
        <header>

        <div className="wrap header--flex">
        <h1 className="header--logo"><a href="/">Courses</a></h1>
        <nav>
        { authUser ? (
        <React.Fragment>
            
           <span>Welcome, {authUser.firstName}! </span>
            <Link className="signout" to="/signout">Sign Out</Link>
            
        </React.Fragment>
        ):(
        <React.Fragment>
        <ul className="header--signedout">
          <li>  <Link to="/signup">Sign Up</Link></li>
          <li> <Link to="/signin">Sign In</Link></li>
         </ul>
        </React.Fragment>
        )  } 
    
        </nav> 
    </div>
 </header>
    )
}
export default Header;