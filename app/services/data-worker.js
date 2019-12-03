import Service from '@ember/service';
import EmberObject from '@ember/object';


const DataObject = EmberObject.extend({
  data: null,
  wins: null
});

export default Service.extend({
  peopleData: null,
  peopleForBattle: DataObject.create(),
  starshipsData: null,
  starshipsForBattle: DataObject.create(),
  battleType: null,
  isLoading: true,
  
  initDataWorker() {
    this.peopleData = [];
    this.starshipsData = [];
  },
  
  setBattleType(type) {
    this.battleType = type;
  },
  
  preparePeopleData() {
    this.getPeopleData(null);
  },
  
  prepareStarshipsData() {
    this.getStarshipsData(null);
  },
  
  async getPeopleData(peopleData) {
    let people;
    if(peopleData === null) {
      people = await swapiModule.getPeople(function(data) {
        return data;
      });
    } else {
      if(peopleData.next !== null) {
        const nextPage = (peopleData.next).substring((peopleData.next).lastIndexOf('?'));
        const nextPageArray = nextPage.split('=');
        people = await swapiModule.getPeople({page: nextPageArray[1]}, function(data) {
          return data;
        });
      } else {
        this.set('isLoading', false);
        return;
      }
    }
    if(people.results) {
      this.pushDataToStore(people.results);
    }
  
    this.getPeopleData(people);
  },
  
  pushDataToStore(data) {
    if(this.peopleData === []) {
      this.peopleData = data;
    } else {
      this.peopleData = this.peopleData.concat(data);
    }
  },
  
  prepareForBattle() {
    let selectArray = [];
    if(this.battleType === 'people') {
      let peopleWins;
      if (this.peopleForBattle.get('wins') !== null) {
        peopleWins = [...this.peopleForBattle.get('wins')];
      } else {
        peopleWins = [0, 0];
      }
  
      const rndOne = this.getRandomNumber(0, this.peopleData.length - 1);
      const rndTwo = this.getRandomNumber(0, this.peopleData.length - 1);
  
      let fromPeopleOne = {...this.peopleData[rndOne]};
      let fromPeopleTwo = {...this.peopleData[rndTwo]};
  
      if (+fromPeopleOne.mass > +fromPeopleTwo.mass) {
        fromPeopleOne.isWon = true;
        fromPeopleTwo.isWon = false;
        peopleWins[0]++;
      } else if (+fromPeopleOne.mass === +fromPeopleTwo.mass) {
        fromPeopleOne.isWon = false;
        fromPeopleTwo.isWon = false;
      } else if (+fromPeopleOne.mass < +fromPeopleTwo.mass) {
        fromPeopleOne.isWon = false;
        fromPeopleTwo.isWon = true;
        peopleWins[1]++;
      }
  
      selectArray.push(fromPeopleOne);
      selectArray.push(fromPeopleTwo);
  
      this.peopleForBattle.set('data', selectArray);
      this.peopleForBattle.set('wins', peopleWins);
    }
  },
  
  getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },
  
  async getStarshipsData(starshipsData) {
    console.log('starships');
    let starships;
    if(starshipsData === null) {
      starships = await swapiModule.getStarships(function(data) {
        return data;
      });
    } else {
      if(starshipsData.next !== null) {
        const nextPage = (starshipsData.next).substring((starshipsData.next).lastIndexOf('?'));
        const nextPageArray = nextPage.split('=');
        starships = await swapiModule.getStarships({page: nextPageArray[1]}, function(data) {
          return data;
        });
      } else {
        return;
      }
    }
    if(starships.results) {
      console.log(starships.results)
      //this.pushDataToStore(starships.results);
    }
  
    this.getStarshipsData(starships);
  },
  
  async fetch(url, method = 'GET') {
    const response = await fetch(`https://swapi.co/api${url}`, {
      method
    });
    const payload = await response.json();
    return payload;
  },
});
