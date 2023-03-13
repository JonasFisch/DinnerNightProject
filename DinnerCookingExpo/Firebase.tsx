import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, Firestore, getFirestore } from "firebase/firestore";



const localFirebaseConfig = {
  host: "http://192.168.2.33"
}

// this is fixing local auth!!!
export const setupEmulators = async (auth: Auth, db: Firestore) => {
  const authUrl = `${localFirebaseConfig}:9099`
  await fetch(authUrl)  
  connectAuthEmulator(auth, authUrl)
  connectFirestoreEmulator(db, 'localhost', 8080);
} 

// export const setupFirebaseEnvironment = async (auth: Auth, db: Firestore, storage: FirebaseStorage) => {
//     await setupEmulators(auth, db);}