import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class RandomNumberService {
    getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    getRandomNumberArray(min: number, max: number, numDie: number) {
      const dieArray = [];
      for (let i = 0; i < numDie; i++) {
        dieArray.push(this.getRandomNumber(min, max));
      }
      return dieArray;
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
        } else {
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

  getRandomSaying(previousNum: number, sayingsIndex: number) {
    const randomSayings = [
      'T-MINUS 10...',
      'GIVE ME A POUND OF FLESH',
      'ONCE MORE UNTO THE BREACH',
      'ONE SMALL STEP FOR MAN',
      'SHOOT FOR THE MOON',
      'A TIME TO LIVE',
      'A TIME TO DIE',
      'A LAMB FOR THE SLAUGHTER',
      '01110011 01101111 01110011',
      'GAME OVER MAN!',
      'ALLMOTHER, ARE YOU AWAKE?',
      'IF DREAMS CAN COME TRUE, WHAT DOES THAT SAY ABOUT NIGHTMARES?',
      'LIKE TEARS IN THE RAIN',
      'A BLACK BLOOD NOTHINGNESS BEGAN TO SPIN',
      'A SYSTEM OF CELLS INTERLINKED WITHIN CELLS INTERLINKED WITHIN CELLS INTERLINKED WITHIN ONE STEM',
      'AND DREADFULLY DISTINCT AGAINST THE DARK A TALL WHITE FOUNTAIN PLAYED',
      'YOU\'RE NOT HELPING. WHY IS THAT?',
      'I DREAMT I WAS A BUTTERFLY...',
      'GROUND CONTROL, PLEASE COME IN...I BEG OF YOU',
      'IT\'S YOUR GOOD FRIEND W1N6D1N6$!'
    ];

    const randomPerson = [
      'HERO',
      'LAMB',
      'MEATBAG',
      'MEAT-POPSICLE',
      'MULTIPASS',
      'ASTRONAUT',
      'EXPLORER',
      'SACRIFICE',
      'FOOL',
      'VILLIAN',
      'WANDERER',
      'SPACER',
      'REPLICANT',
      'POUND OF FLESH'
    ];

    const randomDerelict = [
      'DERELICT',
      'HUSK',
      'GRAVE',
      'COFFIN',
      'DEATH-TRAP',
      'SEPULCHER',
    ];

    const sayings = [
      randomSayings, randomPerson, randomDerelict
    ];

    let chosenSaying: number;
    do {
      chosenSaying = this.getRandomNumber(0, sayings[sayingsIndex].length - 1);
    } while (chosenSaying === previousNum);

    return {num: chosenSaying, text: sayings[sayingsIndex][chosenSaying]};
  }
}
