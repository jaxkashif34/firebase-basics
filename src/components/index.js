import React from 'react';
import Auth from './Auth';
import Database from './data';
const Firebase = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Auth />
      <Database />
    </div>
  );
};

export default Firebase;
