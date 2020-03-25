import { Injectable, Scope, Logger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends Logger {
  debug(message: string) {
    Logger.debug(message, this.context);
  }

  log(message: string) {
    Logger.log(message, this.context);
  }

  verbose(message: string) {
    Logger.verbose(message, this.context);
  }

  warn(message: string) {
    Logger.warn(message, this.context);
  }

  error(message: string, trace: string) {
    // custom logs logic e.g. integrate with winston (https://github.com/winstonjs/winston)
    console.log(`
    ####### ######  ######  ####### ######  
    #       #     # #     # #     # #     # 
    #       #     # #     # #     # #     # 
    #####   ######  ######  #     # ######  
    #       #   #   #   #   #     # #   #   
    #       #    #  #    #  #     # #    #  
    ####### #     # #     # ####### #     # 
    `);
    Logger.error(message, trace, this.context);
  }
}
