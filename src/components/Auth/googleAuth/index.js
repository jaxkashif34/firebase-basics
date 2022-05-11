import React from 'react'
import { Button } from "@mui/material"
import { Iconify } from "utils"
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, getRedirectResult } from "firebase/auth"
import { app } from "../../../firebase/firebase"
const auth = getAuth()
const provider = new GoogleAuthProvider()
const onLogin = async () => {
    await signInWithPopup(auth, provider).then(result => {
        const credentials = GoogleAuthProvider.credentialFromResult(result)
        const token = credentials.accessToken
        const user = result.user
    }).catch(err => {
        console.log(err);
    })
}
const onLoginRd = () => {
    signInWithRedirect(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log([token, user]);
        }).catch((err) => {
            console.log(err);
        });
}

const SignOutUser = () => {
    signOut(auth).then(result => {
        console.log("user signed out")
    }).catch(err => {
        console.log(err)
    })
}


export default function GoogleAuth() {
    return (
        <div>
            <Button onClick={onLogin} startIcon={<Iconify icon="flat-color-icons:google" />} variant="contained">Sign In with Google</Button>
            <Button onClick={onLoginRd} startIcon={<Iconify icon="flat-color-icons:google" />} variant="contained">Google Redirect</Button>
            <Button onClick={SignOutUser} variant="contained">Sign Out user</Button>
        </div>
    )
}


