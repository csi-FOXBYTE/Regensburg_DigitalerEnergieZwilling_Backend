import { pino } from "pino";
import { formatWithOptions } from "node:util";

export const loggerOptions = {
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname",
    },
  },
};

export const logger = pino(loggerOptions);

export function injectPinoLogger(pinoLogger = logger) {
  const write = (
    logMethod: (objOrMsg?: unknown, msg?: string, ...args: unknown[]) => void,
    args: unknown[],
  ) => {
    if (args.length === 0) {
      logMethod("");
      return;
    }

    if (args.length === 1) {
      const [first] = args;

      if (first instanceof Error) {
        logMethod({ err: first }, first.message);
        return;
      }

      if (typeof first === "object" && first !== null) {
        logMethod(first);
        return;
      }

      logMethod(String(first));
      return;
    }

    const [first, ...rest] = args;

    if (first instanceof Error) {
      logMethod({ err: first }, formatWithOptions({}, ...rest));
      return;
    }

    if (typeof first === "object" && first !== null) {
      logMethod(first, formatWithOptions({}, ...rest));
      return;
    }

    logMethod(formatWithOptions({}, first, ...rest));
  };

  console.log = (...args: unknown[]) => write(pinoLogger.info.bind(pinoLogger), args);
  console.info = (...args: unknown[]) =>
    write(pinoLogger.info.bind(pinoLogger), args);
  console.warn = (...args: unknown[]) =>
    write(pinoLogger.warn.bind(pinoLogger), args);
  console.error = (...args: unknown[]) =>
    write(pinoLogger.error.bind(pinoLogger), args);
  console.debug = (...args: unknown[]) =>
    write(pinoLogger.debug.bind(pinoLogger), args);
}
