import { Injectable, Scope, Logger } from '@nestjs/common';
import colors = require('colors');

@Injectable({ scope: Scope.TRANSIENT })
export class LoftLogger extends Logger {
  constructor() {
    super('', false);
  }

  debug(message: string) {
    if (this.context && this.context.length > 0) {
      console.log(colors.bgWhite.black(`\n ${this.context} `));
    }
    console.log(`${message}`);
  }

  log(message: string) {
    if (this.context && this.context.length > 0) {
      console.log(colors.bgYellow.black(`\n ${this.context} `));
    }
    console.log(`${message}`);
  }

  verbose(message: string) {
    if (this.context && this.context.length > 0) {
      console.log(colors.bgYellow.black(`\n ${this.context} `));
    }
    console.log(`${message}`);
  }

  warn(message: string) {
    if (this.context && this.context.length > 0) {
      console.log(colors.bgYellow.black(`\n ${this.context} `));
    }
    console.log(`${message}`);
  }

  error(message: string, trace = '') {
    // custom logs logic e.g. integrate with winston (https://github.com/winstonjs/winston)
    if (this.context && this.context.length > 0) {
      console.log(colors.bgRed(`\n ${this.context} `));
    }
    console.log(
      colors.rainbow(`
####### ######  ######  ####### ######  
#       #     # #     # #     # #     # 
#       #     # #     # #     # #     # 
#####   ######  ######  #     # ######  
#       #   #   #   #   #     # #   #   
#       #    #  #    #  #     # #    #  
####### #     # #     # ####### #     # 
    `),
    );
    console.log(colors.red(`${message}\n`), trace);
  }
}
