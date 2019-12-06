import Mixin from '@ember/object/mixin';

export default Mixin.create({
  getDataId(payload) {
    let idFromPayload;
    if(payload.next !== null) {
      idFromPayload = this.getItemId(payload.next, 'next');
    } else {
      idFromPayload = this.getItemId(payload.previous, 'previous');
    }
    
    return idFromPayload;
  },
  
  updateParamValue(dataArray, payloadType) {
    const resultsLength = dataArray.length;
    for(let i = 0; i < resultsLength; i++) {
      if(payloadType === 'people') {
        dataArray[i].mass = dataArray[i].mass === 'unknown' ? '0' : dataArray[i].mass;
      } else if(payloadType === 'starships') {
        dataArray[i].crew = dataArray[i].crew === 'unknown' ? '0' : dataArray[i].crew;
      }
    }
    
    return dataArray;
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
