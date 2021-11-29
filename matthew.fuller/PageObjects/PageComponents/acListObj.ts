export default class ACListObj {
    name:string

    description: string

    roles: string[]

    constructor(name:string, description:string, roles:string[]) {
      this.name = name;
      this.description = description;
      this.roles = roles;
    }
}
