import { Injectable, ConsoleLogger } from '@nestjs/common';
import { LogLevel, LogLevelName } from './logger.levels';

@Injectable()
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
    super.log(`[ALWAYS_SHOW] ${message}`, context);
  }

  log(message: any, context?: string) {
    if (this.shouldLog(LogLevel.LOG)) {
      super.log(message, context);
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
      super.warn(message, context);
    }
  }

  debug(message: any, context?: string) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      super.debug(message, context);
    }
  }

  verbose(message: any, context?: string) {
    if (this.shouldLog(LogLevel.VERBOSE)) {
      super.verbose(message, context);
    }
  }
}
