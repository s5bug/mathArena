export function getScore(): number {
    return parseInt(localStorage.getItem("userScore") || "0", 10);
  }
  
  export function updateScore(change: number): void {
    const newScore = getScore() + change;
    localStorage.setItem("userScore", newScore.toString());
  
    
    const scoreBox = document.getElementById("score-box");
    if (scoreBox) {
      scoreBox.textContent = `Score: ${newScore}`;
    }
  }