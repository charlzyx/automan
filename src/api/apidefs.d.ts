import { definitions as petstoreDef } from "./petstoreDTS";
declare namespace defs {
  export namespace petstore {
    export type ApiResponse = petstoreDef["ApiResponse"];
    export type Category = petstoreDef["Category"];
    export type Pet = petstoreDef["Pet"];
    export type Tag = petstoreDef["Tag"];
    export type Order = petstoreDef["Order"];
    export type User = petstoreDef["User"];
  }
}
