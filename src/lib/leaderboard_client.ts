import { actions } from "astro:actions";
import { type User } from "./interface";

async function getHighScoreUsersFirebase(): Promise<User[]> {
    const TopFiveUsersList = await actions.getHighScorePlayers();
    return TopFiveUsersList.data!;
}

function createLeaderboardItem(user: User, index: number) {
    const item = document.createElement('div');
    item.className = 'leaderboard-item';
    item.style.animationDelay = `${ index * 0.1 }s`
    
    item.innerHTML = `
        <div class="rank">${index + 1}</div>
        <div class="user-info"> 
            <div class="username">${user.displayName}</div>
        </div>
        <div class="score-info">
            <div class="score">Score: ${user.score}</div>
        </div>
    `;

    return item;
}

export function renderLeaderboard() {

    const content = document.querySelector('.content') as HTMLElement;
    content.innerHTML = '';

    getHighScoreUsersFirebase().then((TopFiveUsersList) => {
        for (let index = 0; index < TopFiveUsersList.length; index++) {
            const item = createLeaderboardItem(TopFiveUsersList[index], index);
            content.appendChild(item);
        }
    })

}