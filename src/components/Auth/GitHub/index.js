import React from 'react';
import { Container, Button, Typography, Box, Avatar } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
// eslint-disable-next-line
import { getAuth, signInWithPopup, signInWithRedirect, GithubAuthProvider } from 'firebase/auth';
export default function App({ setState, photo, setPhoto }) {
  const auth = getAuth();
  const provider = new GithubAuthProvider();

  const loginWithProvider = async () => {
    // ************** Sign In With Popover **************
    // await signInWithPopup(auth, provider)
    //   .then((result) => {
    //     setState({ open: true, message: `Sign In ${result.user.displayName}` });
    //     setPhoto(result.user.photoURL);
    //   })
    //   .catch((e) => {
    //     console.log('ErrorCode : ', e.code);
    //   });
    // ************** Sign In With Redirect **************
    // await signInWithRedirect(auth, provider);
  };

  return (
    <Box sx={{ mx: 'auto' }}>
      <Typography variant="h5" textAlign="center" color="white">
        Register/Login With GitHub Provider
      </Typography>
      <Avatar alt="User Profile" src={photo} />
      <Container sx={{ mt: 5 }}>
        <Button variant="contained" sx={{ width: '100%' }} onClick={() => loginWithProvider()}>
          <GitHubIcon />
          GitHub
        </Button>
      </Container>
    </Box>
  );
}
