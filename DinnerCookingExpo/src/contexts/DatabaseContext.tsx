import React from 'react';
import {getFirestore} from 'firebase/firestore/lite';

const DatabaseContext = React.createContext({
  database: typeof getFirestore,
});

export default DatabaseContext;
