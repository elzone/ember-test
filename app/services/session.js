import Service from '@ember/service';
import { inject as service } from '@ember/service';


export default Service.extend({
  store: service(),
  peopleData: null,
  
  initSession() {
    //this.getPeopleData(null);
    this.getStarshipsData(null);
  },
  
  async getPeopleData(peopleData) {
    let people;
    if(peopleData === null) {
      people = await this.fetch('/people');
    } else {
      if(peopleData.next !== null) {
        const nextPage = (peopleData.next).substring((peopleData.next).lastIndexOf('?'));
        people = await this.fetch(`/people/${nextPage}`);
      } else {
        return;
      }
    }
    if(people.results) {
      this.pushDataToStore(people.results);
    }
  
    this.getPeopleData(people);
  },
  
  pushDataToStore(data) {
    console.log('push data', data);
    if(this.peopleData === null) {
      this.peopleData = data;
    } else {
      this.peopleData = this.peopleData.concat(data);
    }
    console.log(this.peopleData)
    //this.store.push(data)
  },
  
  async getStarshipsData(starshipsData) {
    console.log('starships')
    let starships;
    if(starshipsData === null) {
      starships = await this.fetch('/starships');
      console.log(starships)
    } else {
      if(starshipsData.next !== null) {
        const nextPage = (starshipsData.next).substring((starshipsData.next).lastIndexOf('?'));
        starships = await this.fetch(`/starships/${nextPage}`);
      } else {
        return;
      }
    }
    if(starships.results) {
      this.pushDataToStore(starships.results);
    }
  
    this.getStarshipsData(starships);
  },
  
  async fetch(url, method = 'GET') {
    const response = await fetch(`https://swapi.co/api${url}`, {
      method,
    });
    const payload = await response.json();
    return payload;
  },
});
