import React from 'react';
import {getStorage} from 'firebase/storage';

const StorageContext = React.createContext({
  storage: {},
});

export default StorageContext;
