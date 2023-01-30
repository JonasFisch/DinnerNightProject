import React from 'react';
import FirebaseFirestore from 'firebase/firestore';

const DatabaseContext = React.createContext({
  database: FirebaseFirestore,
});

export default DatabaseContext;
