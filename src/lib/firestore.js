import { db } from "./firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// Get minimal data for all listings
export async function getBasicListings() {
  const snapshot = await getDocs(collection(db, "study_spaces"));
  const listings = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return listings;
}

// export async function getVeryBasicListings() {
//   const q = query(
//     collection(db, "study_spaces"),
//     select("name", "avgRating", "reviews") // ✅Only retrieve these fields
//   );

//   const snapshot = await getDocs(q);
//   const listings = snapshot.docs.map((doc) => {
//     const data = doc.data();
//     const { name, avgRating, reviews = [] } = data;

//     return {
//       id: doc.id,
//       name,
//       avgRating,
//       reviewCount: reviews.length,
//       location,
//     };
//   });

//   return listings;
// }

export async function getListingById(id) {
  try {
    const docRef = doc(db, "study_spaces", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error(`Listing with ID "${id}" not found.`);
    }

    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    console.error("Error fetching listing:", error);
    throw error;
  }
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
