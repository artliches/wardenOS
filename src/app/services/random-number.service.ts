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
        let iterations: any;
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
        } else if (parseKey === 'd1')  {
          const additionIndex = stringToParse.indexOf('+');
          const kcrIndex = stringToParse.indexOf('kcr');

          if (dieIndex > -1) {
            let removeUnderline = false;
            iterations = stringToParse[dieIndex - 1];
            dieEndIndex = stringToParse.indexOf(' ', dieIndex);
            dieSize = Number(stringToParse.slice(dieIndex + 1, dieEndIndex));
            units += this.getRandomSum(iterations, 1, dieSize);

            if (additionIndex > -1) {
              let addition = 0;
              if (kcrIndex > -1) {
                addition = Number(stringToParse.slice(additionIndex + 1, stringToParse.indexOf('kcr', additionIndex)));
              } else {
                addition = Number(stringToParse.slice(additionIndex + 1, stringToParse.indexOf('x', additionIndex)));
              }
              units += addition;
              stringToParse = stringToParse.replace(` + ${addition}`, '');
            } else if (kcrIndex > -1) {
              removeUnderline = true;
              dieEndIndex = stringToParse.indexOf('kcr', dieIndex);
              dieSize = Number(stringToParse.slice(dieIndex + 1, kcrIndex));
              units = this.getRandomSum(iterations, 1, dieSize) * 10;
            }
            stringToParse = removeUnderline ?
              stringToParse.replace(`<u>${iterations}d${dieSize}kcr</u>`, `<b class="magenta">${units.toString()}</b>kcr`) :
              stringToParse.replace(`${iterations}d${dieSize}`, `${units.toString()}`);
          }
        }
        return stringToParse;
      }
}
