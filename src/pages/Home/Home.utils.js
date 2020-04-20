import { convertCollectionsSnapshotToMap } from './../../firebase/firebase.utils';

export const fetchCompanies = async (firestore) => {
  const collectionRef = firestore.collection('companies');

  const snapShot = await collectionRef.get().catch(error => alert(error));
  const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
  return collectionsMap;
}