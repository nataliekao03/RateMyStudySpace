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


export async function getReviewCount(spaceId) {
  const reviewsRef = collection(db, "study_spaces", spaceId, "reviews");
  const snapshot = await getDocs(reviewsRef);
  return snapshot.size;
}

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
