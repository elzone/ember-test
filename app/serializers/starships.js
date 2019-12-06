import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let idFromPayload;
    if(payload.next !== null) {
      idFromPayload = this.getItemId(payload.next, 'next');
    } else {
      idFromPayload = this.getItemId(payload.previous, 'previous');
    }
    
    const resultsLength = payload.results.length;
    for(let i = 0; i < resultsLength; i++) {
      payload.results[i].crew = payload.results[i].crew === 'unknown' ? '0' : payload.results[i].crew;
    }
    
    const data = {
      id: idFromPayload,
      count: payload.count,
      next: payload.next,
      previous: payload.previous,
      results: payload.results
    };
    
    return this._super(store, primaryModelClass, data, id, requestType);
  },
  
  getItemId(initString, idType) {
    const pageSubstring = (initString).substring((initString).lastIndexOf('page'));
    const pageSubstringArray = pageSubstring.split('=');
    let idFromPayload;
    
    if(idType === 'next') {
      idFromPayload = `${pageSubstringArray[0]}${+pageSubstringArray[1] - 1}`;
    } else {
      idFromPayload = `${pageSubstringArray[0]}${+pageSubstringArray[1] + 1}`;
    }
    
    return idFromPayload;
  }
});
