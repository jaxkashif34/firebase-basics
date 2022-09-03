import React, { useState } from 'react';
// eslint-disable-next-line
import { getAuth, onAuthStateChanged, signOut, deleteUser, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
// eslint-disable-next-line
import Email from './Email/WithEmail&Password';
// eslint-disable-next-line
import FBAuth from './FaceBook';
// eslint-disable-next-line
import GoogleAuth from './google';
import GitHubAuth from './GitHub';
import { Button, Snackbar, Stack } from '@mui/material';

const Auth = () => {
  const [state, setState] = useState({ open: false, message: '' });
  const [photo, setPhoto] = useState('');
  const auth = getAuth();
  // auth observer
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.providerData.forEach((user) => {
        console.log('provider', user);
        setPhoto(user.photoURL);
      });
    } else {
      console.log('No User');
    }
  });

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setState({ open: true, message: `User Sign Out` });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const handleDeleteUser = async () => {
    await deleteUser(auth.currentUser)
      .then(() => {
        setState({ open: true, message: `User Deleted Successfully` });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <>
      <Snackbar open={state.open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={() => setState({ ...state, open: false })} message={state.message} autoHideDuration={2000} />
      <Stack sx={{ justifyContent: 'space-between', height: '95vh' }}>
        {/* components goes here */}
        {/* <Email state={state} setState={setState} /> */}
        {/* <GoogleAuth setState={setState} photo={photo} setPhoto={setPhoto} /> */}
        {/* <FBAuth setState={setState} photo={photo} setPhoto={setPhoto} /> */}
        <GitHubAuth setState={setState} photo={photo} setPhoto={setPhoto} />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" sx={{ width: '25%' }} onClick={() => handleSignOut()}>
            Sign Out
          </Button>
          <Button variant="contained" sx={{ width: '25%' }} onClick={() => handleDeleteUser()}>
            Delete User
          </Button>
        </div>
      </Stack>
    </>
  );
};

export default Auth;
