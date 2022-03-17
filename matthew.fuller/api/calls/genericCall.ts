import Config from '../apiConfig';

export default class genericCall {
  config = new Config()

  /** @description the payload of a request */
  data = '{}'

  /**
   * @description add a new entry to the payload of a request
   * @param dataToAdd the data to add / the value of a key
   * @param name -- the name of the key to add
   */
  addToPayload(dataToAdd, name) {
    const tempOBJ = JSON.parse(this.data);
    tempOBJ[name] = dataToAdd;
    this.data = JSON.stringify(tempOBJ);
  }

  /** @description the path for the api to call the comment post request */
      path: string
}
