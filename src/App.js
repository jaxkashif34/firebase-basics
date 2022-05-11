import React from 'react'
import LoginForm from "components/Auth/form/Form"
import GoogleAuth from "components/Auth/googleAuth"
import FaceBookAuth from "components/Auth/FaceBookAuth"
import CloudFireStore from "components/cloud-firestore"
// import PhoenNumber from 'components/PhoneNumber'
import RealTimeDataBase from 'components/realTime-Database'
import Srorage from "components/Storage"

export default function App() {

  return (
    <>
      {/* <LoginForm />
      <GoogleAuth />
      <FaceBookAuth /> */}
      <CloudFireStore />
      {/* <RealTimeDataBase /> */}
      {/* <Srorage /> */}
      {/* <PhoenNumber /> */}
    </>
  )
}
