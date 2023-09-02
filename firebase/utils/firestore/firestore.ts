import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { database } from "../../config";

export const createData = (
  collectionName: string,
  data: object,
  onSuccess: (res: object) => void,
  onError: (error: object) => void
) => {
  addDoc(collection(database, collectionName), data)
    .then((res: object) => {
      onSuccess(res);
    })
    .catch((e: object) => {
      onError(e);
    });
};

export const getDataFromCollection = async (collectionName: string) => {
  let dataList: any = [];

  const q = query(collection(database, collectionName));
  try {
    const documents = await getDocs(q);
    documents.forEach((doc) => {
      dataList.push({ ...doc.data(), id: doc.id });
    });

    return dataList;
  } catch (e) {
    return e;
  }
};

export const getSingleDataFromCollection = async (
  collectionName: string,
  docId: string
) => {
  const ref = doc(database, collectionName, docId);

  const document = await getDoc(ref);
  if (document.exists()) {
    return document.data();
  } else {
    return { error: "Document not found" };
  }
};

export const updateFromCollection = async (
  collectionName: string,
  updatedData: object,
  docId: string,
  onSuccess: (res: object) => void,
  onError: (error: object) => void
) => {
  const ref = doc(database, collectionName, docId);

  await setDoc(ref, updatedData)
    .then((res: any) => {
      onSuccess(res);
    })
    .catch((e: object) => onError(e));
};

export const deleteFromCollection = async (
  collectionName: string,
  docId: string,
  onSuccess: (res: object) => void,
  onError: (error: object) => void
) => {
  await deleteDoc(doc(database, collectionName, docId))
    .then((res: any) => {
      onSuccess(res);
    })
    .catch((e) => {
      onError(e);
    });
};
