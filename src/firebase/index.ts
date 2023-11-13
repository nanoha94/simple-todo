import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";

initializeApp(firebaseConfig);

export const db = getFirestore();
export const dbTimestamp = Timestamp;
