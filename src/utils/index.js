import { Icon } from '@iconify/react';
import * as Yup from "yup"
import { Box } from "@mui/material"
export const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    // passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "passwords must match").required()
})
export const initialValues = {
    email: "",
    password: "",
    // passwordConfirmation: "",
}

export const Iconify = ({ icon, sx, ...rest }) => {
    return <Box component={Icon} icon={icon} sx={{ ...sx }} {...rest} />
}