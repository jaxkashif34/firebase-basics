import React, { useState, useEffect } from 'react'
import { Container, TextField, Stack, Typography, Button } from "@mui/material"
import { validationSchema, initialValues } from "utils"
import LoadingButton from '@mui/lab/LoadingButton';
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth"
import { app, cf, db, } from "../../firebase/firebase"
import { ref, set, getDatabase, onValue, get, child, push, update, remove, onChildAdded } from "firebase/database"
import { Form, Formik, Field, ErrorMessage } from "formik"
const auth = getAuth()
const fbAuth = new FacebookAuthProvider()
export default function RealTimeDataBase() {
    const [data, setData] = useState([])
    // console.log(auth.currentUser)
    const signInFb = async () => {
        await signInWithPopup(auth, fbAuth).then(res => {
            console.log(res.user.displayName + " is logged in")
        }).catch(err => { console.log(err) })
    }
    // const userRef = ref(db, "users/" + "Kashif12/" + "Liks")
    // const starRef = ref(db, "users/" + "Kashif12/" + "Liks")
    // const refference = ref(getDatabase(), "users/" + "Kashif12/" + "Liks")
    const refference = ref(getDatabase(), "users/" + "Kashif12/" + "posts")
    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const newData = push(refference)
            await set(newData, {
                title: "I love js and react!",
                body: "My Faverite language is javascript",
                name: "Kashif"
            })
            // await remove(refference).then(res => {
            //     console.log(res)
            //     console.log("removed")
            // }).catch(err => { console.log(err) })

            // const updates = {}
            // const ref1 = "users/Kashif12/"
            // const ref2 = "users/Kashif12/Liks"
            // updates[ref1] = { age: 100 }
            // updates[ref2] = { age: 100 }
            // console.log(updates)
            // await update(refference, updates)
            // await get(child(refference, "users/Kashif12/Liks")).then(data => {
            //     if (data.exists()) {
            //         console.log("data exists", data.val())
            //     } else {
            //         console.log("data not exists", data)
            //     }
            // }).catch(err => {
            //     console.log("error", err)
            // })
            // await set(userRef, {
            //     likes: "Likes",
            //     age: 22,
            //     name: "Ali",
            //     helow: "Ali",
            //     state: {
            //         city: "Fairfield",
            //     }
            // })
            await console.log("try Run")
            await setSubmitting(false)
        } catch (err) {
            console.log("Error catch : ", err)
        }

    }

    useEffect(() => {
        onChildAdded(refference, (data) => {
            setData(data.val())
            console.log(data.val())
        })
        // console.log("data")
    }, [])

    // console.log("Data : ", data)

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>Real Time Data Base</Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    (formik) => {
                        return (
                            <Form autoComplete="off">
                                <Stack>
                                    <Field as={TextField} type="email" name="email" variant="standard"
                                        autoComplete="username" label="email" />
                                    <ErrorMessage name="email" />
                                    <Field as={TextField} type="password" autoComplete="current-password" name="password" variant="standard" label="password" />
                                    <ErrorMessage name="password" />
                                    <LoadingButton loading={formik.isSubmitting} type="submit" variant="contained">Submit</LoadingButton>
                                    {/* <LoadingButton loading={formik.isSubmitting} onClick={() => writeNewPost("1234", "Kashifali342", "imgurl", "Javascript", "js is awesome")} variant="contained">FB Login</LoadingButton> */}
                                </Stack>
                            </Form>
                        )
                    }}
            </Formik>
            <Typography variant="h4" sx={{ color: "white" }}>{data?.body} : {data?.title} : {data?.name}</Typography>
        </Container>
    )
}
