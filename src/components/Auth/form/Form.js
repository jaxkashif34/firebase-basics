import React from 'react'
import { Container, TextField, Stack } from "@mui/material"
import { validationSchema, initialValues } from "utils/"
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Formik, Field, ErrorMessage } from "formik"
export default function LoginForm() {
    const onSubmit = (values, actions) => {
        // const user = auth.currentUser

        setTimeout(() => {
            console.log("onSubmit", values)
            actions.resetForm()
            actions.setSubmitting(false)
        }, 1000);


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
                                    <LoadingButton type="submit" loading={formik.isSubmitting} variant="contained">Submit</LoadingButton>
                                </Stack>
                            </Form>
                        )
                    }}
            </Formik>
        </Container>
    )
}
