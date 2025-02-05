export class ProblemGenerator {
    constructor() {}
  
    private generateNumber(digits: number, allowNegative: boolean = true): number {
      const max = Math.pow(10, digits) - 1;
      const min = Math.pow(10, digits - 1);
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
  
      if (allowNegative && Math.random() < 0.5) {
        num *= -1;
      }
  
      return num;
    }
  
    addSubtract(numbers: number, digits: number): number[] {
      if (numbers <= 0 || digits <= 0) {
        throw new Error("Numbers and digits must be greater than zero.");
      }
  
      let result: number[] = [];
  
      while (result.length < numbers) {
        let num = this.generateNumber(digits, true);
        result.push(num);
  
        if (result.reduce((sum, n) => sum + n, 0) <= 0) {
          result.pop();
        }
      }
      console.log(`Generated Add/Subtract Array:`, result); // Debug usage
      return result;
    }
  
    multiply(digits1: number, digits2: number): number[] {
      if (digits1 <= 0 || digits2 <= 0) {
        throw new Error("Digit values must be greater than zero.");
      }
  
      const num1 = this.generateNumber(digits1, false);
      const num2 = this.generateNumber(digits2, false);
  
      return [num1, num2];
    }
  
    divide(digits1: number, digits2: number): number[] {
      if (digits1 <= 0 || digits2 <= 0) {
        throw new Error("Digit values must be greater than zero.");
      }
  
      let divisor = this.generateNumber(digits2, false);
      if (divisor === 0) divisor = 1;
  
      let dividend = divisor * this.generateNumber(digits1, false);
  
      return [dividend, divisor];
    }
  }
  