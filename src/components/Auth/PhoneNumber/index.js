import React from 'react'
import { TextField, Box } from "@mui/material"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import LoadingButton from '@mui/lab/LoadingButton';
import { Iconify } from "utils"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { app } from "../../firebase/firebase"
const auth = getAuth()
// window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {}, auth);

const initialValues = {
    phoneNumber: 0,
}
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required("Phone number is required"),
})


export default function PhoenNumber() {

    const onSubmit = async (values, actions) => {
        const phNum = Number(values.phoneNumber)
        await signInWithPhoneNumber(auth, values.phoneNumberF).then(confirm => {
            console.log(confirm);
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {
                    (formik) => {
                        return (
                            <Form autoComplete="off">
                                <Field as={TextField} type="tel" name="phoneNumber" variant="standard" />
                                <LoadingButton id="sign-in-button" loading={formik.isSubmitting} type="submit">Submit</LoadingButton>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    )
}


