import * as functions from "firebase-functions";
import * as express from "express";

import { addEntry, getAllEntries } from "./entryController";

const app = express();
app.post("/entries", addEntry);
app.get("/entries", getAllEntries);

exports.app = functions.https.onRequest(app);
