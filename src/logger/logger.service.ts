import { Injectable, ConsoleLogger } from '@nestjs/common';
import { LogLevel, LogLevelName } from './logger.levels';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private currentLogLevel: number;

  constructor() {
    super();
    this.currentLogLevel = Number(process.env.LOG_LEVEL) || LogLevel.WARN;
  }
  // private async writeLog(
  //   level: string,
  //   message: string,
  //   stack?: string,
  //   context?: string,
  // ) {
  //   console.log(level, message, stack, context);
  // }

  private shouldLog(messageLevel: number): boolean {
    return messageLevel <= this.currentLogLevel;
  }

  log(message: any, context?: string) {
    if (this.shouldLog(LogLevel.LOG)) {
      console.log(
        `[${LogLevelName[LogLevel.LOG].toUpperCase()}] ${context ? `[${context}] ` : ''}${message}`,
      );
    }
  }

  fatal(message: any, trace?: string, context?: string) {
    if (this.shouldLog(LogLevel.FATAL)) {
      console.error(
        `[${LogLevelName[LogLevel.FATAL].toUpperCase()}] ${context ? `[${context}] ` : ''}${message}`,
        trace,
      );
    }
  }

  error(message: any, trace?: string, context?: string) {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(
        `[${LogLevelName[LogLevel.ERROR].toUpperCase()}] ${context ? `[${context}] ` : ''}${message}`,
        trace,
      );
    }
  }

  warn(message: any, context?: string) {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(
        `[${LogLevelName[LogLevel.WARN].toUpperCase()}] ${context ? `[${context}] ` : ''}${message}`,
      );
    }
  }

  debug(message: any, context?: string) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(
        `[${LogLevelName[LogLevel.DEBUG].toUpperCase()}] ${context ? `[${context}] ` : ''}${message}`,
      );
    }
  }

  verbose(message: any, context?: string) {
    if (this.shouldLog(LogLevel.VERBOSE)) {
      console.log(
        `[${LogLevelName[LogLevel.VERBOSE].toUpperCase()}] ${context ? `[${context}] ` : ''}${message}`,
      );
    }
  }
}
