 

declare module "effects-as-data" {
  export interface IEffectsAsDataCommands {
    call<T>(
      fn: (...args: unknown[]) => T,
      ...args: unknown[]
    ): Generator<never, T, unknown>;
    callFn<T>(
      fn: (...args: any[]) => T,
      ...args: any[]
    ): Generator<never, T, unknown>;
    callFnBound<T, C>(
      bindThis: C,
      fn: (...args: unknown[]) => T,
      ...args: unknown[]
    ): Generator<never, T, unknown>;
    callCallback<T>(
      fn: (...args: unknown[]) => T,
      ...args: unknown[]
    ): Generator<never, T, unknown>;
  }

  export const cmds: IEffectsAsDataCommands;
  export const interpreters: any;
}

declare module "effects-as-data/core";
declare module "effects-as-data/test";
