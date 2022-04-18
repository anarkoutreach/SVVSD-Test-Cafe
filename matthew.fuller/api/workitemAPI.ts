import AnarkAPIFrameWork from './apiFrameWork';
import APIWorkItemCall from './calls/workItem';

const api = new AnarkAPIFrameWork();

export default class WorkItemAPI {
  async createWorkItem(apiWorkItem: APIWorkItemCall) {
    return api.post(apiWorkItem.path, apiWorkItem.headers, apiWorkItem.data);
  }
}
