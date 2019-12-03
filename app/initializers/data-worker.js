export function initialize(application) {
  application.inject('route', 'dataWorker', 'service:data-worker');
  application.inject('controller', 'dataWorker', 'service:data-worker');
  application.inject('component', 'dataWorker', 'service:data-worker');
}

export default {
  name: 'data-worker',
  initialize
};
