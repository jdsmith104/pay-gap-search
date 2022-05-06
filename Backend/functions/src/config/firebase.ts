import * as admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";

admin.initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://pay-gap-search.firebaseio.com",
});

const db = admin.firestore();
export { admin, db };
