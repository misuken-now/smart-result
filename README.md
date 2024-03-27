# smart-result

This type library is a very smart result type available in TypeScript 4.6 or later.

```
import type { Reulst } from "smart-result";

async function loadData(): Promise<Result<Data, Error>> {
    try {
        const response = await client.get();
        return { ok: response.data };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error };
        }
        return { error: new Error("unknown error") };
    }
}


async function example() {
    const { ok: data, error } = await loadData();
    if (data) {
        console.log(data); // data: Data; error: undefined;
    } else {
        console.error(error); // data: undefined; error: Error;
    }
}
```

## Highlight

🖊 Good coding quality
👀 Highly readable
😄 Fewer things to remember
✅ Safety design
🛡 Type only

## Intall

```
npm install -D `smart-result`
```

or

```
yarn add -D `smart-result`
```

## Usage

### Void Pattern

```
import type { Reulst } from "smart-result";

async function start(): Promise<Result<true, Error>> {
    try {
        await client.start();
        return { ok: true };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error };
        }
        return { error: new Error("unknown error") };
    }
}

async function example() {
    // Use "ok" if you only want to know if you succeeded or not
    const { ok, error } = await start();
    if (ok) {
        console.log(ok); // ok: true;
    } else {
        console.error(error); // ok: undefined; error: Error;
    }
}
```

### Return Data Pattern

```
import type { Reulst } from "smart-result";

async function loadData(): Promise<Result<Data, Error>> {
    try {
        const response = await client.get();
        return { ok: response.data };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error };
        }
        return { error: new Error("unknown error") };
    }
}

async function example() {
    // Assign a name to "ok" if you want to handle the resulting information
    const { ok: data, error } = await loadData();
    if (data) {
        console.log(data); // data: Data; error: undefined;
    } else {
        console.error(error); // data: undefined; error: Error;
    }
}
```

### Return Value Pattern

```
import type { Reulst } from "smart-result";

async function loadValue(): Promise<Result<{ value: number }, Error>> {
    try {
        const response = await client.get();
        // If you want to return a primitive value, wrap it with `{ value: }`.
        return { ok: { value: response.data } };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error };
        }
        return { error: new Error("unknown error") };
    }
}

async function example() {
    const { ok, error } = await loadValue();
    if (ok) {
        console.log(ok.value); // ok: { value: number } error: undefined;
    } else {
        console.error(error); // data: undefined; error: Error;
    }
}
```

## API

### `Result<Data extends true | Record<string, any>, Error>`

Alias for `OkResult<Data> | ErrorResult<Error>`.

### `OkResult<Data extends true | Record<string, any>>`

An object with the key `ok` and without the key `error`.

### `ErrorResult<Error extends Record<string, any>>>`

An object with the key `error` and without the key `ok`.

## LICENSE

[@misuken-now/smart-result](https://github.com/misuken-now/smart-result)・MIT
