import React, { useState } from 'react';
import { Snackbar } from '@mui/material';
// import CloudFireStore from './cloud-firestore';
import RealTimeDatabase from './realTime-Database';
import Storage from './Storage';
const DataBase = () => {
  const [state, setState] = useState({ open: false, message: '' });
  return (
    <div>
      <Snackbar open={state.open} message={state.message} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={() => setState({ open: false, message: '' })} autoHideDuration={1000} />
      {/* <CloudFireStore setState={setState} /> */}
      <RealTimeDatabase setState={setState} />
      {/* <Storage setState={setState} /> */}
    </div>
  );
};

export default DataBase;
