import Service from '@ember/service';
import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';

import { inject as service } from '@ember/service';

const DataObject = EmberObject.extend({
  data: null,
  wins: null
});

export default Service.extend(Evented, {
  store: service(),
  
  peopleFullData: null,
  peopleForBattle: null,
  starshipsFullData: null,
  starshipsForBattle: null,
  battleType: null,
  isRootRoute: true,
  
  initDataWorker() {
    this.peopleFullData = [];
    this.peopleForBattle = DataObject.create();
    this.starshipsFullData = [];
    this.starshipsForBattle = DataObject.create();
  },
  
  updateRootRoute(isRoot) {
    this.set('isRootRoute', isRoot);
  },
  
  setBattleType(type) {
    this.battleType = type;
  },
  
  prepareData(battleType) {
    this.battleType = battleType;
    this.setFullData(null);
  },
  
  /*async getData() {
    await this.store.queryRecord('people', {page: 1})
      .then(function(response) {
        console.log('res', response.results)
    });
    await this.store.queryRecord('people', {page: 2});
    await this.store.queryRecord('people', {page: 3});
    console.log('record', this.store.peekRecord('people', 'page=2').results);
  },*/
  
  async getDataFromServer(pageId) {
    try {
      await this.store.queryRecord(this.battleType, {page: pageId});
      
      return this.store.peekRecord(this.battleType, `page${pageId}`);
    } catch(error) {
      alert(`Couldn't load all data from server. Please reload the page.`);
    }
  },
  
  async setFullData(serverData) {
    let data;
    if(serverData === null) {
      data = await this.getDataFromServer(1);
    } else {
      if(serverData.next !== null) {
        const nextPage = (serverData.next).substring((serverData.next).lastIndexOf('?'));
        const nextPageArray = nextPage.split('=');
        data = await this.getDataFromServer(+nextPageArray[1]);
      } else {
        if(this.battleType === 'people') {
          this.prepareData('starships');
        } else {
          this.set('isLoading', false);
          this.trigger('loadingFinish')
          return;
        }
      }
    }
    if(data && data.results) {
      if(this.battleType === 'people') {
        this.peopleFullData = this.pushDataToStore(data.results, this.peopleFullData);
      } else {
        this.starshipsFullData = this.pushDataToStore(data.results, this.starshipsFullData);
      }
      this.setFullData(data);
    }
  },
  
  pushDataToStore(data, fullData) {
    if (fullData === []) {
      fullData = data;
    } else {
      fullData = fullData.concat(data);
    }
    
    return fullData;
  },
  
  updateDataForBattle() {
    if(this.battleType === 'people') {
      this.peopleForBattle = this.prepareDataForBattle(this.peopleForBattle, this.peopleFullData);
    } else if(this.battleType === 'starships') {
      this.starshipsForBattle = this.prepareDataForBattle(this.starshipsForBattle, this.starshipsFullData);
    }
  },
  
  prepareDataForBattle(dataForBattle, fullData) {
    const randomData = this.getRandomBattleData(dataForBattle, fullData);
  
    dataForBattle.set('data', randomData.selectArray);
    dataForBattle.set('wins', randomData.winsArray);
    
    return dataForBattle;
  },
  
  getRandomBattleData(dataSource, dataFull) {
    let selectArray;
    let winsArray;
    
    if(dataSource.get('wins') !== null) {
      winsArray = [...dataSource.get('wins')];
    } else {
      winsArray = [0, 0];
    }
    
    const dataLength = dataFull.length - 1;
    const randomNumberOne = this.getRandomNumber(0, dataLength);
    const randomNumberTwo = this.getRandomNumber(0, dataLength);
  
    let unitOne = {...dataFull[randomNumberOne]};
    let unitTwo = {...dataFull[randomNumberTwo]};
    
    let compareValueOne;
    let compareValueTwo;
    
    if(this.battleType === 'people') {
      compareValueOne = +unitOne.mass;
      compareValueTwo = +unitTwo.mass;
    } else if(this.battleType === 'starships') {
      compareValueOne = +unitOne.crew;
      compareValueTwo = +unitTwo.crew;
    }
  
    if(compareValueOne > compareValueTwo) {
      unitOne.isWon = true;
      unitTwo.isWon = false;
      winsArray[0]++;
    } else if (compareValueOne === compareValueTwo) {
      unitOne.isWon = false;
      unitTwo.isWon = false;
    } else if (compareValueOne < compareValueTwo) {
      unitOne.isWon = false;
      unitTwo.isWon = true;
      winsArray[1]++;
    }
    
    selectArray = [unitOne, unitTwo];
    
    let randomData = {};
    randomData.selectArray = selectArray;
    randomData.winsArray = winsArray;
    
    return randomData;
  },
  
  getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },
});
