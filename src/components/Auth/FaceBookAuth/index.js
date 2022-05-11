import React from 'react'
import { Button } from "@mui/material"
import { Iconify } from "utils"
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from "../../../firebase/firebase"
const auth = getAuth()
const provider = new FacebookAuthProvider()
const onLogin = async () => {
    await signInWithPopup(auth, provider).then(result => {
        const credentials = FacebookAuthProvider.credentialFromResult(result)
        const token = credentials.accessToken
        const user = result.user
        console.log(user)
        console.log("True", auth.currentUser)
    }).catch(err => {
        console.log("False", auth.currentUser)
        console.log(err);
    })
}
// console.log(auth.currentUser)


// const onLoginRd = () => {
//     signInWithRedirect(auth, provider)
//         .then((result) => {
//             const credential = FacebookAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             const user = result.user;
//             console.log([token, user]);
//         }).catch((err) => {
//             console.log(err);
//         });
// }


export default function FaceBookAuth() {
    return (
        <div>
            <Button onClick={onLogin} startIcon={<Iconify icon="logos:facebook" />} variant="contained">Sign In with FaceBook</Button>
            {/* <Button onClick={onLoginRd} startIcon={<Iconify icon="logos:facebook" />} variant="contained">Google Redirect</Button> */}
        </div>
    )
}


