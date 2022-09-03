import React from 'react';
import { Container, Button, Typography, Box, Avatar } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
// eslint-disable-next-line
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
export default function App({ setState, photo, setPhoto }) {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const loginWithProvider = async () => {
    // ************** Sign In With Popover **************
    // await signInWithPopup(auth, provider).then((result) => {
    //   setState({ open: true, message: `Welcome ${result.user.displayName}` });
    //     setPhoto(result.user.photoURL);
    //   // console.log({ credentials });
    // });
    // ************** Sign In With Redirect **************
    // await signInWithRedirect(auth, provider);
  };

  return (
    <Box sx={{ mx: 'auto' }}>
      <Typography variant="h5" textAlign="center" color="white">
        Register/Login With Google Provider
      </Typography>
      <Avatar alt="User Profile" src={photo} />
      <Container sx={{ mt: 5 }}>
        <Button variant="contained" sx={{ width: '25%' }} onClick={() => loginWithProvider()}>
          <GoogleIcon /> Google
        </Button>
      </Container>
    </Box>
  );
}
