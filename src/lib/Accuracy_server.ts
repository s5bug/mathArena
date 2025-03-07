import { db, app } from "../lib/firebase_server.ts";
import { getAuth } from "firebase-admin/auth";

export async function getAccuracyServer(session: string): Promise<number> {
    // get the score from Firebase
    const auth = getAuth(app);

    try {
        const decodedCookie = await auth.verifySessionCookie(session);
        if(decodedCookie.uid) {
            const user_doc = await db.collection("(default)").doc(decodedCookie.uid).get();
            if(!user_doc.exists) return 0;
            else return user_doc.get("Accuracy") || 0;
        }
    } catch {}

    throw new Error("Unauthorized");
}

export async function updateAccuracyServer(session: string, newAccuracy: number): Promise<void> {
    // 1. check that the `uid` is not fraudulent: get the `session_uid` from the `session` and check that they match
    // 2. update the document in Firestore with uid = {uid} to have score = {newScore}
    const auth = getAuth(app);
    try {
        const decodedCookie = await auth.verifySessionCookie(session);

        if (decodedCookie.uid) {
            await db.collection("(default)").doc(decodedCookie.uid).set({ accuracy: newAccuracy }, { merge: true });
        }
    } catch {}
}
