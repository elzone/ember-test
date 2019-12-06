import DS from 'ember-data';
import SerializerBase from '../mixins/serializer-base';

export default DS.JSONSerializer.extend(SerializerBase, {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    const idFromPayload = this.getDataId(payload);
    
    payload.results = this.updateParamValue(payload.results, 'starships');
    
    const data = {
      id: idFromPayload,
      count: payload.count,
      next: payload.next,
      previous: payload.previous,
      results: payload.results
    };
    
    return this._super(store, primaryModelClass, data, id, requestType);
  }
});
