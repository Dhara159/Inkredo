import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBDqStIxQMpAODYRD19kzLWy8gv8K_2-ac",
  authDomain: "crwn-db-f6657.firebaseapp.com",
  databaseURL: "https://crwn-db-f6657.firebaseio.com",
  projectId: "crwn-db-f6657",
  storageBucket: "crwn-db-f6657.appspot.com",
  messagingSenderId: "383742723416",
  appId: "1:383742723416:web:88bba0f8782dd440ea112d"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      alert(`Error while creating user ${error.message}`);
    }
  }

  return userRef;
};

// Method to add documents to collection
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  await batch.commit();
};

export const convertCompaniesSnapshotToMap = (companies) => companies.docs.map(doc => ({ ...doc.data(), id: doc.id }));

export const updateCompanies = async ({ id, employees }) => {
  await firestore
    .collection('companies')
    .doc(id)
    .update({ employees })
    .catch((error) => alert(error));
}

export const setOrUpdateUserCompanies = async ({ companyId: id, name, joinDate, endDate, userId }) => await firestore
  .collection('history')
  .doc(userId)
  .set({
    [id]: {
      name,
      joinDate,
      endDate
    }
  }, {
    merge: true
  })
  .catch((error) => alert(error));

export const fetchUserCompanies = async ({ userId }) => {
  const userCompanies = await firestore
    .collection('history')
    .doc(userId)
    .get();
  return userCompanies.data();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
