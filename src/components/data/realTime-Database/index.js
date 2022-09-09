import React, { useEffect } from 'react';
import { db } from '../../../firebase';
import {
  child,
  get,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
  runTransaction,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  query,
  orderByChild,
  orderByKey,
  limitToFirst,
  limitToLast,
  startAt,
} from 'firebase/database';
import { Button, Stack, Typography } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { endAt } from 'firebase/firestore';

const RealTimeDatabase = ({ setState }) => {
  // one issue is that current user is null untill the auth is fully initilized thats why i used reference inside the function if we use is outside it will throw exception with uid is not defined
  const auth = getAuth();
  const reference = ref(db, `users`);
  const reference2 = ref(db, `users/-NBVfIp1Oi8Wuuz3oTTR`);

  const newUserRef = push(reference);
  const handleData = async () => {
    // set data to the database at path (users => currentUser.uid)
    // try {
    //   await set(newUserRef, {
    //     name: 'Nasir',
    //     email: ' Nasir@gmail.com',
    //     photoURL: 'Nasir photo',
    //     userId: 'Nasir uid',
    //   });
    //   setState({ open: true, message: 'Data saved successfully' });
    // } catch (e) {
    //   console.log(e);
    // }
    // ******************* update the document *******************
    // try {
    //   await update(reference2, {
    //     name: 'Kashif Mehmood',
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // ************************* Remove or Delete the document *************************
    // try {
    //   await remove(reference2);
    //   setState({ open: true, message: 'Data deleted successfully' });
    // } catch (error) {
    //   console.log(error);
    // }
    // Manuplate Data with Transaction // NOT WORKING
    // try {
    //   await runTransaction(reference, (currentData) => {
    //     const data = currentData;
    //     console.log(data);
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  // const getData = async () => {
  //   // try {
  //   //   const docSnap = await get(reference);
  //   //   console.log(docSnap.val());
  //   // } catch (e) {
  //   //   console.log(e);
  //   // }
  // };

  // ****************Listen for child events ********************
  // try {
  //   // *********** Listen for if new child is added at that reference *****************
  //   onChildAdded(reference, (data) => {
  //     console.log('onChildAdded');
  //     console.log([data.key, data.val()]);
  //   });

  //   // *********** Listen for if existing child is updated at that reference *****************
  //   onChildChanged(reference, (data) => {
  //     console.log('onChildChanged');
  //     console.log([data.key, data.val()]);
  //   });

  //   // *********** Listen for if existing child is removed at that reference *****************
  //   onChildRemoved(reference, (data) => {
  //     console.log('onChildRemoved');
  //     console.log([data.key, data.val()]);
  //   });
  // } catch (e) {
  //   console.log(e);
  // }

  // useEffect(() => {
  //   getData();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // const q = query(reference);
  // ********* limitToFirst method *************
  // const q = query(reference, limitToFirst(2));
  // ********* limitToLast method *************
  // const q = query(reference, limitToLast(2));
  // ********* limitToLast method *************
  // const q = query(reference, startAt(2));
  // onValue(
  //   //  ****** reference of the ducument ******
  //   // reference2,
  //   // ****** query the ducument ******
  //   q,
  //   (snapshot) => {
  //     // snapshot.forEach((user) => {
  //     //   console.log(`${user.key} => `, user.val());
  //     // });
  //     console.log(snapshot.val());
  //   },
  //   { onlyOnce: true }
  // );

  return (
    <Stack mt={2}>
      <Typography variant="h5" color="white" textAlign="center">
        Firebase Real Time Database
      </Typography>
      <Button variant="contained" onClick={() => handleData()}>
        Add Data
      </Button>
    </Stack>
  );
};

export default RealTimeDatabase;
