const uuidv4 = require('uuid/v4');

class Utilities {
    getUuid = function(): string {
        return uuidv4();
    }
}

export = new Utilities();