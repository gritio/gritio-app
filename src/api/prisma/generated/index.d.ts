
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Goal
 * 
 */
export type Goal = $Result.DefaultSelection<Prisma.$GoalPayload>
/**
 * Model WeightGoal
 * 
 */
export type WeightGoal = $Result.DefaultSelection<Prisma.$WeightGoalPayload>
/**
 * Model CountGoal
 * 
 */
export type CountGoal = $Result.DefaultSelection<Prisma.$CountGoalPayload>
/**
 * Model TimeGoal
 * 
 */
export type TimeGoal = $Result.DefaultSelection<Prisma.$TimeGoalPayload>
/**
 * Model MonthlyGoal
 * 
 */
export type MonthlyGoal = $Result.DefaultSelection<Prisma.$MonthlyGoalPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model TaskCompletion
 * 
 */
export type TaskCompletion = $Result.DefaultSelection<Prisma.$TaskCompletionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const GoalStatus: {
  ON_TRACK: 'ON_TRACK',
  BEHIND: 'BEHIND',
  AHEAD: 'AHEAD'
};

export type GoalStatus = (typeof GoalStatus)[keyof typeof GoalStatus]


export const Frequency: {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY'
};

export type Frequency = (typeof Frequency)[keyof typeof Frequency]


export const MeasurementType: {
  NUMBER: 'NUMBER',
  TIME: 'TIME',
  STEPS: 'STEPS',
  DISTANCE: 'DISTANCE'
};

export type MeasurementType = (typeof MeasurementType)[keyof typeof MeasurementType]

}

export type GoalStatus = $Enums.GoalStatus

export const GoalStatus: typeof $Enums.GoalStatus

export type Frequency = $Enums.Frequency

export const Frequency: typeof $Enums.Frequency

export type MeasurementType = $Enums.MeasurementType

export const MeasurementType: typeof $Enums.MeasurementType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.goal`: Exposes CRUD operations for the **Goal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Goals
    * const goals = await prisma.goal.findMany()
    * ```
    */
  get goal(): Prisma.GoalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weightGoal`: Exposes CRUD operations for the **WeightGoal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeightGoals
    * const weightGoals = await prisma.weightGoal.findMany()
    * ```
    */
  get weightGoal(): Prisma.WeightGoalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.countGoal`: Exposes CRUD operations for the **CountGoal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CountGoals
    * const countGoals = await prisma.countGoal.findMany()
    * ```
    */
  get countGoal(): Prisma.CountGoalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timeGoal`: Exposes CRUD operations for the **TimeGoal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimeGoals
    * const timeGoals = await prisma.timeGoal.findMany()
    * ```
    */
  get timeGoal(): Prisma.TimeGoalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.monthlyGoal`: Exposes CRUD operations for the **MonthlyGoal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MonthlyGoals
    * const monthlyGoals = await prisma.monthlyGoal.findMany()
    * ```
    */
  get monthlyGoal(): Prisma.MonthlyGoalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskCompletion`: Exposes CRUD operations for the **TaskCompletion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskCompletions
    * const taskCompletions = await prisma.taskCompletion.findMany()
    * ```
    */
  get taskCompletion(): Prisma.TaskCompletionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Goal: 'Goal',
    WeightGoal: 'WeightGoal',
    CountGoal: 'CountGoal',
    TimeGoal: 'TimeGoal',
    MonthlyGoal: 'MonthlyGoal',
    Task: 'Task',
    TaskCompletion: 'TaskCompletion'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "goal" | "weightGoal" | "countGoal" | "timeGoal" | "monthlyGoal" | "task" | "taskCompletion"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Goal: {
        payload: Prisma.$GoalPayload<ExtArgs>
        fields: Prisma.GoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findFirst: {
            args: Prisma.GoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findMany: {
            args: Prisma.GoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          create: {
            args: Prisma.GoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          createMany: {
            args: Prisma.GoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          delete: {
            args: Prisma.GoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          update: {
            args: Prisma.GoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          deleteMany: {
            args: Prisma.GoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GoalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          upsert: {
            args: Prisma.GoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          aggregate: {
            args: Prisma.GoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoal>
          }
          groupBy: {
            args: Prisma.GoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoalCountArgs<ExtArgs>
            result: $Utils.Optional<GoalCountAggregateOutputType> | number
          }
        }
      }
      WeightGoal: {
        payload: Prisma.$WeightGoalPayload<ExtArgs>
        fields: Prisma.WeightGoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeightGoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightGoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeightGoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightGoalPayload>
          }
          findFirst: {
            args: Prisma.WeightGoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightGoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeightGoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightGoalPayload>
          }
          findMany: {
            args: Prisma.WeightGoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightGoalPayload>[]
          }
          create: {
            args: Prisma.WeightGoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightGoalPayload>
          }
          createMany: {
            args: Prisma.WeightGoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeightGoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightGoalPayload>[]
          }
          delete: {
            args: Prisma.WeightGoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightGoalPayload>
          }
          update: {
            args: Prisma.WeightGoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightGoalPayload>
          }
          deleteMany: {
            args: Prisma.WeightGoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeightGoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeightGoalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightGoalPayload>[]
          }
          upsert: {
            args: Prisma.WeightGoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightGoalPayload>
          }
          aggregate: {
            args: Prisma.WeightGoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeightGoal>
          }
          groupBy: {
            args: Prisma.WeightGoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeightGoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeightGoalCountArgs<ExtArgs>
            result: $Utils.Optional<WeightGoalCountAggregateOutputType> | number
          }
        }
      }
      CountGoal: {
        payload: Prisma.$CountGoalPayload<ExtArgs>
        fields: Prisma.CountGoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CountGoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountGoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CountGoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountGoalPayload>
          }
          findFirst: {
            args: Prisma.CountGoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountGoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CountGoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountGoalPayload>
          }
          findMany: {
            args: Prisma.CountGoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountGoalPayload>[]
          }
          create: {
            args: Prisma.CountGoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountGoalPayload>
          }
          createMany: {
            args: Prisma.CountGoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CountGoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountGoalPayload>[]
          }
          delete: {
            args: Prisma.CountGoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountGoalPayload>
          }
          update: {
            args: Prisma.CountGoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountGoalPayload>
          }
          deleteMany: {
            args: Prisma.CountGoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CountGoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CountGoalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountGoalPayload>[]
          }
          upsert: {
            args: Prisma.CountGoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountGoalPayload>
          }
          aggregate: {
            args: Prisma.CountGoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCountGoal>
          }
          groupBy: {
            args: Prisma.CountGoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<CountGoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.CountGoalCountArgs<ExtArgs>
            result: $Utils.Optional<CountGoalCountAggregateOutputType> | number
          }
        }
      }
      TimeGoal: {
        payload: Prisma.$TimeGoalPayload<ExtArgs>
        fields: Prisma.TimeGoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimeGoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeGoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimeGoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeGoalPayload>
          }
          findFirst: {
            args: Prisma.TimeGoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeGoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimeGoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeGoalPayload>
          }
          findMany: {
            args: Prisma.TimeGoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeGoalPayload>[]
          }
          create: {
            args: Prisma.TimeGoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeGoalPayload>
          }
          createMany: {
            args: Prisma.TimeGoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimeGoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeGoalPayload>[]
          }
          delete: {
            args: Prisma.TimeGoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeGoalPayload>
          }
          update: {
            args: Prisma.TimeGoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeGoalPayload>
          }
          deleteMany: {
            args: Prisma.TimeGoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimeGoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimeGoalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeGoalPayload>[]
          }
          upsert: {
            args: Prisma.TimeGoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeGoalPayload>
          }
          aggregate: {
            args: Prisma.TimeGoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimeGoal>
          }
          groupBy: {
            args: Prisma.TimeGoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimeGoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimeGoalCountArgs<ExtArgs>
            result: $Utils.Optional<TimeGoalCountAggregateOutputType> | number
          }
        }
      }
      MonthlyGoal: {
        payload: Prisma.$MonthlyGoalPayload<ExtArgs>
        fields: Prisma.MonthlyGoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonthlyGoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyGoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonthlyGoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyGoalPayload>
          }
          findFirst: {
            args: Prisma.MonthlyGoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyGoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonthlyGoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyGoalPayload>
          }
          findMany: {
            args: Prisma.MonthlyGoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyGoalPayload>[]
          }
          create: {
            args: Prisma.MonthlyGoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyGoalPayload>
          }
          createMany: {
            args: Prisma.MonthlyGoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MonthlyGoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyGoalPayload>[]
          }
          delete: {
            args: Prisma.MonthlyGoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyGoalPayload>
          }
          update: {
            args: Prisma.MonthlyGoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyGoalPayload>
          }
          deleteMany: {
            args: Prisma.MonthlyGoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MonthlyGoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MonthlyGoalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyGoalPayload>[]
          }
          upsert: {
            args: Prisma.MonthlyGoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyGoalPayload>
          }
          aggregate: {
            args: Prisma.MonthlyGoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMonthlyGoal>
          }
          groupBy: {
            args: Prisma.MonthlyGoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<MonthlyGoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.MonthlyGoalCountArgs<ExtArgs>
            result: $Utils.Optional<MonthlyGoalCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      TaskCompletion: {
        payload: Prisma.$TaskCompletionPayload<ExtArgs>
        fields: Prisma.TaskCompletionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskCompletionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskCompletionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          findFirst: {
            args: Prisma.TaskCompletionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskCompletionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          findMany: {
            args: Prisma.TaskCompletionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>[]
          }
          create: {
            args: Prisma.TaskCompletionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          createMany: {
            args: Prisma.TaskCompletionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCompletionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>[]
          }
          delete: {
            args: Prisma.TaskCompletionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          update: {
            args: Prisma.TaskCompletionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          deleteMany: {
            args: Prisma.TaskCompletionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskCompletionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskCompletionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>[]
          }
          upsert: {
            args: Prisma.TaskCompletionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          aggregate: {
            args: Prisma.TaskCompletionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskCompletion>
          }
          groupBy: {
            args: Prisma.TaskCompletionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskCompletionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCompletionCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCompletionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    goal?: GoalOmit
    weightGoal?: WeightGoalOmit
    countGoal?: CountGoalOmit
    timeGoal?: TimeGoalOmit
    monthlyGoal?: MonthlyGoalOmit
    task?: TaskOmit
    taskCompletion?: TaskCompletionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    goals: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goals?: boolean | UserCountOutputTypeCountGoalsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGoalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoalWhereInput
  }


  /**
   * Count Type GoalCountOutputType
   */

  export type GoalCountOutputType = {
    monthlyGoals: number
    tasks: number
  }

  export type GoalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    monthlyGoals?: boolean | GoalCountOutputTypeCountMonthlyGoalsArgs
    tasks?: boolean | GoalCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * GoalCountOutputType without action
   */
  export type GoalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoalCountOutputType
     */
    select?: GoalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GoalCountOutputType without action
   */
  export type GoalCountOutputTypeCountMonthlyGoalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyGoalWhereInput
  }

  /**
   * GoalCountOutputType without action
   */
  export type GoalCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    completionRecords: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    completionRecords?: boolean | TaskCountOutputTypeCountCompletionRecordsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountCompletionRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCompletionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    auth0Id: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    auth0Id: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    auth0Id: number
    password: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    auth0Id?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    auth0Id?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    auth0Id?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    auth0Id: string
    password: string | null
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    auth0Id?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goals?: boolean | User$goalsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    auth0Id?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    auth0Id?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    auth0Id?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "auth0Id" | "password" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goals?: boolean | User$goalsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      goals: Prisma.$GoalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      auth0Id: string
      password: string | null
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    goals<T extends User$goalsArgs<ExtArgs> = {}>(args?: Subset<T, User$goalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly auth0Id: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.goals
   */
  export type User$goalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    where?: GoalWhereInput
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    cursor?: GoalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Goal
   */

  export type AggregateGoal = {
    _count: GoalCountAggregateOutputType | null
    _avg: GoalAvgAggregateOutputType | null
    _sum: GoalSumAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  export type GoalAvgAggregateOutputType = {
    target: number | null
    progress: number | null
  }

  export type GoalSumAggregateOutputType = {
    target: number | null
    progress: number | null
  }

  export type GoalMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    area: string | null
    unit: string | null
    startDate: Date | null
    endDate: Date | null
    target: number | null
    progress: number | null
    status: $Enums.GoalStatus | null
    remarks: string | null
    yearlyMeasure: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GoalMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    area: string | null
    unit: string | null
    startDate: Date | null
    endDate: Date | null
    target: number | null
    progress: number | null
    status: $Enums.GoalStatus | null
    remarks: string | null
    yearlyMeasure: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GoalCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    area: number
    unit: number
    startDate: number
    endDate: number
    target: number
    progress: number
    status: number
    remarks: number
    yearlyMeasure: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GoalAvgAggregateInputType = {
    target?: true
    progress?: true
  }

  export type GoalSumAggregateInputType = {
    target?: true
    progress?: true
  }

  export type GoalMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    area?: true
    unit?: true
    startDate?: true
    endDate?: true
    target?: true
    progress?: true
    status?: true
    remarks?: true
    yearlyMeasure?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GoalMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    area?: true
    unit?: true
    startDate?: true
    endDate?: true
    target?: true
    progress?: true
    status?: true
    remarks?: true
    yearlyMeasure?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GoalCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    area?: true
    unit?: true
    startDate?: true
    endDate?: true
    target?: true
    progress?: true
    status?: true
    remarks?: true
    yearlyMeasure?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goal to aggregate.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Goals
    **/
    _count?: true | GoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoalMaxAggregateInputType
  }

  export type GetGoalAggregateType<T extends GoalAggregateArgs> = {
        [P in keyof T & keyof AggregateGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoal[P]>
      : GetScalarType<T[P], AggregateGoal[P]>
  }




  export type GoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoalWhereInput
    orderBy?: GoalOrderByWithAggregationInput | GoalOrderByWithAggregationInput[]
    by: GoalScalarFieldEnum[] | GoalScalarFieldEnum
    having?: GoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoalCountAggregateInputType | true
    _avg?: GoalAvgAggregateInputType
    _sum?: GoalSumAggregateInputType
    _min?: GoalMinAggregateInputType
    _max?: GoalMaxAggregateInputType
  }

  export type GoalGroupByOutputType = {
    id: string
    userId: string
    title: string
    area: string
    unit: string
    startDate: Date
    endDate: Date
    target: number
    progress: number
    status: $Enums.GoalStatus
    remarks: string | null
    yearlyMeasure: string | null
    createdAt: Date
    updatedAt: Date
    _count: GoalCountAggregateOutputType | null
    _avg: GoalAvgAggregateOutputType | null
    _sum: GoalSumAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  type GetGoalGroupByPayload<T extends GoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoalGroupByOutputType[P]>
            : GetScalarType<T[P], GoalGroupByOutputType[P]>
        }
      >
    >


  export type GoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    area?: boolean
    unit?: boolean
    startDate?: boolean
    endDate?: boolean
    target?: boolean
    progress?: boolean
    status?: boolean
    remarks?: boolean
    yearlyMeasure?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    monthlyGoals?: boolean | Goal$monthlyGoalsArgs<ExtArgs>
    tasks?: boolean | Goal$tasksArgs<ExtArgs>
    weightGoal?: boolean | Goal$weightGoalArgs<ExtArgs>
    countGoal?: boolean | Goal$countGoalArgs<ExtArgs>
    timeGoal?: boolean | Goal$timeGoalArgs<ExtArgs>
    _count?: boolean | GoalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    area?: boolean
    unit?: boolean
    startDate?: boolean
    endDate?: boolean
    target?: boolean
    progress?: boolean
    status?: boolean
    remarks?: boolean
    yearlyMeasure?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    area?: boolean
    unit?: boolean
    startDate?: boolean
    endDate?: boolean
    target?: boolean
    progress?: boolean
    status?: boolean
    remarks?: boolean
    yearlyMeasure?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    area?: boolean
    unit?: boolean
    startDate?: boolean
    endDate?: boolean
    target?: boolean
    progress?: boolean
    status?: boolean
    remarks?: boolean
    yearlyMeasure?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "area" | "unit" | "startDate" | "endDate" | "target" | "progress" | "status" | "remarks" | "yearlyMeasure" | "createdAt" | "updatedAt", ExtArgs["result"]["goal"]>
  export type GoalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    monthlyGoals?: boolean | Goal$monthlyGoalsArgs<ExtArgs>
    tasks?: boolean | Goal$tasksArgs<ExtArgs>
    weightGoal?: boolean | Goal$weightGoalArgs<ExtArgs>
    countGoal?: boolean | Goal$countGoalArgs<ExtArgs>
    timeGoal?: boolean | Goal$timeGoalArgs<ExtArgs>
    _count?: boolean | GoalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GoalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GoalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Goal"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      monthlyGoals: Prisma.$MonthlyGoalPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      weightGoal: Prisma.$WeightGoalPayload<ExtArgs> | null
      countGoal: Prisma.$CountGoalPayload<ExtArgs> | null
      timeGoal: Prisma.$TimeGoalPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      area: string
      unit: string
      startDate: Date
      endDate: Date
      target: number
      progress: number
      status: $Enums.GoalStatus
      remarks: string | null
      yearlyMeasure: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["goal"]>
    composites: {}
  }

  type GoalGetPayload<S extends boolean | null | undefined | GoalDefaultArgs> = $Result.GetResult<Prisma.$GoalPayload, S>

  type GoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GoalCountAggregateInputType | true
    }

  export interface GoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Goal'], meta: { name: 'Goal' } }
    /**
     * Find zero or one Goal that matches the filter.
     * @param {GoalFindUniqueArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoalFindUniqueArgs>(args: SelectSubset<T, GoalFindUniqueArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Goal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GoalFindUniqueOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoalFindUniqueOrThrowArgs>(args: SelectSubset<T, GoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoalFindFirstArgs>(args?: SelectSubset<T, GoalFindFirstArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoalFindFirstOrThrowArgs>(args?: SelectSubset<T, GoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Goals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Goals
     * const goals = await prisma.goal.findMany()
     * 
     * // Get first 10 Goals
     * const goals = await prisma.goal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const goalWithIdOnly = await prisma.goal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GoalFindManyArgs>(args?: SelectSubset<T, GoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Goal.
     * @param {GoalCreateArgs} args - Arguments to create a Goal.
     * @example
     * // Create one Goal
     * const Goal = await prisma.goal.create({
     *   data: {
     *     // ... data to create a Goal
     *   }
     * })
     * 
     */
    create<T extends GoalCreateArgs>(args: SelectSubset<T, GoalCreateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Goals.
     * @param {GoalCreateManyArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoalCreateManyArgs>(args?: SelectSubset<T, GoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Goals and returns the data saved in the database.
     * @param {GoalCreateManyAndReturnArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoalCreateManyAndReturnArgs>(args?: SelectSubset<T, GoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Goal.
     * @param {GoalDeleteArgs} args - Arguments to delete one Goal.
     * @example
     * // Delete one Goal
     * const Goal = await prisma.goal.delete({
     *   where: {
     *     // ... filter to delete one Goal
     *   }
     * })
     * 
     */
    delete<T extends GoalDeleteArgs>(args: SelectSubset<T, GoalDeleteArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Goal.
     * @param {GoalUpdateArgs} args - Arguments to update one Goal.
     * @example
     * // Update one Goal
     * const goal = await prisma.goal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoalUpdateArgs>(args: SelectSubset<T, GoalUpdateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Goals.
     * @param {GoalDeleteManyArgs} args - Arguments to filter Goals to delete.
     * @example
     * // Delete a few Goals
     * const { count } = await prisma.goal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoalDeleteManyArgs>(args?: SelectSubset<T, GoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoalUpdateManyArgs>(args: SelectSubset<T, GoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals and returns the data updated in the database.
     * @param {GoalUpdateManyAndReturnArgs} args - Arguments to update many Goals.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GoalUpdateManyAndReturnArgs>(args: SelectSubset<T, GoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Goal.
     * @param {GoalUpsertArgs} args - Arguments to update or create a Goal.
     * @example
     * // Update or create a Goal
     * const goal = await prisma.goal.upsert({
     *   create: {
     *     // ... data to create a Goal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Goal we want to update
     *   }
     * })
     */
    upsert<T extends GoalUpsertArgs>(args: SelectSubset<T, GoalUpsertArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalCountArgs} args - Arguments to filter Goals to count.
     * @example
     * // Count the number of Goals
     * const count = await prisma.goal.count({
     *   where: {
     *     // ... the filter for the Goals we want to count
     *   }
     * })
    **/
    count<T extends GoalCountArgs>(
      args?: Subset<T, GoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GoalAggregateArgs>(args: Subset<T, GoalAggregateArgs>): Prisma.PrismaPromise<GetGoalAggregateType<T>>

    /**
     * Group by Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoalGroupByArgs['orderBy'] }
        : { orderBy?: GoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Goal model
   */
  readonly fields: GoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Goal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    monthlyGoals<T extends Goal$monthlyGoalsArgs<ExtArgs> = {}>(args?: Subset<T, Goal$monthlyGoalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyGoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends Goal$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Goal$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    weightGoal<T extends Goal$weightGoalArgs<ExtArgs> = {}>(args?: Subset<T, Goal$weightGoalArgs<ExtArgs>>): Prisma__WeightGoalClient<$Result.GetResult<Prisma.$WeightGoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    countGoal<T extends Goal$countGoalArgs<ExtArgs> = {}>(args?: Subset<T, Goal$countGoalArgs<ExtArgs>>): Prisma__CountGoalClient<$Result.GetResult<Prisma.$CountGoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    timeGoal<T extends Goal$timeGoalArgs<ExtArgs> = {}>(args?: Subset<T, Goal$timeGoalArgs<ExtArgs>>): Prisma__TimeGoalClient<$Result.GetResult<Prisma.$TimeGoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Goal model
   */
  interface GoalFieldRefs {
    readonly id: FieldRef<"Goal", 'String'>
    readonly userId: FieldRef<"Goal", 'String'>
    readonly title: FieldRef<"Goal", 'String'>
    readonly area: FieldRef<"Goal", 'String'>
    readonly unit: FieldRef<"Goal", 'String'>
    readonly startDate: FieldRef<"Goal", 'DateTime'>
    readonly endDate: FieldRef<"Goal", 'DateTime'>
    readonly target: FieldRef<"Goal", 'Int'>
    readonly progress: FieldRef<"Goal", 'Int'>
    readonly status: FieldRef<"Goal", 'GoalStatus'>
    readonly remarks: FieldRef<"Goal", 'String'>
    readonly yearlyMeasure: FieldRef<"Goal", 'String'>
    readonly createdAt: FieldRef<"Goal", 'DateTime'>
    readonly updatedAt: FieldRef<"Goal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Goal findUnique
   */
  export type GoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findUniqueOrThrow
   */
  export type GoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findFirst
   */
  export type GoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findFirstOrThrow
   */
  export type GoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findMany
   */
  export type GoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goals to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal create
   */
  export type GoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The data needed to create a Goal.
     */
    data: XOR<GoalCreateInput, GoalUncheckedCreateInput>
  }

  /**
   * Goal createMany
   */
  export type GoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Goal createManyAndReturn
   */
  export type GoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Goal update
   */
  export type GoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The data needed to update a Goal.
     */
    data: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
    /**
     * Choose, which Goal to update.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal updateMany
   */
  export type GoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to update.
     */
    limit?: number
  }

  /**
   * Goal updateManyAndReturn
   */
  export type GoalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Goal upsert
   */
  export type GoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The filter to search for the Goal to update in case it exists.
     */
    where: GoalWhereUniqueInput
    /**
     * In case the Goal found by the `where` argument doesn't exist, create a new Goal with this data.
     */
    create: XOR<GoalCreateInput, GoalUncheckedCreateInput>
    /**
     * In case the Goal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
  }

  /**
   * Goal delete
   */
  export type GoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter which Goal to delete.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal deleteMany
   */
  export type GoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goals to delete
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to delete.
     */
    limit?: number
  }

  /**
   * Goal.monthlyGoals
   */
  export type Goal$monthlyGoalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalInclude<ExtArgs> | null
    where?: MonthlyGoalWhereInput
    orderBy?: MonthlyGoalOrderByWithRelationInput | MonthlyGoalOrderByWithRelationInput[]
    cursor?: MonthlyGoalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MonthlyGoalScalarFieldEnum | MonthlyGoalScalarFieldEnum[]
  }

  /**
   * Goal.tasks
   */
  export type Goal$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Goal.weightGoal
   */
  export type Goal$weightGoalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalInclude<ExtArgs> | null
    where?: WeightGoalWhereInput
  }

  /**
   * Goal.countGoal
   */
  export type Goal$countGoalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalInclude<ExtArgs> | null
    where?: CountGoalWhereInput
  }

  /**
   * Goal.timeGoal
   */
  export type Goal$timeGoalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalInclude<ExtArgs> | null
    where?: TimeGoalWhereInput
  }

  /**
   * Goal without action
   */
  export type GoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
  }


  /**
   * Model WeightGoal
   */

  export type AggregateWeightGoal = {
    _count: WeightGoalCountAggregateOutputType | null
    _avg: WeightGoalAvgAggregateOutputType | null
    _sum: WeightGoalSumAggregateOutputType | null
    _min: WeightGoalMinAggregateOutputType | null
    _max: WeightGoalMaxAggregateOutputType | null
  }

  export type WeightGoalAvgAggregateOutputType = {
    startWeight: number | null
    currentWeight: number | null
    targetWeight: number | null
  }

  export type WeightGoalSumAggregateOutputType = {
    startWeight: number | null
    currentWeight: number | null
    targetWeight: number | null
  }

  export type WeightGoalMinAggregateOutputType = {
    id: string | null
    goalId: string | null
    startWeight: number | null
    currentWeight: number | null
    targetWeight: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeightGoalMaxAggregateOutputType = {
    id: string | null
    goalId: string | null
    startWeight: number | null
    currentWeight: number | null
    targetWeight: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeightGoalCountAggregateOutputType = {
    id: number
    goalId: number
    startWeight: number
    currentWeight: number
    targetWeight: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WeightGoalAvgAggregateInputType = {
    startWeight?: true
    currentWeight?: true
    targetWeight?: true
  }

  export type WeightGoalSumAggregateInputType = {
    startWeight?: true
    currentWeight?: true
    targetWeight?: true
  }

  export type WeightGoalMinAggregateInputType = {
    id?: true
    goalId?: true
    startWeight?: true
    currentWeight?: true
    targetWeight?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeightGoalMaxAggregateInputType = {
    id?: true
    goalId?: true
    startWeight?: true
    currentWeight?: true
    targetWeight?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeightGoalCountAggregateInputType = {
    id?: true
    goalId?: true
    startWeight?: true
    currentWeight?: true
    targetWeight?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WeightGoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeightGoal to aggregate.
     */
    where?: WeightGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightGoals to fetch.
     */
    orderBy?: WeightGoalOrderByWithRelationInput | WeightGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeightGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeightGoals
    **/
    _count?: true | WeightGoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeightGoalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeightGoalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeightGoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeightGoalMaxAggregateInputType
  }

  export type GetWeightGoalAggregateType<T extends WeightGoalAggregateArgs> = {
        [P in keyof T & keyof AggregateWeightGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeightGoal[P]>
      : GetScalarType<T[P], AggregateWeightGoal[P]>
  }




  export type WeightGoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeightGoalWhereInput
    orderBy?: WeightGoalOrderByWithAggregationInput | WeightGoalOrderByWithAggregationInput[]
    by: WeightGoalScalarFieldEnum[] | WeightGoalScalarFieldEnum
    having?: WeightGoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeightGoalCountAggregateInputType | true
    _avg?: WeightGoalAvgAggregateInputType
    _sum?: WeightGoalSumAggregateInputType
    _min?: WeightGoalMinAggregateInputType
    _max?: WeightGoalMaxAggregateInputType
  }

  export type WeightGoalGroupByOutputType = {
    id: string
    goalId: string
    startWeight: number
    currentWeight: number
    targetWeight: number
    createdAt: Date
    updatedAt: Date
    _count: WeightGoalCountAggregateOutputType | null
    _avg: WeightGoalAvgAggregateOutputType | null
    _sum: WeightGoalSumAggregateOutputType | null
    _min: WeightGoalMinAggregateOutputType | null
    _max: WeightGoalMaxAggregateOutputType | null
  }

  type GetWeightGoalGroupByPayload<T extends WeightGoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeightGoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeightGoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeightGoalGroupByOutputType[P]>
            : GetScalarType<T[P], WeightGoalGroupByOutputType[P]>
        }
      >
    >


  export type WeightGoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    startWeight?: boolean
    currentWeight?: boolean
    targetWeight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weightGoal"]>

  export type WeightGoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    startWeight?: boolean
    currentWeight?: boolean
    targetWeight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weightGoal"]>

  export type WeightGoalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    startWeight?: boolean
    currentWeight?: boolean
    targetWeight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weightGoal"]>

  export type WeightGoalSelectScalar = {
    id?: boolean
    goalId?: boolean
    startWeight?: boolean
    currentWeight?: boolean
    targetWeight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WeightGoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "goalId" | "startWeight" | "currentWeight" | "targetWeight" | "createdAt" | "updatedAt", ExtArgs["result"]["weightGoal"]>
  export type WeightGoalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }
  export type WeightGoalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }
  export type WeightGoalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }

  export type $WeightGoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeightGoal"
    objects: {
      goal: Prisma.$GoalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      goalId: string
      startWeight: number
      currentWeight: number
      targetWeight: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["weightGoal"]>
    composites: {}
  }

  type WeightGoalGetPayload<S extends boolean | null | undefined | WeightGoalDefaultArgs> = $Result.GetResult<Prisma.$WeightGoalPayload, S>

  type WeightGoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeightGoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeightGoalCountAggregateInputType | true
    }

  export interface WeightGoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeightGoal'], meta: { name: 'WeightGoal' } }
    /**
     * Find zero or one WeightGoal that matches the filter.
     * @param {WeightGoalFindUniqueArgs} args - Arguments to find a WeightGoal
     * @example
     * // Get one WeightGoal
     * const weightGoal = await prisma.weightGoal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeightGoalFindUniqueArgs>(args: SelectSubset<T, WeightGoalFindUniqueArgs<ExtArgs>>): Prisma__WeightGoalClient<$Result.GetResult<Prisma.$WeightGoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeightGoal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeightGoalFindUniqueOrThrowArgs} args - Arguments to find a WeightGoal
     * @example
     * // Get one WeightGoal
     * const weightGoal = await prisma.weightGoal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeightGoalFindUniqueOrThrowArgs>(args: SelectSubset<T, WeightGoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeightGoalClient<$Result.GetResult<Prisma.$WeightGoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeightGoal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightGoalFindFirstArgs} args - Arguments to find a WeightGoal
     * @example
     * // Get one WeightGoal
     * const weightGoal = await prisma.weightGoal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeightGoalFindFirstArgs>(args?: SelectSubset<T, WeightGoalFindFirstArgs<ExtArgs>>): Prisma__WeightGoalClient<$Result.GetResult<Prisma.$WeightGoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeightGoal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightGoalFindFirstOrThrowArgs} args - Arguments to find a WeightGoal
     * @example
     * // Get one WeightGoal
     * const weightGoal = await prisma.weightGoal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeightGoalFindFirstOrThrowArgs>(args?: SelectSubset<T, WeightGoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeightGoalClient<$Result.GetResult<Prisma.$WeightGoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeightGoals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightGoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeightGoals
     * const weightGoals = await prisma.weightGoal.findMany()
     * 
     * // Get first 10 WeightGoals
     * const weightGoals = await prisma.weightGoal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weightGoalWithIdOnly = await prisma.weightGoal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeightGoalFindManyArgs>(args?: SelectSubset<T, WeightGoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightGoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeightGoal.
     * @param {WeightGoalCreateArgs} args - Arguments to create a WeightGoal.
     * @example
     * // Create one WeightGoal
     * const WeightGoal = await prisma.weightGoal.create({
     *   data: {
     *     // ... data to create a WeightGoal
     *   }
     * })
     * 
     */
    create<T extends WeightGoalCreateArgs>(args: SelectSubset<T, WeightGoalCreateArgs<ExtArgs>>): Prisma__WeightGoalClient<$Result.GetResult<Prisma.$WeightGoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeightGoals.
     * @param {WeightGoalCreateManyArgs} args - Arguments to create many WeightGoals.
     * @example
     * // Create many WeightGoals
     * const weightGoal = await prisma.weightGoal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeightGoalCreateManyArgs>(args?: SelectSubset<T, WeightGoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeightGoals and returns the data saved in the database.
     * @param {WeightGoalCreateManyAndReturnArgs} args - Arguments to create many WeightGoals.
     * @example
     * // Create many WeightGoals
     * const weightGoal = await prisma.weightGoal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeightGoals and only return the `id`
     * const weightGoalWithIdOnly = await prisma.weightGoal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeightGoalCreateManyAndReturnArgs>(args?: SelectSubset<T, WeightGoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightGoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeightGoal.
     * @param {WeightGoalDeleteArgs} args - Arguments to delete one WeightGoal.
     * @example
     * // Delete one WeightGoal
     * const WeightGoal = await prisma.weightGoal.delete({
     *   where: {
     *     // ... filter to delete one WeightGoal
     *   }
     * })
     * 
     */
    delete<T extends WeightGoalDeleteArgs>(args: SelectSubset<T, WeightGoalDeleteArgs<ExtArgs>>): Prisma__WeightGoalClient<$Result.GetResult<Prisma.$WeightGoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeightGoal.
     * @param {WeightGoalUpdateArgs} args - Arguments to update one WeightGoal.
     * @example
     * // Update one WeightGoal
     * const weightGoal = await prisma.weightGoal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeightGoalUpdateArgs>(args: SelectSubset<T, WeightGoalUpdateArgs<ExtArgs>>): Prisma__WeightGoalClient<$Result.GetResult<Prisma.$WeightGoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeightGoals.
     * @param {WeightGoalDeleteManyArgs} args - Arguments to filter WeightGoals to delete.
     * @example
     * // Delete a few WeightGoals
     * const { count } = await prisma.weightGoal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeightGoalDeleteManyArgs>(args?: SelectSubset<T, WeightGoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeightGoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightGoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeightGoals
     * const weightGoal = await prisma.weightGoal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeightGoalUpdateManyArgs>(args: SelectSubset<T, WeightGoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeightGoals and returns the data updated in the database.
     * @param {WeightGoalUpdateManyAndReturnArgs} args - Arguments to update many WeightGoals.
     * @example
     * // Update many WeightGoals
     * const weightGoal = await prisma.weightGoal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeightGoals and only return the `id`
     * const weightGoalWithIdOnly = await prisma.weightGoal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WeightGoalUpdateManyAndReturnArgs>(args: SelectSubset<T, WeightGoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightGoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeightGoal.
     * @param {WeightGoalUpsertArgs} args - Arguments to update or create a WeightGoal.
     * @example
     * // Update or create a WeightGoal
     * const weightGoal = await prisma.weightGoal.upsert({
     *   create: {
     *     // ... data to create a WeightGoal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeightGoal we want to update
     *   }
     * })
     */
    upsert<T extends WeightGoalUpsertArgs>(args: SelectSubset<T, WeightGoalUpsertArgs<ExtArgs>>): Prisma__WeightGoalClient<$Result.GetResult<Prisma.$WeightGoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeightGoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightGoalCountArgs} args - Arguments to filter WeightGoals to count.
     * @example
     * // Count the number of WeightGoals
     * const count = await prisma.weightGoal.count({
     *   where: {
     *     // ... the filter for the WeightGoals we want to count
     *   }
     * })
    **/
    count<T extends WeightGoalCountArgs>(
      args?: Subset<T, WeightGoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeightGoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeightGoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightGoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WeightGoalAggregateArgs>(args: Subset<T, WeightGoalAggregateArgs>): Prisma.PrismaPromise<GetWeightGoalAggregateType<T>>

    /**
     * Group by WeightGoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightGoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WeightGoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeightGoalGroupByArgs['orderBy'] }
        : { orderBy?: WeightGoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeightGoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeightGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeightGoal model
   */
  readonly fields: WeightGoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeightGoal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeightGoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    goal<T extends GoalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GoalDefaultArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WeightGoal model
   */
  interface WeightGoalFieldRefs {
    readonly id: FieldRef<"WeightGoal", 'String'>
    readonly goalId: FieldRef<"WeightGoal", 'String'>
    readonly startWeight: FieldRef<"WeightGoal", 'Float'>
    readonly currentWeight: FieldRef<"WeightGoal", 'Float'>
    readonly targetWeight: FieldRef<"WeightGoal", 'Float'>
    readonly createdAt: FieldRef<"WeightGoal", 'DateTime'>
    readonly updatedAt: FieldRef<"WeightGoal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeightGoal findUnique
   */
  export type WeightGoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalInclude<ExtArgs> | null
    /**
     * Filter, which WeightGoal to fetch.
     */
    where: WeightGoalWhereUniqueInput
  }

  /**
   * WeightGoal findUniqueOrThrow
   */
  export type WeightGoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalInclude<ExtArgs> | null
    /**
     * Filter, which WeightGoal to fetch.
     */
    where: WeightGoalWhereUniqueInput
  }

  /**
   * WeightGoal findFirst
   */
  export type WeightGoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalInclude<ExtArgs> | null
    /**
     * Filter, which WeightGoal to fetch.
     */
    where?: WeightGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightGoals to fetch.
     */
    orderBy?: WeightGoalOrderByWithRelationInput | WeightGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeightGoals.
     */
    cursor?: WeightGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeightGoals.
     */
    distinct?: WeightGoalScalarFieldEnum | WeightGoalScalarFieldEnum[]
  }

  /**
   * WeightGoal findFirstOrThrow
   */
  export type WeightGoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalInclude<ExtArgs> | null
    /**
     * Filter, which WeightGoal to fetch.
     */
    where?: WeightGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightGoals to fetch.
     */
    orderBy?: WeightGoalOrderByWithRelationInput | WeightGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeightGoals.
     */
    cursor?: WeightGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeightGoals.
     */
    distinct?: WeightGoalScalarFieldEnum | WeightGoalScalarFieldEnum[]
  }

  /**
   * WeightGoal findMany
   */
  export type WeightGoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalInclude<ExtArgs> | null
    /**
     * Filter, which WeightGoals to fetch.
     */
    where?: WeightGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightGoals to fetch.
     */
    orderBy?: WeightGoalOrderByWithRelationInput | WeightGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeightGoals.
     */
    cursor?: WeightGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightGoals.
     */
    skip?: number
    distinct?: WeightGoalScalarFieldEnum | WeightGoalScalarFieldEnum[]
  }

  /**
   * WeightGoal create
   */
  export type WeightGoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalInclude<ExtArgs> | null
    /**
     * The data needed to create a WeightGoal.
     */
    data: XOR<WeightGoalCreateInput, WeightGoalUncheckedCreateInput>
  }

  /**
   * WeightGoal createMany
   */
  export type WeightGoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeightGoals.
     */
    data: WeightGoalCreateManyInput | WeightGoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeightGoal createManyAndReturn
   */
  export type WeightGoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * The data used to create many WeightGoals.
     */
    data: WeightGoalCreateManyInput | WeightGoalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeightGoal update
   */
  export type WeightGoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalInclude<ExtArgs> | null
    /**
     * The data needed to update a WeightGoal.
     */
    data: XOR<WeightGoalUpdateInput, WeightGoalUncheckedUpdateInput>
    /**
     * Choose, which WeightGoal to update.
     */
    where: WeightGoalWhereUniqueInput
  }

  /**
   * WeightGoal updateMany
   */
  export type WeightGoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeightGoals.
     */
    data: XOR<WeightGoalUpdateManyMutationInput, WeightGoalUncheckedUpdateManyInput>
    /**
     * Filter which WeightGoals to update
     */
    where?: WeightGoalWhereInput
    /**
     * Limit how many WeightGoals to update.
     */
    limit?: number
  }

  /**
   * WeightGoal updateManyAndReturn
   */
  export type WeightGoalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * The data used to update WeightGoals.
     */
    data: XOR<WeightGoalUpdateManyMutationInput, WeightGoalUncheckedUpdateManyInput>
    /**
     * Filter which WeightGoals to update
     */
    where?: WeightGoalWhereInput
    /**
     * Limit how many WeightGoals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeightGoal upsert
   */
  export type WeightGoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalInclude<ExtArgs> | null
    /**
     * The filter to search for the WeightGoal to update in case it exists.
     */
    where: WeightGoalWhereUniqueInput
    /**
     * In case the WeightGoal found by the `where` argument doesn't exist, create a new WeightGoal with this data.
     */
    create: XOR<WeightGoalCreateInput, WeightGoalUncheckedCreateInput>
    /**
     * In case the WeightGoal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeightGoalUpdateInput, WeightGoalUncheckedUpdateInput>
  }

  /**
   * WeightGoal delete
   */
  export type WeightGoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalInclude<ExtArgs> | null
    /**
     * Filter which WeightGoal to delete.
     */
    where: WeightGoalWhereUniqueInput
  }

  /**
   * WeightGoal deleteMany
   */
  export type WeightGoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeightGoals to delete
     */
    where?: WeightGoalWhereInput
    /**
     * Limit how many WeightGoals to delete.
     */
    limit?: number
  }

  /**
   * WeightGoal without action
   */
  export type WeightGoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightGoal
     */
    select?: WeightGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeightGoal
     */
    omit?: WeightGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightGoalInclude<ExtArgs> | null
  }


  /**
   * Model CountGoal
   */

  export type AggregateCountGoal = {
    _count: CountGoalCountAggregateOutputType | null
    _avg: CountGoalAvgAggregateOutputType | null
    _sum: CountGoalSumAggregateOutputType | null
    _min: CountGoalMinAggregateOutputType | null
    _max: CountGoalMaxAggregateOutputType | null
  }

  export type CountGoalAvgAggregateOutputType = {
    targetCount: number | null
    currentCount: number | null
  }

  export type CountGoalSumAggregateOutputType = {
    targetCount: number | null
    currentCount: number | null
  }

  export type CountGoalMinAggregateOutputType = {
    id: string | null
    goalId: string | null
    targetCount: number | null
    currentCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CountGoalMaxAggregateOutputType = {
    id: string | null
    goalId: string | null
    targetCount: number | null
    currentCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CountGoalCountAggregateOutputType = {
    id: number
    goalId: number
    targetCount: number
    currentCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CountGoalAvgAggregateInputType = {
    targetCount?: true
    currentCount?: true
  }

  export type CountGoalSumAggregateInputType = {
    targetCount?: true
    currentCount?: true
  }

  export type CountGoalMinAggregateInputType = {
    id?: true
    goalId?: true
    targetCount?: true
    currentCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CountGoalMaxAggregateInputType = {
    id?: true
    goalId?: true
    targetCount?: true
    currentCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CountGoalCountAggregateInputType = {
    id?: true
    goalId?: true
    targetCount?: true
    currentCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CountGoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CountGoal to aggregate.
     */
    where?: CountGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CountGoals to fetch.
     */
    orderBy?: CountGoalOrderByWithRelationInput | CountGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CountGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CountGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CountGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CountGoals
    **/
    _count?: true | CountGoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CountGoalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CountGoalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CountGoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CountGoalMaxAggregateInputType
  }

  export type GetCountGoalAggregateType<T extends CountGoalAggregateArgs> = {
        [P in keyof T & keyof AggregateCountGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCountGoal[P]>
      : GetScalarType<T[P], AggregateCountGoal[P]>
  }




  export type CountGoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CountGoalWhereInput
    orderBy?: CountGoalOrderByWithAggregationInput | CountGoalOrderByWithAggregationInput[]
    by: CountGoalScalarFieldEnum[] | CountGoalScalarFieldEnum
    having?: CountGoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CountGoalCountAggregateInputType | true
    _avg?: CountGoalAvgAggregateInputType
    _sum?: CountGoalSumAggregateInputType
    _min?: CountGoalMinAggregateInputType
    _max?: CountGoalMaxAggregateInputType
  }

  export type CountGoalGroupByOutputType = {
    id: string
    goalId: string
    targetCount: number
    currentCount: number
    createdAt: Date
    updatedAt: Date
    _count: CountGoalCountAggregateOutputType | null
    _avg: CountGoalAvgAggregateOutputType | null
    _sum: CountGoalSumAggregateOutputType | null
    _min: CountGoalMinAggregateOutputType | null
    _max: CountGoalMaxAggregateOutputType | null
  }

  type GetCountGoalGroupByPayload<T extends CountGoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CountGoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CountGoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CountGoalGroupByOutputType[P]>
            : GetScalarType<T[P], CountGoalGroupByOutputType[P]>
        }
      >
    >


  export type CountGoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    targetCount?: boolean
    currentCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["countGoal"]>

  export type CountGoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    targetCount?: boolean
    currentCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["countGoal"]>

  export type CountGoalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    targetCount?: boolean
    currentCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["countGoal"]>

  export type CountGoalSelectScalar = {
    id?: boolean
    goalId?: boolean
    targetCount?: boolean
    currentCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CountGoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "goalId" | "targetCount" | "currentCount" | "createdAt" | "updatedAt", ExtArgs["result"]["countGoal"]>
  export type CountGoalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }
  export type CountGoalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }
  export type CountGoalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }

  export type $CountGoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CountGoal"
    objects: {
      goal: Prisma.$GoalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      goalId: string
      targetCount: number
      currentCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["countGoal"]>
    composites: {}
  }

  type CountGoalGetPayload<S extends boolean | null | undefined | CountGoalDefaultArgs> = $Result.GetResult<Prisma.$CountGoalPayload, S>

  type CountGoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CountGoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CountGoalCountAggregateInputType | true
    }

  export interface CountGoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CountGoal'], meta: { name: 'CountGoal' } }
    /**
     * Find zero or one CountGoal that matches the filter.
     * @param {CountGoalFindUniqueArgs} args - Arguments to find a CountGoal
     * @example
     * // Get one CountGoal
     * const countGoal = await prisma.countGoal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CountGoalFindUniqueArgs>(args: SelectSubset<T, CountGoalFindUniqueArgs<ExtArgs>>): Prisma__CountGoalClient<$Result.GetResult<Prisma.$CountGoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CountGoal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CountGoalFindUniqueOrThrowArgs} args - Arguments to find a CountGoal
     * @example
     * // Get one CountGoal
     * const countGoal = await prisma.countGoal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CountGoalFindUniqueOrThrowArgs>(args: SelectSubset<T, CountGoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CountGoalClient<$Result.GetResult<Prisma.$CountGoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CountGoal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountGoalFindFirstArgs} args - Arguments to find a CountGoal
     * @example
     * // Get one CountGoal
     * const countGoal = await prisma.countGoal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CountGoalFindFirstArgs>(args?: SelectSubset<T, CountGoalFindFirstArgs<ExtArgs>>): Prisma__CountGoalClient<$Result.GetResult<Prisma.$CountGoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CountGoal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountGoalFindFirstOrThrowArgs} args - Arguments to find a CountGoal
     * @example
     * // Get one CountGoal
     * const countGoal = await prisma.countGoal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CountGoalFindFirstOrThrowArgs>(args?: SelectSubset<T, CountGoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__CountGoalClient<$Result.GetResult<Prisma.$CountGoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CountGoals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountGoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CountGoals
     * const countGoals = await prisma.countGoal.findMany()
     * 
     * // Get first 10 CountGoals
     * const countGoals = await prisma.countGoal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const countGoalWithIdOnly = await prisma.countGoal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CountGoalFindManyArgs>(args?: SelectSubset<T, CountGoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountGoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CountGoal.
     * @param {CountGoalCreateArgs} args - Arguments to create a CountGoal.
     * @example
     * // Create one CountGoal
     * const CountGoal = await prisma.countGoal.create({
     *   data: {
     *     // ... data to create a CountGoal
     *   }
     * })
     * 
     */
    create<T extends CountGoalCreateArgs>(args: SelectSubset<T, CountGoalCreateArgs<ExtArgs>>): Prisma__CountGoalClient<$Result.GetResult<Prisma.$CountGoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CountGoals.
     * @param {CountGoalCreateManyArgs} args - Arguments to create many CountGoals.
     * @example
     * // Create many CountGoals
     * const countGoal = await prisma.countGoal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CountGoalCreateManyArgs>(args?: SelectSubset<T, CountGoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CountGoals and returns the data saved in the database.
     * @param {CountGoalCreateManyAndReturnArgs} args - Arguments to create many CountGoals.
     * @example
     * // Create many CountGoals
     * const countGoal = await prisma.countGoal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CountGoals and only return the `id`
     * const countGoalWithIdOnly = await prisma.countGoal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CountGoalCreateManyAndReturnArgs>(args?: SelectSubset<T, CountGoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountGoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CountGoal.
     * @param {CountGoalDeleteArgs} args - Arguments to delete one CountGoal.
     * @example
     * // Delete one CountGoal
     * const CountGoal = await prisma.countGoal.delete({
     *   where: {
     *     // ... filter to delete one CountGoal
     *   }
     * })
     * 
     */
    delete<T extends CountGoalDeleteArgs>(args: SelectSubset<T, CountGoalDeleteArgs<ExtArgs>>): Prisma__CountGoalClient<$Result.GetResult<Prisma.$CountGoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CountGoal.
     * @param {CountGoalUpdateArgs} args - Arguments to update one CountGoal.
     * @example
     * // Update one CountGoal
     * const countGoal = await prisma.countGoal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CountGoalUpdateArgs>(args: SelectSubset<T, CountGoalUpdateArgs<ExtArgs>>): Prisma__CountGoalClient<$Result.GetResult<Prisma.$CountGoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CountGoals.
     * @param {CountGoalDeleteManyArgs} args - Arguments to filter CountGoals to delete.
     * @example
     * // Delete a few CountGoals
     * const { count } = await prisma.countGoal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CountGoalDeleteManyArgs>(args?: SelectSubset<T, CountGoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CountGoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountGoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CountGoals
     * const countGoal = await prisma.countGoal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CountGoalUpdateManyArgs>(args: SelectSubset<T, CountGoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CountGoals and returns the data updated in the database.
     * @param {CountGoalUpdateManyAndReturnArgs} args - Arguments to update many CountGoals.
     * @example
     * // Update many CountGoals
     * const countGoal = await prisma.countGoal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CountGoals and only return the `id`
     * const countGoalWithIdOnly = await prisma.countGoal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CountGoalUpdateManyAndReturnArgs>(args: SelectSubset<T, CountGoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountGoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CountGoal.
     * @param {CountGoalUpsertArgs} args - Arguments to update or create a CountGoal.
     * @example
     * // Update or create a CountGoal
     * const countGoal = await prisma.countGoal.upsert({
     *   create: {
     *     // ... data to create a CountGoal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CountGoal we want to update
     *   }
     * })
     */
    upsert<T extends CountGoalUpsertArgs>(args: SelectSubset<T, CountGoalUpsertArgs<ExtArgs>>): Prisma__CountGoalClient<$Result.GetResult<Prisma.$CountGoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CountGoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountGoalCountArgs} args - Arguments to filter CountGoals to count.
     * @example
     * // Count the number of CountGoals
     * const count = await prisma.countGoal.count({
     *   where: {
     *     // ... the filter for the CountGoals we want to count
     *   }
     * })
    **/
    count<T extends CountGoalCountArgs>(
      args?: Subset<T, CountGoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CountGoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CountGoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountGoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CountGoalAggregateArgs>(args: Subset<T, CountGoalAggregateArgs>): Prisma.PrismaPromise<GetCountGoalAggregateType<T>>

    /**
     * Group by CountGoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountGoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CountGoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CountGoalGroupByArgs['orderBy'] }
        : { orderBy?: CountGoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CountGoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCountGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CountGoal model
   */
  readonly fields: CountGoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CountGoal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CountGoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    goal<T extends GoalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GoalDefaultArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CountGoal model
   */
  interface CountGoalFieldRefs {
    readonly id: FieldRef<"CountGoal", 'String'>
    readonly goalId: FieldRef<"CountGoal", 'String'>
    readonly targetCount: FieldRef<"CountGoal", 'Int'>
    readonly currentCount: FieldRef<"CountGoal", 'Int'>
    readonly createdAt: FieldRef<"CountGoal", 'DateTime'>
    readonly updatedAt: FieldRef<"CountGoal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CountGoal findUnique
   */
  export type CountGoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalInclude<ExtArgs> | null
    /**
     * Filter, which CountGoal to fetch.
     */
    where: CountGoalWhereUniqueInput
  }

  /**
   * CountGoal findUniqueOrThrow
   */
  export type CountGoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalInclude<ExtArgs> | null
    /**
     * Filter, which CountGoal to fetch.
     */
    where: CountGoalWhereUniqueInput
  }

  /**
   * CountGoal findFirst
   */
  export type CountGoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalInclude<ExtArgs> | null
    /**
     * Filter, which CountGoal to fetch.
     */
    where?: CountGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CountGoals to fetch.
     */
    orderBy?: CountGoalOrderByWithRelationInput | CountGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CountGoals.
     */
    cursor?: CountGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CountGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CountGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CountGoals.
     */
    distinct?: CountGoalScalarFieldEnum | CountGoalScalarFieldEnum[]
  }

  /**
   * CountGoal findFirstOrThrow
   */
  export type CountGoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalInclude<ExtArgs> | null
    /**
     * Filter, which CountGoal to fetch.
     */
    where?: CountGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CountGoals to fetch.
     */
    orderBy?: CountGoalOrderByWithRelationInput | CountGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CountGoals.
     */
    cursor?: CountGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CountGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CountGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CountGoals.
     */
    distinct?: CountGoalScalarFieldEnum | CountGoalScalarFieldEnum[]
  }

  /**
   * CountGoal findMany
   */
  export type CountGoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalInclude<ExtArgs> | null
    /**
     * Filter, which CountGoals to fetch.
     */
    where?: CountGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CountGoals to fetch.
     */
    orderBy?: CountGoalOrderByWithRelationInput | CountGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CountGoals.
     */
    cursor?: CountGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CountGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CountGoals.
     */
    skip?: number
    distinct?: CountGoalScalarFieldEnum | CountGoalScalarFieldEnum[]
  }

  /**
   * CountGoal create
   */
  export type CountGoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalInclude<ExtArgs> | null
    /**
     * The data needed to create a CountGoal.
     */
    data: XOR<CountGoalCreateInput, CountGoalUncheckedCreateInput>
  }

  /**
   * CountGoal createMany
   */
  export type CountGoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CountGoals.
     */
    data: CountGoalCreateManyInput | CountGoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CountGoal createManyAndReturn
   */
  export type CountGoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * The data used to create many CountGoals.
     */
    data: CountGoalCreateManyInput | CountGoalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CountGoal update
   */
  export type CountGoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalInclude<ExtArgs> | null
    /**
     * The data needed to update a CountGoal.
     */
    data: XOR<CountGoalUpdateInput, CountGoalUncheckedUpdateInput>
    /**
     * Choose, which CountGoal to update.
     */
    where: CountGoalWhereUniqueInput
  }

  /**
   * CountGoal updateMany
   */
  export type CountGoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CountGoals.
     */
    data: XOR<CountGoalUpdateManyMutationInput, CountGoalUncheckedUpdateManyInput>
    /**
     * Filter which CountGoals to update
     */
    where?: CountGoalWhereInput
    /**
     * Limit how many CountGoals to update.
     */
    limit?: number
  }

  /**
   * CountGoal updateManyAndReturn
   */
  export type CountGoalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * The data used to update CountGoals.
     */
    data: XOR<CountGoalUpdateManyMutationInput, CountGoalUncheckedUpdateManyInput>
    /**
     * Filter which CountGoals to update
     */
    where?: CountGoalWhereInput
    /**
     * Limit how many CountGoals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CountGoal upsert
   */
  export type CountGoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalInclude<ExtArgs> | null
    /**
     * The filter to search for the CountGoal to update in case it exists.
     */
    where: CountGoalWhereUniqueInput
    /**
     * In case the CountGoal found by the `where` argument doesn't exist, create a new CountGoal with this data.
     */
    create: XOR<CountGoalCreateInput, CountGoalUncheckedCreateInput>
    /**
     * In case the CountGoal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CountGoalUpdateInput, CountGoalUncheckedUpdateInput>
  }

  /**
   * CountGoal delete
   */
  export type CountGoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalInclude<ExtArgs> | null
    /**
     * Filter which CountGoal to delete.
     */
    where: CountGoalWhereUniqueInput
  }

  /**
   * CountGoal deleteMany
   */
  export type CountGoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CountGoals to delete
     */
    where?: CountGoalWhereInput
    /**
     * Limit how many CountGoals to delete.
     */
    limit?: number
  }

  /**
   * CountGoal without action
   */
  export type CountGoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountGoal
     */
    select?: CountGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CountGoal
     */
    omit?: CountGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountGoalInclude<ExtArgs> | null
  }


  /**
   * Model TimeGoal
   */

  export type AggregateTimeGoal = {
    _count: TimeGoalCountAggregateOutputType | null
    _avg: TimeGoalAvgAggregateOutputType | null
    _sum: TimeGoalSumAggregateOutputType | null
    _min: TimeGoalMinAggregateOutputType | null
    _max: TimeGoalMaxAggregateOutputType | null
  }

  export type TimeGoalAvgAggregateOutputType = {
    targetHours: number | null
    targetMinutes: number | null
    currentHours: number | null
    currentMinutes: number | null
  }

  export type TimeGoalSumAggregateOutputType = {
    targetHours: number | null
    targetMinutes: number | null
    currentHours: number | null
    currentMinutes: number | null
  }

  export type TimeGoalMinAggregateOutputType = {
    id: string | null
    goalId: string | null
    targetHours: number | null
    targetMinutes: number | null
    currentHours: number | null
    currentMinutes: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TimeGoalMaxAggregateOutputType = {
    id: string | null
    goalId: string | null
    targetHours: number | null
    targetMinutes: number | null
    currentHours: number | null
    currentMinutes: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TimeGoalCountAggregateOutputType = {
    id: number
    goalId: number
    targetHours: number
    targetMinutes: number
    currentHours: number
    currentMinutes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TimeGoalAvgAggregateInputType = {
    targetHours?: true
    targetMinutes?: true
    currentHours?: true
    currentMinutes?: true
  }

  export type TimeGoalSumAggregateInputType = {
    targetHours?: true
    targetMinutes?: true
    currentHours?: true
    currentMinutes?: true
  }

  export type TimeGoalMinAggregateInputType = {
    id?: true
    goalId?: true
    targetHours?: true
    targetMinutes?: true
    currentHours?: true
    currentMinutes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TimeGoalMaxAggregateInputType = {
    id?: true
    goalId?: true
    targetHours?: true
    targetMinutes?: true
    currentHours?: true
    currentMinutes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TimeGoalCountAggregateInputType = {
    id?: true
    goalId?: true
    targetHours?: true
    targetMinutes?: true
    currentHours?: true
    currentMinutes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TimeGoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeGoal to aggregate.
     */
    where?: TimeGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeGoals to fetch.
     */
    orderBy?: TimeGoalOrderByWithRelationInput | TimeGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimeGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimeGoals
    **/
    _count?: true | TimeGoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimeGoalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimeGoalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimeGoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimeGoalMaxAggregateInputType
  }

  export type GetTimeGoalAggregateType<T extends TimeGoalAggregateArgs> = {
        [P in keyof T & keyof AggregateTimeGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimeGoal[P]>
      : GetScalarType<T[P], AggregateTimeGoal[P]>
  }




  export type TimeGoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeGoalWhereInput
    orderBy?: TimeGoalOrderByWithAggregationInput | TimeGoalOrderByWithAggregationInput[]
    by: TimeGoalScalarFieldEnum[] | TimeGoalScalarFieldEnum
    having?: TimeGoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimeGoalCountAggregateInputType | true
    _avg?: TimeGoalAvgAggregateInputType
    _sum?: TimeGoalSumAggregateInputType
    _min?: TimeGoalMinAggregateInputType
    _max?: TimeGoalMaxAggregateInputType
  }

  export type TimeGoalGroupByOutputType = {
    id: string
    goalId: string
    targetHours: number
    targetMinutes: number
    currentHours: number
    currentMinutes: number
    createdAt: Date
    updatedAt: Date
    _count: TimeGoalCountAggregateOutputType | null
    _avg: TimeGoalAvgAggregateOutputType | null
    _sum: TimeGoalSumAggregateOutputType | null
    _min: TimeGoalMinAggregateOutputType | null
    _max: TimeGoalMaxAggregateOutputType | null
  }

  type GetTimeGoalGroupByPayload<T extends TimeGoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimeGoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimeGoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimeGoalGroupByOutputType[P]>
            : GetScalarType<T[P], TimeGoalGroupByOutputType[P]>
        }
      >
    >


  export type TimeGoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    targetHours?: boolean
    targetMinutes?: boolean
    currentHours?: boolean
    currentMinutes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeGoal"]>

  export type TimeGoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    targetHours?: boolean
    targetMinutes?: boolean
    currentHours?: boolean
    currentMinutes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeGoal"]>

  export type TimeGoalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    targetHours?: boolean
    targetMinutes?: boolean
    currentHours?: boolean
    currentMinutes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeGoal"]>

  export type TimeGoalSelectScalar = {
    id?: boolean
    goalId?: boolean
    targetHours?: boolean
    targetMinutes?: boolean
    currentHours?: boolean
    currentMinutes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TimeGoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "goalId" | "targetHours" | "targetMinutes" | "currentHours" | "currentMinutes" | "createdAt" | "updatedAt", ExtArgs["result"]["timeGoal"]>
  export type TimeGoalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }
  export type TimeGoalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }
  export type TimeGoalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }

  export type $TimeGoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimeGoal"
    objects: {
      goal: Prisma.$GoalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      goalId: string
      targetHours: number
      targetMinutes: number
      currentHours: number
      currentMinutes: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["timeGoal"]>
    composites: {}
  }

  type TimeGoalGetPayload<S extends boolean | null | undefined | TimeGoalDefaultArgs> = $Result.GetResult<Prisma.$TimeGoalPayload, S>

  type TimeGoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimeGoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimeGoalCountAggregateInputType | true
    }

  export interface TimeGoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimeGoal'], meta: { name: 'TimeGoal' } }
    /**
     * Find zero or one TimeGoal that matches the filter.
     * @param {TimeGoalFindUniqueArgs} args - Arguments to find a TimeGoal
     * @example
     * // Get one TimeGoal
     * const timeGoal = await prisma.timeGoal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimeGoalFindUniqueArgs>(args: SelectSubset<T, TimeGoalFindUniqueArgs<ExtArgs>>): Prisma__TimeGoalClient<$Result.GetResult<Prisma.$TimeGoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimeGoal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimeGoalFindUniqueOrThrowArgs} args - Arguments to find a TimeGoal
     * @example
     * // Get one TimeGoal
     * const timeGoal = await prisma.timeGoal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimeGoalFindUniqueOrThrowArgs>(args: SelectSubset<T, TimeGoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimeGoalClient<$Result.GetResult<Prisma.$TimeGoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeGoal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeGoalFindFirstArgs} args - Arguments to find a TimeGoal
     * @example
     * // Get one TimeGoal
     * const timeGoal = await prisma.timeGoal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimeGoalFindFirstArgs>(args?: SelectSubset<T, TimeGoalFindFirstArgs<ExtArgs>>): Prisma__TimeGoalClient<$Result.GetResult<Prisma.$TimeGoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeGoal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeGoalFindFirstOrThrowArgs} args - Arguments to find a TimeGoal
     * @example
     * // Get one TimeGoal
     * const timeGoal = await prisma.timeGoal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimeGoalFindFirstOrThrowArgs>(args?: SelectSubset<T, TimeGoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimeGoalClient<$Result.GetResult<Prisma.$TimeGoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimeGoals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeGoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimeGoals
     * const timeGoals = await prisma.timeGoal.findMany()
     * 
     * // Get first 10 TimeGoals
     * const timeGoals = await prisma.timeGoal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timeGoalWithIdOnly = await prisma.timeGoal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimeGoalFindManyArgs>(args?: SelectSubset<T, TimeGoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeGoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimeGoal.
     * @param {TimeGoalCreateArgs} args - Arguments to create a TimeGoal.
     * @example
     * // Create one TimeGoal
     * const TimeGoal = await prisma.timeGoal.create({
     *   data: {
     *     // ... data to create a TimeGoal
     *   }
     * })
     * 
     */
    create<T extends TimeGoalCreateArgs>(args: SelectSubset<T, TimeGoalCreateArgs<ExtArgs>>): Prisma__TimeGoalClient<$Result.GetResult<Prisma.$TimeGoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimeGoals.
     * @param {TimeGoalCreateManyArgs} args - Arguments to create many TimeGoals.
     * @example
     * // Create many TimeGoals
     * const timeGoal = await prisma.timeGoal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimeGoalCreateManyArgs>(args?: SelectSubset<T, TimeGoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimeGoals and returns the data saved in the database.
     * @param {TimeGoalCreateManyAndReturnArgs} args - Arguments to create many TimeGoals.
     * @example
     * // Create many TimeGoals
     * const timeGoal = await prisma.timeGoal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimeGoals and only return the `id`
     * const timeGoalWithIdOnly = await prisma.timeGoal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimeGoalCreateManyAndReturnArgs>(args?: SelectSubset<T, TimeGoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeGoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimeGoal.
     * @param {TimeGoalDeleteArgs} args - Arguments to delete one TimeGoal.
     * @example
     * // Delete one TimeGoal
     * const TimeGoal = await prisma.timeGoal.delete({
     *   where: {
     *     // ... filter to delete one TimeGoal
     *   }
     * })
     * 
     */
    delete<T extends TimeGoalDeleteArgs>(args: SelectSubset<T, TimeGoalDeleteArgs<ExtArgs>>): Prisma__TimeGoalClient<$Result.GetResult<Prisma.$TimeGoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimeGoal.
     * @param {TimeGoalUpdateArgs} args - Arguments to update one TimeGoal.
     * @example
     * // Update one TimeGoal
     * const timeGoal = await prisma.timeGoal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimeGoalUpdateArgs>(args: SelectSubset<T, TimeGoalUpdateArgs<ExtArgs>>): Prisma__TimeGoalClient<$Result.GetResult<Prisma.$TimeGoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimeGoals.
     * @param {TimeGoalDeleteManyArgs} args - Arguments to filter TimeGoals to delete.
     * @example
     * // Delete a few TimeGoals
     * const { count } = await prisma.timeGoal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimeGoalDeleteManyArgs>(args?: SelectSubset<T, TimeGoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeGoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeGoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimeGoals
     * const timeGoal = await prisma.timeGoal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimeGoalUpdateManyArgs>(args: SelectSubset<T, TimeGoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeGoals and returns the data updated in the database.
     * @param {TimeGoalUpdateManyAndReturnArgs} args - Arguments to update many TimeGoals.
     * @example
     * // Update many TimeGoals
     * const timeGoal = await prisma.timeGoal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimeGoals and only return the `id`
     * const timeGoalWithIdOnly = await prisma.timeGoal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimeGoalUpdateManyAndReturnArgs>(args: SelectSubset<T, TimeGoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeGoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimeGoal.
     * @param {TimeGoalUpsertArgs} args - Arguments to update or create a TimeGoal.
     * @example
     * // Update or create a TimeGoal
     * const timeGoal = await prisma.timeGoal.upsert({
     *   create: {
     *     // ... data to create a TimeGoal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimeGoal we want to update
     *   }
     * })
     */
    upsert<T extends TimeGoalUpsertArgs>(args: SelectSubset<T, TimeGoalUpsertArgs<ExtArgs>>): Prisma__TimeGoalClient<$Result.GetResult<Prisma.$TimeGoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimeGoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeGoalCountArgs} args - Arguments to filter TimeGoals to count.
     * @example
     * // Count the number of TimeGoals
     * const count = await prisma.timeGoal.count({
     *   where: {
     *     // ... the filter for the TimeGoals we want to count
     *   }
     * })
    **/
    count<T extends TimeGoalCountArgs>(
      args?: Subset<T, TimeGoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimeGoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimeGoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeGoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimeGoalAggregateArgs>(args: Subset<T, TimeGoalAggregateArgs>): Prisma.PrismaPromise<GetTimeGoalAggregateType<T>>

    /**
     * Group by TimeGoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeGoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimeGoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimeGoalGroupByArgs['orderBy'] }
        : { orderBy?: TimeGoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimeGoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimeGoal model
   */
  readonly fields: TimeGoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimeGoal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimeGoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    goal<T extends GoalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GoalDefaultArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimeGoal model
   */
  interface TimeGoalFieldRefs {
    readonly id: FieldRef<"TimeGoal", 'String'>
    readonly goalId: FieldRef<"TimeGoal", 'String'>
    readonly targetHours: FieldRef<"TimeGoal", 'Int'>
    readonly targetMinutes: FieldRef<"TimeGoal", 'Int'>
    readonly currentHours: FieldRef<"TimeGoal", 'Int'>
    readonly currentMinutes: FieldRef<"TimeGoal", 'Int'>
    readonly createdAt: FieldRef<"TimeGoal", 'DateTime'>
    readonly updatedAt: FieldRef<"TimeGoal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TimeGoal findUnique
   */
  export type TimeGoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalInclude<ExtArgs> | null
    /**
     * Filter, which TimeGoal to fetch.
     */
    where: TimeGoalWhereUniqueInput
  }

  /**
   * TimeGoal findUniqueOrThrow
   */
  export type TimeGoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalInclude<ExtArgs> | null
    /**
     * Filter, which TimeGoal to fetch.
     */
    where: TimeGoalWhereUniqueInput
  }

  /**
   * TimeGoal findFirst
   */
  export type TimeGoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalInclude<ExtArgs> | null
    /**
     * Filter, which TimeGoal to fetch.
     */
    where?: TimeGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeGoals to fetch.
     */
    orderBy?: TimeGoalOrderByWithRelationInput | TimeGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeGoals.
     */
    cursor?: TimeGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeGoals.
     */
    distinct?: TimeGoalScalarFieldEnum | TimeGoalScalarFieldEnum[]
  }

  /**
   * TimeGoal findFirstOrThrow
   */
  export type TimeGoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalInclude<ExtArgs> | null
    /**
     * Filter, which TimeGoal to fetch.
     */
    where?: TimeGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeGoals to fetch.
     */
    orderBy?: TimeGoalOrderByWithRelationInput | TimeGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeGoals.
     */
    cursor?: TimeGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeGoals.
     */
    distinct?: TimeGoalScalarFieldEnum | TimeGoalScalarFieldEnum[]
  }

  /**
   * TimeGoal findMany
   */
  export type TimeGoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalInclude<ExtArgs> | null
    /**
     * Filter, which TimeGoals to fetch.
     */
    where?: TimeGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeGoals to fetch.
     */
    orderBy?: TimeGoalOrderByWithRelationInput | TimeGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimeGoals.
     */
    cursor?: TimeGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeGoals.
     */
    skip?: number
    distinct?: TimeGoalScalarFieldEnum | TimeGoalScalarFieldEnum[]
  }

  /**
   * TimeGoal create
   */
  export type TimeGoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalInclude<ExtArgs> | null
    /**
     * The data needed to create a TimeGoal.
     */
    data: XOR<TimeGoalCreateInput, TimeGoalUncheckedCreateInput>
  }

  /**
   * TimeGoal createMany
   */
  export type TimeGoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimeGoals.
     */
    data: TimeGoalCreateManyInput | TimeGoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimeGoal createManyAndReturn
   */
  export type TimeGoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * The data used to create many TimeGoals.
     */
    data: TimeGoalCreateManyInput | TimeGoalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeGoal update
   */
  export type TimeGoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalInclude<ExtArgs> | null
    /**
     * The data needed to update a TimeGoal.
     */
    data: XOR<TimeGoalUpdateInput, TimeGoalUncheckedUpdateInput>
    /**
     * Choose, which TimeGoal to update.
     */
    where: TimeGoalWhereUniqueInput
  }

  /**
   * TimeGoal updateMany
   */
  export type TimeGoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimeGoals.
     */
    data: XOR<TimeGoalUpdateManyMutationInput, TimeGoalUncheckedUpdateManyInput>
    /**
     * Filter which TimeGoals to update
     */
    where?: TimeGoalWhereInput
    /**
     * Limit how many TimeGoals to update.
     */
    limit?: number
  }

  /**
   * TimeGoal updateManyAndReturn
   */
  export type TimeGoalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * The data used to update TimeGoals.
     */
    data: XOR<TimeGoalUpdateManyMutationInput, TimeGoalUncheckedUpdateManyInput>
    /**
     * Filter which TimeGoals to update
     */
    where?: TimeGoalWhereInput
    /**
     * Limit how many TimeGoals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeGoal upsert
   */
  export type TimeGoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalInclude<ExtArgs> | null
    /**
     * The filter to search for the TimeGoal to update in case it exists.
     */
    where: TimeGoalWhereUniqueInput
    /**
     * In case the TimeGoal found by the `where` argument doesn't exist, create a new TimeGoal with this data.
     */
    create: XOR<TimeGoalCreateInput, TimeGoalUncheckedCreateInput>
    /**
     * In case the TimeGoal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimeGoalUpdateInput, TimeGoalUncheckedUpdateInput>
  }

  /**
   * TimeGoal delete
   */
  export type TimeGoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalInclude<ExtArgs> | null
    /**
     * Filter which TimeGoal to delete.
     */
    where: TimeGoalWhereUniqueInput
  }

  /**
   * TimeGoal deleteMany
   */
  export type TimeGoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeGoals to delete
     */
    where?: TimeGoalWhereInput
    /**
     * Limit how many TimeGoals to delete.
     */
    limit?: number
  }

  /**
   * TimeGoal without action
   */
  export type TimeGoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeGoal
     */
    select?: TimeGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeGoal
     */
    omit?: TimeGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeGoalInclude<ExtArgs> | null
  }


  /**
   * Model MonthlyGoal
   */

  export type AggregateMonthlyGoal = {
    _count: MonthlyGoalCountAggregateOutputType | null
    _avg: MonthlyGoalAvgAggregateOutputType | null
    _sum: MonthlyGoalSumAggregateOutputType | null
    _min: MonthlyGoalMinAggregateOutputType | null
    _max: MonthlyGoalMaxAggregateOutputType | null
  }

  export type MonthlyGoalAvgAggregateOutputType = {
    target: Decimal | null
    currentProgress: Decimal | null
  }

  export type MonthlyGoalSumAggregateOutputType = {
    target: Decimal | null
    currentProgress: Decimal | null
  }

  export type MonthlyGoalMinAggregateOutputType = {
    id: string | null
    goalId: string | null
    title: string | null
    month: string | null
    monthDate: Date | null
    target: Decimal | null
    unit: string | null
    currentProgress: Decimal | null
    status: $Enums.GoalStatus | null
    remarks: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MonthlyGoalMaxAggregateOutputType = {
    id: string | null
    goalId: string | null
    title: string | null
    month: string | null
    monthDate: Date | null
    target: Decimal | null
    unit: string | null
    currentProgress: Decimal | null
    status: $Enums.GoalStatus | null
    remarks: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MonthlyGoalCountAggregateOutputType = {
    id: number
    goalId: number
    title: number
    month: number
    monthDate: number
    target: number
    unit: number
    currentProgress: number
    status: number
    remarks: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MonthlyGoalAvgAggregateInputType = {
    target?: true
    currentProgress?: true
  }

  export type MonthlyGoalSumAggregateInputType = {
    target?: true
    currentProgress?: true
  }

  export type MonthlyGoalMinAggregateInputType = {
    id?: true
    goalId?: true
    title?: true
    month?: true
    monthDate?: true
    target?: true
    unit?: true
    currentProgress?: true
    status?: true
    remarks?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MonthlyGoalMaxAggregateInputType = {
    id?: true
    goalId?: true
    title?: true
    month?: true
    monthDate?: true
    target?: true
    unit?: true
    currentProgress?: true
    status?: true
    remarks?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MonthlyGoalCountAggregateInputType = {
    id?: true
    goalId?: true
    title?: true
    month?: true
    monthDate?: true
    target?: true
    unit?: true
    currentProgress?: true
    status?: true
    remarks?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MonthlyGoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyGoal to aggregate.
     */
    where?: MonthlyGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyGoals to fetch.
     */
    orderBy?: MonthlyGoalOrderByWithRelationInput | MonthlyGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonthlyGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MonthlyGoals
    **/
    _count?: true | MonthlyGoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MonthlyGoalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MonthlyGoalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonthlyGoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonthlyGoalMaxAggregateInputType
  }

  export type GetMonthlyGoalAggregateType<T extends MonthlyGoalAggregateArgs> = {
        [P in keyof T & keyof AggregateMonthlyGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonthlyGoal[P]>
      : GetScalarType<T[P], AggregateMonthlyGoal[P]>
  }




  export type MonthlyGoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyGoalWhereInput
    orderBy?: MonthlyGoalOrderByWithAggregationInput | MonthlyGoalOrderByWithAggregationInput[]
    by: MonthlyGoalScalarFieldEnum[] | MonthlyGoalScalarFieldEnum
    having?: MonthlyGoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonthlyGoalCountAggregateInputType | true
    _avg?: MonthlyGoalAvgAggregateInputType
    _sum?: MonthlyGoalSumAggregateInputType
    _min?: MonthlyGoalMinAggregateInputType
    _max?: MonthlyGoalMaxAggregateInputType
  }

  export type MonthlyGoalGroupByOutputType = {
    id: string
    goalId: string
    title: string
    month: string
    monthDate: Date
    target: Decimal
    unit: string
    currentProgress: Decimal
    status: $Enums.GoalStatus
    remarks: string | null
    createdAt: Date
    updatedAt: Date
    _count: MonthlyGoalCountAggregateOutputType | null
    _avg: MonthlyGoalAvgAggregateOutputType | null
    _sum: MonthlyGoalSumAggregateOutputType | null
    _min: MonthlyGoalMinAggregateOutputType | null
    _max: MonthlyGoalMaxAggregateOutputType | null
  }

  type GetMonthlyGoalGroupByPayload<T extends MonthlyGoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonthlyGoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonthlyGoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonthlyGoalGroupByOutputType[P]>
            : GetScalarType<T[P], MonthlyGoalGroupByOutputType[P]>
        }
      >
    >


  export type MonthlyGoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    title?: boolean
    month?: boolean
    monthDate?: boolean
    target?: boolean
    unit?: boolean
    currentProgress?: boolean
    status?: boolean
    remarks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyGoal"]>

  export type MonthlyGoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    title?: boolean
    month?: boolean
    monthDate?: boolean
    target?: boolean
    unit?: boolean
    currentProgress?: boolean
    status?: boolean
    remarks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyGoal"]>

  export type MonthlyGoalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    title?: boolean
    month?: boolean
    monthDate?: boolean
    target?: boolean
    unit?: boolean
    currentProgress?: boolean
    status?: boolean
    remarks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyGoal"]>

  export type MonthlyGoalSelectScalar = {
    id?: boolean
    goalId?: boolean
    title?: boolean
    month?: boolean
    monthDate?: boolean
    target?: boolean
    unit?: boolean
    currentProgress?: boolean
    status?: boolean
    remarks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MonthlyGoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "goalId" | "title" | "month" | "monthDate" | "target" | "unit" | "currentProgress" | "status" | "remarks" | "createdAt" | "updatedAt", ExtArgs["result"]["monthlyGoal"]>
  export type MonthlyGoalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }
  export type MonthlyGoalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }
  export type MonthlyGoalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }

  export type $MonthlyGoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MonthlyGoal"
    objects: {
      goal: Prisma.$GoalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      goalId: string
      title: string
      month: string
      monthDate: Date
      target: Prisma.Decimal
      unit: string
      currentProgress: Prisma.Decimal
      status: $Enums.GoalStatus
      remarks: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["monthlyGoal"]>
    composites: {}
  }

  type MonthlyGoalGetPayload<S extends boolean | null | undefined | MonthlyGoalDefaultArgs> = $Result.GetResult<Prisma.$MonthlyGoalPayload, S>

  type MonthlyGoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MonthlyGoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MonthlyGoalCountAggregateInputType | true
    }

  export interface MonthlyGoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MonthlyGoal'], meta: { name: 'MonthlyGoal' } }
    /**
     * Find zero or one MonthlyGoal that matches the filter.
     * @param {MonthlyGoalFindUniqueArgs} args - Arguments to find a MonthlyGoal
     * @example
     * // Get one MonthlyGoal
     * const monthlyGoal = await prisma.monthlyGoal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MonthlyGoalFindUniqueArgs>(args: SelectSubset<T, MonthlyGoalFindUniqueArgs<ExtArgs>>): Prisma__MonthlyGoalClient<$Result.GetResult<Prisma.$MonthlyGoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MonthlyGoal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MonthlyGoalFindUniqueOrThrowArgs} args - Arguments to find a MonthlyGoal
     * @example
     * // Get one MonthlyGoal
     * const monthlyGoal = await prisma.monthlyGoal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MonthlyGoalFindUniqueOrThrowArgs>(args: SelectSubset<T, MonthlyGoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MonthlyGoalClient<$Result.GetResult<Prisma.$MonthlyGoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyGoal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyGoalFindFirstArgs} args - Arguments to find a MonthlyGoal
     * @example
     * // Get one MonthlyGoal
     * const monthlyGoal = await prisma.monthlyGoal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MonthlyGoalFindFirstArgs>(args?: SelectSubset<T, MonthlyGoalFindFirstArgs<ExtArgs>>): Prisma__MonthlyGoalClient<$Result.GetResult<Prisma.$MonthlyGoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyGoal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyGoalFindFirstOrThrowArgs} args - Arguments to find a MonthlyGoal
     * @example
     * // Get one MonthlyGoal
     * const monthlyGoal = await prisma.monthlyGoal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MonthlyGoalFindFirstOrThrowArgs>(args?: SelectSubset<T, MonthlyGoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__MonthlyGoalClient<$Result.GetResult<Prisma.$MonthlyGoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MonthlyGoals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyGoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MonthlyGoals
     * const monthlyGoals = await prisma.monthlyGoal.findMany()
     * 
     * // Get first 10 MonthlyGoals
     * const monthlyGoals = await prisma.monthlyGoal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monthlyGoalWithIdOnly = await prisma.monthlyGoal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MonthlyGoalFindManyArgs>(args?: SelectSubset<T, MonthlyGoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyGoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MonthlyGoal.
     * @param {MonthlyGoalCreateArgs} args - Arguments to create a MonthlyGoal.
     * @example
     * // Create one MonthlyGoal
     * const MonthlyGoal = await prisma.monthlyGoal.create({
     *   data: {
     *     // ... data to create a MonthlyGoal
     *   }
     * })
     * 
     */
    create<T extends MonthlyGoalCreateArgs>(args: SelectSubset<T, MonthlyGoalCreateArgs<ExtArgs>>): Prisma__MonthlyGoalClient<$Result.GetResult<Prisma.$MonthlyGoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MonthlyGoals.
     * @param {MonthlyGoalCreateManyArgs} args - Arguments to create many MonthlyGoals.
     * @example
     * // Create many MonthlyGoals
     * const monthlyGoal = await prisma.monthlyGoal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MonthlyGoalCreateManyArgs>(args?: SelectSubset<T, MonthlyGoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MonthlyGoals and returns the data saved in the database.
     * @param {MonthlyGoalCreateManyAndReturnArgs} args - Arguments to create many MonthlyGoals.
     * @example
     * // Create many MonthlyGoals
     * const monthlyGoal = await prisma.monthlyGoal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MonthlyGoals and only return the `id`
     * const monthlyGoalWithIdOnly = await prisma.monthlyGoal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MonthlyGoalCreateManyAndReturnArgs>(args?: SelectSubset<T, MonthlyGoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyGoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MonthlyGoal.
     * @param {MonthlyGoalDeleteArgs} args - Arguments to delete one MonthlyGoal.
     * @example
     * // Delete one MonthlyGoal
     * const MonthlyGoal = await prisma.monthlyGoal.delete({
     *   where: {
     *     // ... filter to delete one MonthlyGoal
     *   }
     * })
     * 
     */
    delete<T extends MonthlyGoalDeleteArgs>(args: SelectSubset<T, MonthlyGoalDeleteArgs<ExtArgs>>): Prisma__MonthlyGoalClient<$Result.GetResult<Prisma.$MonthlyGoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MonthlyGoal.
     * @param {MonthlyGoalUpdateArgs} args - Arguments to update one MonthlyGoal.
     * @example
     * // Update one MonthlyGoal
     * const monthlyGoal = await prisma.monthlyGoal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MonthlyGoalUpdateArgs>(args: SelectSubset<T, MonthlyGoalUpdateArgs<ExtArgs>>): Prisma__MonthlyGoalClient<$Result.GetResult<Prisma.$MonthlyGoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MonthlyGoals.
     * @param {MonthlyGoalDeleteManyArgs} args - Arguments to filter MonthlyGoals to delete.
     * @example
     * // Delete a few MonthlyGoals
     * const { count } = await prisma.monthlyGoal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MonthlyGoalDeleteManyArgs>(args?: SelectSubset<T, MonthlyGoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyGoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyGoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MonthlyGoals
     * const monthlyGoal = await prisma.monthlyGoal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MonthlyGoalUpdateManyArgs>(args: SelectSubset<T, MonthlyGoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyGoals and returns the data updated in the database.
     * @param {MonthlyGoalUpdateManyAndReturnArgs} args - Arguments to update many MonthlyGoals.
     * @example
     * // Update many MonthlyGoals
     * const monthlyGoal = await prisma.monthlyGoal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MonthlyGoals and only return the `id`
     * const monthlyGoalWithIdOnly = await prisma.monthlyGoal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MonthlyGoalUpdateManyAndReturnArgs>(args: SelectSubset<T, MonthlyGoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyGoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MonthlyGoal.
     * @param {MonthlyGoalUpsertArgs} args - Arguments to update or create a MonthlyGoal.
     * @example
     * // Update or create a MonthlyGoal
     * const monthlyGoal = await prisma.monthlyGoal.upsert({
     *   create: {
     *     // ... data to create a MonthlyGoal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MonthlyGoal we want to update
     *   }
     * })
     */
    upsert<T extends MonthlyGoalUpsertArgs>(args: SelectSubset<T, MonthlyGoalUpsertArgs<ExtArgs>>): Prisma__MonthlyGoalClient<$Result.GetResult<Prisma.$MonthlyGoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MonthlyGoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyGoalCountArgs} args - Arguments to filter MonthlyGoals to count.
     * @example
     * // Count the number of MonthlyGoals
     * const count = await prisma.monthlyGoal.count({
     *   where: {
     *     // ... the filter for the MonthlyGoals we want to count
     *   }
     * })
    **/
    count<T extends MonthlyGoalCountArgs>(
      args?: Subset<T, MonthlyGoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonthlyGoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MonthlyGoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyGoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MonthlyGoalAggregateArgs>(args: Subset<T, MonthlyGoalAggregateArgs>): Prisma.PrismaPromise<GetMonthlyGoalAggregateType<T>>

    /**
     * Group by MonthlyGoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyGoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MonthlyGoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonthlyGoalGroupByArgs['orderBy'] }
        : { orderBy?: MonthlyGoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MonthlyGoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonthlyGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MonthlyGoal model
   */
  readonly fields: MonthlyGoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MonthlyGoal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonthlyGoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    goal<T extends GoalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GoalDefaultArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MonthlyGoal model
   */
  interface MonthlyGoalFieldRefs {
    readonly id: FieldRef<"MonthlyGoal", 'String'>
    readonly goalId: FieldRef<"MonthlyGoal", 'String'>
    readonly title: FieldRef<"MonthlyGoal", 'String'>
    readonly month: FieldRef<"MonthlyGoal", 'String'>
    readonly monthDate: FieldRef<"MonthlyGoal", 'DateTime'>
    readonly target: FieldRef<"MonthlyGoal", 'Decimal'>
    readonly unit: FieldRef<"MonthlyGoal", 'String'>
    readonly currentProgress: FieldRef<"MonthlyGoal", 'Decimal'>
    readonly status: FieldRef<"MonthlyGoal", 'GoalStatus'>
    readonly remarks: FieldRef<"MonthlyGoal", 'String'>
    readonly createdAt: FieldRef<"MonthlyGoal", 'DateTime'>
    readonly updatedAt: FieldRef<"MonthlyGoal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MonthlyGoal findUnique
   */
  export type MonthlyGoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyGoal to fetch.
     */
    where: MonthlyGoalWhereUniqueInput
  }

  /**
   * MonthlyGoal findUniqueOrThrow
   */
  export type MonthlyGoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyGoal to fetch.
     */
    where: MonthlyGoalWhereUniqueInput
  }

  /**
   * MonthlyGoal findFirst
   */
  export type MonthlyGoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyGoal to fetch.
     */
    where?: MonthlyGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyGoals to fetch.
     */
    orderBy?: MonthlyGoalOrderByWithRelationInput | MonthlyGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyGoals.
     */
    cursor?: MonthlyGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyGoals.
     */
    distinct?: MonthlyGoalScalarFieldEnum | MonthlyGoalScalarFieldEnum[]
  }

  /**
   * MonthlyGoal findFirstOrThrow
   */
  export type MonthlyGoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyGoal to fetch.
     */
    where?: MonthlyGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyGoals to fetch.
     */
    orderBy?: MonthlyGoalOrderByWithRelationInput | MonthlyGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyGoals.
     */
    cursor?: MonthlyGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyGoals.
     */
    distinct?: MonthlyGoalScalarFieldEnum | MonthlyGoalScalarFieldEnum[]
  }

  /**
   * MonthlyGoal findMany
   */
  export type MonthlyGoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyGoals to fetch.
     */
    where?: MonthlyGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyGoals to fetch.
     */
    orderBy?: MonthlyGoalOrderByWithRelationInput | MonthlyGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MonthlyGoals.
     */
    cursor?: MonthlyGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyGoals.
     */
    skip?: number
    distinct?: MonthlyGoalScalarFieldEnum | MonthlyGoalScalarFieldEnum[]
  }

  /**
   * MonthlyGoal create
   */
  export type MonthlyGoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalInclude<ExtArgs> | null
    /**
     * The data needed to create a MonthlyGoal.
     */
    data: XOR<MonthlyGoalCreateInput, MonthlyGoalUncheckedCreateInput>
  }

  /**
   * MonthlyGoal createMany
   */
  export type MonthlyGoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MonthlyGoals.
     */
    data: MonthlyGoalCreateManyInput | MonthlyGoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyGoal createManyAndReturn
   */
  export type MonthlyGoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * The data used to create many MonthlyGoals.
     */
    data: MonthlyGoalCreateManyInput | MonthlyGoalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MonthlyGoal update
   */
  export type MonthlyGoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalInclude<ExtArgs> | null
    /**
     * The data needed to update a MonthlyGoal.
     */
    data: XOR<MonthlyGoalUpdateInput, MonthlyGoalUncheckedUpdateInput>
    /**
     * Choose, which MonthlyGoal to update.
     */
    where: MonthlyGoalWhereUniqueInput
  }

  /**
   * MonthlyGoal updateMany
   */
  export type MonthlyGoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MonthlyGoals.
     */
    data: XOR<MonthlyGoalUpdateManyMutationInput, MonthlyGoalUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyGoals to update
     */
    where?: MonthlyGoalWhereInput
    /**
     * Limit how many MonthlyGoals to update.
     */
    limit?: number
  }

  /**
   * MonthlyGoal updateManyAndReturn
   */
  export type MonthlyGoalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * The data used to update MonthlyGoals.
     */
    data: XOR<MonthlyGoalUpdateManyMutationInput, MonthlyGoalUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyGoals to update
     */
    where?: MonthlyGoalWhereInput
    /**
     * Limit how many MonthlyGoals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MonthlyGoal upsert
   */
  export type MonthlyGoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalInclude<ExtArgs> | null
    /**
     * The filter to search for the MonthlyGoal to update in case it exists.
     */
    where: MonthlyGoalWhereUniqueInput
    /**
     * In case the MonthlyGoal found by the `where` argument doesn't exist, create a new MonthlyGoal with this data.
     */
    create: XOR<MonthlyGoalCreateInput, MonthlyGoalUncheckedCreateInput>
    /**
     * In case the MonthlyGoal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonthlyGoalUpdateInput, MonthlyGoalUncheckedUpdateInput>
  }

  /**
   * MonthlyGoal delete
   */
  export type MonthlyGoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalInclude<ExtArgs> | null
    /**
     * Filter which MonthlyGoal to delete.
     */
    where: MonthlyGoalWhereUniqueInput
  }

  /**
   * MonthlyGoal deleteMany
   */
  export type MonthlyGoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyGoals to delete
     */
    where?: MonthlyGoalWhereInput
    /**
     * Limit how many MonthlyGoals to delete.
     */
    limit?: number
  }

  /**
   * MonthlyGoal without action
   */
  export type MonthlyGoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyGoal
     */
    select?: MonthlyGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyGoal
     */
    omit?: MonthlyGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyGoalInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    target: number | null
    timesPerWeek: number | null
  }

  export type TaskSumAggregateOutputType = {
    target: number | null
    timesPerWeek: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    goalId: string | null
    title: string | null
    type: $Enums.MeasurementType | null
    frequency: $Enums.Frequency | null
    target: number | null
    unit: string | null
    timesPerWeek: number | null
    lastUpdated: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    goalId: string | null
    title: string | null
    type: $Enums.MeasurementType | null
    frequency: $Enums.Frequency | null
    target: number | null
    unit: string | null
    timesPerWeek: number | null
    lastUpdated: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    goalId: number
    title: number
    type: number
    frequency: number
    target: number
    unit: number
    timesPerWeek: number
    lastUpdated: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    target?: true
    timesPerWeek?: true
  }

  export type TaskSumAggregateInputType = {
    target?: true
    timesPerWeek?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    goalId?: true
    title?: true
    type?: true
    frequency?: true
    target?: true
    unit?: true
    timesPerWeek?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    goalId?: true
    title?: true
    type?: true
    frequency?: true
    target?: true
    unit?: true
    timesPerWeek?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    goalId?: true
    title?: true
    type?: true
    frequency?: true
    target?: true
    unit?: true
    timesPerWeek?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    goalId: string
    title: string
    type: $Enums.MeasurementType
    frequency: $Enums.Frequency
    target: number
    unit: string
    timesPerWeek: number | null
    lastUpdated: Date
    createdAt: Date
    updatedAt: Date
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    title?: boolean
    type?: boolean
    frequency?: boolean
    target?: boolean
    unit?: boolean
    timesPerWeek?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
    completionRecords?: boolean | Task$completionRecordsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    title?: boolean
    type?: boolean
    frequency?: boolean
    target?: boolean
    unit?: boolean
    timesPerWeek?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    goalId?: boolean
    title?: boolean
    type?: boolean
    frequency?: boolean
    target?: boolean
    unit?: boolean
    timesPerWeek?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    goalId?: boolean
    title?: boolean
    type?: boolean
    frequency?: boolean
    target?: boolean
    unit?: boolean
    timesPerWeek?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "goalId" | "title" | "type" | "frequency" | "target" | "unit" | "timesPerWeek" | "lastUpdated" | "createdAt" | "updatedAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
    completionRecords?: boolean | Task$completionRecordsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goal?: boolean | GoalDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      goal: Prisma.$GoalPayload<ExtArgs>
      completionRecords: Prisma.$TaskCompletionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      goalId: string
      title: string
      type: $Enums.MeasurementType
      frequency: $Enums.Frequency
      target: number
      unit: string
      timesPerWeek: number | null
      lastUpdated: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    goal<T extends GoalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GoalDefaultArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    completionRecords<T extends Task$completionRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Task$completionRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly goalId: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly type: FieldRef<"Task", 'MeasurementType'>
    readonly frequency: FieldRef<"Task", 'Frequency'>
    readonly target: FieldRef<"Task", 'Int'>
    readonly unit: FieldRef<"Task", 'String'>
    readonly timesPerWeek: FieldRef<"Task", 'Int'>
    readonly lastUpdated: FieldRef<"Task", 'DateTime'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.completionRecords
   */
  export type Task$completionRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    where?: TaskCompletionWhereInput
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    cursor?: TaskCompletionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model TaskCompletion
   */

  export type AggregateTaskCompletion = {
    _count: TaskCompletionCountAggregateOutputType | null
    _avg: TaskCompletionAvgAggregateOutputType | null
    _sum: TaskCompletionSumAggregateOutputType | null
    _min: TaskCompletionMinAggregateOutputType | null
    _max: TaskCompletionMaxAggregateOutputType | null
  }

  export type TaskCompletionAvgAggregateOutputType = {
    value: Decimal | null
  }

  export type TaskCompletionSumAggregateOutputType = {
    value: Decimal | null
  }

  export type TaskCompletionMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    date: Date | null
    value: Decimal | null
    completed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCompletionMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    date: Date | null
    value: Decimal | null
    completed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCompletionCountAggregateOutputType = {
    id: number
    taskId: number
    date: number
    value: number
    completed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskCompletionAvgAggregateInputType = {
    value?: true
  }

  export type TaskCompletionSumAggregateInputType = {
    value?: true
  }

  export type TaskCompletionMinAggregateInputType = {
    id?: true
    taskId?: true
    date?: true
    value?: true
    completed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCompletionMaxAggregateInputType = {
    id?: true
    taskId?: true
    date?: true
    value?: true
    completed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCompletionCountAggregateInputType = {
    id?: true
    taskId?: true
    date?: true
    value?: true
    completed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskCompletionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskCompletion to aggregate.
     */
    where?: TaskCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCompletions to fetch.
     */
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskCompletions
    **/
    _count?: true | TaskCompletionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskCompletionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskCompletionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskCompletionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskCompletionMaxAggregateInputType
  }

  export type GetTaskCompletionAggregateType<T extends TaskCompletionAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskCompletion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskCompletion[P]>
      : GetScalarType<T[P], AggregateTaskCompletion[P]>
  }




  export type TaskCompletionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCompletionWhereInput
    orderBy?: TaskCompletionOrderByWithAggregationInput | TaskCompletionOrderByWithAggregationInput[]
    by: TaskCompletionScalarFieldEnum[] | TaskCompletionScalarFieldEnum
    having?: TaskCompletionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCompletionCountAggregateInputType | true
    _avg?: TaskCompletionAvgAggregateInputType
    _sum?: TaskCompletionSumAggregateInputType
    _min?: TaskCompletionMinAggregateInputType
    _max?: TaskCompletionMaxAggregateInputType
  }

  export type TaskCompletionGroupByOutputType = {
    id: string
    taskId: string
    date: Date
    value: Decimal
    completed: boolean
    createdAt: Date
    updatedAt: Date
    _count: TaskCompletionCountAggregateOutputType | null
    _avg: TaskCompletionAvgAggregateOutputType | null
    _sum: TaskCompletionSumAggregateOutputType | null
    _min: TaskCompletionMinAggregateOutputType | null
    _max: TaskCompletionMaxAggregateOutputType | null
  }

  type GetTaskCompletionGroupByPayload<T extends TaskCompletionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskCompletionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskCompletionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskCompletionGroupByOutputType[P]>
            : GetScalarType<T[P], TaskCompletionGroupByOutputType[P]>
        }
      >
    >


  export type TaskCompletionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    date?: boolean
    value?: boolean
    completed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskCompletion"]>

  export type TaskCompletionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    date?: boolean
    value?: boolean
    completed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskCompletion"]>

  export type TaskCompletionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    date?: boolean
    value?: boolean
    completed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskCompletion"]>

  export type TaskCompletionSelectScalar = {
    id?: boolean
    taskId?: boolean
    date?: boolean
    value?: boolean
    completed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskCompletionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "date" | "value" | "completed" | "createdAt" | "updatedAt", ExtArgs["result"]["taskCompletion"]>
  export type TaskCompletionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type TaskCompletionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type TaskCompletionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $TaskCompletionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskCompletion"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      date: Date
      value: Prisma.Decimal
      completed: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["taskCompletion"]>
    composites: {}
  }

  type TaskCompletionGetPayload<S extends boolean | null | undefined | TaskCompletionDefaultArgs> = $Result.GetResult<Prisma.$TaskCompletionPayload, S>

  type TaskCompletionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskCompletionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCompletionCountAggregateInputType | true
    }

  export interface TaskCompletionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskCompletion'], meta: { name: 'TaskCompletion' } }
    /**
     * Find zero or one TaskCompletion that matches the filter.
     * @param {TaskCompletionFindUniqueArgs} args - Arguments to find a TaskCompletion
     * @example
     * // Get one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskCompletionFindUniqueArgs>(args: SelectSubset<T, TaskCompletionFindUniqueArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskCompletion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskCompletionFindUniqueOrThrowArgs} args - Arguments to find a TaskCompletion
     * @example
     * // Get one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskCompletionFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskCompletionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskCompletion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionFindFirstArgs} args - Arguments to find a TaskCompletion
     * @example
     * // Get one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskCompletionFindFirstArgs>(args?: SelectSubset<T, TaskCompletionFindFirstArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskCompletion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionFindFirstOrThrowArgs} args - Arguments to find a TaskCompletion
     * @example
     * // Get one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskCompletionFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskCompletionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskCompletions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskCompletions
     * const taskCompletions = await prisma.taskCompletion.findMany()
     * 
     * // Get first 10 TaskCompletions
     * const taskCompletions = await prisma.taskCompletion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskCompletionWithIdOnly = await prisma.taskCompletion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskCompletionFindManyArgs>(args?: SelectSubset<T, TaskCompletionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskCompletion.
     * @param {TaskCompletionCreateArgs} args - Arguments to create a TaskCompletion.
     * @example
     * // Create one TaskCompletion
     * const TaskCompletion = await prisma.taskCompletion.create({
     *   data: {
     *     // ... data to create a TaskCompletion
     *   }
     * })
     * 
     */
    create<T extends TaskCompletionCreateArgs>(args: SelectSubset<T, TaskCompletionCreateArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskCompletions.
     * @param {TaskCompletionCreateManyArgs} args - Arguments to create many TaskCompletions.
     * @example
     * // Create many TaskCompletions
     * const taskCompletion = await prisma.taskCompletion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCompletionCreateManyArgs>(args?: SelectSubset<T, TaskCompletionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskCompletions and returns the data saved in the database.
     * @param {TaskCompletionCreateManyAndReturnArgs} args - Arguments to create many TaskCompletions.
     * @example
     * // Create many TaskCompletions
     * const taskCompletion = await prisma.taskCompletion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskCompletions and only return the `id`
     * const taskCompletionWithIdOnly = await prisma.taskCompletion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCompletionCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCompletionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskCompletion.
     * @param {TaskCompletionDeleteArgs} args - Arguments to delete one TaskCompletion.
     * @example
     * // Delete one TaskCompletion
     * const TaskCompletion = await prisma.taskCompletion.delete({
     *   where: {
     *     // ... filter to delete one TaskCompletion
     *   }
     * })
     * 
     */
    delete<T extends TaskCompletionDeleteArgs>(args: SelectSubset<T, TaskCompletionDeleteArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskCompletion.
     * @param {TaskCompletionUpdateArgs} args - Arguments to update one TaskCompletion.
     * @example
     * // Update one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskCompletionUpdateArgs>(args: SelectSubset<T, TaskCompletionUpdateArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskCompletions.
     * @param {TaskCompletionDeleteManyArgs} args - Arguments to filter TaskCompletions to delete.
     * @example
     * // Delete a few TaskCompletions
     * const { count } = await prisma.taskCompletion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskCompletionDeleteManyArgs>(args?: SelectSubset<T, TaskCompletionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskCompletions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskCompletions
     * const taskCompletion = await prisma.taskCompletion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskCompletionUpdateManyArgs>(args: SelectSubset<T, TaskCompletionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskCompletions and returns the data updated in the database.
     * @param {TaskCompletionUpdateManyAndReturnArgs} args - Arguments to update many TaskCompletions.
     * @example
     * // Update many TaskCompletions
     * const taskCompletion = await prisma.taskCompletion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskCompletions and only return the `id`
     * const taskCompletionWithIdOnly = await prisma.taskCompletion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskCompletionUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskCompletionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskCompletion.
     * @param {TaskCompletionUpsertArgs} args - Arguments to update or create a TaskCompletion.
     * @example
     * // Update or create a TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.upsert({
     *   create: {
     *     // ... data to create a TaskCompletion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskCompletion we want to update
     *   }
     * })
     */
    upsert<T extends TaskCompletionUpsertArgs>(args: SelectSubset<T, TaskCompletionUpsertArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskCompletions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionCountArgs} args - Arguments to filter TaskCompletions to count.
     * @example
     * // Count the number of TaskCompletions
     * const count = await prisma.taskCompletion.count({
     *   where: {
     *     // ... the filter for the TaskCompletions we want to count
     *   }
     * })
    **/
    count<T extends TaskCompletionCountArgs>(
      args?: Subset<T, TaskCompletionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCompletionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskCompletion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskCompletionAggregateArgs>(args: Subset<T, TaskCompletionAggregateArgs>): Prisma.PrismaPromise<GetTaskCompletionAggregateType<T>>

    /**
     * Group by TaskCompletion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskCompletionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskCompletionGroupByArgs['orderBy'] }
        : { orderBy?: TaskCompletionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskCompletionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskCompletionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskCompletion model
   */
  readonly fields: TaskCompletionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskCompletion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskCompletionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskCompletion model
   */
  interface TaskCompletionFieldRefs {
    readonly id: FieldRef<"TaskCompletion", 'String'>
    readonly taskId: FieldRef<"TaskCompletion", 'String'>
    readonly date: FieldRef<"TaskCompletion", 'DateTime'>
    readonly value: FieldRef<"TaskCompletion", 'Decimal'>
    readonly completed: FieldRef<"TaskCompletion", 'Boolean'>
    readonly createdAt: FieldRef<"TaskCompletion", 'DateTime'>
    readonly updatedAt: FieldRef<"TaskCompletion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskCompletion findUnique
   */
  export type TaskCompletionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletion to fetch.
     */
    where: TaskCompletionWhereUniqueInput
  }

  /**
   * TaskCompletion findUniqueOrThrow
   */
  export type TaskCompletionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletion to fetch.
     */
    where: TaskCompletionWhereUniqueInput
  }

  /**
   * TaskCompletion findFirst
   */
  export type TaskCompletionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletion to fetch.
     */
    where?: TaskCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCompletions to fetch.
     */
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskCompletions.
     */
    cursor?: TaskCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskCompletions.
     */
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * TaskCompletion findFirstOrThrow
   */
  export type TaskCompletionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletion to fetch.
     */
    where?: TaskCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCompletions to fetch.
     */
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskCompletions.
     */
    cursor?: TaskCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskCompletions.
     */
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * TaskCompletion findMany
   */
  export type TaskCompletionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletions to fetch.
     */
    where?: TaskCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCompletions to fetch.
     */
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskCompletions.
     */
    cursor?: TaskCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCompletions.
     */
    skip?: number
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * TaskCompletion create
   */
  export type TaskCompletionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskCompletion.
     */
    data: XOR<TaskCompletionCreateInput, TaskCompletionUncheckedCreateInput>
  }

  /**
   * TaskCompletion createMany
   */
  export type TaskCompletionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskCompletions.
     */
    data: TaskCompletionCreateManyInput | TaskCompletionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskCompletion createManyAndReturn
   */
  export type TaskCompletionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * The data used to create many TaskCompletions.
     */
    data: TaskCompletionCreateManyInput | TaskCompletionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskCompletion update
   */
  export type TaskCompletionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskCompletion.
     */
    data: XOR<TaskCompletionUpdateInput, TaskCompletionUncheckedUpdateInput>
    /**
     * Choose, which TaskCompletion to update.
     */
    where: TaskCompletionWhereUniqueInput
  }

  /**
   * TaskCompletion updateMany
   */
  export type TaskCompletionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskCompletions.
     */
    data: XOR<TaskCompletionUpdateManyMutationInput, TaskCompletionUncheckedUpdateManyInput>
    /**
     * Filter which TaskCompletions to update
     */
    where?: TaskCompletionWhereInput
    /**
     * Limit how many TaskCompletions to update.
     */
    limit?: number
  }

  /**
   * TaskCompletion updateManyAndReturn
   */
  export type TaskCompletionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * The data used to update TaskCompletions.
     */
    data: XOR<TaskCompletionUpdateManyMutationInput, TaskCompletionUncheckedUpdateManyInput>
    /**
     * Filter which TaskCompletions to update
     */
    where?: TaskCompletionWhereInput
    /**
     * Limit how many TaskCompletions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskCompletion upsert
   */
  export type TaskCompletionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskCompletion to update in case it exists.
     */
    where: TaskCompletionWhereUniqueInput
    /**
     * In case the TaskCompletion found by the `where` argument doesn't exist, create a new TaskCompletion with this data.
     */
    create: XOR<TaskCompletionCreateInput, TaskCompletionUncheckedCreateInput>
    /**
     * In case the TaskCompletion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskCompletionUpdateInput, TaskCompletionUncheckedUpdateInput>
  }

  /**
   * TaskCompletion delete
   */
  export type TaskCompletionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter which TaskCompletion to delete.
     */
    where: TaskCompletionWhereUniqueInput
  }

  /**
   * TaskCompletion deleteMany
   */
  export type TaskCompletionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskCompletions to delete
     */
    where?: TaskCompletionWhereInput
    /**
     * Limit how many TaskCompletions to delete.
     */
    limit?: number
  }

  /**
   * TaskCompletion without action
   */
  export type TaskCompletionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    auth0Id: 'auth0Id',
    password: 'password',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GoalScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    area: 'area',
    unit: 'unit',
    startDate: 'startDate',
    endDate: 'endDate',
    target: 'target',
    progress: 'progress',
    status: 'status',
    remarks: 'remarks',
    yearlyMeasure: 'yearlyMeasure',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GoalScalarFieldEnum = (typeof GoalScalarFieldEnum)[keyof typeof GoalScalarFieldEnum]


  export const WeightGoalScalarFieldEnum: {
    id: 'id',
    goalId: 'goalId',
    startWeight: 'startWeight',
    currentWeight: 'currentWeight',
    targetWeight: 'targetWeight',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WeightGoalScalarFieldEnum = (typeof WeightGoalScalarFieldEnum)[keyof typeof WeightGoalScalarFieldEnum]


  export const CountGoalScalarFieldEnum: {
    id: 'id',
    goalId: 'goalId',
    targetCount: 'targetCount',
    currentCount: 'currentCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CountGoalScalarFieldEnum = (typeof CountGoalScalarFieldEnum)[keyof typeof CountGoalScalarFieldEnum]


  export const TimeGoalScalarFieldEnum: {
    id: 'id',
    goalId: 'goalId',
    targetHours: 'targetHours',
    targetMinutes: 'targetMinutes',
    currentHours: 'currentHours',
    currentMinutes: 'currentMinutes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TimeGoalScalarFieldEnum = (typeof TimeGoalScalarFieldEnum)[keyof typeof TimeGoalScalarFieldEnum]


  export const MonthlyGoalScalarFieldEnum: {
    id: 'id',
    goalId: 'goalId',
    title: 'title',
    month: 'month',
    monthDate: 'monthDate',
    target: 'target',
    unit: 'unit',
    currentProgress: 'currentProgress',
    status: 'status',
    remarks: 'remarks',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MonthlyGoalScalarFieldEnum = (typeof MonthlyGoalScalarFieldEnum)[keyof typeof MonthlyGoalScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    goalId: 'goalId',
    title: 'title',
    type: 'type',
    frequency: 'frequency',
    target: 'target',
    unit: 'unit',
    timesPerWeek: 'timesPerWeek',
    lastUpdated: 'lastUpdated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const TaskCompletionScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    date: 'date',
    value: 'value',
    completed: 'completed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskCompletionScalarFieldEnum = (typeof TaskCompletionScalarFieldEnum)[keyof typeof TaskCompletionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'GoalStatus'
   */
  export type EnumGoalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GoalStatus'>
    


  /**
   * Reference to a field of type 'GoalStatus[]'
   */
  export type ListEnumGoalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GoalStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'MeasurementType'
   */
  export type EnumMeasurementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MeasurementType'>
    


  /**
   * Reference to a field of type 'MeasurementType[]'
   */
  export type ListEnumMeasurementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MeasurementType[]'>
    


  /**
   * Reference to a field of type 'Frequency'
   */
  export type EnumFrequencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Frequency'>
    


  /**
   * Reference to a field of type 'Frequency[]'
   */
  export type ListEnumFrequencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Frequency[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    auth0Id?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    goals?: GoalListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    auth0Id?: SortOrder
    password?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goals?: GoalOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    auth0Id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    goals?: GoalListRelationFilter
  }, "id" | "email" | "auth0Id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    auth0Id?: SortOrder
    password?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    auth0Id?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type GoalWhereInput = {
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    id?: StringFilter<"Goal"> | string
    userId?: StringFilter<"Goal"> | string
    title?: StringFilter<"Goal"> | string
    area?: StringFilter<"Goal"> | string
    unit?: StringFilter<"Goal"> | string
    startDate?: DateTimeFilter<"Goal"> | Date | string
    endDate?: DateTimeFilter<"Goal"> | Date | string
    target?: IntFilter<"Goal"> | number
    progress?: IntFilter<"Goal"> | number
    status?: EnumGoalStatusFilter<"Goal"> | $Enums.GoalStatus
    remarks?: StringNullableFilter<"Goal"> | string | null
    yearlyMeasure?: StringNullableFilter<"Goal"> | string | null
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    monthlyGoals?: MonthlyGoalListRelationFilter
    tasks?: TaskListRelationFilter
    weightGoal?: XOR<WeightGoalNullableScalarRelationFilter, WeightGoalWhereInput> | null
    countGoal?: XOR<CountGoalNullableScalarRelationFilter, CountGoalWhereInput> | null
    timeGoal?: XOR<TimeGoalNullableScalarRelationFilter, TimeGoalWhereInput> | null
  }

  export type GoalOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    area?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    target?: SortOrder
    progress?: SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    yearlyMeasure?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    monthlyGoals?: MonthlyGoalOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    weightGoal?: WeightGoalOrderByWithRelationInput
    countGoal?: CountGoalOrderByWithRelationInput
    timeGoal?: TimeGoalOrderByWithRelationInput
  }

  export type GoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    userId?: StringFilter<"Goal"> | string
    title?: StringFilter<"Goal"> | string
    area?: StringFilter<"Goal"> | string
    unit?: StringFilter<"Goal"> | string
    startDate?: DateTimeFilter<"Goal"> | Date | string
    endDate?: DateTimeFilter<"Goal"> | Date | string
    target?: IntFilter<"Goal"> | number
    progress?: IntFilter<"Goal"> | number
    status?: EnumGoalStatusFilter<"Goal"> | $Enums.GoalStatus
    remarks?: StringNullableFilter<"Goal"> | string | null
    yearlyMeasure?: StringNullableFilter<"Goal"> | string | null
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    monthlyGoals?: MonthlyGoalListRelationFilter
    tasks?: TaskListRelationFilter
    weightGoal?: XOR<WeightGoalNullableScalarRelationFilter, WeightGoalWhereInput> | null
    countGoal?: XOR<CountGoalNullableScalarRelationFilter, CountGoalWhereInput> | null
    timeGoal?: XOR<TimeGoalNullableScalarRelationFilter, TimeGoalWhereInput> | null
  }, "id">

  export type GoalOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    area?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    target?: SortOrder
    progress?: SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    yearlyMeasure?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GoalCountOrderByAggregateInput
    _avg?: GoalAvgOrderByAggregateInput
    _max?: GoalMaxOrderByAggregateInput
    _min?: GoalMinOrderByAggregateInput
    _sum?: GoalSumOrderByAggregateInput
  }

  export type GoalScalarWhereWithAggregatesInput = {
    AND?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    OR?: GoalScalarWhereWithAggregatesInput[]
    NOT?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Goal"> | string
    userId?: StringWithAggregatesFilter<"Goal"> | string
    title?: StringWithAggregatesFilter<"Goal"> | string
    area?: StringWithAggregatesFilter<"Goal"> | string
    unit?: StringWithAggregatesFilter<"Goal"> | string
    startDate?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    target?: IntWithAggregatesFilter<"Goal"> | number
    progress?: IntWithAggregatesFilter<"Goal"> | number
    status?: EnumGoalStatusWithAggregatesFilter<"Goal"> | $Enums.GoalStatus
    remarks?: StringNullableWithAggregatesFilter<"Goal"> | string | null
    yearlyMeasure?: StringNullableWithAggregatesFilter<"Goal"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
  }

  export type WeightGoalWhereInput = {
    AND?: WeightGoalWhereInput | WeightGoalWhereInput[]
    OR?: WeightGoalWhereInput[]
    NOT?: WeightGoalWhereInput | WeightGoalWhereInput[]
    id?: StringFilter<"WeightGoal"> | string
    goalId?: StringFilter<"WeightGoal"> | string
    startWeight?: FloatFilter<"WeightGoal"> | number
    currentWeight?: FloatFilter<"WeightGoal"> | number
    targetWeight?: FloatFilter<"WeightGoal"> | number
    createdAt?: DateTimeFilter<"WeightGoal"> | Date | string
    updatedAt?: DateTimeFilter<"WeightGoal"> | Date | string
    goal?: XOR<GoalScalarRelationFilter, GoalWhereInput>
  }

  export type WeightGoalOrderByWithRelationInput = {
    id?: SortOrder
    goalId?: SortOrder
    startWeight?: SortOrder
    currentWeight?: SortOrder
    targetWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goal?: GoalOrderByWithRelationInput
  }

  export type WeightGoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    goalId?: string
    AND?: WeightGoalWhereInput | WeightGoalWhereInput[]
    OR?: WeightGoalWhereInput[]
    NOT?: WeightGoalWhereInput | WeightGoalWhereInput[]
    startWeight?: FloatFilter<"WeightGoal"> | number
    currentWeight?: FloatFilter<"WeightGoal"> | number
    targetWeight?: FloatFilter<"WeightGoal"> | number
    createdAt?: DateTimeFilter<"WeightGoal"> | Date | string
    updatedAt?: DateTimeFilter<"WeightGoal"> | Date | string
    goal?: XOR<GoalScalarRelationFilter, GoalWhereInput>
  }, "id" | "goalId">

  export type WeightGoalOrderByWithAggregationInput = {
    id?: SortOrder
    goalId?: SortOrder
    startWeight?: SortOrder
    currentWeight?: SortOrder
    targetWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WeightGoalCountOrderByAggregateInput
    _avg?: WeightGoalAvgOrderByAggregateInput
    _max?: WeightGoalMaxOrderByAggregateInput
    _min?: WeightGoalMinOrderByAggregateInput
    _sum?: WeightGoalSumOrderByAggregateInput
  }

  export type WeightGoalScalarWhereWithAggregatesInput = {
    AND?: WeightGoalScalarWhereWithAggregatesInput | WeightGoalScalarWhereWithAggregatesInput[]
    OR?: WeightGoalScalarWhereWithAggregatesInput[]
    NOT?: WeightGoalScalarWhereWithAggregatesInput | WeightGoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeightGoal"> | string
    goalId?: StringWithAggregatesFilter<"WeightGoal"> | string
    startWeight?: FloatWithAggregatesFilter<"WeightGoal"> | number
    currentWeight?: FloatWithAggregatesFilter<"WeightGoal"> | number
    targetWeight?: FloatWithAggregatesFilter<"WeightGoal"> | number
    createdAt?: DateTimeWithAggregatesFilter<"WeightGoal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WeightGoal"> | Date | string
  }

  export type CountGoalWhereInput = {
    AND?: CountGoalWhereInput | CountGoalWhereInput[]
    OR?: CountGoalWhereInput[]
    NOT?: CountGoalWhereInput | CountGoalWhereInput[]
    id?: StringFilter<"CountGoal"> | string
    goalId?: StringFilter<"CountGoal"> | string
    targetCount?: IntFilter<"CountGoal"> | number
    currentCount?: IntFilter<"CountGoal"> | number
    createdAt?: DateTimeFilter<"CountGoal"> | Date | string
    updatedAt?: DateTimeFilter<"CountGoal"> | Date | string
    goal?: XOR<GoalScalarRelationFilter, GoalWhereInput>
  }

  export type CountGoalOrderByWithRelationInput = {
    id?: SortOrder
    goalId?: SortOrder
    targetCount?: SortOrder
    currentCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goal?: GoalOrderByWithRelationInput
  }

  export type CountGoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    goalId?: string
    AND?: CountGoalWhereInput | CountGoalWhereInput[]
    OR?: CountGoalWhereInput[]
    NOT?: CountGoalWhereInput | CountGoalWhereInput[]
    targetCount?: IntFilter<"CountGoal"> | number
    currentCount?: IntFilter<"CountGoal"> | number
    createdAt?: DateTimeFilter<"CountGoal"> | Date | string
    updatedAt?: DateTimeFilter<"CountGoal"> | Date | string
    goal?: XOR<GoalScalarRelationFilter, GoalWhereInput>
  }, "id" | "goalId">

  export type CountGoalOrderByWithAggregationInput = {
    id?: SortOrder
    goalId?: SortOrder
    targetCount?: SortOrder
    currentCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CountGoalCountOrderByAggregateInput
    _avg?: CountGoalAvgOrderByAggregateInput
    _max?: CountGoalMaxOrderByAggregateInput
    _min?: CountGoalMinOrderByAggregateInput
    _sum?: CountGoalSumOrderByAggregateInput
  }

  export type CountGoalScalarWhereWithAggregatesInput = {
    AND?: CountGoalScalarWhereWithAggregatesInput | CountGoalScalarWhereWithAggregatesInput[]
    OR?: CountGoalScalarWhereWithAggregatesInput[]
    NOT?: CountGoalScalarWhereWithAggregatesInput | CountGoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CountGoal"> | string
    goalId?: StringWithAggregatesFilter<"CountGoal"> | string
    targetCount?: IntWithAggregatesFilter<"CountGoal"> | number
    currentCount?: IntWithAggregatesFilter<"CountGoal"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CountGoal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CountGoal"> | Date | string
  }

  export type TimeGoalWhereInput = {
    AND?: TimeGoalWhereInput | TimeGoalWhereInput[]
    OR?: TimeGoalWhereInput[]
    NOT?: TimeGoalWhereInput | TimeGoalWhereInput[]
    id?: StringFilter<"TimeGoal"> | string
    goalId?: StringFilter<"TimeGoal"> | string
    targetHours?: IntFilter<"TimeGoal"> | number
    targetMinutes?: IntFilter<"TimeGoal"> | number
    currentHours?: IntFilter<"TimeGoal"> | number
    currentMinutes?: IntFilter<"TimeGoal"> | number
    createdAt?: DateTimeFilter<"TimeGoal"> | Date | string
    updatedAt?: DateTimeFilter<"TimeGoal"> | Date | string
    goal?: XOR<GoalScalarRelationFilter, GoalWhereInput>
  }

  export type TimeGoalOrderByWithRelationInput = {
    id?: SortOrder
    goalId?: SortOrder
    targetHours?: SortOrder
    targetMinutes?: SortOrder
    currentHours?: SortOrder
    currentMinutes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goal?: GoalOrderByWithRelationInput
  }

  export type TimeGoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    goalId?: string
    AND?: TimeGoalWhereInput | TimeGoalWhereInput[]
    OR?: TimeGoalWhereInput[]
    NOT?: TimeGoalWhereInput | TimeGoalWhereInput[]
    targetHours?: IntFilter<"TimeGoal"> | number
    targetMinutes?: IntFilter<"TimeGoal"> | number
    currentHours?: IntFilter<"TimeGoal"> | number
    currentMinutes?: IntFilter<"TimeGoal"> | number
    createdAt?: DateTimeFilter<"TimeGoal"> | Date | string
    updatedAt?: DateTimeFilter<"TimeGoal"> | Date | string
    goal?: XOR<GoalScalarRelationFilter, GoalWhereInput>
  }, "id" | "goalId">

  export type TimeGoalOrderByWithAggregationInput = {
    id?: SortOrder
    goalId?: SortOrder
    targetHours?: SortOrder
    targetMinutes?: SortOrder
    currentHours?: SortOrder
    currentMinutes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TimeGoalCountOrderByAggregateInput
    _avg?: TimeGoalAvgOrderByAggregateInput
    _max?: TimeGoalMaxOrderByAggregateInput
    _min?: TimeGoalMinOrderByAggregateInput
    _sum?: TimeGoalSumOrderByAggregateInput
  }

  export type TimeGoalScalarWhereWithAggregatesInput = {
    AND?: TimeGoalScalarWhereWithAggregatesInput | TimeGoalScalarWhereWithAggregatesInput[]
    OR?: TimeGoalScalarWhereWithAggregatesInput[]
    NOT?: TimeGoalScalarWhereWithAggregatesInput | TimeGoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimeGoal"> | string
    goalId?: StringWithAggregatesFilter<"TimeGoal"> | string
    targetHours?: IntWithAggregatesFilter<"TimeGoal"> | number
    targetMinutes?: IntWithAggregatesFilter<"TimeGoal"> | number
    currentHours?: IntWithAggregatesFilter<"TimeGoal"> | number
    currentMinutes?: IntWithAggregatesFilter<"TimeGoal"> | number
    createdAt?: DateTimeWithAggregatesFilter<"TimeGoal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TimeGoal"> | Date | string
  }

  export type MonthlyGoalWhereInput = {
    AND?: MonthlyGoalWhereInput | MonthlyGoalWhereInput[]
    OR?: MonthlyGoalWhereInput[]
    NOT?: MonthlyGoalWhereInput | MonthlyGoalWhereInput[]
    id?: StringFilter<"MonthlyGoal"> | string
    goalId?: StringFilter<"MonthlyGoal"> | string
    title?: StringFilter<"MonthlyGoal"> | string
    month?: StringFilter<"MonthlyGoal"> | string
    monthDate?: DateTimeFilter<"MonthlyGoal"> | Date | string
    target?: DecimalFilter<"MonthlyGoal"> | Decimal | DecimalJsLike | number | string
    unit?: StringFilter<"MonthlyGoal"> | string
    currentProgress?: DecimalFilter<"MonthlyGoal"> | Decimal | DecimalJsLike | number | string
    status?: EnumGoalStatusFilter<"MonthlyGoal"> | $Enums.GoalStatus
    remarks?: StringNullableFilter<"MonthlyGoal"> | string | null
    createdAt?: DateTimeFilter<"MonthlyGoal"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyGoal"> | Date | string
    goal?: XOR<GoalScalarRelationFilter, GoalWhereInput>
  }

  export type MonthlyGoalOrderByWithRelationInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    month?: SortOrder
    monthDate?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    currentProgress?: SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goal?: GoalOrderByWithRelationInput
  }

  export type MonthlyGoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MonthlyGoalWhereInput | MonthlyGoalWhereInput[]
    OR?: MonthlyGoalWhereInput[]
    NOT?: MonthlyGoalWhereInput | MonthlyGoalWhereInput[]
    goalId?: StringFilter<"MonthlyGoal"> | string
    title?: StringFilter<"MonthlyGoal"> | string
    month?: StringFilter<"MonthlyGoal"> | string
    monthDate?: DateTimeFilter<"MonthlyGoal"> | Date | string
    target?: DecimalFilter<"MonthlyGoal"> | Decimal | DecimalJsLike | number | string
    unit?: StringFilter<"MonthlyGoal"> | string
    currentProgress?: DecimalFilter<"MonthlyGoal"> | Decimal | DecimalJsLike | number | string
    status?: EnumGoalStatusFilter<"MonthlyGoal"> | $Enums.GoalStatus
    remarks?: StringNullableFilter<"MonthlyGoal"> | string | null
    createdAt?: DateTimeFilter<"MonthlyGoal"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyGoal"> | Date | string
    goal?: XOR<GoalScalarRelationFilter, GoalWhereInput>
  }, "id">

  export type MonthlyGoalOrderByWithAggregationInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    month?: SortOrder
    monthDate?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    currentProgress?: SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MonthlyGoalCountOrderByAggregateInput
    _avg?: MonthlyGoalAvgOrderByAggregateInput
    _max?: MonthlyGoalMaxOrderByAggregateInput
    _min?: MonthlyGoalMinOrderByAggregateInput
    _sum?: MonthlyGoalSumOrderByAggregateInput
  }

  export type MonthlyGoalScalarWhereWithAggregatesInput = {
    AND?: MonthlyGoalScalarWhereWithAggregatesInput | MonthlyGoalScalarWhereWithAggregatesInput[]
    OR?: MonthlyGoalScalarWhereWithAggregatesInput[]
    NOT?: MonthlyGoalScalarWhereWithAggregatesInput | MonthlyGoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MonthlyGoal"> | string
    goalId?: StringWithAggregatesFilter<"MonthlyGoal"> | string
    title?: StringWithAggregatesFilter<"MonthlyGoal"> | string
    month?: StringWithAggregatesFilter<"MonthlyGoal"> | string
    monthDate?: DateTimeWithAggregatesFilter<"MonthlyGoal"> | Date | string
    target?: DecimalWithAggregatesFilter<"MonthlyGoal"> | Decimal | DecimalJsLike | number | string
    unit?: StringWithAggregatesFilter<"MonthlyGoal"> | string
    currentProgress?: DecimalWithAggregatesFilter<"MonthlyGoal"> | Decimal | DecimalJsLike | number | string
    status?: EnumGoalStatusWithAggregatesFilter<"MonthlyGoal"> | $Enums.GoalStatus
    remarks?: StringNullableWithAggregatesFilter<"MonthlyGoal"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MonthlyGoal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MonthlyGoal"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    goalId?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    type?: EnumMeasurementTypeFilter<"Task"> | $Enums.MeasurementType
    frequency?: EnumFrequencyFilter<"Task"> | $Enums.Frequency
    target?: IntFilter<"Task"> | number
    unit?: StringFilter<"Task"> | string
    timesPerWeek?: IntNullableFilter<"Task"> | number | null
    lastUpdated?: DateTimeFilter<"Task"> | Date | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    goal?: XOR<GoalScalarRelationFilter, GoalWhereInput>
    completionRecords?: TaskCompletionListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    frequency?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    timesPerWeek?: SortOrderInput | SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goal?: GoalOrderByWithRelationInput
    completionRecords?: TaskCompletionOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    goalId?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    type?: EnumMeasurementTypeFilter<"Task"> | $Enums.MeasurementType
    frequency?: EnumFrequencyFilter<"Task"> | $Enums.Frequency
    target?: IntFilter<"Task"> | number
    unit?: StringFilter<"Task"> | string
    timesPerWeek?: IntNullableFilter<"Task"> | number | null
    lastUpdated?: DateTimeFilter<"Task"> | Date | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    goal?: XOR<GoalScalarRelationFilter, GoalWhereInput>
    completionRecords?: TaskCompletionListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    frequency?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    timesPerWeek?: SortOrderInput | SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    goalId?: StringWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    type?: EnumMeasurementTypeWithAggregatesFilter<"Task"> | $Enums.MeasurementType
    frequency?: EnumFrequencyWithAggregatesFilter<"Task"> | $Enums.Frequency
    target?: IntWithAggregatesFilter<"Task"> | number
    unit?: StringWithAggregatesFilter<"Task"> | string
    timesPerWeek?: IntNullableWithAggregatesFilter<"Task"> | number | null
    lastUpdated?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type TaskCompletionWhereInput = {
    AND?: TaskCompletionWhereInput | TaskCompletionWhereInput[]
    OR?: TaskCompletionWhereInput[]
    NOT?: TaskCompletionWhereInput | TaskCompletionWhereInput[]
    id?: StringFilter<"TaskCompletion"> | string
    taskId?: StringFilter<"TaskCompletion"> | string
    date?: DateTimeFilter<"TaskCompletion"> | Date | string
    value?: DecimalFilter<"TaskCompletion"> | Decimal | DecimalJsLike | number | string
    completed?: BoolFilter<"TaskCompletion"> | boolean
    createdAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    updatedAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type TaskCompletionOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    date?: SortOrder
    value?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    task?: TaskOrderByWithRelationInput
  }

  export type TaskCompletionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    taskId_date?: TaskCompletionTaskIdDateCompoundUniqueInput
    AND?: TaskCompletionWhereInput | TaskCompletionWhereInput[]
    OR?: TaskCompletionWhereInput[]
    NOT?: TaskCompletionWhereInput | TaskCompletionWhereInput[]
    taskId?: StringFilter<"TaskCompletion"> | string
    date?: DateTimeFilter<"TaskCompletion"> | Date | string
    value?: DecimalFilter<"TaskCompletion"> | Decimal | DecimalJsLike | number | string
    completed?: BoolFilter<"TaskCompletion"> | boolean
    createdAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    updatedAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id" | "taskId_date">

  export type TaskCompletionOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    date?: SortOrder
    value?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCompletionCountOrderByAggregateInput
    _avg?: TaskCompletionAvgOrderByAggregateInput
    _max?: TaskCompletionMaxOrderByAggregateInput
    _min?: TaskCompletionMinOrderByAggregateInput
    _sum?: TaskCompletionSumOrderByAggregateInput
  }

  export type TaskCompletionScalarWhereWithAggregatesInput = {
    AND?: TaskCompletionScalarWhereWithAggregatesInput | TaskCompletionScalarWhereWithAggregatesInput[]
    OR?: TaskCompletionScalarWhereWithAggregatesInput[]
    NOT?: TaskCompletionScalarWhereWithAggregatesInput | TaskCompletionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskCompletion"> | string
    taskId?: StringWithAggregatesFilter<"TaskCompletion"> | string
    date?: DateTimeWithAggregatesFilter<"TaskCompletion"> | Date | string
    value?: DecimalWithAggregatesFilter<"TaskCompletion"> | Decimal | DecimalJsLike | number | string
    completed?: BoolWithAggregatesFilter<"TaskCompletion"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TaskCompletion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TaskCompletion"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    auth0Id: string
    password?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goals?: GoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    auth0Id: string
    password?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goals?: GoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    auth0Id?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goals?: GoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    auth0Id?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goals?: GoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    auth0Id: string
    password?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    auth0Id?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    auth0Id?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalCreateInput = {
    id?: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGoalsInput
    monthlyGoals?: MonthlyGoalCreateNestedManyWithoutGoalInput
    tasks?: TaskCreateNestedManyWithoutGoalInput
    weightGoal?: WeightGoalCreateNestedOneWithoutGoalInput
    countGoal?: CountGoalCreateNestedOneWithoutGoalInput
    timeGoal?: TimeGoalCreateNestedOneWithoutGoalInput
  }

  export type GoalUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    monthlyGoals?: MonthlyGoalUncheckedCreateNestedManyWithoutGoalInput
    tasks?: TaskUncheckedCreateNestedManyWithoutGoalInput
    weightGoal?: WeightGoalUncheckedCreateNestedOneWithoutGoalInput
    countGoal?: CountGoalUncheckedCreateNestedOneWithoutGoalInput
    timeGoal?: TimeGoalUncheckedCreateNestedOneWithoutGoalInput
  }

  export type GoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGoalsNestedInput
    monthlyGoals?: MonthlyGoalUpdateManyWithoutGoalNestedInput
    tasks?: TaskUpdateManyWithoutGoalNestedInput
    weightGoal?: WeightGoalUpdateOneWithoutGoalNestedInput
    countGoal?: CountGoalUpdateOneWithoutGoalNestedInput
    timeGoal?: TimeGoalUpdateOneWithoutGoalNestedInput
  }

  export type GoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyGoals?: MonthlyGoalUncheckedUpdateManyWithoutGoalNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutGoalNestedInput
    weightGoal?: WeightGoalUncheckedUpdateOneWithoutGoalNestedInput
    countGoal?: CountGoalUncheckedUpdateOneWithoutGoalNestedInput
    timeGoal?: TimeGoalUncheckedUpdateOneWithoutGoalNestedInput
  }

  export type GoalCreateManyInput = {
    id?: string
    userId: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightGoalCreateInput = {
    id?: string
    startWeight: number
    currentWeight: number
    targetWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    goal: GoalCreateNestedOneWithoutWeightGoalInput
  }

  export type WeightGoalUncheckedCreateInput = {
    id?: string
    goalId: string
    startWeight: number
    currentWeight: number
    targetWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeightGoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startWeight?: FloatFieldUpdateOperationsInput | number
    currentWeight?: FloatFieldUpdateOperationsInput | number
    targetWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goal?: GoalUpdateOneRequiredWithoutWeightGoalNestedInput
  }

  export type WeightGoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    startWeight?: FloatFieldUpdateOperationsInput | number
    currentWeight?: FloatFieldUpdateOperationsInput | number
    targetWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightGoalCreateManyInput = {
    id?: string
    goalId: string
    startWeight: number
    currentWeight: number
    targetWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeightGoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startWeight?: FloatFieldUpdateOperationsInput | number
    currentWeight?: FloatFieldUpdateOperationsInput | number
    targetWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightGoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    startWeight?: FloatFieldUpdateOperationsInput | number
    currentWeight?: FloatFieldUpdateOperationsInput | number
    targetWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountGoalCreateInput = {
    id?: string
    targetCount: number
    currentCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    goal: GoalCreateNestedOneWithoutCountGoalInput
  }

  export type CountGoalUncheckedCreateInput = {
    id?: string
    goalId: string
    targetCount: number
    currentCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountGoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetCount?: IntFieldUpdateOperationsInput | number
    currentCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goal?: GoalUpdateOneRequiredWithoutCountGoalNestedInput
  }

  export type CountGoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    targetCount?: IntFieldUpdateOperationsInput | number
    currentCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountGoalCreateManyInput = {
    id?: string
    goalId: string
    targetCount: number
    currentCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountGoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetCount?: IntFieldUpdateOperationsInput | number
    currentCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountGoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    targetCount?: IntFieldUpdateOperationsInput | number
    currentCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeGoalCreateInput = {
    id?: string
    targetHours: number
    targetMinutes?: number
    currentHours?: number
    currentMinutes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    goal: GoalCreateNestedOneWithoutTimeGoalInput
  }

  export type TimeGoalUncheckedCreateInput = {
    id?: string
    goalId: string
    targetHours: number
    targetMinutes?: number
    currentHours?: number
    currentMinutes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeGoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetHours?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    currentHours?: IntFieldUpdateOperationsInput | number
    currentMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goal?: GoalUpdateOneRequiredWithoutTimeGoalNestedInput
  }

  export type TimeGoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    targetHours?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    currentHours?: IntFieldUpdateOperationsInput | number
    currentMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeGoalCreateManyInput = {
    id?: string
    goalId: string
    targetHours: number
    targetMinutes?: number
    currentHours?: number
    currentMinutes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeGoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetHours?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    currentHours?: IntFieldUpdateOperationsInput | number
    currentMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeGoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    targetHours?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    currentHours?: IntFieldUpdateOperationsInput | number
    currentMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyGoalCreateInput = {
    id?: string
    title: string
    month: string
    monthDate: Date | string
    target: Decimal | DecimalJsLike | number | string
    unit: string
    currentProgress?: Decimal | DecimalJsLike | number | string
    status?: $Enums.GoalStatus
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    goal: GoalCreateNestedOneWithoutMonthlyGoalsInput
  }

  export type MonthlyGoalUncheckedCreateInput = {
    id?: string
    goalId: string
    title: string
    month: string
    monthDate: Date | string
    target: Decimal | DecimalJsLike | number | string
    unit: string
    currentProgress?: Decimal | DecimalJsLike | number | string
    status?: $Enums.GoalStatus
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyGoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    monthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    currentProgress?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goal?: GoalUpdateOneRequiredWithoutMonthlyGoalsNestedInput
  }

  export type MonthlyGoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    monthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    currentProgress?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyGoalCreateManyInput = {
    id?: string
    goalId: string
    title: string
    month: string
    monthDate: Date | string
    target: Decimal | DecimalJsLike | number | string
    unit: string
    currentProgress?: Decimal | DecimalJsLike | number | string
    status?: $Enums.GoalStatus
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyGoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    monthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    currentProgress?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyGoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    monthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    currentProgress?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    type: $Enums.MeasurementType
    frequency: $Enums.Frequency
    target: number
    unit: string
    timesPerWeek?: number | null
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    goal: GoalCreateNestedOneWithoutTasksInput
    completionRecords?: TaskCompletionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    goalId: string
    title: string
    type: $Enums.MeasurementType
    frequency: $Enums.Frequency
    target: number
    unit: string
    timesPerWeek?: number | null
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    completionRecords?: TaskCompletionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumMeasurementTypeFieldUpdateOperationsInput | $Enums.MeasurementType
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    target?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    timesPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goal?: GoalUpdateOneRequiredWithoutTasksNestedInput
    completionRecords?: TaskCompletionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumMeasurementTypeFieldUpdateOperationsInput | $Enums.MeasurementType
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    target?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    timesPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completionRecords?: TaskCompletionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    goalId: string
    title: string
    type: $Enums.MeasurementType
    frequency: $Enums.Frequency
    target: number
    unit: string
    timesPerWeek?: number | null
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumMeasurementTypeFieldUpdateOperationsInput | $Enums.MeasurementType
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    target?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    timesPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumMeasurementTypeFieldUpdateOperationsInput | $Enums.MeasurementType
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    target?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    timesPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCompletionCreateInput = {
    id?: string
    date: Date | string
    value: Decimal | DecimalJsLike | number | string
    completed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutCompletionRecordsInput
  }

  export type TaskCompletionUncheckedCreateInput = {
    id?: string
    taskId: string
    date: Date | string
    value: Decimal | DecimalJsLike | number | string
    completed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCompletionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutCompletionRecordsNestedInput
  }

  export type TaskCompletionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCompletionCreateManyInput = {
    id?: string
    taskId: string
    date: Date | string
    value: Decimal | DecimalJsLike | number | string
    completed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCompletionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCompletionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GoalListRelationFilter = {
    every?: GoalWhereInput
    some?: GoalWhereInput
    none?: GoalWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GoalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    auth0Id?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    auth0Id?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    auth0Id?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumGoalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GoalStatus | EnumGoalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGoalStatusFilter<$PrismaModel> | $Enums.GoalStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MonthlyGoalListRelationFilter = {
    every?: MonthlyGoalWhereInput
    some?: MonthlyGoalWhereInput
    none?: MonthlyGoalWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type WeightGoalNullableScalarRelationFilter = {
    is?: WeightGoalWhereInput | null
    isNot?: WeightGoalWhereInput | null
  }

  export type CountGoalNullableScalarRelationFilter = {
    is?: CountGoalWhereInput | null
    isNot?: CountGoalWhereInput | null
  }

  export type TimeGoalNullableScalarRelationFilter = {
    is?: TimeGoalWhereInput | null
    isNot?: TimeGoalWhereInput | null
  }

  export type MonthlyGoalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GoalCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    area?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    target?: SortOrder
    progress?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    yearlyMeasure?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalAvgOrderByAggregateInput = {
    target?: SortOrder
    progress?: SortOrder
  }

  export type GoalMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    area?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    target?: SortOrder
    progress?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    yearlyMeasure?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    area?: SortOrder
    unit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    target?: SortOrder
    progress?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    yearlyMeasure?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GoalSumOrderByAggregateInput = {
    target?: SortOrder
    progress?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumGoalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GoalStatus | EnumGoalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGoalStatusWithAggregatesFilter<$PrismaModel> | $Enums.GoalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGoalStatusFilter<$PrismaModel>
    _max?: NestedEnumGoalStatusFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type GoalScalarRelationFilter = {
    is?: GoalWhereInput
    isNot?: GoalWhereInput
  }

  export type WeightGoalCountOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    startWeight?: SortOrder
    currentWeight?: SortOrder
    targetWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeightGoalAvgOrderByAggregateInput = {
    startWeight?: SortOrder
    currentWeight?: SortOrder
    targetWeight?: SortOrder
  }

  export type WeightGoalMaxOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    startWeight?: SortOrder
    currentWeight?: SortOrder
    targetWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeightGoalMinOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    startWeight?: SortOrder
    currentWeight?: SortOrder
    targetWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeightGoalSumOrderByAggregateInput = {
    startWeight?: SortOrder
    currentWeight?: SortOrder
    targetWeight?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type CountGoalCountOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    targetCount?: SortOrder
    currentCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountGoalAvgOrderByAggregateInput = {
    targetCount?: SortOrder
    currentCount?: SortOrder
  }

  export type CountGoalMaxOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    targetCount?: SortOrder
    currentCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountGoalMinOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    targetCount?: SortOrder
    currentCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountGoalSumOrderByAggregateInput = {
    targetCount?: SortOrder
    currentCount?: SortOrder
  }

  export type TimeGoalCountOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    targetHours?: SortOrder
    targetMinutes?: SortOrder
    currentHours?: SortOrder
    currentMinutes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeGoalAvgOrderByAggregateInput = {
    targetHours?: SortOrder
    targetMinutes?: SortOrder
    currentHours?: SortOrder
    currentMinutes?: SortOrder
  }

  export type TimeGoalMaxOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    targetHours?: SortOrder
    targetMinutes?: SortOrder
    currentHours?: SortOrder
    currentMinutes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeGoalMinOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    targetHours?: SortOrder
    targetMinutes?: SortOrder
    currentHours?: SortOrder
    currentMinutes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeGoalSumOrderByAggregateInput = {
    targetHours?: SortOrder
    targetMinutes?: SortOrder
    currentHours?: SortOrder
    currentMinutes?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type MonthlyGoalCountOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    month?: SortOrder
    monthDate?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    currentProgress?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MonthlyGoalAvgOrderByAggregateInput = {
    target?: SortOrder
    currentProgress?: SortOrder
  }

  export type MonthlyGoalMaxOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    month?: SortOrder
    monthDate?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    currentProgress?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MonthlyGoalMinOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    month?: SortOrder
    monthDate?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    currentProgress?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MonthlyGoalSumOrderByAggregateInput = {
    target?: SortOrder
    currentProgress?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumMeasurementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MeasurementType | EnumMeasurementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MeasurementType[] | ListEnumMeasurementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MeasurementType[] | ListEnumMeasurementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMeasurementTypeFilter<$PrismaModel> | $Enums.MeasurementType
  }

  export type EnumFrequencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Frequency | EnumFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumFrequencyFilter<$PrismaModel> | $Enums.Frequency
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TaskCompletionListRelationFilter = {
    every?: TaskCompletionWhereInput
    some?: TaskCompletionWhereInput
    none?: TaskCompletionWhereInput
  }

  export type TaskCompletionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    frequency?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    timesPerWeek?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    target?: SortOrder
    timesPerWeek?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    frequency?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    timesPerWeek?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    goalId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    frequency?: SortOrder
    target?: SortOrder
    unit?: SortOrder
    timesPerWeek?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    target?: SortOrder
    timesPerWeek?: SortOrder
  }

  export type EnumMeasurementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MeasurementType | EnumMeasurementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MeasurementType[] | ListEnumMeasurementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MeasurementType[] | ListEnumMeasurementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMeasurementTypeWithAggregatesFilter<$PrismaModel> | $Enums.MeasurementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMeasurementTypeFilter<$PrismaModel>
    _max?: NestedEnumMeasurementTypeFilter<$PrismaModel>
  }

  export type EnumFrequencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Frequency | EnumFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumFrequencyWithAggregatesFilter<$PrismaModel> | $Enums.Frequency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFrequencyFilter<$PrismaModel>
    _max?: NestedEnumFrequencyFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type TaskCompletionTaskIdDateCompoundUniqueInput = {
    taskId: string
    date: Date | string
  }

  export type TaskCompletionCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    date?: SortOrder
    value?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskCompletionAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type TaskCompletionMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    date?: SortOrder
    value?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskCompletionMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    date?: SortOrder
    value?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskCompletionSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GoalCreateNestedManyWithoutUserInput = {
    create?: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput> | GoalCreateWithoutUserInput[] | GoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoalCreateOrConnectWithoutUserInput | GoalCreateOrConnectWithoutUserInput[]
    createMany?: GoalCreateManyUserInputEnvelope
    connect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
  }

  export type GoalUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput> | GoalCreateWithoutUserInput[] | GoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoalCreateOrConnectWithoutUserInput | GoalCreateOrConnectWithoutUserInput[]
    createMany?: GoalCreateManyUserInputEnvelope
    connect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GoalUpdateManyWithoutUserNestedInput = {
    create?: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput> | GoalCreateWithoutUserInput[] | GoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoalCreateOrConnectWithoutUserInput | GoalCreateOrConnectWithoutUserInput[]
    upsert?: GoalUpsertWithWhereUniqueWithoutUserInput | GoalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GoalCreateManyUserInputEnvelope
    set?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    disconnect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    delete?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    connect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    update?: GoalUpdateWithWhereUniqueWithoutUserInput | GoalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GoalUpdateManyWithWhereWithoutUserInput | GoalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GoalScalarWhereInput | GoalScalarWhereInput[]
  }

  export type GoalUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput> | GoalCreateWithoutUserInput[] | GoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoalCreateOrConnectWithoutUserInput | GoalCreateOrConnectWithoutUserInput[]
    upsert?: GoalUpsertWithWhereUniqueWithoutUserInput | GoalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GoalCreateManyUserInputEnvelope
    set?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    disconnect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    delete?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    connect?: GoalWhereUniqueInput | GoalWhereUniqueInput[]
    update?: GoalUpdateWithWhereUniqueWithoutUserInput | GoalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GoalUpdateManyWithWhereWithoutUserInput | GoalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GoalScalarWhereInput | GoalScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGoalsInput = {
    create?: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGoalsInput
    connect?: UserWhereUniqueInput
  }

  export type MonthlyGoalCreateNestedManyWithoutGoalInput = {
    create?: XOR<MonthlyGoalCreateWithoutGoalInput, MonthlyGoalUncheckedCreateWithoutGoalInput> | MonthlyGoalCreateWithoutGoalInput[] | MonthlyGoalUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: MonthlyGoalCreateOrConnectWithoutGoalInput | MonthlyGoalCreateOrConnectWithoutGoalInput[]
    createMany?: MonthlyGoalCreateManyGoalInputEnvelope
    connect?: MonthlyGoalWhereUniqueInput | MonthlyGoalWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutGoalInput = {
    create?: XOR<TaskCreateWithoutGoalInput, TaskUncheckedCreateWithoutGoalInput> | TaskCreateWithoutGoalInput[] | TaskUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutGoalInput | TaskCreateOrConnectWithoutGoalInput[]
    createMany?: TaskCreateManyGoalInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type WeightGoalCreateNestedOneWithoutGoalInput = {
    create?: XOR<WeightGoalCreateWithoutGoalInput, WeightGoalUncheckedCreateWithoutGoalInput>
    connectOrCreate?: WeightGoalCreateOrConnectWithoutGoalInput
    connect?: WeightGoalWhereUniqueInput
  }

  export type CountGoalCreateNestedOneWithoutGoalInput = {
    create?: XOR<CountGoalCreateWithoutGoalInput, CountGoalUncheckedCreateWithoutGoalInput>
    connectOrCreate?: CountGoalCreateOrConnectWithoutGoalInput
    connect?: CountGoalWhereUniqueInput
  }

  export type TimeGoalCreateNestedOneWithoutGoalInput = {
    create?: XOR<TimeGoalCreateWithoutGoalInput, TimeGoalUncheckedCreateWithoutGoalInput>
    connectOrCreate?: TimeGoalCreateOrConnectWithoutGoalInput
    connect?: TimeGoalWhereUniqueInput
  }

  export type MonthlyGoalUncheckedCreateNestedManyWithoutGoalInput = {
    create?: XOR<MonthlyGoalCreateWithoutGoalInput, MonthlyGoalUncheckedCreateWithoutGoalInput> | MonthlyGoalCreateWithoutGoalInput[] | MonthlyGoalUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: MonthlyGoalCreateOrConnectWithoutGoalInput | MonthlyGoalCreateOrConnectWithoutGoalInput[]
    createMany?: MonthlyGoalCreateManyGoalInputEnvelope
    connect?: MonthlyGoalWhereUniqueInput | MonthlyGoalWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutGoalInput = {
    create?: XOR<TaskCreateWithoutGoalInput, TaskUncheckedCreateWithoutGoalInput> | TaskCreateWithoutGoalInput[] | TaskUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutGoalInput | TaskCreateOrConnectWithoutGoalInput[]
    createMany?: TaskCreateManyGoalInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type WeightGoalUncheckedCreateNestedOneWithoutGoalInput = {
    create?: XOR<WeightGoalCreateWithoutGoalInput, WeightGoalUncheckedCreateWithoutGoalInput>
    connectOrCreate?: WeightGoalCreateOrConnectWithoutGoalInput
    connect?: WeightGoalWhereUniqueInput
  }

  export type CountGoalUncheckedCreateNestedOneWithoutGoalInput = {
    create?: XOR<CountGoalCreateWithoutGoalInput, CountGoalUncheckedCreateWithoutGoalInput>
    connectOrCreate?: CountGoalCreateOrConnectWithoutGoalInput
    connect?: CountGoalWhereUniqueInput
  }

  export type TimeGoalUncheckedCreateNestedOneWithoutGoalInput = {
    create?: XOR<TimeGoalCreateWithoutGoalInput, TimeGoalUncheckedCreateWithoutGoalInput>
    connectOrCreate?: TimeGoalCreateOrConnectWithoutGoalInput
    connect?: TimeGoalWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumGoalStatusFieldUpdateOperationsInput = {
    set?: $Enums.GoalStatus
  }

  export type UserUpdateOneRequiredWithoutGoalsNestedInput = {
    create?: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGoalsInput
    upsert?: UserUpsertWithoutGoalsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGoalsInput, UserUpdateWithoutGoalsInput>, UserUncheckedUpdateWithoutGoalsInput>
  }

  export type MonthlyGoalUpdateManyWithoutGoalNestedInput = {
    create?: XOR<MonthlyGoalCreateWithoutGoalInput, MonthlyGoalUncheckedCreateWithoutGoalInput> | MonthlyGoalCreateWithoutGoalInput[] | MonthlyGoalUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: MonthlyGoalCreateOrConnectWithoutGoalInput | MonthlyGoalCreateOrConnectWithoutGoalInput[]
    upsert?: MonthlyGoalUpsertWithWhereUniqueWithoutGoalInput | MonthlyGoalUpsertWithWhereUniqueWithoutGoalInput[]
    createMany?: MonthlyGoalCreateManyGoalInputEnvelope
    set?: MonthlyGoalWhereUniqueInput | MonthlyGoalWhereUniqueInput[]
    disconnect?: MonthlyGoalWhereUniqueInput | MonthlyGoalWhereUniqueInput[]
    delete?: MonthlyGoalWhereUniqueInput | MonthlyGoalWhereUniqueInput[]
    connect?: MonthlyGoalWhereUniqueInput | MonthlyGoalWhereUniqueInput[]
    update?: MonthlyGoalUpdateWithWhereUniqueWithoutGoalInput | MonthlyGoalUpdateWithWhereUniqueWithoutGoalInput[]
    updateMany?: MonthlyGoalUpdateManyWithWhereWithoutGoalInput | MonthlyGoalUpdateManyWithWhereWithoutGoalInput[]
    deleteMany?: MonthlyGoalScalarWhereInput | MonthlyGoalScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutGoalNestedInput = {
    create?: XOR<TaskCreateWithoutGoalInput, TaskUncheckedCreateWithoutGoalInput> | TaskCreateWithoutGoalInput[] | TaskUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutGoalInput | TaskCreateOrConnectWithoutGoalInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutGoalInput | TaskUpsertWithWhereUniqueWithoutGoalInput[]
    createMany?: TaskCreateManyGoalInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutGoalInput | TaskUpdateWithWhereUniqueWithoutGoalInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutGoalInput | TaskUpdateManyWithWhereWithoutGoalInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type WeightGoalUpdateOneWithoutGoalNestedInput = {
    create?: XOR<WeightGoalCreateWithoutGoalInput, WeightGoalUncheckedCreateWithoutGoalInput>
    connectOrCreate?: WeightGoalCreateOrConnectWithoutGoalInput
    upsert?: WeightGoalUpsertWithoutGoalInput
    disconnect?: WeightGoalWhereInput | boolean
    delete?: WeightGoalWhereInput | boolean
    connect?: WeightGoalWhereUniqueInput
    update?: XOR<XOR<WeightGoalUpdateToOneWithWhereWithoutGoalInput, WeightGoalUpdateWithoutGoalInput>, WeightGoalUncheckedUpdateWithoutGoalInput>
  }

  export type CountGoalUpdateOneWithoutGoalNestedInput = {
    create?: XOR<CountGoalCreateWithoutGoalInput, CountGoalUncheckedCreateWithoutGoalInput>
    connectOrCreate?: CountGoalCreateOrConnectWithoutGoalInput
    upsert?: CountGoalUpsertWithoutGoalInput
    disconnect?: CountGoalWhereInput | boolean
    delete?: CountGoalWhereInput | boolean
    connect?: CountGoalWhereUniqueInput
    update?: XOR<XOR<CountGoalUpdateToOneWithWhereWithoutGoalInput, CountGoalUpdateWithoutGoalInput>, CountGoalUncheckedUpdateWithoutGoalInput>
  }

  export type TimeGoalUpdateOneWithoutGoalNestedInput = {
    create?: XOR<TimeGoalCreateWithoutGoalInput, TimeGoalUncheckedCreateWithoutGoalInput>
    connectOrCreate?: TimeGoalCreateOrConnectWithoutGoalInput
    upsert?: TimeGoalUpsertWithoutGoalInput
    disconnect?: TimeGoalWhereInput | boolean
    delete?: TimeGoalWhereInput | boolean
    connect?: TimeGoalWhereUniqueInput
    update?: XOR<XOR<TimeGoalUpdateToOneWithWhereWithoutGoalInput, TimeGoalUpdateWithoutGoalInput>, TimeGoalUncheckedUpdateWithoutGoalInput>
  }

  export type MonthlyGoalUncheckedUpdateManyWithoutGoalNestedInput = {
    create?: XOR<MonthlyGoalCreateWithoutGoalInput, MonthlyGoalUncheckedCreateWithoutGoalInput> | MonthlyGoalCreateWithoutGoalInput[] | MonthlyGoalUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: MonthlyGoalCreateOrConnectWithoutGoalInput | MonthlyGoalCreateOrConnectWithoutGoalInput[]
    upsert?: MonthlyGoalUpsertWithWhereUniqueWithoutGoalInput | MonthlyGoalUpsertWithWhereUniqueWithoutGoalInput[]
    createMany?: MonthlyGoalCreateManyGoalInputEnvelope
    set?: MonthlyGoalWhereUniqueInput | MonthlyGoalWhereUniqueInput[]
    disconnect?: MonthlyGoalWhereUniqueInput | MonthlyGoalWhereUniqueInput[]
    delete?: MonthlyGoalWhereUniqueInput | MonthlyGoalWhereUniqueInput[]
    connect?: MonthlyGoalWhereUniqueInput | MonthlyGoalWhereUniqueInput[]
    update?: MonthlyGoalUpdateWithWhereUniqueWithoutGoalInput | MonthlyGoalUpdateWithWhereUniqueWithoutGoalInput[]
    updateMany?: MonthlyGoalUpdateManyWithWhereWithoutGoalInput | MonthlyGoalUpdateManyWithWhereWithoutGoalInput[]
    deleteMany?: MonthlyGoalScalarWhereInput | MonthlyGoalScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutGoalNestedInput = {
    create?: XOR<TaskCreateWithoutGoalInput, TaskUncheckedCreateWithoutGoalInput> | TaskCreateWithoutGoalInput[] | TaskUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutGoalInput | TaskCreateOrConnectWithoutGoalInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutGoalInput | TaskUpsertWithWhereUniqueWithoutGoalInput[]
    createMany?: TaskCreateManyGoalInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutGoalInput | TaskUpdateWithWhereUniqueWithoutGoalInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutGoalInput | TaskUpdateManyWithWhereWithoutGoalInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type WeightGoalUncheckedUpdateOneWithoutGoalNestedInput = {
    create?: XOR<WeightGoalCreateWithoutGoalInput, WeightGoalUncheckedCreateWithoutGoalInput>
    connectOrCreate?: WeightGoalCreateOrConnectWithoutGoalInput
    upsert?: WeightGoalUpsertWithoutGoalInput
    disconnect?: WeightGoalWhereInput | boolean
    delete?: WeightGoalWhereInput | boolean
    connect?: WeightGoalWhereUniqueInput
    update?: XOR<XOR<WeightGoalUpdateToOneWithWhereWithoutGoalInput, WeightGoalUpdateWithoutGoalInput>, WeightGoalUncheckedUpdateWithoutGoalInput>
  }

  export type CountGoalUncheckedUpdateOneWithoutGoalNestedInput = {
    create?: XOR<CountGoalCreateWithoutGoalInput, CountGoalUncheckedCreateWithoutGoalInput>
    connectOrCreate?: CountGoalCreateOrConnectWithoutGoalInput
    upsert?: CountGoalUpsertWithoutGoalInput
    disconnect?: CountGoalWhereInput | boolean
    delete?: CountGoalWhereInput | boolean
    connect?: CountGoalWhereUniqueInput
    update?: XOR<XOR<CountGoalUpdateToOneWithWhereWithoutGoalInput, CountGoalUpdateWithoutGoalInput>, CountGoalUncheckedUpdateWithoutGoalInput>
  }

  export type TimeGoalUncheckedUpdateOneWithoutGoalNestedInput = {
    create?: XOR<TimeGoalCreateWithoutGoalInput, TimeGoalUncheckedCreateWithoutGoalInput>
    connectOrCreate?: TimeGoalCreateOrConnectWithoutGoalInput
    upsert?: TimeGoalUpsertWithoutGoalInput
    disconnect?: TimeGoalWhereInput | boolean
    delete?: TimeGoalWhereInput | boolean
    connect?: TimeGoalWhereUniqueInput
    update?: XOR<XOR<TimeGoalUpdateToOneWithWhereWithoutGoalInput, TimeGoalUpdateWithoutGoalInput>, TimeGoalUncheckedUpdateWithoutGoalInput>
  }

  export type GoalCreateNestedOneWithoutWeightGoalInput = {
    create?: XOR<GoalCreateWithoutWeightGoalInput, GoalUncheckedCreateWithoutWeightGoalInput>
    connectOrCreate?: GoalCreateOrConnectWithoutWeightGoalInput
    connect?: GoalWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GoalUpdateOneRequiredWithoutWeightGoalNestedInput = {
    create?: XOR<GoalCreateWithoutWeightGoalInput, GoalUncheckedCreateWithoutWeightGoalInput>
    connectOrCreate?: GoalCreateOrConnectWithoutWeightGoalInput
    upsert?: GoalUpsertWithoutWeightGoalInput
    connect?: GoalWhereUniqueInput
    update?: XOR<XOR<GoalUpdateToOneWithWhereWithoutWeightGoalInput, GoalUpdateWithoutWeightGoalInput>, GoalUncheckedUpdateWithoutWeightGoalInput>
  }

  export type GoalCreateNestedOneWithoutCountGoalInput = {
    create?: XOR<GoalCreateWithoutCountGoalInput, GoalUncheckedCreateWithoutCountGoalInput>
    connectOrCreate?: GoalCreateOrConnectWithoutCountGoalInput
    connect?: GoalWhereUniqueInput
  }

  export type GoalUpdateOneRequiredWithoutCountGoalNestedInput = {
    create?: XOR<GoalCreateWithoutCountGoalInput, GoalUncheckedCreateWithoutCountGoalInput>
    connectOrCreate?: GoalCreateOrConnectWithoutCountGoalInput
    upsert?: GoalUpsertWithoutCountGoalInput
    connect?: GoalWhereUniqueInput
    update?: XOR<XOR<GoalUpdateToOneWithWhereWithoutCountGoalInput, GoalUpdateWithoutCountGoalInput>, GoalUncheckedUpdateWithoutCountGoalInput>
  }

  export type GoalCreateNestedOneWithoutTimeGoalInput = {
    create?: XOR<GoalCreateWithoutTimeGoalInput, GoalUncheckedCreateWithoutTimeGoalInput>
    connectOrCreate?: GoalCreateOrConnectWithoutTimeGoalInput
    connect?: GoalWhereUniqueInput
  }

  export type GoalUpdateOneRequiredWithoutTimeGoalNestedInput = {
    create?: XOR<GoalCreateWithoutTimeGoalInput, GoalUncheckedCreateWithoutTimeGoalInput>
    connectOrCreate?: GoalCreateOrConnectWithoutTimeGoalInput
    upsert?: GoalUpsertWithoutTimeGoalInput
    connect?: GoalWhereUniqueInput
    update?: XOR<XOR<GoalUpdateToOneWithWhereWithoutTimeGoalInput, GoalUpdateWithoutTimeGoalInput>, GoalUncheckedUpdateWithoutTimeGoalInput>
  }

  export type GoalCreateNestedOneWithoutMonthlyGoalsInput = {
    create?: XOR<GoalCreateWithoutMonthlyGoalsInput, GoalUncheckedCreateWithoutMonthlyGoalsInput>
    connectOrCreate?: GoalCreateOrConnectWithoutMonthlyGoalsInput
    connect?: GoalWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type GoalUpdateOneRequiredWithoutMonthlyGoalsNestedInput = {
    create?: XOR<GoalCreateWithoutMonthlyGoalsInput, GoalUncheckedCreateWithoutMonthlyGoalsInput>
    connectOrCreate?: GoalCreateOrConnectWithoutMonthlyGoalsInput
    upsert?: GoalUpsertWithoutMonthlyGoalsInput
    connect?: GoalWhereUniqueInput
    update?: XOR<XOR<GoalUpdateToOneWithWhereWithoutMonthlyGoalsInput, GoalUpdateWithoutMonthlyGoalsInput>, GoalUncheckedUpdateWithoutMonthlyGoalsInput>
  }

  export type GoalCreateNestedOneWithoutTasksInput = {
    create?: XOR<GoalCreateWithoutTasksInput, GoalUncheckedCreateWithoutTasksInput>
    connectOrCreate?: GoalCreateOrConnectWithoutTasksInput
    connect?: GoalWhereUniqueInput
  }

  export type TaskCompletionCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskCompletionCreateWithoutTaskInput, TaskCompletionUncheckedCreateWithoutTaskInput> | TaskCompletionCreateWithoutTaskInput[] | TaskCompletionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutTaskInput | TaskCompletionCreateOrConnectWithoutTaskInput[]
    createMany?: TaskCompletionCreateManyTaskInputEnvelope
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
  }

  export type TaskCompletionUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskCompletionCreateWithoutTaskInput, TaskCompletionUncheckedCreateWithoutTaskInput> | TaskCompletionCreateWithoutTaskInput[] | TaskCompletionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutTaskInput | TaskCompletionCreateOrConnectWithoutTaskInput[]
    createMany?: TaskCompletionCreateManyTaskInputEnvelope
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
  }

  export type EnumMeasurementTypeFieldUpdateOperationsInput = {
    set?: $Enums.MeasurementType
  }

  export type EnumFrequencyFieldUpdateOperationsInput = {
    set?: $Enums.Frequency
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GoalUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<GoalCreateWithoutTasksInput, GoalUncheckedCreateWithoutTasksInput>
    connectOrCreate?: GoalCreateOrConnectWithoutTasksInput
    upsert?: GoalUpsertWithoutTasksInput
    connect?: GoalWhereUniqueInput
    update?: XOR<XOR<GoalUpdateToOneWithWhereWithoutTasksInput, GoalUpdateWithoutTasksInput>, GoalUncheckedUpdateWithoutTasksInput>
  }

  export type TaskCompletionUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskCompletionCreateWithoutTaskInput, TaskCompletionUncheckedCreateWithoutTaskInput> | TaskCompletionCreateWithoutTaskInput[] | TaskCompletionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutTaskInput | TaskCompletionCreateOrConnectWithoutTaskInput[]
    upsert?: TaskCompletionUpsertWithWhereUniqueWithoutTaskInput | TaskCompletionUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskCompletionCreateManyTaskInputEnvelope
    set?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    disconnect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    delete?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    update?: TaskCompletionUpdateWithWhereUniqueWithoutTaskInput | TaskCompletionUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskCompletionUpdateManyWithWhereWithoutTaskInput | TaskCompletionUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
  }

  export type TaskCompletionUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskCompletionCreateWithoutTaskInput, TaskCompletionUncheckedCreateWithoutTaskInput> | TaskCompletionCreateWithoutTaskInput[] | TaskCompletionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutTaskInput | TaskCompletionCreateOrConnectWithoutTaskInput[]
    upsert?: TaskCompletionUpsertWithWhereUniqueWithoutTaskInput | TaskCompletionUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskCompletionCreateManyTaskInputEnvelope
    set?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    disconnect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    delete?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    update?: TaskCompletionUpdateWithWhereUniqueWithoutTaskInput | TaskCompletionUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskCompletionUpdateManyWithWhereWithoutTaskInput | TaskCompletionUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutCompletionRecordsInput = {
    create?: XOR<TaskCreateWithoutCompletionRecordsInput, TaskUncheckedCreateWithoutCompletionRecordsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCompletionRecordsInput
    connect?: TaskWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TaskUpdateOneRequiredWithoutCompletionRecordsNestedInput = {
    create?: XOR<TaskCreateWithoutCompletionRecordsInput, TaskUncheckedCreateWithoutCompletionRecordsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCompletionRecordsInput
    upsert?: TaskUpsertWithoutCompletionRecordsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutCompletionRecordsInput, TaskUpdateWithoutCompletionRecordsInput>, TaskUncheckedUpdateWithoutCompletionRecordsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumGoalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GoalStatus | EnumGoalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGoalStatusFilter<$PrismaModel> | $Enums.GoalStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumGoalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GoalStatus | EnumGoalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGoalStatusWithAggregatesFilter<$PrismaModel> | $Enums.GoalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGoalStatusFilter<$PrismaModel>
    _max?: NestedEnumGoalStatusFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumMeasurementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MeasurementType | EnumMeasurementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MeasurementType[] | ListEnumMeasurementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MeasurementType[] | ListEnumMeasurementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMeasurementTypeFilter<$PrismaModel> | $Enums.MeasurementType
  }

  export type NestedEnumFrequencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Frequency | EnumFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumFrequencyFilter<$PrismaModel> | $Enums.Frequency
  }

  export type NestedEnumMeasurementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MeasurementType | EnumMeasurementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MeasurementType[] | ListEnumMeasurementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MeasurementType[] | ListEnumMeasurementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMeasurementTypeWithAggregatesFilter<$PrismaModel> | $Enums.MeasurementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMeasurementTypeFilter<$PrismaModel>
    _max?: NestedEnumMeasurementTypeFilter<$PrismaModel>
  }

  export type NestedEnumFrequencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Frequency | EnumFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumFrequencyWithAggregatesFilter<$PrismaModel> | $Enums.Frequency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFrequencyFilter<$PrismaModel>
    _max?: NestedEnumFrequencyFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GoalCreateWithoutUserInput = {
    id?: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    monthlyGoals?: MonthlyGoalCreateNestedManyWithoutGoalInput
    tasks?: TaskCreateNestedManyWithoutGoalInput
    weightGoal?: WeightGoalCreateNestedOneWithoutGoalInput
    countGoal?: CountGoalCreateNestedOneWithoutGoalInput
    timeGoal?: TimeGoalCreateNestedOneWithoutGoalInput
  }

  export type GoalUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    monthlyGoals?: MonthlyGoalUncheckedCreateNestedManyWithoutGoalInput
    tasks?: TaskUncheckedCreateNestedManyWithoutGoalInput
    weightGoal?: WeightGoalUncheckedCreateNestedOneWithoutGoalInput
    countGoal?: CountGoalUncheckedCreateNestedOneWithoutGoalInput
    timeGoal?: TimeGoalUncheckedCreateNestedOneWithoutGoalInput
  }

  export type GoalCreateOrConnectWithoutUserInput = {
    where: GoalWhereUniqueInput
    create: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput>
  }

  export type GoalCreateManyUserInputEnvelope = {
    data: GoalCreateManyUserInput | GoalCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GoalUpsertWithWhereUniqueWithoutUserInput = {
    where: GoalWhereUniqueInput
    update: XOR<GoalUpdateWithoutUserInput, GoalUncheckedUpdateWithoutUserInput>
    create: XOR<GoalCreateWithoutUserInput, GoalUncheckedCreateWithoutUserInput>
  }

  export type GoalUpdateWithWhereUniqueWithoutUserInput = {
    where: GoalWhereUniqueInput
    data: XOR<GoalUpdateWithoutUserInput, GoalUncheckedUpdateWithoutUserInput>
  }

  export type GoalUpdateManyWithWhereWithoutUserInput = {
    where: GoalScalarWhereInput
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyWithoutUserInput>
  }

  export type GoalScalarWhereInput = {
    AND?: GoalScalarWhereInput | GoalScalarWhereInput[]
    OR?: GoalScalarWhereInput[]
    NOT?: GoalScalarWhereInput | GoalScalarWhereInput[]
    id?: StringFilter<"Goal"> | string
    userId?: StringFilter<"Goal"> | string
    title?: StringFilter<"Goal"> | string
    area?: StringFilter<"Goal"> | string
    unit?: StringFilter<"Goal"> | string
    startDate?: DateTimeFilter<"Goal"> | Date | string
    endDate?: DateTimeFilter<"Goal"> | Date | string
    target?: IntFilter<"Goal"> | number
    progress?: IntFilter<"Goal"> | number
    status?: EnumGoalStatusFilter<"Goal"> | $Enums.GoalStatus
    remarks?: StringNullableFilter<"Goal"> | string | null
    yearlyMeasure?: StringNullableFilter<"Goal"> | string | null
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    updatedAt?: DateTimeFilter<"Goal"> | Date | string
  }

  export type UserCreateWithoutGoalsInput = {
    id?: string
    email: string
    auth0Id: string
    password?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutGoalsInput = {
    id?: string
    email: string
    auth0Id: string
    password?: string | null
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutGoalsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
  }

  export type MonthlyGoalCreateWithoutGoalInput = {
    id?: string
    title: string
    month: string
    monthDate: Date | string
    target: Decimal | DecimalJsLike | number | string
    unit: string
    currentProgress?: Decimal | DecimalJsLike | number | string
    status?: $Enums.GoalStatus
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyGoalUncheckedCreateWithoutGoalInput = {
    id?: string
    title: string
    month: string
    monthDate: Date | string
    target: Decimal | DecimalJsLike | number | string
    unit: string
    currentProgress?: Decimal | DecimalJsLike | number | string
    status?: $Enums.GoalStatus
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyGoalCreateOrConnectWithoutGoalInput = {
    where: MonthlyGoalWhereUniqueInput
    create: XOR<MonthlyGoalCreateWithoutGoalInput, MonthlyGoalUncheckedCreateWithoutGoalInput>
  }

  export type MonthlyGoalCreateManyGoalInputEnvelope = {
    data: MonthlyGoalCreateManyGoalInput | MonthlyGoalCreateManyGoalInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutGoalInput = {
    id?: string
    title: string
    type: $Enums.MeasurementType
    frequency: $Enums.Frequency
    target: number
    unit: string
    timesPerWeek?: number | null
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    completionRecords?: TaskCompletionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutGoalInput = {
    id?: string
    title: string
    type: $Enums.MeasurementType
    frequency: $Enums.Frequency
    target: number
    unit: string
    timesPerWeek?: number | null
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    completionRecords?: TaskCompletionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutGoalInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutGoalInput, TaskUncheckedCreateWithoutGoalInput>
  }

  export type TaskCreateManyGoalInputEnvelope = {
    data: TaskCreateManyGoalInput | TaskCreateManyGoalInput[]
    skipDuplicates?: boolean
  }

  export type WeightGoalCreateWithoutGoalInput = {
    id?: string
    startWeight: number
    currentWeight: number
    targetWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeightGoalUncheckedCreateWithoutGoalInput = {
    id?: string
    startWeight: number
    currentWeight: number
    targetWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeightGoalCreateOrConnectWithoutGoalInput = {
    where: WeightGoalWhereUniqueInput
    create: XOR<WeightGoalCreateWithoutGoalInput, WeightGoalUncheckedCreateWithoutGoalInput>
  }

  export type CountGoalCreateWithoutGoalInput = {
    id?: string
    targetCount: number
    currentCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountGoalUncheckedCreateWithoutGoalInput = {
    id?: string
    targetCount: number
    currentCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountGoalCreateOrConnectWithoutGoalInput = {
    where: CountGoalWhereUniqueInput
    create: XOR<CountGoalCreateWithoutGoalInput, CountGoalUncheckedCreateWithoutGoalInput>
  }

  export type TimeGoalCreateWithoutGoalInput = {
    id?: string
    targetHours: number
    targetMinutes?: number
    currentHours?: number
    currentMinutes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeGoalUncheckedCreateWithoutGoalInput = {
    id?: string
    targetHours: number
    targetMinutes?: number
    currentHours?: number
    currentMinutes?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeGoalCreateOrConnectWithoutGoalInput = {
    where: TimeGoalWhereUniqueInput
    create: XOR<TimeGoalCreateWithoutGoalInput, TimeGoalUncheckedCreateWithoutGoalInput>
  }

  export type UserUpsertWithoutGoalsInput = {
    update: XOR<UserUpdateWithoutGoalsInput, UserUncheckedUpdateWithoutGoalsInput>
    create: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGoalsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGoalsInput, UserUncheckedUpdateWithoutGoalsInput>
  }

  export type UserUpdateWithoutGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    auth0Id?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    auth0Id?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyGoalUpsertWithWhereUniqueWithoutGoalInput = {
    where: MonthlyGoalWhereUniqueInput
    update: XOR<MonthlyGoalUpdateWithoutGoalInput, MonthlyGoalUncheckedUpdateWithoutGoalInput>
    create: XOR<MonthlyGoalCreateWithoutGoalInput, MonthlyGoalUncheckedCreateWithoutGoalInput>
  }

  export type MonthlyGoalUpdateWithWhereUniqueWithoutGoalInput = {
    where: MonthlyGoalWhereUniqueInput
    data: XOR<MonthlyGoalUpdateWithoutGoalInput, MonthlyGoalUncheckedUpdateWithoutGoalInput>
  }

  export type MonthlyGoalUpdateManyWithWhereWithoutGoalInput = {
    where: MonthlyGoalScalarWhereInput
    data: XOR<MonthlyGoalUpdateManyMutationInput, MonthlyGoalUncheckedUpdateManyWithoutGoalInput>
  }

  export type MonthlyGoalScalarWhereInput = {
    AND?: MonthlyGoalScalarWhereInput | MonthlyGoalScalarWhereInput[]
    OR?: MonthlyGoalScalarWhereInput[]
    NOT?: MonthlyGoalScalarWhereInput | MonthlyGoalScalarWhereInput[]
    id?: StringFilter<"MonthlyGoal"> | string
    goalId?: StringFilter<"MonthlyGoal"> | string
    title?: StringFilter<"MonthlyGoal"> | string
    month?: StringFilter<"MonthlyGoal"> | string
    monthDate?: DateTimeFilter<"MonthlyGoal"> | Date | string
    target?: DecimalFilter<"MonthlyGoal"> | Decimal | DecimalJsLike | number | string
    unit?: StringFilter<"MonthlyGoal"> | string
    currentProgress?: DecimalFilter<"MonthlyGoal"> | Decimal | DecimalJsLike | number | string
    status?: EnumGoalStatusFilter<"MonthlyGoal"> | $Enums.GoalStatus
    remarks?: StringNullableFilter<"MonthlyGoal"> | string | null
    createdAt?: DateTimeFilter<"MonthlyGoal"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyGoal"> | Date | string
  }

  export type TaskUpsertWithWhereUniqueWithoutGoalInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutGoalInput, TaskUncheckedUpdateWithoutGoalInput>
    create: XOR<TaskCreateWithoutGoalInput, TaskUncheckedCreateWithoutGoalInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutGoalInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutGoalInput, TaskUncheckedUpdateWithoutGoalInput>
  }

  export type TaskUpdateManyWithWhereWithoutGoalInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutGoalInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    goalId?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    type?: EnumMeasurementTypeFilter<"Task"> | $Enums.MeasurementType
    frequency?: EnumFrequencyFilter<"Task"> | $Enums.Frequency
    target?: IntFilter<"Task"> | number
    unit?: StringFilter<"Task"> | string
    timesPerWeek?: IntNullableFilter<"Task"> | number | null
    lastUpdated?: DateTimeFilter<"Task"> | Date | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type WeightGoalUpsertWithoutGoalInput = {
    update: XOR<WeightGoalUpdateWithoutGoalInput, WeightGoalUncheckedUpdateWithoutGoalInput>
    create: XOR<WeightGoalCreateWithoutGoalInput, WeightGoalUncheckedCreateWithoutGoalInput>
    where?: WeightGoalWhereInput
  }

  export type WeightGoalUpdateToOneWithWhereWithoutGoalInput = {
    where?: WeightGoalWhereInput
    data: XOR<WeightGoalUpdateWithoutGoalInput, WeightGoalUncheckedUpdateWithoutGoalInput>
  }

  export type WeightGoalUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    startWeight?: FloatFieldUpdateOperationsInput | number
    currentWeight?: FloatFieldUpdateOperationsInput | number
    targetWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightGoalUncheckedUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    startWeight?: FloatFieldUpdateOperationsInput | number
    currentWeight?: FloatFieldUpdateOperationsInput | number
    targetWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountGoalUpsertWithoutGoalInput = {
    update: XOR<CountGoalUpdateWithoutGoalInput, CountGoalUncheckedUpdateWithoutGoalInput>
    create: XOR<CountGoalCreateWithoutGoalInput, CountGoalUncheckedCreateWithoutGoalInput>
    where?: CountGoalWhereInput
  }

  export type CountGoalUpdateToOneWithWhereWithoutGoalInput = {
    where?: CountGoalWhereInput
    data: XOR<CountGoalUpdateWithoutGoalInput, CountGoalUncheckedUpdateWithoutGoalInput>
  }

  export type CountGoalUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetCount?: IntFieldUpdateOperationsInput | number
    currentCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountGoalUncheckedUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetCount?: IntFieldUpdateOperationsInput | number
    currentCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeGoalUpsertWithoutGoalInput = {
    update: XOR<TimeGoalUpdateWithoutGoalInput, TimeGoalUncheckedUpdateWithoutGoalInput>
    create: XOR<TimeGoalCreateWithoutGoalInput, TimeGoalUncheckedCreateWithoutGoalInput>
    where?: TimeGoalWhereInput
  }

  export type TimeGoalUpdateToOneWithWhereWithoutGoalInput = {
    where?: TimeGoalWhereInput
    data: XOR<TimeGoalUpdateWithoutGoalInput, TimeGoalUncheckedUpdateWithoutGoalInput>
  }

  export type TimeGoalUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetHours?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    currentHours?: IntFieldUpdateOperationsInput | number
    currentMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeGoalUncheckedUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetHours?: IntFieldUpdateOperationsInput | number
    targetMinutes?: IntFieldUpdateOperationsInput | number
    currentHours?: IntFieldUpdateOperationsInput | number
    currentMinutes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalCreateWithoutWeightGoalInput = {
    id?: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGoalsInput
    monthlyGoals?: MonthlyGoalCreateNestedManyWithoutGoalInput
    tasks?: TaskCreateNestedManyWithoutGoalInput
    countGoal?: CountGoalCreateNestedOneWithoutGoalInput
    timeGoal?: TimeGoalCreateNestedOneWithoutGoalInput
  }

  export type GoalUncheckedCreateWithoutWeightGoalInput = {
    id?: string
    userId: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    monthlyGoals?: MonthlyGoalUncheckedCreateNestedManyWithoutGoalInput
    tasks?: TaskUncheckedCreateNestedManyWithoutGoalInput
    countGoal?: CountGoalUncheckedCreateNestedOneWithoutGoalInput
    timeGoal?: TimeGoalUncheckedCreateNestedOneWithoutGoalInput
  }

  export type GoalCreateOrConnectWithoutWeightGoalInput = {
    where: GoalWhereUniqueInput
    create: XOR<GoalCreateWithoutWeightGoalInput, GoalUncheckedCreateWithoutWeightGoalInput>
  }

  export type GoalUpsertWithoutWeightGoalInput = {
    update: XOR<GoalUpdateWithoutWeightGoalInput, GoalUncheckedUpdateWithoutWeightGoalInput>
    create: XOR<GoalCreateWithoutWeightGoalInput, GoalUncheckedCreateWithoutWeightGoalInput>
    where?: GoalWhereInput
  }

  export type GoalUpdateToOneWithWhereWithoutWeightGoalInput = {
    where?: GoalWhereInput
    data: XOR<GoalUpdateWithoutWeightGoalInput, GoalUncheckedUpdateWithoutWeightGoalInput>
  }

  export type GoalUpdateWithoutWeightGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGoalsNestedInput
    monthlyGoals?: MonthlyGoalUpdateManyWithoutGoalNestedInput
    tasks?: TaskUpdateManyWithoutGoalNestedInput
    countGoal?: CountGoalUpdateOneWithoutGoalNestedInput
    timeGoal?: TimeGoalUpdateOneWithoutGoalNestedInput
  }

  export type GoalUncheckedUpdateWithoutWeightGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyGoals?: MonthlyGoalUncheckedUpdateManyWithoutGoalNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutGoalNestedInput
    countGoal?: CountGoalUncheckedUpdateOneWithoutGoalNestedInput
    timeGoal?: TimeGoalUncheckedUpdateOneWithoutGoalNestedInput
  }

  export type GoalCreateWithoutCountGoalInput = {
    id?: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGoalsInput
    monthlyGoals?: MonthlyGoalCreateNestedManyWithoutGoalInput
    tasks?: TaskCreateNestedManyWithoutGoalInput
    weightGoal?: WeightGoalCreateNestedOneWithoutGoalInput
    timeGoal?: TimeGoalCreateNestedOneWithoutGoalInput
  }

  export type GoalUncheckedCreateWithoutCountGoalInput = {
    id?: string
    userId: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    monthlyGoals?: MonthlyGoalUncheckedCreateNestedManyWithoutGoalInput
    tasks?: TaskUncheckedCreateNestedManyWithoutGoalInput
    weightGoal?: WeightGoalUncheckedCreateNestedOneWithoutGoalInput
    timeGoal?: TimeGoalUncheckedCreateNestedOneWithoutGoalInput
  }

  export type GoalCreateOrConnectWithoutCountGoalInput = {
    where: GoalWhereUniqueInput
    create: XOR<GoalCreateWithoutCountGoalInput, GoalUncheckedCreateWithoutCountGoalInput>
  }

  export type GoalUpsertWithoutCountGoalInput = {
    update: XOR<GoalUpdateWithoutCountGoalInput, GoalUncheckedUpdateWithoutCountGoalInput>
    create: XOR<GoalCreateWithoutCountGoalInput, GoalUncheckedCreateWithoutCountGoalInput>
    where?: GoalWhereInput
  }

  export type GoalUpdateToOneWithWhereWithoutCountGoalInput = {
    where?: GoalWhereInput
    data: XOR<GoalUpdateWithoutCountGoalInput, GoalUncheckedUpdateWithoutCountGoalInput>
  }

  export type GoalUpdateWithoutCountGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGoalsNestedInput
    monthlyGoals?: MonthlyGoalUpdateManyWithoutGoalNestedInput
    tasks?: TaskUpdateManyWithoutGoalNestedInput
    weightGoal?: WeightGoalUpdateOneWithoutGoalNestedInput
    timeGoal?: TimeGoalUpdateOneWithoutGoalNestedInput
  }

  export type GoalUncheckedUpdateWithoutCountGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyGoals?: MonthlyGoalUncheckedUpdateManyWithoutGoalNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutGoalNestedInput
    weightGoal?: WeightGoalUncheckedUpdateOneWithoutGoalNestedInput
    timeGoal?: TimeGoalUncheckedUpdateOneWithoutGoalNestedInput
  }

  export type GoalCreateWithoutTimeGoalInput = {
    id?: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGoalsInput
    monthlyGoals?: MonthlyGoalCreateNestedManyWithoutGoalInput
    tasks?: TaskCreateNestedManyWithoutGoalInput
    weightGoal?: WeightGoalCreateNestedOneWithoutGoalInput
    countGoal?: CountGoalCreateNestedOneWithoutGoalInput
  }

  export type GoalUncheckedCreateWithoutTimeGoalInput = {
    id?: string
    userId: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    monthlyGoals?: MonthlyGoalUncheckedCreateNestedManyWithoutGoalInput
    tasks?: TaskUncheckedCreateNestedManyWithoutGoalInput
    weightGoal?: WeightGoalUncheckedCreateNestedOneWithoutGoalInput
    countGoal?: CountGoalUncheckedCreateNestedOneWithoutGoalInput
  }

  export type GoalCreateOrConnectWithoutTimeGoalInput = {
    where: GoalWhereUniqueInput
    create: XOR<GoalCreateWithoutTimeGoalInput, GoalUncheckedCreateWithoutTimeGoalInput>
  }

  export type GoalUpsertWithoutTimeGoalInput = {
    update: XOR<GoalUpdateWithoutTimeGoalInput, GoalUncheckedUpdateWithoutTimeGoalInput>
    create: XOR<GoalCreateWithoutTimeGoalInput, GoalUncheckedCreateWithoutTimeGoalInput>
    where?: GoalWhereInput
  }

  export type GoalUpdateToOneWithWhereWithoutTimeGoalInput = {
    where?: GoalWhereInput
    data: XOR<GoalUpdateWithoutTimeGoalInput, GoalUncheckedUpdateWithoutTimeGoalInput>
  }

  export type GoalUpdateWithoutTimeGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGoalsNestedInput
    monthlyGoals?: MonthlyGoalUpdateManyWithoutGoalNestedInput
    tasks?: TaskUpdateManyWithoutGoalNestedInput
    weightGoal?: WeightGoalUpdateOneWithoutGoalNestedInput
    countGoal?: CountGoalUpdateOneWithoutGoalNestedInput
  }

  export type GoalUncheckedUpdateWithoutTimeGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyGoals?: MonthlyGoalUncheckedUpdateManyWithoutGoalNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutGoalNestedInput
    weightGoal?: WeightGoalUncheckedUpdateOneWithoutGoalNestedInput
    countGoal?: CountGoalUncheckedUpdateOneWithoutGoalNestedInput
  }

  export type GoalCreateWithoutMonthlyGoalsInput = {
    id?: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGoalsInput
    tasks?: TaskCreateNestedManyWithoutGoalInput
    weightGoal?: WeightGoalCreateNestedOneWithoutGoalInput
    countGoal?: CountGoalCreateNestedOneWithoutGoalInput
    timeGoal?: TimeGoalCreateNestedOneWithoutGoalInput
  }

  export type GoalUncheckedCreateWithoutMonthlyGoalsInput = {
    id?: string
    userId: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutGoalInput
    weightGoal?: WeightGoalUncheckedCreateNestedOneWithoutGoalInput
    countGoal?: CountGoalUncheckedCreateNestedOneWithoutGoalInput
    timeGoal?: TimeGoalUncheckedCreateNestedOneWithoutGoalInput
  }

  export type GoalCreateOrConnectWithoutMonthlyGoalsInput = {
    where: GoalWhereUniqueInput
    create: XOR<GoalCreateWithoutMonthlyGoalsInput, GoalUncheckedCreateWithoutMonthlyGoalsInput>
  }

  export type GoalUpsertWithoutMonthlyGoalsInput = {
    update: XOR<GoalUpdateWithoutMonthlyGoalsInput, GoalUncheckedUpdateWithoutMonthlyGoalsInput>
    create: XOR<GoalCreateWithoutMonthlyGoalsInput, GoalUncheckedCreateWithoutMonthlyGoalsInput>
    where?: GoalWhereInput
  }

  export type GoalUpdateToOneWithWhereWithoutMonthlyGoalsInput = {
    where?: GoalWhereInput
    data: XOR<GoalUpdateWithoutMonthlyGoalsInput, GoalUncheckedUpdateWithoutMonthlyGoalsInput>
  }

  export type GoalUpdateWithoutMonthlyGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGoalsNestedInput
    tasks?: TaskUpdateManyWithoutGoalNestedInput
    weightGoal?: WeightGoalUpdateOneWithoutGoalNestedInput
    countGoal?: CountGoalUpdateOneWithoutGoalNestedInput
    timeGoal?: TimeGoalUpdateOneWithoutGoalNestedInput
  }

  export type GoalUncheckedUpdateWithoutMonthlyGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutGoalNestedInput
    weightGoal?: WeightGoalUncheckedUpdateOneWithoutGoalNestedInput
    countGoal?: CountGoalUncheckedUpdateOneWithoutGoalNestedInput
    timeGoal?: TimeGoalUncheckedUpdateOneWithoutGoalNestedInput
  }

  export type GoalCreateWithoutTasksInput = {
    id?: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGoalsInput
    monthlyGoals?: MonthlyGoalCreateNestedManyWithoutGoalInput
    weightGoal?: WeightGoalCreateNestedOneWithoutGoalInput
    countGoal?: CountGoalCreateNestedOneWithoutGoalInput
    timeGoal?: TimeGoalCreateNestedOneWithoutGoalInput
  }

  export type GoalUncheckedCreateWithoutTasksInput = {
    id?: string
    userId: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    monthlyGoals?: MonthlyGoalUncheckedCreateNestedManyWithoutGoalInput
    weightGoal?: WeightGoalUncheckedCreateNestedOneWithoutGoalInput
    countGoal?: CountGoalUncheckedCreateNestedOneWithoutGoalInput
    timeGoal?: TimeGoalUncheckedCreateNestedOneWithoutGoalInput
  }

  export type GoalCreateOrConnectWithoutTasksInput = {
    where: GoalWhereUniqueInput
    create: XOR<GoalCreateWithoutTasksInput, GoalUncheckedCreateWithoutTasksInput>
  }

  export type TaskCompletionCreateWithoutTaskInput = {
    id?: string
    date: Date | string
    value: Decimal | DecimalJsLike | number | string
    completed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCompletionUncheckedCreateWithoutTaskInput = {
    id?: string
    date: Date | string
    value: Decimal | DecimalJsLike | number | string
    completed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCompletionCreateOrConnectWithoutTaskInput = {
    where: TaskCompletionWhereUniqueInput
    create: XOR<TaskCompletionCreateWithoutTaskInput, TaskCompletionUncheckedCreateWithoutTaskInput>
  }

  export type TaskCompletionCreateManyTaskInputEnvelope = {
    data: TaskCompletionCreateManyTaskInput | TaskCompletionCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type GoalUpsertWithoutTasksInput = {
    update: XOR<GoalUpdateWithoutTasksInput, GoalUncheckedUpdateWithoutTasksInput>
    create: XOR<GoalCreateWithoutTasksInput, GoalUncheckedCreateWithoutTasksInput>
    where?: GoalWhereInput
  }

  export type GoalUpdateToOneWithWhereWithoutTasksInput = {
    where?: GoalWhereInput
    data: XOR<GoalUpdateWithoutTasksInput, GoalUncheckedUpdateWithoutTasksInput>
  }

  export type GoalUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGoalsNestedInput
    monthlyGoals?: MonthlyGoalUpdateManyWithoutGoalNestedInput
    weightGoal?: WeightGoalUpdateOneWithoutGoalNestedInput
    countGoal?: CountGoalUpdateOneWithoutGoalNestedInput
    timeGoal?: TimeGoalUpdateOneWithoutGoalNestedInput
  }

  export type GoalUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyGoals?: MonthlyGoalUncheckedUpdateManyWithoutGoalNestedInput
    weightGoal?: WeightGoalUncheckedUpdateOneWithoutGoalNestedInput
    countGoal?: CountGoalUncheckedUpdateOneWithoutGoalNestedInput
    timeGoal?: TimeGoalUncheckedUpdateOneWithoutGoalNestedInput
  }

  export type TaskCompletionUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskCompletionWhereUniqueInput
    update: XOR<TaskCompletionUpdateWithoutTaskInput, TaskCompletionUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskCompletionCreateWithoutTaskInput, TaskCompletionUncheckedCreateWithoutTaskInput>
  }

  export type TaskCompletionUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskCompletionWhereUniqueInput
    data: XOR<TaskCompletionUpdateWithoutTaskInput, TaskCompletionUncheckedUpdateWithoutTaskInput>
  }

  export type TaskCompletionUpdateManyWithWhereWithoutTaskInput = {
    where: TaskCompletionScalarWhereInput
    data: XOR<TaskCompletionUpdateManyMutationInput, TaskCompletionUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskCompletionScalarWhereInput = {
    AND?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
    OR?: TaskCompletionScalarWhereInput[]
    NOT?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
    id?: StringFilter<"TaskCompletion"> | string
    taskId?: StringFilter<"TaskCompletion"> | string
    date?: DateTimeFilter<"TaskCompletion"> | Date | string
    value?: DecimalFilter<"TaskCompletion"> | Decimal | DecimalJsLike | number | string
    completed?: BoolFilter<"TaskCompletion"> | boolean
    createdAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    updatedAt?: DateTimeFilter<"TaskCompletion"> | Date | string
  }

  export type TaskCreateWithoutCompletionRecordsInput = {
    id?: string
    title: string
    type: $Enums.MeasurementType
    frequency: $Enums.Frequency
    target: number
    unit: string
    timesPerWeek?: number | null
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    goal: GoalCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutCompletionRecordsInput = {
    id?: string
    goalId: string
    title: string
    type: $Enums.MeasurementType
    frequency: $Enums.Frequency
    target: number
    unit: string
    timesPerWeek?: number | null
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutCompletionRecordsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCompletionRecordsInput, TaskUncheckedCreateWithoutCompletionRecordsInput>
  }

  export type TaskUpsertWithoutCompletionRecordsInput = {
    update: XOR<TaskUpdateWithoutCompletionRecordsInput, TaskUncheckedUpdateWithoutCompletionRecordsInput>
    create: XOR<TaskCreateWithoutCompletionRecordsInput, TaskUncheckedCreateWithoutCompletionRecordsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutCompletionRecordsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutCompletionRecordsInput, TaskUncheckedUpdateWithoutCompletionRecordsInput>
  }

  export type TaskUpdateWithoutCompletionRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumMeasurementTypeFieldUpdateOperationsInput | $Enums.MeasurementType
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    target?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    timesPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goal?: GoalUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutCompletionRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    goalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumMeasurementTypeFieldUpdateOperationsInput | $Enums.MeasurementType
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    target?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    timesPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalCreateManyUserInput = {
    id?: string
    title: string
    area: string
    unit: string
    startDate: Date | string
    endDate: Date | string
    target: number
    progress?: number
    status?: $Enums.GoalStatus
    remarks?: string | null
    yearlyMeasure?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GoalUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyGoals?: MonthlyGoalUpdateManyWithoutGoalNestedInput
    tasks?: TaskUpdateManyWithoutGoalNestedInput
    weightGoal?: WeightGoalUpdateOneWithoutGoalNestedInput
    countGoal?: CountGoalUpdateOneWithoutGoalNestedInput
    timeGoal?: TimeGoalUpdateOneWithoutGoalNestedInput
  }

  export type GoalUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyGoals?: MonthlyGoalUncheckedUpdateManyWithoutGoalNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutGoalNestedInput
    weightGoal?: WeightGoalUncheckedUpdateOneWithoutGoalNestedInput
    countGoal?: CountGoalUncheckedUpdateOneWithoutGoalNestedInput
    timeGoal?: TimeGoalUncheckedUpdateOneWithoutGoalNestedInput
  }

  export type GoalUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    area?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    yearlyMeasure?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyGoalCreateManyGoalInput = {
    id?: string
    title: string
    month: string
    monthDate: Date | string
    target: Decimal | DecimalJsLike | number | string
    unit: string
    currentProgress?: Decimal | DecimalJsLike | number | string
    status?: $Enums.GoalStatus
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateManyGoalInput = {
    id?: string
    title: string
    type: $Enums.MeasurementType
    frequency: $Enums.Frequency
    target: number
    unit: string
    timesPerWeek?: number | null
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyGoalUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    monthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    currentProgress?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyGoalUncheckedUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    monthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    currentProgress?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyGoalUncheckedUpdateManyWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    monthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: StringFieldUpdateOperationsInput | string
    currentProgress?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumMeasurementTypeFieldUpdateOperationsInput | $Enums.MeasurementType
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    target?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    timesPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completionRecords?: TaskCompletionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumMeasurementTypeFieldUpdateOperationsInput | $Enums.MeasurementType
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    target?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    timesPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completionRecords?: TaskCompletionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumMeasurementTypeFieldUpdateOperationsInput | $Enums.MeasurementType
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    target?: IntFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    timesPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCompletionCreateManyTaskInput = {
    id?: string
    date: Date | string
    value: Decimal | DecimalJsLike | number | string
    completed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCompletionUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCompletionUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCompletionUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}