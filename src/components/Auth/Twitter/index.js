import React from 'react';
import { Container, Button, Typography, Box, Avatar } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
// eslint-disable-next-line
import { getAuth, signInWithPopup, signInWithRedirect, TwitterAuthProvider } from 'firebase/auth';
export default function App({ setState, photo, setPhoto }) {
  const auth = getAuth();
  const provider = new TwitterAuthProvider();

  const loginWithProvider = async () => {
    // ************** Sign In With Popover **************
    await signInWithPopup(auth, provider)
      .then((result) => {
        setState({ open: true, message: `Sign In ${result.user.displayName}` });
        setPhoto(result.user.photoURL);

        const credentials = TwitterAuthProvider.credentialFromResult(result);
        // const token = credentials.accessToken;
        // const secret = credentials.secret;

        console.log(credentials);
      })
      .catch((e) => {
        console.log('ErrorCode : ', e.code);
      });
    // ************** Sign In With Redirect **************
    // await signInWithRedirect(auth, provider);
  };

  return (
    <Box sx={{ mx: 'auto' }}>
      <Typography variant="h5" textAlign="center" color="white">
        Register/Login With Twitter Provider
      </Typography>
      <Avatar alt="User Profile" src={photo} />
      <Container sx={{ mt: 5 }}>
        <Button variant="contained" sx={{ width: '100%' }} onClick={() => loginWithProvider()}>
          <TwitterIcon />
          Twitter
        </Button>
      </Container>
    </Box>
  );
}
