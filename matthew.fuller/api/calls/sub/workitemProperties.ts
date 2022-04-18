export default class WorkItemProperties {
    /** @description the properties of a work item formatted for the api */
    data: object

    constructor(
      version:string,
      revision:string,
      isLatestRevision:Boolean,
      partNumber:number,
      location:string,
      releaseStatus:string,
    ) {
      this.data = {
        version,
        revision,
        islatestrevision: isLatestRevision,
        partnumber: partNumber,
        location,
        release_status: releaseStatus,
      };
    }
}
