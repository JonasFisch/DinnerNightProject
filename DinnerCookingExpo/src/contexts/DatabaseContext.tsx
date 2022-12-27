import React from 'react';
import {Firestore} from 'firebase/firestore/lite';

const DatabaseContext = React.createContext({
  database: Firestore,
});

export default DatabaseContext;
