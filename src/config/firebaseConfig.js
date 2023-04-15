import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCpDofcAu9qmY3grm2zsQZ_PGgwlyRJ-fw',
  authDomain: 'mentalcats-dcec5.firebaseapp.com',
  projectId: 'mentalcats-dcec5',
  storageBucket: 'mentalcats-dcec5.appspot.com',
  messagingSenderId: '361471983536',
  appId: '1:361471983536:web:f1be5b173b729a52fb6075',
  measurementId: 'G-RY27XFT09S',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, database, firestore, storage, firebaseConfig };
