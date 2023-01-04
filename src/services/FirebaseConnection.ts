import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCLvFrdFMMY9j1qyPDHtSwnXx9yXteUsnY",
	authDomain: "snake-e7271.firebaseapp.com",
	projectId: "snake-e7271",
	storageBucket: "snake-e7271.appspot.com",
	messagingSenderId: "393070257027",
	appId: "1:393070257027:web:8b0dd15e11d7b588558cb6"
};

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { firestoreDB, storage, auth };