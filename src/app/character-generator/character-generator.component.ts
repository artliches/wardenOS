import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { FIRST_NAMES, ITEMS, JOBS, LAST_NAMES, LOADOUTS, SAVES, SKILLS,
  STARTING_SKILLS, STRESS_PANIC } from '../services/random-tables.constants';

@Component({
  selector: 'app-character-generator',
  templateUrl: './character-generator.component.html',
  styleUrls: ['./character-generator.component.scss']
})
export class CharacterGeneratorComponent implements OnChanges {
  @Input() genChar = false;
  @Input() uploadedSheet: any;
  @Output() pageTitle = new EventEmitter<string>();
  @Output() jsonToDownload = new EventEmitter<any>();

  charSheet = {
    name: '',
    curHealth: 0,
    maxHealth: 0,
    job: '',
    saves: {},
    stress: '',
    curStress: 2,
    loadoutName: '',
    loadout: [],
    skills: [],
    saveMods: {
      armor: 0,
      body: 0,
      fear: 0,
      sanity: 0
    },
    stats: {
      strength: 0,
      speed: 0,
      intellect: 0,
      combat: 0
    },
    statMods: {
      strength: 0,
      speed: 0,
      intellect: 0,
      combat: 0
    },
    resolve: 0,
    xp: 0,
    credits: 0,
    notes: '',
    level: 0,
    rank: ''
  };
  jsonObj = {};

  savesFlavorText = {
    sanity: 'Rationalization, Logic',
    fear: 'Surprise, Loneliness',
    body: 'Hunger, Disease, Infection',
    armor: 'Physical Damage'
  };

  savesResults = {
    sanity: {
      result: 0,
      passFail: 'FAIL',
      display: false
    },
    fear: {
      result: 0,
      passFail: 'FAIL',
      display: false
    },
    body: {
      result: 0,
      passFail: 'FAIL',
      display: false
    },
    armor: {
      result: 0,
      passFail: 'FAIL',
      display: false
    }
  };

  statsFlavorText = {
    strength: 'How able-bodied you are. Lifting, pushing, hitting things hard, etc',
    speed: 'How quickly you can act and react under pressure',
    intellect: 'How knowledgeable and experienced you are',
    combat: 'How good you are at fighting'
  };

  statsResults = {
    strength: {
      result: 0,
      passFail: 'FAIL',
      display: false
    },
    speed: {
      result: 0,
      passFail: 'FAIL',
      display: false
    },
    intellect: {
      result: 0,
      passFail: 'FAIL',
      display: false
    },
    combat: {
      result: 0,
      passFail: 'FAIL',
      display: false
    },
  };

  constructor(
    private rand: RandomNumberService
  ) { }

  ngOnChanges() {
    this.resetResults();

    if (this.uploadedSheet) {
      this.charSheet = this.uploadedSheet;
    } else {
      const job = this.rand.getRandomFromSimpleArray(JOBS).toLowerCase();
      this.charSheet.loadoutName = this.rand.getRandomFromSimpleArray(Object.keys(LOADOUTS));
      const loadoutArray = LOADOUTS[this.charSheet.loadoutName].split(',');

      this.charSheet.name =
      `${this.rand.getRandomFromSimpleArray(FIRST_NAMES)} ${this.rand.getRandomFromSimpleArray(LAST_NAMES)}`.trim();

      this.charSheet.job = job;
      this.charSheet.saves = SAVES[job];
      this.charSheet.stress = STRESS_PANIC[job];
      // tslint:disable-next-line: no-string-literal
      this.charSheet.loadout = loadoutArray.map(name => ITEMS.find(item => item['title'].toLowerCase().trim() === name.toLowerCase()));

      Object.keys(this.charSheet.stats).forEach(key => {
        this.charSheet.stats[key] = this.rand.getRandomSum(6, 1, 10);
      });
      this.charSheet.skills = this.getSkills(job);

      this.assignStatsAndCredits();
    }

    this.pageTitle.emit(`${this.charSheet.name.toUpperCase()} THE ${this.charSheet.job.toUpperCase()}`);
    this.createJsonToDowload();
  }

  private resetResults() {
    Object.keys(this.statsResults).forEach(key => {
      this.statsResults[key].display = false;
    });

    Object.keys(this.savesResults).forEach(key => {
      this.savesResults[key].display = false;
    });

    Object.keys(this.charSheet.statMods).forEach(key => {
      this.charSheet.statMods[key] = 0;
    });

    Object.keys(this.charSheet.saveMods).forEach(key => {
      this.charSheet.saveMods[key] = 0;
    });

    this.charSheet.curStress = 2;
    this.charSheet.rank = '';
    this.charSheet.level = 0;
    this.charSheet.xp = 0;
    this.charSheet.credits = 0;
    this.charSheet.notes = '';
  }

  private assignStatsAndCredits() {
    switch (this.charSheet.job) {
      case 'android': {
        this.charSheet.stats.speed += 5;
        this.charSheet.stats.intellect += 5;
        break;
      }
      case 'marine': {
        this.charSheet.stats.combat += 5;
        break;
      }
      case 'teamster': {
        this.charSheet.stats.strength += 5;
        this.charSheet.stats.speed += 5;
        break;
      }
      case 'scientist': {
        this.charSheet.stats.intellect += 10;
        break;
      }
    }
    this.charSheet.maxHealth = this.charSheet.stats.strength * 2;
    this.charSheet.curHealth = this.charSheet.maxHealth;

    this.charSheet.credits = this.rand.getRandomSum(5, 1, 10) * 10;
  }

  changeField(event: any, fieldName?: string) {
    this.createJsonToDowload();
  }

  createJsonToDowload() {
    this.jsonToDownload.emit(this.charSheet);
  }

  growTextArea(event: any) {
      event.target.style.height = '0px';
      event.target.style.height = (event.target.scrollHeight + 5) + 'px';
  }

  growWidth(event: any) {
    event.target.style.width = '0px';
    event.target.style.width = (event.target.scrollWidth + 20) + 'px';
  }

  rollStatSave(rollKey: string, statOrSave: boolean) {
    const roll = [this.rand.getRandomNumber(0, 9), this.rand.getRandomNumber(0, 9)];
    const numberOfRoll = Number(`${roll[0]}${roll[1]}`);

    if (statOrSave) {
      const rollUnderTarget = this.charSheet.stats[rollKey] + this.charSheet.statMods[rollKey];
      this.statsResults[rollKey].result = roll;
      this.statsResults[rollKey].passFail =  rollUnderTarget > numberOfRoll ?
        roll[0] === roll[1] || numberOfRoll === 0 ? 'CRIT PASS' : 'PASS'
        : roll[0] === roll[1] || numberOfRoll === 99 ? 'CRIT FAIL' : 'FAIL';
      this.statsResults[rollKey].display = true;
    } else {
      const rollUnderTarget = this.charSheet.saves[rollKey] + this.charSheet.saveMods[rollKey];
      this.savesResults[rollKey].result = roll;
      this.savesResults[rollKey].passFail =  rollUnderTarget > numberOfRoll ?
        roll[0] === roll[1] || numberOfRoll === 0 ? 'CRIT PASS' : 'PASS'
        : roll[0] === roll[1] || numberOfRoll === 99 ? 'CRIT FAIL' : 'FAIL';
      this.savesResults[rollKey].display = true;
    }
  }

  private getSkills(job: any) {
    const skillList = [];
    const startingSkillsObj = STARTING_SKILLS[job];

    // get starting skills
    if (startingSkillsObj.starting.length > 0) {
      startingSkillsObj.starting.forEach(skill => skillList.push(skill.toLowerCase()));
    }

    // pick from available starting skills
    if (startingSkillsObj.pickAmount > 0) {
      const pickArray = JSON.parse(JSON.stringify(startingSkillsObj.pick));

      for (let i = 0; i < startingSkillsObj.pickAmount; i++) {
        const chosenSkill = pickArray[this.rand.getRandomNumber(0, pickArray.length - 1)];
        skillList.push(chosenSkill.toLowerCase());

        pickArray.splice(pickArray.indexOf(chosenSkill), 1);
      }
    }

    let pointsToSpend = startingSkillsObj.points;
    // buy skills
    do {
      const buyableSkills = SKILLS.filter(
        skill => skill.cost <= pointsToSpend &&
          (skill.pre.some(pre => skillList.includes(pre)) || skill.pre.length === 0) &&
          !skillList.includes(skill.title.toLowerCase())
      );

      skillList.push(buyableSkills[this.rand.getRandomNumber(0, buyableSkills.length - 1)].title.toLowerCase().trim());
      pointsToSpend -= 1;
    } while (pointsToSpend > 0);

    // tslint:disable-next-line: no-string-literal
    return skillList.map(name => SKILLS.find(skill => skill['title'].toLowerCase().trim() === name));
  }
}
