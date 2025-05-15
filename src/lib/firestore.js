import { db } from "./firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// Get minimal data for all listings
export async function getBasicListings() {
  // const snapshot = await getDocs(collection(db, "study_spaces"));
  // return snapshot.docs.map(doc => {
  //   const { name, avgRating, reviews = [], tags } = doc.data();
  //   return {
  //     id: doc.id,
  //     name,
  //     avgRating,
  //     reviewCount: reviews.length ?? 0,
  //     tags,
  //   };
  // });
  const snapshot = await getDocs(collection(db, "study_spaces"));
  const listings = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return listings;
}

// Get full listing data including reviews
// export async function getFullListingById(id) {
//   const docRef = doc(db, "study_spaces", id);
//   const docSnap = await getDoc(docRef);
//   if (!docSnap.exists()) throw new Error("Listing not found");

//   const data = docSnap.data();

//   const reviewsSnap = await getDocs(collection(docRef, "reviews"));
//   const reviews = reviewsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

//   return { id, ...data, reviews };
// }
