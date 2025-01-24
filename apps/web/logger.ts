/* eslint-disable turbo/no-undeclared-env-vars */
export class LoggerProvider {
  static LOGIN_PREFIX = 'Login Error: '
  static DEBUG_PREFIX = 'Debug: '
  static STORAGE_PREFIX = 'Store Error: '

  static log = (message: unknown, prefix: string = LoggerProvider.DEBUG_PREFIX) => {
    if (process.env.NODE_ENV === "production") {
      return;
    }
    if (prefix === LoggerProvider.DEBUG_PREFIX) {
      console.log(prefix, message)
    }
    console.log(`${prefix}${message}`);
  };
}
