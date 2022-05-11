import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyAf96e0uxNhM9xkRT_tsR77EsUFxemvFnE",
    authDomain: "fir-frontend-88140.firebaseapp.com",
    projectId: "fir-frontend-88140",
    storageBucket: "fir-frontend-88140.appspot.com",
    messagingSenderId: "28849543251",
    appId: "1:28849543251:web:0c1c5c5d48587a4f230ea6",
    measurementId: "G-GLP8RL9E96"
};
export const app = initializeApp(firebaseConfig);
export const cf = getFirestore(app);
export const db = getDatabase(app)
export const st = getStorage(app)