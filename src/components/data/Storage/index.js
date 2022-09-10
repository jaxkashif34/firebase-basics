import { Button, Link, Typography } from '@mui/material';
import { st } from '../../../firebase';
import { deleteObject, getDownloadURL, getMetadata, list, listAll, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';

const Storage = ({ setState }) => {
  const [uploadTasks, setUpLoadTasks] = useState(null);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(null);
  const [imgurl, setImgurl] = useState('');
  const [allImages, setAllImages] = useState([]);
  const imagesRef = ref(st, `images`);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const sizeInMb = file.size / 1024 / 1024;
    const imgRef = ref(st, `images/${file.name}`);
    const firebasebug = ref(st, `images/firebasebug.png`);
    const vidRef = ref(st, `videos/${file.name}`);

    // *********** upload file to firebase storage without any features ***********
    // try {
    //   if (sizeInMb < 5) {
    //     const fileSnap = await uploadBytes(imgRef, file);
    //     console.log(fileSnap);
    //     setState({ open: true, message: 'File Uploaded successfully' });
    //   } else {
    //     setState({ open: true, message: 'File size should be Less than 5 MB' });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    // *********** upload file to firebase storage without any features ***********
    // try {
    //   const fileSnap = await uploadBytes(imgRef, file);
    //   console.log(fileSnap);
    //   setState({ open: true, message: 'File Uploaded successfully' });
    // } catch (e) {
    //   console.log(e);
    // }
    // *********** upload file to firebase storage with controls stop, cancel, pause ***********

    // try {
    //   const uploadTask = uploadBytesResumable(vidRef, file);
    //   setUpLoadTasks(uploadTask);

    //   setState({ open: true, message: 'File uploading' });
    // } catch (e) {
    //   console.log(e);
    // }

    // *********** state_changed event ***********

    // const uploadTask = uploadBytesResumable(vidRef, file);

    // uploadTask.on(
    //   'state_changed',
    //   (snapshot) => {
    //     const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
    //     setProgress(progress);

    //     setUpLoadTasks(snapshot.task);
    //     console.log(snapshot.state);
    //     switch (snapshot.state) {
    //       case 'paused':
    //         setStatus('Upload is paused');
    //         break;
    //       case 'running':
    //         setStatus('Upload is running');
    //         break;
    //       case 'success':
    //         setStatus('Uploaded successfull');
    //         break;
    //     }
    //   },
    //   (e) => {
    //     console.log(e);
    //   },
    //   async () => {
    //     const downloadLink = await getDownloadURL(uploadTask.snapshot.ref);
    //     setState({ open: true, message: 'download is available' });

    //     setImgurl(downloadLink);
    //   }
    // );

    // *********** get File Metadata ***********

    // const metaData = await getMetadata(firebasebug);

    // console.log(metaData);

    // *********** get File Metadata ***********

    // try {
    //   await deleteObject(firebasebug);
    //   setState({ open: true, message: 'File Deleted successfully' });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const getData = async () => {
    // **************** listAll method **********
    // const images = await listAll(imagesRef);
    // images.items.forEach((item) => {
    //   getDownloadURL(item).then((url) => {
    //     setAllImages((prev) => [...prev, { name: item.name, link: url }]);
    //   });
    // });
    // **************** list method **********
    const images = await list(imagesRef, { maxResults: 2 });
    images.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setAllImages((prev) => [...prev, { name: item.name, link: url }]);
      });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(allImages);

  return (
    <>
      <Typography variant="h5" textAlign="center" color="white">
        Firebase Storage
      </Typography>

      <Typography variant="h5" textAlign="center" color="white">
        {status}
      </Typography>

      <Typography variant="h5" textAlign="center" color="white">
        {progress}
      </Typography>

      {/* {allImages.map((item, index) => (
        <div key={index}>
          <Typography variant="h5" textAlign="center" color="white">
            {item.name}
          </Typography>
          <img src={item.link} alt="" width="100px" height="100px" />;
        </div>
      ))} */}

      <Button variant="contained" component="label">
        Upload File
        {/* will test multiple files in future */}
        <input type="file" accept="*" hidden multiple onChange={(e) => handleChange(e)} />
      </Button>
      <Button variant="contained" onChange={() => handleChange()}>
        Run Function
      </Button>

      <Button
        variant="contained"
        onClick={() => {
          uploadTasks.pause();
          setStatus('Paused');
        }}>
        Stop
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          uploadTasks.resume();
          setStatus('Resumed');
        }}>
        Resume
      </Button>
    </>
  );
};

export default Storage;
