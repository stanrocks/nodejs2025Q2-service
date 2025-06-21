import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { LogLevel, LogLevelName } from './logger.levels';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  private currentLogLevel: number;

  constructor() {
    super();
    this.currentLogLevel = Number(process.env.LOG_LEVEL) || LogLevel.WARN;
  }

  private shouldLog(messageLevel: number): boolean {
    return messageLevel <= this.currentLogLevel;
  }

  // private async writeToFile(
  //   logLevel: string,
  //   message: string,
  //   stack?: string,
  //   context?: string,
  // ) {
  //   console.log(logLevel, message, stack, context);
  // }
  //

  always(message: any, context?: string) {
    super.log(`${message}`, context);
  }

  log(message: any, context?: string) {
    if (this.shouldLog(LogLevel.LOG)) {
      if (context !== undefined) {
        super.log(message, context);
      } else {
        super.log(message);
      }
    }
  }

  fatal(message: any, context?: string) {
    if (this.shouldLog(LogLevel.FATAL)) {
      super.fatal(message, context);
    }
  }

  error(message: any, stack?: string, context?: string) {
    if (this.shouldLog(LogLevel.ERROR)) {
      super.error(message, stack, context);
    }
  }

  warn(message: any, context?: string) {
    if (this.shouldLog(LogLevel.WARN)) {
      if (context !== undefined) {
        super.warn(message, context);
      } else {
        super.warn(message);
      }
    }
  }

  debug(message: any, context?: string) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      if (context !== undefined) {
        super.debug(message, context);
      } else {
        super.debug(message);
      }
    }
  }

  verbose(message: any, context?: string) {
    if (this.shouldLog(LogLevel.VERBOSE)) {
      if (context !== undefined) {
        super.verbose(message, context);
      } else {
        super.verbose(message);
      }
    }
  }
}
