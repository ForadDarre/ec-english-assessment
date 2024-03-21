import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "node:util";
import { ReadableStream } from "node:stream/web";

Object.assign(global, { TextDecoder, TextEncoder });
if (globalThis.ReadableStream === undefined) {
    Object.assign(global, { ReadableStream });
}

const { Blob, File } = require("node:buffer");
const { fetch, Headers, FormData, Request, Response } = require("undici");

Object.defineProperties(globalThis, {
    fetch: { value: fetch, writable: true },
    Blob: { value: Blob },
    File: { value: File },
    Headers: { value: Headers },
    FormData: { value: FormData },
    Request: { value: Request },
    Response: { value: Response },
});
