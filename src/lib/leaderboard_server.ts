import { db, app } from "../lib/firebase_server.ts";
import { getAuth } from 'firebase-admin/auth';
import { type User } from "../lib/interface.ts"

export async function getHighScoreUsersServer(): Promise<User[]> {
    
    const TopFiveUsers = 5;

    const snapshot = await db.collection('(default)').orderBy("score", "desc").limit(TopFiveUsers).get();
    const uid_array =  snapshot.docs.map(doc => doc.id);
    const score_array =  snapshot.docs.map(doc => doc.get("score"));

    let TopFiveUsersList: User[] = [];

    for (let user in uid_array) {
        const displayName = await getDisplayNameServer(uid_array[user]);
        const score = score_array[user];
        const TopUser: User = {displayName: displayName, score: score};
        TopFiveUsersList.push(TopUser);
    }

    return TopFiveUsersList;
}

async function getDisplayNameServer(uid: string): Promise<string> {

    const auth = getAuth(app);
    const userRecord = auth.getUser(uid);
    const displayName = (await userRecord).displayName || "Unknown";

    return displayName;
}
