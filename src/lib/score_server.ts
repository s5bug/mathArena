import { db, app } from "../lib/firebase_server.ts";
import { getAuth } from "firebase-admin/auth";

export async function getScoreServer(session: string): Promise<number> {
    // get the score from Firebase
    const auth = getAuth(app);

    try {
        const decodedCookie = await auth.verifySessionCookie(session);

        if(decodedCookie.uid) {
            const user_doc = await db.collection("(default)").doc(decodedCookie.uid).get();
            if(!user_doc.exists) return 0;
            else return user_doc.get("score") || 0;
        }
    } catch {}

    throw new Error("Unauthorized");
}

export async function incrementCorrectServer(session: string): Promise<{ correctCount: number, score: number, streak: number }> {
    const auth = getAuth(app);
    try {
        const decodedCookie = await auth.verifySessionCookie(session);

        if (decodedCookie.uid) {
            const user_doc = await db.collection("(default)").doc(decodedCookie.uid).get();
            let currentCorrectCount = 0;
            let currentScore = 0;
            let streak = 1;
            if (user_doc.exists) {
                currentCorrectCount = user_doc.get("correctCount") || 0;
                currentScore = user_doc.get("score") || 0;
                streak = user_doc.get("streak") || 1;
            }
            const result = {
                correctCount: currentCorrectCount + 1,
                score: currentScore + 1,
                streak: streak
            };
            await db.collection("(default)").doc(decodedCookie.uid).set(result, { merge: true });
            return result;
        }
        throw new Error("Unauthorized");
    } catch {
        throw new Error("Unauthorized");
    }
}

export async function incrementIncorrectServer(session: string): Promise<{ incorrectCount: number, score: number, streak: number }> {
    const auth = getAuth(app);
    try {
        const decodedCookie = await auth.verifySessionCookie(session);

        if (decodedCookie.uid) {
            const user_doc = await db.collection("(default)").doc(decodedCookie.uid).get();
            let currentIncorrectCount = 0;
            let currentScore = 0;
            if (user_doc.exists) {
                currentIncorrectCount = user_doc.get("incorrectCount") || 0;
                currentScore = user_doc.get("score") || 0;
            }
            const result = {
                incorrectCount: currentIncorrectCount + 1,
                score: Math.max(currentScore - 1, 0),
                streak: 0
            };
            await db.collection("(default)").doc(decodedCookie.uid).set(result, { merge: true });
            return result;
        }
        throw new Error("Unauthorized");
    } catch {
        throw new Error("Unauthorized");
    }
}
