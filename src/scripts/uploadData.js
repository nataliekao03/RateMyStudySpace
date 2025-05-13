
const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const data = require("./listings.json");

async function uploadData() {
  for (const space of data) {
    const docRef = db.collection("study_spaces").doc(space.id);
    await docRef.set({
      name: space.name,
      location: space.location,
      avgRating: space.avgRating,
      tags: space.tags,
      photoUrls: space.photoUrls,
    });

    const reviewsRef = docRef.collection("reviews");
    for (const review of space.reviews) {
      await reviewsRef.add(review);
    }
  }
  console.log("Data upload complete");
}

uploadData()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Upload failed:", err);
    process.exit(1);
  });
