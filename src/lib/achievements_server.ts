import { db, app } from "../lib/firebase_server.ts";
import { getAuth } from "firebase-admin/auth";

// TODO this will be checking achievements given a partial stats object
// need to retype stats & rename function
export async function updateStatsServer(session: string, stats: {
    streak: number,
    sessionCorrect: number,
    totalCorrect: number,
    accuracy: number,
    achievements?: string[]
    }): Promise<void> {
        
    console.log("Server receiving stats update:", stats);  // Debug log
    const auth = getAuth(app);
    try {
        const decodedCookie = await auth.verifySessionCookie(session);
        if (decodedCookie.uid) {

            // RIKSEAN's code:
            //
            // const updateData = {
            //     currentStreak: stats.streak,
            //     sessionCorrect: stats.sessionCorrect,
            //     totalCorrect: stats.totalCorrect,
            //     accuracy: stats.accuracy,
            //     achievements: stats.achievements || []  // Always include achievements array
            // }; 
            // console.log("Saving to database:", updateData);  // Debug log
            // await db.collection("(default)").doc(decodedCookie.uid).set(updateData, { merge: true });

            await db.collection("(default)").doc(decodedCookie.uid).set(
                {
                    streak: ,
                    sessionCorrect: ,

                }
            )
        }
    } catch (error) {
        console.error("Error updating stats:", error);  // Debug log
    }
}

