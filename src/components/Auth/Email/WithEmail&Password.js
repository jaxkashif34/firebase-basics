import React, { useState } from 'react';
import { Container, TextField, Stack, Snackbar, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Formik, Field } from 'formik';
import { initialValues, validationSchema } from '../utils';
import { getAuth, onAuthStateChanged, signOut, deleteUser, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
export default function App() {
  const [state, setState] = useState({ open: false, message: 'User Sign In' });
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.providerData.forEach((provider) => {
        console.log(provider);
      });
    } else {
      console.log('no user');
    }
  });


  const provider = new GoogleAuthProvider();

  const handleSignOut = () => {
    signOut()
      .then(() => {
        setState({ open: true, message: `User Sign Out` });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const handleDeleteUser = async () => {
    await deleteUser(auth.currentUser)
      .then((user) => {
        setState({ open: true, message: `User Delted Successfully` });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const loginWithProvider = async () => {
    // ************** Sign In With Popover **************
    // await signInWithPopup(auth, provider).then((result) => {
    //   setState({ open: true, message: `Welcome ${result.user.displayName}` });
    //   // console.log({ credentials });
    // });
    // ************** Sign In With Redirect **************
    const credentials = await signInWithRedirect(auth, provider);
  };

  const onSubmit = async (values, action) => {
    // ************** Creating User with Email and Password **************
    // await createUserWithEmailAndPassword(auth, values.email, values.password)
    //   .then((userDetails) => {
    //     setState({ open: true, message: `${userDetails.user.email} created` });
    //   })
    //   .catch((e) => {
    //     console.log(e.message);
    //   });
    // ************** Sign-In User with Email and Password **************
    // await signInWithEmailAndPassword(auth, values.email, values.password)
    //   .then((userDetails) => {
    //     setState({ open: true, message: `${userDetails.user.email} Sign In` });
    //   })
    //   .catch((e) => {
    //     console.log(e.message);
    //   });
    // ************** Update Profile **************
    // await updateProfile(auth.currentUser, {
    //   displayName: 'Google User',
    //   photoURL: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    // })
    //   .then(() => {
    //     setState({ open: true, message: `Prfile updated` });
    //   })
    //   .catch((e) => {
    //     console.log(e.message);
    //   });
    // ************** Update Email **************
    // await updateEmail(auth.currentUser, values.email)
    //   .then((userDetails) => {
    //     setState({ open: true, message: `Email updated` });
    //   })
    //   .catch((e) => {
    //     console.log(e.message);
    //   });
    // ************** Send Email Varification **************
    // await sendEmailVerification(auth.currentUser)
    //   .then((user) => {
    //     console.log({ user });
    //     setState({ open: true, message: `Vrification Email Send to ${auth.currentUser.email}` });
    //   })
    //   .catch((e) => {
    //     console.log(e.message);
    //   });
    // ************** Send Password Reset Email **************
    // await sendPasswordResetEmail(auth, values.email)
    //   .then((user) => {
    //     setState({ open: true, message: `Password Reset Email Send` });
    //   })
    //   .catch((e) => {
    //     console.log(e.message);
    //   });
  };

  return (
    <>
      <Snackbar open={state.open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={() => setState({ ...state, open: false })} message={state.message} autoHideDuration={2000} />
      <Container sx={{ width: '50%' }}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(formik) => {
            const { touched, errors } = formik;
            const isValidEmail = touched.email && !!errors.email;
            const isValidPasswrod = touched.password && !!errors.password;
            return (
              <Form autoComplete="off">
                <Stack>
                  <Field as={TextField} error={isValidEmail} helperText={touched.email && errors.email} type="email" name="email" variant="standard" label="email" />
                  <Field as={TextField} type="password" error={isValidPasswrod} name="password" variant="standard" label="password" helperText={touched.password && errors.password} />
                  <div style={{ marginTop: 40 }}>
                    <LoadingButton type="submit" sx={{ width: '25%' }} variant="contained" loading={formik.isSubmitting}>
                      Submit
                    </LoadingButton>
                    <Button variant="contained" sx={{ width: '25%' }} onClick={() => handleSignOut()}>
                      Sign Out
                    </Button>
                    <Button variant="contained" sx={{ width: '25%' }} onClick={() => handleDeleteUser()}>
                      Delete User
                    </Button>
                    <Button variant="contained" sx={{ width: '25%' }} onClick={() => loginWithProvider()}>
                      Google
                    </Button>
                  </div>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
}
