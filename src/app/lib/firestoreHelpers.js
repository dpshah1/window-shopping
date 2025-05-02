import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";

//User
export async function addUser(userData) {
  await addDoc(collection(db, "User"), userData);
}

export async function getAllUsers() {
  const snapshot = await getDocs(collection(db, "User"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getUserByEmail(email) {
  const q = query(collection(db, "User"), where("email", "==", email));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null; // or throw an error if you prefer
  }

  const doc = snapshot.docs[0];
  return {
    id: doc.id,       // Firestore document ID
    ...doc.data()     // User fields: email, password, etc.
  };
}

//Catalogue
export async function addCatalogue(catalogueData) {
  await addDoc(collection(db, "Catalogue"), catalogueData);
}

export async function getCataloguesByOwner(ownerId) {
  const q = query(collection(db, "Catalogue"), where("ownerId", "==", ownerId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}

//Products
export async function addProduct(productData) {
  await addDoc(collection(db, "Product"), productData);
}

export async function getProductsByCatalogue(catalogueId) {
  const q = query(collection(db, "Product"), where("catalogueId", "==", catalogueId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}

//Update
//User
export async function updateUser(userId, updatedData) {
  const q = query(collection(db, "User"), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("User not found with userId: " + userId);
  }

  const docRef = snapshot.docs[0].ref; // the Firestore document reference
  await updateDoc(docRef, updatedData);
}

//Catalogue
export async function updateCatalogue(catalogueId, updatedData) {
  const q = query(collection(db, "Catalogue"), where("catalogueId", "==", catalogueId));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("Catalogue not found with catalogueId: " + catalogueId);
  }

  const catalogueRef = snapshot.docs[0].ref;
  await updateDoc(catalogueRef, updatedData);
}

//Product
export async function updateProduct(productId, updatedData) {
  const q = query(collection(db, "Product"), where("productId", "==", productId));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("Product not found with productId: " + productId);
  }

  const productRef = snapshot.docs[0].ref;
  await updateDoc(productRef, updatedData);
}

/* Later to use this inside component:
import { addUser, getAllUsers } from "@/lib/firestoreHelpers";

await addUser({ userId: 1, username: "alice" });
const users = await getAllUsers()
;*/