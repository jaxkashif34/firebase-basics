import React, { useState, useEffect } from 'react'
import { Container, TextField, Stack, Typography, Button } from "@mui/material"
import { validationSchema, initialValues } from "utils"
import LoadingButton from '@mui/lab/LoadingButton';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, getMetadata, deleteObject, listAll, list } from "firebase/storage"
import { Form, Formik, Field, ErrorMessage } from "formik"
export default function Storage() {
    const [data, setData] = useState({})
    const [images, setImages] = useState([]);
    const [dLUrl, setDLUrl] = useState("")
    const [file, setFile] = useState({})
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    // const imgRef = ref(getStorage(), `videos/${file.name}`)
    const imgRef = ref(getStorage(), `images/${file.name}`)
    // const imgRef = ref(getStorage(), `images/bulb-on.png`)
    const onSubmit = async (values, { setSubmitting }) => {
        console.log(imgRef.name)
        try {
            const uploadedData = uploadBytesResumable(imgRef, file)

            // const deleteFile = deleteObject(imgRef).then(() => {
            //     console.log("deleted")
            // }).catch(err => {
            //     console.log(err)
            // })
            // await console.log(deleteFile)

            uploadedData.on('state_changed',
                async (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgresspercent(progress.toFixed(1))
                    await console.log('done');
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error(error);
                },
                () => {
                    getDownloadURL(uploadedData.snapshot.ref).then((downloadURL) => {
                        // console.log(downloadURL)
                        setDLUrl(downloadURL)
                    });
                }
            );


            // setData({ pause: uploadedData.pause, resume: uploadedData.resume, cancel: uploadedData.cancel })
            // await console.log("try Run")
            await setSubmitting(false)
        } catch (err) {
            console.log("Error catch : ", err)
        }

    }
    useEffect(() => {
        // listAll(ref(getStorage(), "images")).then(res => {
        //     res.items.forEach(item => {
        //         getDownloadURL(item).then(url => {
        //             setImages(prev => [...prev, url])
        //         }
        //         )
        //     })
        //     // setImages(res)
        // })
        list(ref(getStorage(), "images"), { maxResults: 4 }).then(res => {
            res.items.forEach(item => {
                getDownloadURL(item).then(url => {
                    setImages(prev => [...prev, url])
                })
            })
        })
    }, [])

    console.log(images)

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>Real Time Data Base</Typography>
            <Typography variant="h4" component="h1" gutterBottom>{progresspercent}%</Typography>
            {/* <Typography variant="h4" component="h1" gutterBottom>{state}</Typography> */}
            {/* <Typography variant="h4" component="h1" gutterBottom>{imgUrl}</Typography> */}
            {
                [...new Set([...images])].map((item, index) => {
                    return <img src={item} key={index} width="200px" height="200px" alt="" />

                })
            }
            {/* <img src={dLUrl} alt="Loading Img" id="myimg" /> */}
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
                                    <input accept="*" id="contained-button-file" name="file" multiple
                                        onChange={(e) => setFile(e.target.files[0])} type="file" />
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
