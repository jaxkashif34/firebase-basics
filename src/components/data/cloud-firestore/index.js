import React, { useEffect } from 'react';
import { collection, addDoc, getDocs, setDoc, doc, onSnapshot, Timestamp, arrayUnion, updateDoc, arrayRemove, increment, runTransaction, writeBatch, deleteDoc, deleteField } from 'firebase/firestore';
import { cf } from '../../../firebase';
import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';

const CloudFireStore = ({ setState }) => {
  const colRef = collection(cf, 'users');
  const docRef = doc(cf, 'cities', 'Faisalabad');
  const colDocRef = doc(colRef);
  const sosYH = {
    house: 'house-4',
    rooms: 3,
    leader: 'Kashif Ali',
    timestamp: Timestamp.now(),
    population: 9,
  };
  const city = {
    name: 'Faisalabad',
    country: 'Pakistan',
    planet: 'Earth',
    timestamp: Timestamp.now(),
    regions: ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit Baltistan', 'Azad Kashmir'],
    population: increment(10),
  };

  const handleData = async () => {
    // ****************setDoc method****************
    // try {
    //   // while on the other hand setDoc did't return any thing and we have to set the collection and doc
    //   // name manully inside the  doc method like this doc(cloud_fireStore, "collection_name/doc_name")
    //   // and setDoc creats the document if does not exists if exists it completey overrides the document
    //   // so if we think to use updateDoc menthod the drawback of this method is it throws and Error if
    //   // document isn't exists so all we have to do is use setDoc with third argument an object with
    //   // merge: true.
    //   await setDoc(
    //     docRef,
    //     // city,
    //     sosYH,
    //     { merge: true }
    //   );
    //   setState({ open: true, message: 'Document created successfully' });
    // } catch (e) {
    //   console.log(e.code);
    // }
    // ****************addDoc method****************
    // try {
    //   // addDoc return doc id, matadata and some other stuff and generate a random id for your document
    //   // in case if you don't want to specifies the name of your document and it uses collection insted
    //   // of doc method  (but we will use collection with addDoc method later) and only required the
    //   // collection name like this  collection(cloud_fireStore, "collection_name").
    //   const docRef = await addDoc(colRef, {
    //     first: 'Kashif',
    //     middle: 'Mehmood',
    //     last: 'Ali',
    //     born: 1999,
    //   });
    //   console.log('Document written with ID: ', docRef.id);
    // } catch (e) {
    //   console.error('Error adding document: ', e);
    // }
    // // ********** Custom Objects****************************
    // // try {
    // //   // with custom object
    // //   class City {
    // //     constructor(name, state, country) {
    // //       this.name = name;
    // //       this.state = state;
    // //       this.country = country;
    // //     }
    // //     toString() {
    // //       return `${this.name}, ${this.state}, ${this.country}`;
    // //     }
    // //   }
    // //   const cityConverter = {
    // //     toFirestore: (city) => ({
    // //       name: city.name,
    // //       state: city.state,
    // //       country: city.country,
    // //     }),
    // //     fromFirestore: (onSnapshot, options) => {
    // //       const data = onSnapshot.data(options);
    // //       return new City(data.name, data.state, data.country);
    // //     },
    // //   };
    // //   const customObjectRef = doc(cf, 'custom', 'LA').withConverter(cityConverter);
    // //   await setDoc(customObjectRef, new City('Faisalabad', 'Punjab', 'Pakistan'), { merge: true });
    // //   console.log('Document successfully written!');
    // // } catch (e) {
    // //   console.log(e);
    // // }
    // ********** update Documnet ****************************
    // updateDoc(docRef, {
    //   regions: arrayRemove('Azad Kashmir'),
    // })
    //   .then(() => {
    //     console.log('Doc updated');
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // ******************* Transactions & Batch Writes *******************
    // try {
    //   const newPopulation = await runTransaction(cf, async (transaction) => {
    //     const doc = await transaction.get(docRef);
    //     if (doc.exists()) {
    //       const newPop = doc.data().population;
    //       transaction.update(docRef, { population: newPop > 400 ? increment(-10) : increment(10) });
    //       return newPop;
    //     } else {
    //       return;
    //     }
    //   });
    //   isNaN(newPopulation) ? setState({ open: true, message: `Document did't exists` }) : setState({ open: true, message: `Population updated ${newPopulation}` });
    // } catch (e) {
    //   console.log('Transaction Fails : ', e);
    // }
    // ******** BATCHE **************
    // try {
    //   // write a new Batch
    //   const batch = writeBatch(cf);
    //   // set the value of PK
    //   // batch.set(docRef, { planet: 'Earth' }, { merge: true });
    //   // update the population of PK document
    //   batch.update(docRef, { population: increment(10) });
    //   // delete the city LA
    //   batch.delete(doc(cf, 'cities/LA'));
    //   // commit the batch
    //   await batch.commit();
    //   setState({ open: true, message: `Batch updated successfully` });
    // } catch (e) {
    //   console.log('Transaction Fails : ', e);
    //   setState({ open: true, message: `Error ${e.message}` });
    // }
    // ********** DELETE A Document ****************
    // try {
    //   await deleteDoc(docRef);
    //   setState({ open: true, message: 'Document deleted successfully' });
    // } catch (e) {
    //   console.log(e.message);
    // }
    // ********** DELETE A Field in Document ****************
    // try {
    //   await setDoc(docRef, { regions: deleteField() }, { merge: true });
    //   setState({ open: true, message: 'Field deleted successfully' });
    // } catch (e) {
    //   console.log(e.message);
    // }
  };

  return (
    <Container maxWidth="md">
      <Typography color="white" variant="h5">
        Adding data to the clound Fire-Store
      </Typography>
      <Button onClick={() => handleData()} variant="contained">
        Add Data
      </Button>
    </Container>
  );
};

export default CloudFireStore;
