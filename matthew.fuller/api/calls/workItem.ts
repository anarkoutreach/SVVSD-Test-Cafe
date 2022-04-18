import genericCall from './genericCall';
import WorkItemAssets from './sub/workITemAssets';
import WorkItemOwners from './sub/workItemOwners';
import WorkItemProperties from './sub/workitemProperties';

export default class workItemAPICall extends genericCall {
    /** @description the titled
     *
     *
     *
     * of the work item to be posted */
    title: string

    /** @description the description of the work item to be posted */
    description: string

    /** @description the properties of the work item to be posted */
    properties: WorkItemProperties

    /** @description the owners of the work item to be posted */
    owners: WorkItemOwners

    /** @description the assets of the work item to be posted */
    assets: WorkItemAssets

    constructor(
      title,
      description,
      properties:WorkItemProperties,
      owners:WorkItemOwners,
      assets:WorkItemAssets,
    ) {
      super();
      this.path = '/api/workitems';
      this.title = title;
      this.description = description;
      this.properties = properties;
      this.owners = owners;
      this.assets = assets;
      this.addToPayload(this.title, 'title');
      this.addToPayload(this.description, 'description');
      this.addToPayload(this.properties.data, 'properties');
      this.addToPayload(this.owners.data, 'owners');
      this.addToPayload(this.assets.data, 'assets');
      this.headers['Content-Length'] = this.data.length;
    }
}
