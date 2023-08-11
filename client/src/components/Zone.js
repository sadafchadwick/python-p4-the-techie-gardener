import React from 'react';
import { useParams } from 'react-router-dom';

function Zone() {
  const {id} = useParams();

  return (
    <div>
      <h1>Zone Details</h1>
      <p>Zone ID: {id}</p>
    </div>
  );
}

export default Zone;