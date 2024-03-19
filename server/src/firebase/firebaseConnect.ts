import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUwGwTBBw9zFO2vOyZtcAMgQqHmQ982gY",
  authDomain: "fir-chat-21293.firebaseapp.com",
  projectId: "fir-chat-21293",
  storageBucket: "fir-chat-21293.appspot.com",
  messagingSenderId: "376449345011",
  appId: "1:376449345011:web:3890d1e9ff473ca537de86",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
