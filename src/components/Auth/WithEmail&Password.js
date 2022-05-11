import React from 'react'
import { Container, TextField, Stack } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Formik, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { app } from "./firebase/firebase"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, updateEmail, sendEmailVerification, updatePassword, signOut, sendPasswordResetEmail, deleteUser, sendSignInLinkToEmail } from "firebase/auth"
export default function App() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    // passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "passwords must match").required()
  })
  const initialValues = {
    email: "",
    password: "",
    // passwordConfirmation: "",
  }
  const auth = getAuth()

  const actionCodeSettings = {
    url: 'http://localhost:3000/',
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };


  const onSubmit = (values, actions) => {
    const user = auth.currentUser
    // generate a radmom password
    const password = "KashifAli"
    // Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    // console.log(password)
    // updatePassword(user, password).then(() => {
    //   console.log("password updated")
    // }).catch(err => {
    //   alert(err.message)
    //   // console.log(err)
    //   // const email = prompt("")
    //   // const password = prompt("")

    // })
    /*****************************************Pasword Rreset Email*************************************************/
    // signInWithEmailAndPassword(auth, values.email, values.password).then(() => {
    //   console.log("signed in")
    // }).catch(err => {
    //   alert(err.message)
    // })
    /*****************************************Pasword Rreset Email*************************************************/
    // sendPasswordResetEmail(auth, values.email).then(() => {
    //   console.log("email sent")
    // }).catch(err => { console.log(err) })
    /*****************************************Delete a user*************************************************/
    // deleteUser(user).then(() => {
    //   console.log("user deleted")
    // }).catch(err => {
    //   console.log(err)
    // })
    /*****************************************Email Link Authentications*********************************************/
    // console.log(values.email)
    // sendSignInLinkToEmail(auth, values.email, actionCodeSettings)
    //   .then(() => {
    //     // The link was successfully sent. Inform the user.
    //     // Save the email locally so you don't need to ask the user for it again
    //     // if they open the link on the same device.
    //     window.localStorage.setItem('emailForSignIn', values.email);
    //     // ...
    //   })
    //   .catch((error) => {
    //     console.log(error,)

    //   });
    /*****************************************Sign Out*********************************************/
    // signOut(auth).then(() => {
    //   console.log("signed out")
    // }).catch(err => {
    //   console.log(err)
    // })

    // sendEmailVerification(user).then(() => {
    //   console.log("email sent")
    // }).catch(err => {
    //   alert(err)
    // })
    /*****************************************Log IN*********************************************/
    // signInWithEmailAndPassword(auth, values.email, values.password)
    //   .then(res => {
    //     // actions.resetForm()
    //     console.log(res)
    //     console.log("user signed")
    //   })
    //   .catch(err => alert("Sign In Error", err.message))
    /*****************************************Create User*********************************************/
    // createUserWithEmailAndPassword(auth, values.email, values.password)
    //   .then(res => {
    //     // actions.resetForm()
    //     console.log(res)
    //     console.log("user Created")
    //   })
    //   .catch(err => alert("user Created", err.message))
    // updateEmail(user, "jaxkashif34@gmail.com").then(() => {
    //   console.log("Profile Updated")
    // }).catch(err => {
    //   console.log(err)
    //   alert(err.message)
    // })


    // if (user) {
    //   console.log(user.displayName)
    //   console.log(user.photoURL)
    // } else {
    //   alert("user is not sigined")
    // }


    console.log("Current User", user);

  }
  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {
          (formik) => {
            return (
              <Form autoComplete="off">
                <Stack>
                  <Field as={TextField} type="email" name="email" variant="standard" label="email" />
                  <ErrorMessage name="email" />
                  <Field as={TextField} type="password" autoComplete="current-password" name="password" variant="standard" label="password" />
                  <ErrorMessage name="password" />
                  {/* <Field as={TextField} type="password" name="passwordConfirmation" variant="standard" label="password" />
                <ErrorMessage name="passwordConfirmation" /> */}
                  <LoadingButton type="submit" variant="contained">Submit</LoadingButton>
                </Stack>
              </Form>
            )
          }}
      </Formik>
    </Container>
  )
}
