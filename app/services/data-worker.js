import Service from '@ember/service';
import EmberObject from '@ember/object';

const DataObject = EmberObject.extend({
  data: null,
  wins: null
});

export default Service.extend({
  peopleFullData: null,
  peopleForBattle: null,
  starshipsFullData: null,
  starshipsForBattle: null,
  battleType: null,
  isLoading: true,
  isRootRoute: true,
  
  initDataWorker() {
    this.peopleFullData = [];
    this.peopleForBattle = DataObject.create();
    this.starshipsFullData = [];
    this.starshipsForBattle = DataObject.create();
  },
  
  updateRoute(isRoot) {
    this.set('isRootRoute', isRoot);
  },
  
  setBattleType(type) {
    this.battleType = type;
  },
  
  preparePeopleData() {
    this.battleType = 'people';
    this.getPeopleData(null);
  },
  
  prepareStarshipsData() {
    this.battleType = 'starships';
    this.getStarshipsData(null);
  },
  
  async getPeopleData(peopleFullData) {
    let people;
    if(peopleFullData === null) {
      people = await window.swapiModule.getPeople(function(data) {
        return data;
      });
    } else {
      if(peopleFullData.next !== null) {
        const nextPage = (peopleFullData.next).substring((peopleFullData.next).lastIndexOf('?'));
        const nextPageArray = nextPage.split('=');
        people = await window.swapiModule.getPeople({page: nextPageArray[1]}, function(data) {
          return data;
        });
      } else {
        this. prepareStarshipsData();
        return;
      }
    }
    if(people.results) {
      this.pushDataToStore(people.results);
    }
  
    this.getPeopleData(people);
  },
  
  async getStarshipsData(starshipsFullData) {
    let starships;
    if(starshipsFullData === null) {
      starships = await window.swapiModule.getStarships(function(data) {
        return data;
      });
    } else {
      if(starshipsFullData.next !== null) {
        const nextPage = (starshipsFullData.next).substring((starshipsFullData.next).lastIndexOf('?'));
        const nextPageArray = nextPage.split('=');
        starships = await window.swapiModule.getStarships({page: nextPageArray[1]}, function(data) {
          return data;
        });
      } else {
        this.set('isLoading', false);
        return;
      }
    }
    if(starships.results) {
      this.pushDataToStore(starships.results);
    }
  
    this.getStarshipsData(starships);
  },
  
  pushDataToStore(data) {
    if(this.battleType === 'people') {
      if (this.peopleFullData === []) {
        this.peopleFullData = data;
      } else {
        this.peopleFullData = this.peopleFullData.concat(data);
      }
    } else if(this.battleType === 'starships') {
      if (this.starshipsFullData === []) {
        this.starshipsFullData = data;
      } else {
        this.starshipsFullData = this.starshipsFullData.concat(data);
      }
    }
  },
  
  prepareDataForBattle() {
    if(this.battleType === 'people') {
      const randomPeopleData = this.getRandomBattleData(this.peopleForBattle, this.peopleFullData);
      
      this.peopleForBattle.set('data', randomPeopleData.selectArray);
      this.peopleForBattle.set('wins', randomPeopleData.winsArray);
    } else if(this.battleType === 'starships') {
      const randomStarshipsData = this.getRandomBattleData(this.starshipsForBattle, this.starshipsFullData);
      
      this.starshipsForBattle.set('data', randomStarshipsData.selectArray);
      this.starshipsForBattle.set('wins', randomStarshipsData.winsArray);
    }
  },
  
  getRandomBattleData(dataSource, dataFull) {
    let selectArray;
    let winsArray;
    
    if (dataSource.get('wins') !== null) {
      winsArray = [...dataSource.get('wins')];
    } else {
      winsArray = [0, 0];
    }
  
    const rndOne = this.getRandomNumber(0, dataFull.length - 1);
    const rndTwo = this.getRandomNumber(0, dataFull.length - 1);
  
    let itemOne = {...dataFull[rndOne]};
    let itemTwo = {...dataFull[rndTwo]};
    
    let compareValueOne;
    let compareValueTwo;
    if(this.battleType === 'people') {
      compareValueOne = +itemOne.mass;
      compareValueTwo = +itemTwo.mass;
    } else if(this.battleType === 'starships') {
      compareValueOne = +itemOne.crew;
      compareValueTwo = +itemTwo.crew;
    }
  
    if (compareValueOne > compareValueTwo) {
      itemOne.isWon = true;
      itemTwo.isWon = false;
      winsArray[0]++;
    } else if (compareValueOne === compareValueTwo) {
      itemOne.isWon = false;
      itemTwo.isWon = false;
    } else if (compareValueOne < compareValueTwo) {
      itemOne.isWon = false;
      itemTwo.isWon = true;
      winsArray[1]++;
    }
    
    selectArray = [itemOne, itemTwo];
    
    let randomData = {};
    randomData.selectArray = selectArray;
    randomData.winsArray = winsArray;
    
    return randomData;
  },
  
  getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },
});
