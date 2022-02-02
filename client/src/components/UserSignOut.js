import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//Stateless function component, signs out user and redirects to course list component 
const UserSignOut = ({context}) => {
  useEffect(() => context.actions.signOut());
  return (
    <Redirect to="/" />
  );
};

export default UserSignOut;