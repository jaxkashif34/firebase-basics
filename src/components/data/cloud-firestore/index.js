import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
  Timestamp,
  arrayUnion,
  updateDoc,
  arrayRemove,
  increment,
  runTransaction,
  writeBatch,
  deleteDoc,
  deleteField,
  getDoc,
  query,
  where,
  collectionGroup,
  orderBy,
  limit,
  startAt,
  endAt,
  endBefore,
  startAfter,
} from 'firebase/firestore';
import { cf } from '../../../firebase';
import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';

const CloudFireStore = ({ setState }) => {
  // const [name, setName] = useState('');
  const [refs, setRefs] = useState([]);
  const colRef = collection(cf, 'cities');
  const lmRef = collection(cf, 'cities/LA/landmark');
  const docRef = doc(cf, 'cities', 'SF');
  const colDocRef = doc(colRef);
  const customObjectRef = doc(cf, 'custom', 'Faisalabad');
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
    tourist_place: 'Ghanta Ghr',
    population: increment(1000000),
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
    //     doc(refs[0]),
    //     {
    //       name: 'Jingshan Park',
    //       type: 'park'
    //   },
    //     // city,
    //     // sosYH,
    //     { merge: true }
    //   );
    //   setState({ open: true, message: 'Document created successfully' });
    // } catch (e) {
    //   console.log(e);
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
    // try {
    //   // with custom object
    //   class City {
    //     constructor(name, state, country) {
    //       this.name = name;
    //       this.state = state;
    //       this.country = country;
    //     }
    //     toString() {
    //       return `${this.name}, ${this.state}, ${this.country}`;
    //     }
    //   }
    //   const cityConverter = {
    //     toFirestore: (city) => ({
    //       name: city.name,
    //       state: city.state,
    //       country: city.country,
    //     }),
    //     fromFirestore: (onSnapshot, options) => {
    //       const data = onSnapshot.data(options);
    //       return new City(data.name, data.state, data.country);
    //     },
    //   };
    //   await setDoc(customObjectRef.withConverter(cityConverter), new City('Faisalabad', 'Punjab', 'Pakistan'), { merge: true });
    //   setState({ open: true, message: 'Document successfully written!' });
    // } catch (e) {
    //   console.log(e);
    // }
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
    // **************READ DATA***************************
    // try {
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     console.log('Document Data', docSnap.data());
    //     setState({ open: true, message: 'Document Found' });
    //   } else {
    //     setState({ open: true, message: "Document doesn't exists" });
    //   }
    // } catch (e) {
    //   console.log(e.message, e.code);
    // }
    // ********** READ DATA with custom object ****************
    // try {
    //   class City {
    //     constructor(name, state, country) {
    //       this.name = name;
    //       this.state = state;
    //       this.country = country;
    //     }
    //     toString() {
    //       return `${this.name}, ${this.state}, ${this.country}`;
    //     }
    //   }
    //   const cityConverter = {
    //     toFirestore: (city) => ({
    //       name: city.name,
    //       state: city.state,
    //       country: city.country,
    //     }),
    //     fromFirestore: (onSnapshot, options) => {
    //       const data = onSnapshot.data(options);
    //       return new City(data.name, data.state, data.country);
    //     },
    //   };
    //   const docSnap = await getDoc(customObjectRef.withConverter(cityConverter));
    //   if (docSnap.exists()) {
    //     console.log('Document Data', docSnap.data());
    //     setState({ open: true, message: 'Document Found' });
    //   } else {
    //     setState({ open: true, message: 'Document Not Found' });
    //   }
    // } catch (e) {
    //   console.log(e.message);
    // }
    // *********** Get Multiple Documents With Query ***************
    // try {
    //   const q = query(colRef, where('capital', '==', true));
    //   const docsSnap = await getDocs(q);
    //   docsSnap.forEach((doc) => {
    //     if (doc.exists()) {
    //       console.log(`Document ${doc.id} => `, doc.data());
    //       setState({ open: true, message: 'Document Found' });
    //     } else {
    //       setState({ open: true, message: 'Document dont Found' });
    //     }
    //   });
    // } catch (e) {
    //   console.log(e.message);
    // }
    // *********** Get All Documents ***************
    // try {
    //   const docsSnap = await getDocs(colRef);
    //   docsSnap.forEach((doc) => {
    //     if (doc.exists()) {
    //       console.log(`Document ${doc.id} => `, doc.data());
    //       setState({ open: true, message: 'Documents Found' });
    //     } else {
    //       setState({ open: true, message: 'Documents dont Found' });
    //     }
    //   });
    // } catch (e) {
    //   console.log(e.message);
    // }
    // **********************DELETE The Document *********************
    // try {
    //   const q = query(collectionGroup(cf, 'landmark'));
    //   const docSnap = await getDocs(q);
    //   docSnap.forEach(async (document) => {
    //     if (document.exists()) {
    //       await deleteDoc(doc(cf, `cities/TOK/landmark/${document.id}`));
    //       console.log('Document Deleted');
    //     } else {
    //       console.log("Document doesn't exists");
    //     }
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  // ********* Listner (onSnapshot) Listen for updates and give us updated data *****

  // *************** Simple query   *******************
  // const q = query(colRef, where('regions', 'in', [['west_coast', 'norcal']]));

  // *************** Compound Query *******************
  // const q = query(colRef, where('state', '==', 'CA'), where('population', '<=', 10000000));

  // *************** Collection Group Query *******************

  // const q = query(collectionGroup(cf, 'nestedLandmark'), where('type', '==', 'museum'));

  // const unsub = onSnapshot(
  //   q,
  //   (docSnap) => {
  //     // **************** Listen for single Document ****************
  //     // console.log(`${doc.id} => `, doc.data());
  //     // ***** get to know whether the source of data is the server or the cached *****
  //     // const source = doc.metadata.hasPendingWrites ? 'Cached' : 'Server';
  //     // console.log(`From  ${source} => `, doc.data());
  //     // setName(doc.data().name);

  //     // ************* Listen for Quaries **************
  //     docSnap.forEach((doc) => {
  //       if (doc.exists()) {
  //         console.log(`From ${doc.id} => `, doc.data());
  //       } else {
  //         console.log("Document doesn't exists");
  //       }
  //     }); // end of forEach
  //     // ************* To See the Changes weather the document is ADDED, MODIFIED, REMOVED **************

  //     // docSnap.docChanges().forEach((change) => {
  //     //   if (change.type === 'added') {
  //     //     console.log(`New City Added : `, change.doc.data());
  //     //   } else if (change.type === 'modified') {
  //     //     console.log(`City Modified : `, change.doc.data());
  //     //   } else if (change.type === 'removed') {
  //     //     console.log(`City Removed: `, change.doc.data());
  //     //   }
  //     // });
  //   },
  //   (e) => {
  //     console.log(e);
  //     setState({ open: true, message: 'Documents not Found Second Error Callback' });
  //   }
  // );
  // *********** ge the nested document id and set to the state  *************
  // const q = query(collectionGroup(cf, 'landmark'));
  // const getData = async () => {
  //   const docSnap = await getDocs(q);

  //   docSnap.forEach((document) => {
  //     const lmDocRef = collection(cf, `cities/TOK/landmark/${document.id}/nestedLandmark`);

  //     setRefs((prev) => {
  //       return [...prev, lmDocRef];
  //     });

  //     // new Promise([await setDoc(doc(lmDocRef, { ...document.data() })), await setDoc({ open: true, message: 'Document Added' })]);

  //     // console.log(`From ${doc.id} => `, doc.data());
  //   });
  // };

  // ******************** CURSOR CLAUSE **********************
  // let document = 0;
  // const getData = async () => {
  //   try {
  //     // ********* Setting the Previous Doc in the CURSOR clause ************
  //     const prevQuery = query(collection(cf, 'cities'), orderBy('population'));
  //     const prevDocSnap = await getDocs(prevQuery);
  //     const q = query(colRef, orderBy('population'), startAt(prevDocSnap.docs[document]), limit(2));

  //     const docSnap = await getDocs(q);
  //     docSnap.forEach((doc) => {
  //       console.log(`From ${doc.id} => `, doc.data());
  //     });
  //     document++;
  //   } catch (e) {
  //     console.log(`Error: ${e.message}`);
  //   }
  // };

  // const getNext = () => {};

  // useEffect(() => {
  //   getData();

  //   // return () => {
  //   //   getData();
  //   // };
  // }, []); // eslint-disable-line

  return (
    <Container maxWidth="md">
      <Typography color="white" variant="h5">
        Adding data to the clound Fire-Store
      </Typography>
      <Button onClick={() => handleData()} variant="contained">
        Add Data
      </Button>
      {/* <Button onClick={() => getData()} variant="contained">
        Get Next Data
      </Button> */}
    </Container>
  );
};

export default CloudFireStore;
