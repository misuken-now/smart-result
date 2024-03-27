/**
 * Type of the result in case of success.
 *
 * If a string or number is specified directly for ok, it will be judged false if an empty string or 0 is specified, so only true or Record<string, any> can be specified.
 */
export type OkResult<Data extends true | Record<string, any>> = {
    readonly error?: never;
    // If the result is `{}`, set it to `Record<string, unknown>` to make type resolution work as expected when the result branches.
    readonly ok: [keyof Data] extends [never] ? Record<string, unknown> : Data;
};

/**
 * Type of the result in case of error.
 */
export type ErrorResult<Error extends Record<string, any>> = { readonly error: Error; readonly ok?: never };

/**
 * Object type for easier handling of results.
 *
 * @example If you do not need to return the results.
 *  async function foo(): Promise<Result<true, Error>> {
 *    try {
 *      await bar();
 *      return { ok: true };
 *    } catch (error) {
 *      if (error instanceof Error) {
 *        return { error };
 *      }
 *      return { error: new Error("unknown error") };
 *    }
 *  }
 *
 *  const { ok, error } = await foo();
 *  if (ok) {
 *    console.log(ok); // ok: true; error: undefined;
 *  } else {
 *    console.error(error); // ok: undefined; error: Error;
 *  }
 *
 * @example If you do need to return the results.
 *  async function foo(): Promise<Result<Data, Error>> {
 *    try {
 *      const response = await bar();
 *      return { ok: response.data };
 *    } catch (error) {
 *      if (error instanceof Error) {
 *        return { error };
 *      }
 *      return { error: new Error("unknown error") };
 *    }
 *  }
 *
 *  const { ok: data, error } = await foo();
 *  if (data) {
 *    console.log(data); // data: Data; error: undefined;
 *  } else {
 *    console.error(error); // data: undefined; error: Error;
 *  }
 */
export type Result<Data extends true | Record<string, any>, Error extends Record<string, any>> = OkResult<Data> | ErrorResult<Error>;
