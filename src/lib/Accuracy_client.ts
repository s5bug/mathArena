import { actions } from "astro:actions";

export async function getAccuracy(): Promise<number> {
  const AccuracyBox = document.getElementById("accuracy-box")!;
  if (AccuracyBox.classList.contains("server")) return await getAccuracyFirebase();
  else if (AccuracyBox.classList.contains("client")) return getAccuracyLocalStorage();
  else throw new Error("Score not loaded?");}

export async function getAccuracyFirebase(): Promise<number> {
  const accuracy = await actions.getAccuracy();
    return accuracy.data!;
}

export function getAccuracyLocalStorage(): number {
    const correctCount = parseInt(localStorage.getItem('correctCount') || '0', 10);
    const incorrectCount = parseInt(localStorage.getItem('incorrectCount') || '0', 10);
    const totalAnswers = correctCount + incorrectCount;
    const accuracy = totalAnswers > 0 ? Math.round((correctCount / totalAnswers) * 100) : 0;
    return accuracy;
}

export async function updateAccuracy() {
  const AccuracyBox = document.getElementById("accuracy-box")!;
  if (AccuracyBox.classList.contains("server")) return await updateAccuracyFirebase();
  else if (AccuracyBox.classList.contains("client")) return updateAccuracyLocalStorage();
  else throw new Error("Score not loaded?");
}

// TODO: Fix this function; maybe it is wrong currently?
function updateAccuracyText(): number {
  const AccuracyText = document.getElementById("accuracy-text")!;

  const correctCount = parseInt(localStorage.getItem('correctCount') || '0', 10);
  const incorrectCount = parseInt(localStorage.getItem('incorrectCount') || '0', 10);
  const totalAnswers = correctCount + incorrectCount;
  const newAccuracy = totalAnswers > 0 ? Math.round((correctCount / totalAnswers) * 100) : 0;
  
//   const currentAccuracy = Number(AccuracyText.innerText)
//   let newAccuracy = currentAccuracy + change
//   if(newAccuracy < 0) newAccuracy = 0;

  AccuracyText.innerText = newAccuracy.toString();
  return newAccuracy;
}

export async function updateAccuracyFirebase(): Promise<void> {
  const newAccuracy = updateAccuracyText();
  await actions.updateAccuracy(newAccuracy)
}

export function updateAccuracyLocalStorage(): void {
  const newAccuracy = updateAccuracyText();
  localStorage.setItem("userAccuracy", newAccuracy.toString());
}
