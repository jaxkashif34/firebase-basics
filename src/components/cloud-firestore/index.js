import React, { useState, useEffect } from 'react'
import { Container, TextField, Stack, Typography, Button } from "@mui/material"
import { validationSchema, initialValues } from "utils"
import LoadingButton from '@mui/lab/LoadingButton';
import { collection, addDoc, doc, setDoc, Timestamp, updateDoc, serverTimestamp, getDoc, onSnapshot, deleteDoc, deleteField, getDocFromCache, query, where, getDocs, collectionGroup, limit, orderBy, enableIndexedDbPersistence } from "firebase/firestore"
import { app, cf } from "../../firebase/firebase"
import { Form, Formik, Field, ErrorMessage } from "formik"
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
export default function CloudFireStore() {
    const [data, setData] = useState([])
    // const ref = doc(db, "Users", "User2")
    // const ref = doc(db, `Users/comments/Posts/comments`);
    const auth = getAuth()
    const provider = new GoogleAuthProvider()

    // const citiesRef = doc(cf, 'cities', 'BJ', "landmarks", "doc-park");
    // const museums = query(collectionGroup(cf, 'landmarks'), where('type', '==', 'museum'), orderBy("name"), limit(3));
    const userRef = collection(cf, 'users');
    // const userId = auth?.currentUser?.uid
    // const q = query(userRef, where("age  ", ">", 20))
    const onSubmit = async (values) => {
        try {
            // await getDocs(userRef).then((data) => {
            //     console.log("data get")
            //     // console.log(data.data())
            //     data.forEach(item => {
            //         // console.log(item.data())
            //         setData(prev => {
            //             return [...new Set([...prev, item.data()])]
            //         })
            //     })
            // }).catch(err => console.log(err))


            // await signInWithEmailAndPassword(auth, values.email, values.password).then((userData) => {
            //     console.log('signInWithEmailAndPassword')
            //     const userId = userData.user.uid
            //     console.log(userId)
            // }).catch(err => {
            //     console.log(err)
            // })


            // await createUserWithEmailAndPassword(auth, values.email, values.password).then((userData) => {
            //     console.log('signInWithEmailAndPassword')
            //     const userId = userData.user.uid
            //     console.log(userId)
            // }).catch(err => {
            //     console.log(err)
            // })



            console.log("values", values);


            updateDoc(doc(userRef, auth.currentUser?.uid), {
                addres: "SOS Village FSD", // test
            }).then(() => {
                console.log("data set")
            }).catch((err) => {
                console.log("data not set", err)
            })




            // const queySnapshot = await getDocs(museums)
            // const data = queySnapshot.forEach(doc => {
            //     console.log(doc.data())
            // })
            // console.log(queySnapshot);
            // if (queySnapshot.exists()) {
            //     console.log(queySnapshot.data())
            // } else {
            //     console.log("not exist")
            // }
            console.log(auth.currentUser?.email, auth.currentUser?.uid)

            // await Promise.all([  
            //     setDoc(doc(citiesRef, 'SF', 'landmarks', "doc-bridge"), {
            //         name: 'Golden Gate Bridge',
            //         type: 'bridge'
            //     }),
            //     setDoc(doc(citiesRef, 'SF', 'landmarks', "doc-museum"), {
            //         name: 'Legion of Honor',
            //         type: 'museum'
            //     }),
            //     setDoc(doc(citiesRef, 'LA', 'landmarks', "doc-park"), {
            //         name: 'Griffith Park',
            //         type: 'park'
            //     }),
            //     setDoc(doc(citiesRef, 'LA', 'landmarks', "doc-museum"), {
            //         name: 'The Getty',
            //         type: 'museum'
            //     }),
            //     setDoc(doc(citiesRef, 'DC', 'landmarks', "doc-memorial"), {
            //         name: 'Lincoln Memorial',
            //         type: 'memorial'
            //     }),
            //     setDoc(doc(citiesRef, 'DC', 'landmarks', "doc-museum"), {
            //         name: 'National Air and Space Museum',
            //         type: 'museum'
            //     }),
            //     setDoc(doc(citiesRef, 'TOK', 'landmarks', "doc-park"), {
            //         name: 'Ueno Park',
            //         type: 'park'
            //     }),
            //     setDoc(doc(citiesRef, 'TOK', 'landmarks', "doc-museum"), {
            //         name: 'National Museum of Nature and Science',
            //         type: 'museum'
            //     }),
            //     setDoc(doc(citiesRef, 'BJ', 'landmarks', "doc-park"), {
            //         name: 'Jingshan Park',
            //         type: 'park'
            //     }),
            //     setDoc(doc(citiesRef, 'BJ', 'landmarks', "docmuseum"), {
            //         name: 'Beijing Ancient Observatory',
            //         type: 'museum'
            //     })
            // ]);

            // await console.log("Successfully fetched data")
        } catch (err) {
            console.log("Error catch : ", err)
        }

    }

    console.log(data)

    const handleSignout = async () => {
        await signOut(auth).then(() => console.log("user signout")).catch(err => console.log("error signout : ", err))
    }


    const handleSign = async () => {
        await signInWithPopup(auth, provider).then(() => console.log("user signin")).catch(err => console.log("error signin : ", err))
    }



    // const handleOffline = () => {
    //     enableIndexedDbPersistence(db).then(() => {
    //         console.log("IndexedDB is enabled")
    //     }).catch(err => {
    //         if (err.code == 'failed-precondition') {
    //             console.log("IndexedDB is not supported if")
    //         } else if (err.code == 'unimplemented') {
    //             console.log("IndexedDB is not supported else if")
    //         }
    //     })
    // }
    // console.log(data);
    // useEffect(() => {
    //     const unSubscribe = onSnapshot(q, (doc) => {
    //         doc.docChanges().forEach(item => {
    //             // console.log("item.data()", item.data())
    //             if (item.type === "added") {
    //                 console.log("New city: ", item.doc.data());
    //             }
    //             if (item.type === "modified") {
    //                 console.log("Modified city: ", item.doc.data());
    //             }
    //             if (item.type === "removed") {
    //                 console.log("Removed city: ", item.doc.data());
    //             }
    //         })
    //     })
    //     // unSubscribe()
    // }, [])



    return (
        <Container>
            <Typography variant="h4" gutterBottom>Cloud FireStore</Typography>
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
                                    <LoadingButton type="submit" variant="contained">Submit</LoadingButton>
                                </Stack>
                            </Form>
                        )
                    }}
            </Formik>
            <Typography variant="h4" sx={{ color: "white" }}>{data?.name} : {data?.state?.city}</Typography>
            <Button onClick={handleSignout}>Signout</Button>
            <Button onClick={handleSign}>Login</Button>
        </Container>
    )
}
