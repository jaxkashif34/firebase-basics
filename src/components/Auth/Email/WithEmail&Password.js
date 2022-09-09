import React from 'react';
import { Container, TextField, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Formik, Field } from 'formik';
import { initialValues, validationSchema } from '../utils';
// eslint-disable-next-line
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, updateEmail, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
export default function App({ setState }) {
  const auth = getAuth();

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
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userDetails) => {
        setState({ open: true, message: `${userDetails.user.email} Sign In` });
      })
      .catch((e) => {
        console.log(e.message);
      });
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
    <div>
      <Typography variant="h5" textAlign="center">
        Register/Login With Email and Password
      </Typography>
      <Container>
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
                    <LoadingButton type="submit" sx={{ width: '33.333%' }} variant="contained" loading={formik.isSubmitting}>
                      Submit
                    </LoadingButton>
                  </div>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </div>
  );
}
