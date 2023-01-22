interface JsonMap {[member: string]: string | number | boolean | null | JsonArray | JsonMap }

interface JsonArray extends Array<string | number | boolean | null | JsonArray | JsonMap> {}

export type Json = JsonMap | JsonArray | string | number | boolean | null