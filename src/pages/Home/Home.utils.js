import { convertCompaniesSnapshotToMap } from './../../firebase/firebase.utils';

export const fetchCompanies = async (firestore) => {
  const companiesRef = firestore.collection('companies');

  const snapShot = await companiesRef.get().catch(error => alert(error));
  const collectionsMap = convertCompaniesSnapshotToMap(snapShot);
  return collectionsMap;
}