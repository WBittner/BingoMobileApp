import {Injectable} from "@angular/core";

import {InitOptions} from "./initOptions";

/**
 * Service used to pass init options from option page to game page
 */
@Injectable()
export class InitOptionsService {
    options: InitOptions;

    constructor() {
        this.options = new InitOptions();
    }

    isValid():boolean {
        return this.options.numCards > 0 && this.options.numCards < 5 &&
                this.options.callInterval > 0 && this.options.callInterval < 10;
    }
}