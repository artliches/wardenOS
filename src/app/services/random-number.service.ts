import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class RandomNumberService {
    getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    getRandomSum(numDice: number, min: number, max: number) {
        let sumOfDice = 0;
        for (let i = 0; i < numDice; i++) {
            sumOfDice += this.getRandomNumber(min, max);
        }
        return sumOfDice;
    }

    rollStringDice(stringToParse: string, parseKey: string): string {
        let iterations = 0;
        let units = 0;
        let dieEndIndex: number;
        let dieSize: number;
        let dieIndex = stringToParse.indexOf(parseKey);

        if (parseKey === '[d') {
          iterations = 1;
          const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          do {
            dieIndex = stringToParse.indexOf(parseKey);
            dieEndIndex = stringToParse.indexOf('0]', dieIndex);
            const letterIndex = stringToParse.indexOf('[Letter]');

            if (dieEndIndex > -1 && dieIndex > -1) {
              dieSize = Number(stringToParse.slice(dieIndex + 2, dieEndIndex + 1));

              units = this.getRandomSum(iterations, 1, dieSize);
              stringToParse = stringToParse.replace(`[d${dieSize}]`, units.toString());
            }

            if (letterIndex > -1) {
              const randAlpha = alpha[this.getRandomNumber(0, alpha.length - 1)];
              stringToParse = stringToParse.replace('[Letter]', randAlpha);
            }
          } while (stringToParse.indexOf('[') > -1);
        } else if (parseKey === 'd1') {
          if (stringToParse.indexOf('dmg') === -1) {
            const numberRegex = /[0-9]/;
            let stringToReplace = '';

            dieEndIndex = this.getNumberEndIndex(dieIndex, numberRegex, stringToParse);
            dieSize = Number(stringToParse.slice(dieIndex + 1, dieEndIndex));
            iterations = Number(stringToParse[dieIndex - 1]);
            units = this.getRandomNumber(iterations, dieSize);

            stringToReplace = `${stringToParse[dieIndex - 1]}d${dieSize}`;

            if (stringToParse[dieEndIndex] === '*') {
              const multiplierStartIndex = dieEndIndex;
              dieEndIndex = this.getNumberEndIndex(dieEndIndex, numberRegex, stringToParse);
              const multiplier = Number(stringToParse.slice(multiplierStartIndex + 1, dieEndIndex));

              units = units * multiplier;
              stringToReplace = `${stringToReplace}*${multiplier}`;
            }
            stringToParse = stringToParse.replace(stringToReplace, `<b>${units}</b>`);
          }
        }
        return stringToParse;
      }

  private getNumberEndIndex(dieIndex: number, numberRegex: RegExp, stringToParse: string) {
    let count = 0;
    let tempEndIndex = -1;
    do {
      count += 1;
      tempEndIndex = dieIndex + count;
    } while (numberRegex.test(stringToParse[tempEndIndex]));
    return tempEndIndex;
  }
}
