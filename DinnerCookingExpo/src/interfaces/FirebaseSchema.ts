import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { DocumentReference, Timestamp } from "firebase/firestore/lite"


interface DinnerFirebase {
	admin: DocumentReference
	date: Timestamp,
	name: string,
	participants: DocumentReference[];
	state: number,
} 
export class DinnerClass {
	constructor(
		readonly admin: DocumentReference,
		readonly date: Timestamp,
		readonly name: string,
		readonly participants: DocumentReference[],
		readonly state: number,
	) {}

	toString(): string {
		return "hallo ich bin ein Dinner";
	}
}

export const dinnerConverter = {
	toFirestore(dinner: DinnerClass): DocumentData {
		return {admin: dinner.admin, date: dinner.date, name: dinner.name, participants: dinner.participants, state: dinner.state}
	},
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions,	
	) : DinnerClass {
		const data = snapshot.data(options)!;
		return new DinnerClass(data.admin, data.date, data.name, data.participants, data.state)
	}
};

export type UserFirebase = {
	hasDoneIntro: boolean,
	imageUrl: string,
	name: string,
}