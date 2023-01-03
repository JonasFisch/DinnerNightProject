import { Participant } from './../../interfaces/UserDetails';
import {doc, Firestore, runTransaction} from 'firebase/firestore/lite';
import {Dinner, DinnerState} from '../../interfaces/Dinner';


// const leaveDinnerFB = async (db: Firestore, dinnerID: string, userID: string) => {
// 	try {
// 		await runTransaction(db, async (transaction) => {

// 			const dinnerRef = doc(db, `Dinners/${dinnerID}`)

// 			// check if document exists
// 			const dinnerDoc = await transaction.get(dinnerRef);
// 			if (!dinnerDoc.exists()) {
// 				throw "Document does not exist!";
// 			}
	
// 			// update document
//       const participants = dinnerDoc.data().participants.filter(participant => participant.ref == `/Users/${userID}`)
//       transaction.update(dinnerRef, { state: DinnerState.COOKING });
// 		});
// 		console.log("Transaction successfully committed!");
// 	} catch (e) {
// 		console.log("Transaction failed: ", e);
// 	}
// }
// WIP
// const updateDinnerState = async (db: Firestore) => {
//   try {
// 		await runTransaction(db, async (transaction) => {

// 			const dinnerRef = doc(db, "Dinners/Ofg7g3kJbOU1IcxZLRwR")

// 			// check if document exists
// 			const dinnerDoc = await transaction.get(dinnerRef);
// 			if (!dinnerDoc.exists()) {
// 				throw "Document does not exist!";
// 			}
	
// 			// update document
// 			transaction.update(dinnerRef, { state: DinnerState.COOKING });
// 		});
// 		console.log("Transaction successfully committed!");
// 	} catch (e) {
// 		console.log("Transaction failed: ", e);
// 	}
// }

// export {}