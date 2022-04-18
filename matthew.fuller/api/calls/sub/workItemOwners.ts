export default class WorkItemOwners {
  /** @description the list containing the owenr objects */
  owners = []

  /** @description the string data to use for the call */
  data: object

  constructor(owners) {
    for (let index = 0; index < owners.length; index += 1) {
      const owner = owners[index];
      this.owners.push({ _id: owner });
    }
    this.data = this.owners;
  }
}
