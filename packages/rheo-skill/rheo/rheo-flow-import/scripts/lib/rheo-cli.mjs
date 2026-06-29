// GENERATED — do not edit.
// Self-contained Rheo flow-import CLI bundle (zod + @getrheo/contracts + @getrheo/flow-runtime inlined).
// Rebuild with: pnpm --filter @getrheo/rheo-skill build
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/cli.ts
import { readFile as readFile8 } from "node:fs/promises";
import { existsSync as existsSync4 } from "node:fs";
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { isAbsolute as isAbsolute3, resolve as resolve7 } from "node:path";

// ../flow-runtime/src/stateMachine/flowSession.ts
var findScreen = (manifest, screenId) => manifest.screens.find((s) => s.id === screenId);

// ../../node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// ../../node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// ../../node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// ../../node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// ../../node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// ../../node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// ../../node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// ../../node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = /* @__PURE__ */ Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;

// ../contracts/src/layers/layerSchemaRef.ts
var layerSchemaStore = {};

// ../contracts/src/localized.ts
var LocaleCode = external_exports.string().regex(/^[a-z]{2}(-[A-Z]{2})?$/, 'locale must be like "en" or "en-US"');
var LocalizedTextSchema = external_exports.object({
  default: external_exports.string().min(1, "default copy is required"),
  translations: external_exports.record(LocaleCode, external_exports.string()).optional()
});

// ../contracts/src/hyperlinkHref.ts
var parseHyperlinkHref = (raw) => {
  const t = raw.trim();
  if (!t) return { ok: false };
  let u;
  try {
    u = new URL(t);
  } catch {
    return { ok: false };
  }
  const scheme = u.protocol.replace(/:$/, "").toLowerCase();
  if (scheme === "https") {
    if (!u.hostname) return { ok: false };
    return { ok: true, scheme: "https", host: u.hostname };
  }
  if (scheme === "mailto") {
    return { ok: true, scheme: "mailto" };
  }
  return { ok: false };
};

// ../contracts/src/constants/index.ts
var FIELD_CLASSIFICATIONS = ["safe", "sensitive"];
var MEDIA_TYPES = ["image", "font", "lottie", "video"];
var MAX_IMAGE_BYTES = 5 * 1024 * 1024;
var MAX_LOTTIE_BYTES = 10 * 1024 * 1024;
var MAX_VIDEO_BYTES = 50 * 1024 * 1024;
var FONT_FILE_EXTENSIONS = [".ttf", ".otf", ".woff", ".woff2"];
var MAX_FONT_BYTES = 10 * 1024 * 1024;
var EVENT_NAMES = [
  "flow_started",
  "step_viewed",
  "step_completed",
  "step_skipped",
  "choice_selected",
  "text_submitted",
  "flow_completed",
  "flow_abandoned",
  "decision_evaluated",
  "external_link_opened",
  "surface_presented",
  "surface_outcome",
  "app_review_prompt_shown",
  "app_review_prompt_dismissed",
  /** Emitted once per provider id when merged SDK attributes first expose that attribution source (used for integration health checks). */
  "attribution_context_observed",
  /** Successful in-app purchase from an external surface (e.g. RevenueCat paywall); commerce fields live in `properties`. */
  "iap_purchase"
];

// ../contracts/src/media.ts
var MediaTypeSchema = external_exports.enum(MEDIA_TYPES);
var MediaReferenceSchema = external_exports.object({
  mediaAssetId: external_exports.string().uuid()
});
var MediaAssetSchema = external_exports.object({
  id: external_exports.string().uuid(),
  orgId: external_exports.string().uuid(),
  type: MediaTypeSchema,
  url: external_exports.string().url(),
  name: external_exports.string().nullable().optional(),
  contentType: external_exports.string(),
  sizeBytes: external_exports.number().int().nonnegative(),
  archivedAt: external_exports.string().datetime().nullable().optional(),
  createdAt: external_exports.string().datetime()
});

// ../contracts/src/layers/ids.ts
var LayerIdSchema = external_exports.string().min(1).max(64).regex(/^lyr_[a-z0-9_]+$/i, "layer id must look like lyr_<id>");
var ScreenIdSchema = external_exports.string().min(1).max(64).regex(/^scr_[a-z0-9_]+$/i, "screen id must look like scr_<id>");

// ../contracts/src/layers/restingMotion.ts
var RESTING_MOTION_PRESETS = ["translate", "bounce", "scale", "pulse", "rotate"];
var RestingMotionPresetSchema = external_exports.enum(RESTING_MOTION_PRESETS);
var RESTING_MOTION_SCALE_DIRECTIONS = ["up", "down"];
var RestingMotionScaleDirectionSchema = external_exports.enum(RESTING_MOTION_SCALE_DIRECTIONS);
var RESTING_MOTION_ROTATE_DIRECTIONS = ["clockwise", "counterclockwise"];
var RestingMotionRotateDirectionSchema = external_exports.enum(RESTING_MOTION_ROTATE_DIRECTIONS);
var RestingMotionSchema = external_exports.object({
  preset: RestingMotionPresetSchema,
  /**
   * Timeline segment length (ms): motion is active from start until
   * start + durationMs. When {@link loop} is true, the preset pattern repeats
   * every {@link cycleDurationMs} (or preset default) within this window.
   */
  durationMs: external_exports.number().int().min(200).max(2e4).optional(),
  /** When true, repeat the motion pattern within the timeline segment; default is one shot. */
  loop: external_exports.boolean().optional(),
  /**
   * Duration (ms) of one full pattern cycle when looping. Defaults per {@link RESTING_MOTION_DEFAULT_DURATION_MS}.
   */
  cycleDurationMs: external_exports.number().int().min(200).max(2e4).optional(),
  intensity: external_exports.number().min(0).max(2).optional(),
  /** Bounce preset only: vertical lift in px. When omitted, uses `14 * intensity` (default intensity 1 → 14). */
  bounceAmplitudePx: external_exports.number().min(1).max(80).optional(),
  /** Scale preset: grow (+) or shrink (−) toward a peak, then return to 100%. */
  scaleDirection: RestingMotionScaleDirectionSchema.optional(),
  /**
   * Scale preset: when true (default), each cycle goes rest → peak scale → rest.
   * When false, ramps rest → peak and holds; with loop, the next cycle restarts from rest.
   */
  scaleSpringBack: external_exports.boolean().optional(),
  /**
   * Scale preset: magnitude in % — growth above 100% (up to +400% = 5× at peak) or shrink toward
   * 100%− (up to 90% so peak can be 10% size). See authoring caps in the layer editor.
   */
  scalePercent: external_exports.number().min(0).max(400).optional(),
  /**
   * Scale preset: ms for one full out-and-back (rest → peak → rest). Timeline bar still sets
   * {@link durationMs} (when the layer may animate); this controls how fast each cycle runs.
   */
  scalePatternDurationMs: external_exports.number().int().min(200).max(2e4).optional(),
  /** @deprecated Use {@link scalePercent} + {@link scaleDirection}. Kept for legacy manifests. */
  scaleUpPercent: external_exports.number().min(0).max(400).optional(),
  /** @deprecated Use {@link scalePercent} + {@link scaleDirection}. Kept for legacy manifests. */
  scaleDownPercent: external_exports.number().min(0).max(90).optional(),
  /**
   * @deprecated Legacy vertical-only float (px). Prefer {@link translatePeakXPercent} / {@link translatePeakYPercent}.
   */
  translateRangePx: external_exports.number().min(0).max(40).optional(),
  /** @deprecated Legacy peak offsets in px. Prefer {@link translatePeakXPercent} / {@link translatePeakYPercent}. */
  translatePeakXPx: external_exports.number().min(-200).max(200).optional(),
  /** @deprecated Legacy peak offsets in px. Prefer {@link translatePeakXPercent} / {@link translatePeakYPercent}. */
  translatePeakYPx: external_exports.number().min(-200).max(200).optional(),
  /** Translate preset: peak X offset as % of the layer box (−200–200). Scaled by intensity. */
  translatePeakXPercent: external_exports.number().min(-200).max(200).optional(),
  /** Translate preset: peak Y offset as % of the layer box (−200–200). Scaled by intensity. */
  translatePeakYPercent: external_exports.number().min(-200).max(200).optional(),
  /**
   * Translate preset: when true (default), each cycle goes rest → peak offset → rest. When false, ramp to
   * peak and hold; with loop, the next cycle restarts from the origin.
   */
  translateSpringBack: external_exports.boolean().optional(),
  /** Rotate preset: target rotation in degrees (0–360), scaled by intensity. */
  rotateMaxDeg: external_exports.number().min(0).max(360).optional(),
  /** Rotate preset: spin direction; omitted or `clockwise` → positive angles (default). */
  rotateDirection: RestingMotionRotateDirectionSchema.optional(),
  /**
   * Rotate preset: when true (default), each cycle oscillates 0° → peak → 0°.
   * When false, each cycle ramps 0° → peak and holds; with loop, the next cycle snaps to 0° and ramps again.
   */
  rotateSpringBack: external_exports.boolean().optional(),
  /** Pulse preset: minimum opacity at the dip (0–1). Omitted → `1 - 0.38 * intensity`. */
  pulseMinOpacity: external_exports.number().min(0).max(1).optional(),
  /** Ms after the last mount/stagger clip ends before motion applies (authoring + scrub). */
  delayMsAfterMountEnd: external_exports.number().int().min(0).max(6e4).optional(),
  /**
   * Absolute start time (ms from screen mount). When set, overrides
   * {@link delayMsAfterMountEnd} + mount-clip end so motion can sit between
   * clips (e.g. after first entry, before exit) when multiple mounts exist.
   */
  timelineStartMs: external_exports.number().int().min(0).max(36e5).optional()
}).strict();
var RestingMotionEntrySchema = RestingMotionSchema.extend({
  id: external_exports.string().min(1)
});

// ../contracts/src/layers/base.ts
var baseLayerShape = {
  id: LayerIdSchema,
  name: external_exports.string().max(80).optional(),
  restingMotion: RestingMotionSchema.optional(),
  restingMotions: external_exports.array(RestingMotionEntrySchema).optional()
};

// ../contracts/src/layers/themedColor.ts
var ThemedColorModesSchema = external_exports.object({
  light: external_exports.string().min(1).optional(),
  dark: external_exports.string().min(1).optional()
}).strict().refine((o) => o.light !== void 0 || o.dark !== void 0, {
  message: "at least one of light or dark is required"
});
var ThemedColorSchema = external_exports.union([external_exports.string().min(1), ThemedColorModesSchema]);

// ../contracts/src/layerLayout/width.ts
var WIDTH_PRESETS = ["auto", "full", "1/2", "1/3", "2/3", "1/4", "3/4"];
var WidthValueSchema = external_exports.union([external_exports.enum(WIDTH_PRESETS), external_exports.number().int().min(0).max(2e3)]);
var HEIGHT_PRESETS = ["auto", "full", "fill"];
var CommonLayoutHeightSchema = external_exports.union([
  external_exports.enum(HEIGHT_PRESETS),
  external_exports.number().int().min(0).max(2e3)
]);

// ../contracts/src/layers/styleCommon.ts
var NonNegativePxSchema = external_exports.number().int().min(0);
var PaddingSchema = external_exports.object({
  t: NonNegativePxSchema.optional(),
  r: NonNegativePxSchema.optional(),
  b: NonNegativePxSchema.optional(),
  l: NonNegativePxSchema.optional()
}).partial();
var BorderSchema = external_exports.object({
  width: external_exports.number().int().min(0).max(20).optional(),
  color: ThemedColorSchema.optional()
}).partial();
var DropShadowSchema = external_exports.object({
  offsetX: external_exports.number().int().min(-100).max(100).optional(),
  offsetY: external_exports.number().int().min(-100).max(100).optional(),
  blur: external_exports.number().int().min(0).max(100).optional(),
  spread: external_exports.number().int().min(-50).max(50).optional(),
  color: ThemedColorSchema.optional(),
  opacity: external_exports.number().min(0).max(1).optional()
}).partial();
var CommonStyleSchema = external_exports.object({
  padding: PaddingSchema.optional(),
  margin: PaddingSchema.optional(),
  radius: external_exports.number().int().min(0).max(96).optional(),
  background: ThemedColorSchema.optional(),
  border: BorderSchema.optional(),
  shadow: DropShadowSchema.optional(),
  opacity: external_exports.number().min(0).max(1).optional(),
  width: WidthValueSchema.optional(),
  /** Omit for normal flow; `'absolute'` removes the layer from flex flow (non-root only). */
  position: external_exports.literal("absolute").optional(),
  /** Pixel insets when `position === 'absolute'` (same shape as padding). */
  inset: PaddingSchema.optional(),
  zIndex: external_exports.number().int().min(-999).max(999).optional(),
  /** Static rotation in degrees (CSS `rotate`); not timeline animation. */
  rotate: external_exports.number().min(-360).max(360).optional(),
  /** Cross-axis size: `auto` (hug), `full`/`fill` (parent height), or fixed px. No fractions. */
  height: CommonLayoutHeightSchema.optional(),
  /** Stroke thickness in px for layers that render a stroke primitive (e.g. loader ring). */
  strokeWidth: external_exports.number().int().min(0).max(64).optional()
}).partial();
var TextStyleSchema = CommonStyleSchema.extend({
  /**
   * Logical font family: manifest `theme.fontFamily` when omitted, {@link TEXT_FONT_FAMILY_SYSTEM_UI}
   * for the platform stack, or a custom name (matches `Branding.fontFamilies[].name` for uploaded fonts).
   */
  fontFamily: external_exports.string().min(1).max(128).optional(),
  fontSize: external_exports.number().int().min(8).max(96).optional(),
  fontWeight: external_exports.number().int().min(100).max(900).optional(),
  color: ThemedColorSchema.optional(),
  align: external_exports.enum(["left", "center", "right"]).optional(),
  lineHeight: external_exports.number().min(0.8).max(3).optional(),
  /** Multiplier (0–1) applied to the resolved background color alpha only; text stays fully opaque unless `opacity` is set. */
  backgroundOpacity: external_exports.number().min(0).max(1).optional()
});
var ImageStyleSchema = CommonStyleSchema.extend({
  fit: external_exports.enum(["cover", "contain", "fill"]).optional(),
  aspectRatio: external_exports.number().positive().max(10).optional()
});
var IconStyleSchema = CommonStyleSchema.extend({
  color: ThemedColorSchema.optional()
});
var ICON_FAMILIES = ["ionicons"];
var ButtonStyleSchema = CommonStyleSchema.extend({
  fontSize: external_exports.number().int().min(8).max(96).optional(),
  fontWeight: external_exports.number().int().min(100).max(900).optional(),
  color: ThemedColorSchema.optional(),
  align: external_exports.enum(["left", "center", "right"]).optional()
});
var BUTTON_LAYER_VARIANTS = ["primary", "secondary", "ghost", "destructive"];
var ButtonLayerVariantSchema = external_exports.enum(BUTTON_LAYER_VARIANTS);
var CommonStyleBreakpointsSchema = external_exports.object({
  sm: CommonStyleSchema.partial().optional(),
  md: CommonStyleSchema.partial().optional(),
  lg: CommonStyleSchema.partial().optional(),
  xl: CommonStyleSchema.partial().optional(),
  "2xl": CommonStyleSchema.partial().optional()
}).partial().optional();
var TextStyleBreakpointsSchema = external_exports.object({
  sm: TextStyleSchema.partial().optional(),
  md: TextStyleSchema.partial().optional(),
  lg: TextStyleSchema.partial().optional(),
  xl: TextStyleSchema.partial().optional(),
  "2xl": TextStyleSchema.partial().optional()
}).partial().optional();
var ImageStyleBreakpointsSchema = external_exports.object({
  sm: ImageStyleSchema.partial().optional(),
  md: ImageStyleSchema.partial().optional(),
  lg: ImageStyleSchema.partial().optional(),
  xl: ImageStyleSchema.partial().optional(),
  "2xl": ImageStyleSchema.partial().optional()
}).partial().optional();
var IconStyleBreakpointsSchema = external_exports.object({
  sm: IconStyleSchema.partial().optional(),
  md: IconStyleSchema.partial().optional(),
  lg: IconStyleSchema.partial().optional(),
  xl: IconStyleSchema.partial().optional(),
  "2xl": IconStyleSchema.partial().optional()
}).partial().optional();
var ButtonStyleBreakpointsSchema = external_exports.object({
  sm: ButtonStyleSchema.partial().optional(),
  md: ButtonStyleSchema.partial().optional(),
  lg: ButtonStyleSchema.partial().optional(),
  xl: ButtonStyleSchema.partial().optional(),
  "2xl": ButtonStyleSchema.partial().optional()
}).partial().optional();
var StackLayoutBreakpointPatchSchema = external_exports.object({
  gap: NonNegativePxSchema.optional(),
  direction: external_exports.enum(["vertical", "horizontal"]).optional()
}).partial();
var StackLayoutBreakpointsSchema = external_exports.object({
  sm: StackLayoutBreakpointPatchSchema.optional(),
  md: StackLayoutBreakpointPatchSchema.optional(),
  lg: StackLayoutBreakpointPatchSchema.optional(),
  xl: StackLayoutBreakpointPatchSchema.optional(),
  "2xl": StackLayoutBreakpointPatchSchema.optional()
}).partial().optional();
var ButtonLayoutBreakpointPatchSchema = external_exports.object({
  gap: NonNegativePxSchema.optional(),
  direction: external_exports.enum(["vertical", "horizontal"]).optional()
}).partial();
var ButtonLayoutBreakpointsSchema = external_exports.object({
  sm: ButtonLayoutBreakpointPatchSchema.optional(),
  md: ButtonLayoutBreakpointPatchSchema.optional(),
  lg: ButtonLayoutBreakpointPatchSchema.optional(),
  xl: ButtonLayoutBreakpointPatchSchema.optional(),
  "2xl": ButtonLayoutBreakpointPatchSchema.optional()
}).partial().optional();

// ../contracts/src/layers/actions.ts
var OS_PERMISSION_KEYS = [
  "notifications",
  "camera",
  "microphone",
  "photo_library",
  "contacts",
  "calendar",
  "reminders",
  "location_when_in_use",
  "location_always",
  "motion",
  "bluetooth",
  "app_tracking_transparency",
  "speech_recognition",
  "face_id",
  "health_kit",
  "media_library",
  "local_network",
  "nearby_interactions",
  "nfc",
  "full_screen_intent_android",
  "sms_android",
  "phone_android"
];
var OsPermissionKeySchema = external_exports.enum(OS_PERMISSION_KEYS);
var PERMISSION_CAPTURE_FIELD_KEY_PREFIX = "permission:";
var permissionCaptureFieldKey = (key) => `${PERMISSION_CAPTURE_FIELD_KEY_PREFIX}${key}`;
var PERMISSION_OUTCOME_VALUES = ["granted", "denied", "blocked"];
var PermissionOutcomeSchema = external_exports.enum(PERMISSION_OUTCOME_VALUES);
var OS_PERMISSION_OUTCOME_CONTINUE = "continue";
var OS_PERMISSION_OUTCOME_END = "end";
var OsPermissionOutcomeBranchTargetSchema = external_exports.union([
  ScreenIdSchema,
  external_exports.literal(OS_PERMISSION_OUTCOME_CONTINUE),
  external_exports.literal(OS_PERMISSION_OUTCOME_END)
]);
var OsPermissionOutcomesSchema = external_exports.object({
  granted: OsPermissionOutcomeBranchTargetSchema,
  denied: OsPermissionOutcomeBranchTargetSchema,
  blocked: OsPermissionOutcomeBranchTargetSchema
}).strict();
var APP_REVIEW_OUTCOMES = ["not_shown", "dismissed"];
var AppReviewOutcomeSchema = external_exports.enum(APP_REVIEW_OUTCOMES);
var ButtonActionSchema = external_exports.discriminatedUnion("kind", [
  external_exports.object({ kind: external_exports.literal("none") }),
  external_exports.object({ kind: external_exports.literal("continue") }),
  external_exports.object({ kind: external_exports.literal("skip") }),
  external_exports.object({ kind: external_exports.literal("end_flow") }),
  external_exports.object({
    kind: external_exports.literal("go_back_one_screen"),
    fallbackScreenId: ScreenIdSchema.optional()
  }),
  external_exports.object({ kind: external_exports.literal("go_to_step"), screenId: ScreenIdSchema }),
  external_exports.object({
    kind: external_exports.literal("request_os_permission"),
    permissionKey: OsPermissionKeySchema,
    outcomes: OsPermissionOutcomesSchema
  }),
  external_exports.object({
    kind: external_exports.literal("play_media"),
    targetLayerIds: external_exports.array(external_exports.string().min(1)).min(1)
  }),
  external_exports.object({ kind: external_exports.literal("request_app_review") })
]);
var TEXT_INPUT_TYPES = ["plain", "email", "phone", "url", "multiline"];
var TextInputTypeSchema = external_exports.enum(TEXT_INPUT_TYPES);
var COUNTER_DISPLAY_KINDS = ["number", "time"];
var COUNTER_TIME_FORMATS = ["mm_ss", "hh_mm_ss", "dd_hh_mm_ss"];

// ../contracts/src/layers/oauthConstants.ts
var CheckboxGlyphStyleSchema = external_exports.object({
  /** Square edge length in px. */
  size: external_exports.number().int().min(8).max(128).optional(),
  radius: external_exports.number().int().min(0).max(96).optional(),
  background: ThemedColorSchema.optional(),
  border: BorderSchema.optional(),
  shadow: DropShadowSchema.optional(),
  opacity: external_exports.number().min(0).max(1).optional(),
  /** Fill color for the check mark when checked. */
  checkColor: ThemedColorSchema.optional()
}).partial();
var OAUTH_LOGIN_PRESETS = ["github", "google", "apple"];
var OAuthPresetButtonChromeSchema = CommonStyleSchema.pick({
  width: true,
  padding: true,
  margin: true,
  radius: true
}).partial();
var OAuthPresetButtonChromeBreakpointsSchema = external_exports.object({
  sm: OAuthPresetButtonChromeSchema.partial().optional(),
  md: OAuthPresetButtonChromeSchema.partial().optional(),
  lg: OAuthPresetButtonChromeSchema.partial().optional(),
  xl: OAuthPresetButtonChromeSchema.partial().optional(),
  "2xl": OAuthPresetButtonChromeSchema.partial().optional()
}).partial().optional();
var EMAIL_PASSWORD_AUTH_MODES = ["sign_in", "sign_up"];
var EMAIL_PASSWORD_SLOTS = ["email", "password", "confirm"];

// ../contracts/src/layers/kinds/chrome.ts
var lazyLayer = () => layerSchemaStore.schema;
var ButtonLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("button"),
  children: external_exports.lazy(() => external_exports.array(lazyLayer())),
  action: ButtonActionSchema,
  variant: ButtonLayerVariantSchema,
  direction: external_exports.enum(["vertical", "horizontal"]).optional(),
  gap: external_exports.number().int().min(0).optional(),
  align: external_exports.enum(["start", "center", "end", "stretch"]).optional(),
  distribution: external_exports.enum(["start", "center", "end", "between", "around"]).optional(),
  style: ButtonStyleSchema.optional(),
  styleBreakpoints: ButtonStyleBreakpointsSchema,
  buttonLayoutBreakpoints: ButtonLayoutBreakpointsSchema
});
var BackButtonLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("back_button"),
  children: external_exports.lazy(() => external_exports.array(lazyLayer())),
  variant: ButtonLayerVariantSchema,
  direction: external_exports.enum(["vertical", "horizontal"]).optional(),
  gap: external_exports.number().int().min(0).optional(),
  align: external_exports.enum(["start", "center", "end", "stretch"]).optional(),
  distribution: external_exports.enum(["start", "center", "end", "between", "around"]).optional(),
  style: ButtonStyleSchema.optional(),
  styleBreakpoints: ButtonStyleBreakpointsSchema,
  buttonLayoutBreakpoints: ButtonLayoutBreakpointsSchema,
  fallbackScreenId: ScreenIdSchema.optional()
});
var ProgressLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("progress"),
  trackColor: ThemedColorSchema.optional(),
  fillColor: ThemedColorSchema.optional(),
  style: CommonStyleSchema.optional()
});
var LoaderOnCompleteSchema = external_exports.discriminatedUnion("mode", [
  external_exports.object({ mode: external_exports.literal("none") }),
  external_exports.object({ mode: external_exports.literal("next") }),
  external_exports.object({ mode: external_exports.literal("screen"), screenId: ScreenIdSchema })
]);
var LoaderLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("loader"),
  variant: external_exports.enum(["linear", "circular"]).optional(),
  targetPercent: external_exports.number().int().min(0).max(100).optional(),
  fillDelayMs: external_exports.number().int().min(0).max(1e4).optional(),
  durationMs: external_exports.number().int().min(0).max(36e5).optional(),
  onComplete: LoaderOnCompleteSchema.optional(),
  trackColor: ThemedColorSchema.optional(),
  trackOpacity: external_exports.number().min(0).max(1).optional(),
  fillColor: ThemedColorSchema.optional(),
  /** Horizontal alignment of the bar or ring within the layer box (default start). */
  align: external_exports.enum(["start", "center", "end"]).optional(),
  style: CommonStyleSchema.optional()
}).superRefine((data, ctx) => {
  if (data.variant !== "circular") return;
  const w = data.style?.width;
  const h = data.style?.height;
  if (typeof w === "number" && typeof h === "number" && w !== h) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: "circular loader requires style.width === style.height",
      path: ["style", "height"]
    });
  }
});
var CounterLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("counter"),
  startValue: external_exports.number().finite(),
  endValue: external_exports.number().finite(),
  durationMs: external_exports.number().int().min(0).max(36e5).optional(),
  delayMs: external_exports.number().int().min(0).max(36e5).optional(),
  decimalPlaces: external_exports.number().int().min(0).max(10).optional(),
  displayKind: external_exports.enum(COUNTER_DISPLAY_KINDS).optional(),
  timeFormat: external_exports.enum(COUNTER_TIME_FORMATS).optional(),
  style: TextStyleSchema.optional(),
  styleBreakpoints: TextStyleBreakpointsSchema
});
var CheckboxLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("checkbox"),
  fieldKey: external_exports.string().min(1),
  blocking: external_exports.boolean().optional(),
  uncheckedStyle: CheckboxGlyphStyleSchema.optional(),
  checkedStyle: CheckboxGlyphStyleSchema.optional(),
  style: CommonStyleSchema.optional(),
  styleBreakpoints: CommonStyleBreakpointsSchema
});

// ../contracts/src/layers/kinds/layout.ts
var lazyLayer2 = () => layerSchemaStore.schema;
var StackLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("stack"),
  style: CommonStyleSchema.optional(),
  styleBreakpoints: CommonStyleBreakpointsSchema,
  stackLayoutBreakpoints: StackLayoutBreakpointsSchema,
  selectedStyle: CommonStyleSchema.optional(),
  direction: external_exports.enum(["vertical", "horizontal"]),
  gap: external_exports.number().int().min(0).optional(),
  align: external_exports.enum(["start", "center", "end", "stretch"]).optional(),
  justify: external_exports.enum(["start", "center", "end"]).optional(),
  distribution: external_exports.enum(["start", "center", "end", "between", "around"]).optional(),
  wrap: external_exports.boolean().optional(),
  children: external_exports.lazy(() => external_exports.array(lazyLayer2()))
});
var TextLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("text"),
  text: LocalizedTextSchema,
  style: TextStyleSchema.optional(),
  styleBreakpoints: TextStyleBreakpointsSchema
});
var migrateLegacyHyperlinkForParse = (raw) => {
  if (!raw || typeof raw !== "object") return raw;
  const o = raw;
  if (o.kind !== "hyperlink") return raw;
  const existing = o.children;
  if (Array.isArray(existing) && existing.length > 0) return raw;
  const idSrc = typeof o.id === "string" ? o.id.replace(/[^a-zA-Z0-9_]/g, "_") : "lyr_hyperlink";
  const textChildId = `${idSrc}_lnktxt`.slice(0, 64);
  const children = [
    {
      id: textChildId,
      kind: "text",
      text: o.text ?? { default: "Link" },
      ...typeof o.style === "object" && o.style !== null ? { style: o.style } : {},
      ...typeof o.styleBreakpoints === "object" && o.styleBreakpoints !== null ? { styleBreakpoints: o.styleBreakpoints } : {}
    }
  ];
  const next = {
    ...o,
    children
  };
  delete next.text;
  delete next.style;
  delete next.styleBreakpoints;
  return next;
};
var HyperlinkLayerSchemaInner = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("hyperlink"),
  href: external_exports.string().min(1).max(2048),
  children: external_exports.lazy(() => external_exports.array(lazyLayer2()).min(1)),
  direction: external_exports.enum(["vertical", "horizontal"]).optional(),
  gap: external_exports.number().int().min(0).optional(),
  align: external_exports.enum(["start", "center", "end", "stretch"]).optional(),
  distribution: external_exports.enum(["start", "center", "end", "between", "around"]).optional(),
  wrap: external_exports.boolean().optional(),
  style: CommonStyleSchema.optional(),
  styleBreakpoints: CommonStyleBreakpointsSchema
}).superRefine((data, ctx) => {
  const p = parseHyperlinkHref(data.href.trim());
  if (!p.ok) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: "hyperlink href must be a valid https: or mailto: URL",
      path: ["href"]
    });
  }
});
var HyperlinkLayerSchema = external_exports.preprocess(
  migrateLegacyHyperlinkForParse,
  HyperlinkLayerSchemaInner
);
var ImageLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("image"),
  media: MediaReferenceSchema.optional(),
  alt: external_exports.string().max(280).optional(),
  style: ImageStyleSchema.optional(),
  styleBreakpoints: ImageStyleBreakpointsSchema
});
var LottieLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("lottie"),
  media: MediaReferenceSchema.optional(),
  loop: external_exports.boolean().optional(),
  autoPlay: external_exports.boolean().optional(),
  triggerLayerId: external_exports.string().min(1).optional(),
  onComplete: LoaderOnCompleteSchema.optional(),
  style: ImageStyleSchema.optional(),
  styleBreakpoints: ImageStyleBreakpointsSchema
});
var VideoLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("video"),
  media: MediaReferenceSchema.optional(),
  loop: external_exports.boolean().optional(),
  autoPlay: external_exports.boolean().optional(),
  triggerLayerId: external_exports.string().min(1).optional(),
  onComplete: LoaderOnCompleteSchema.optional(),
  audioEnabled: external_exports.boolean().optional(),
  style: ImageStyleSchema.optional(),
  styleBreakpoints: ImageStyleBreakpointsSchema
});
var IconLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("icon"),
  family: external_exports.enum(ICON_FAMILIES),
  iconName: external_exports.string().min(1).max(128),
  style: IconStyleSchema.optional(),
  styleBreakpoints: IconStyleBreakpointsSchema
});

// ../contracts/src/layers/kinds/auth/oauthProvider.ts
var lazyLayer3 = () => layerSchemaStore.schema;
var OAuthProviderPresetLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("oauth_provider"),
  variant: external_exports.literal("preset"),
  provider: external_exports.enum(OAUTH_LOGIN_PRESETS),
  label: LocalizedTextSchema.optional(),
  style: OAuthPresetButtonChromeSchema.optional(),
  styleBreakpoints: OAuthPresetButtonChromeBreakpointsSchema.optional()
});
var migrateOAuthProviderCustomIncoming = (raw) => {
  if (!raw || typeof raw !== "object") return raw;
  const o = raw;
  if (o.kind !== "oauth_provider" || o.variant !== "custom") return raw;
  const ch = o.children;
  if (Array.isArray(ch) && ch.length > 0) {
    const next2 = { ...o };
    if (next2.buttonVariant === void 0) next2.buttonVariant = "secondary";
    return next2;
  }
  const pid = typeof o.id === "string" ? o.id : "lyr_oauth_custom";
  const slug = pid.replace(/[^a-z0-9_]/gi, "_").slice(0, 40) || "oauth";
  const label = o.label ?? { default: "Custom" };
  let family = o.family ?? "ionicons";
  let iconName = o.iconName ?? "shield-outline";
  if (family === "sf_symbol") {
    family = "ionicons";
    iconName = "star-outline";
  }
  const cid = slug;
  const iconId = `lyr_${cid}_ico`.slice(0, 64);
  const textId = `lyr_${cid}_txt`.slice(0, 64);
  const next = { ...o };
  delete next.label;
  delete next.family;
  delete next.iconName;
  return {
    ...next,
    buttonVariant: o.buttonVariant ?? "secondary",
    children: [
      { id: iconId, kind: "icon", family, iconName },
      { id: textId, kind: "text", text: label }
    ]
  };
};
var OAuthProviderCustomLayerSchemaValidated = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("oauth_provider"),
  variant: external_exports.literal("custom"),
  rowId: external_exports.string().uuid(),
  buttonVariant: ButtonLayerVariantSchema,
  direction: external_exports.enum(["vertical", "horizontal"]).optional(),
  gap: external_exports.number().int().min(0).optional(),
  align: external_exports.enum(["start", "center", "end", "stretch"]).optional(),
  distribution: external_exports.enum(["start", "center", "end", "between", "around"]).optional(),
  children: external_exports.lazy(() => external_exports.array(lazyLayer3()).min(1)),
  style: ButtonStyleSchema.optional(),
  styleBreakpoints: ButtonStyleBreakpointsSchema,
  buttonLayoutBreakpoints: ButtonLayoutBreakpointsSchema
});
var OAuthProviderCustomLayerSchema = external_exports.preprocess(
  migrateOAuthProviderCustomIncoming,
  OAuthProviderCustomLayerSchemaValidated
);
var OAuthProviderLayerSchema = external_exports.union([
  OAuthProviderPresetLayerSchema,
  OAuthProviderCustomLayerSchema
]);

// ../contracts/src/layers/kinds/auth/oauthLogin.ts
var OAuthLoginPresetProviderSchema = external_exports.object({
  type: external_exports.literal("preset"),
  provider: external_exports.enum(OAUTH_LOGIN_PRESETS)
});
var OAuthLoginCustomProviderSchema = external_exports.object({
  type: external_exports.literal("custom"),
  rowId: external_exports.string().uuid(),
  label: LocalizedTextSchema,
  family: external_exports.enum(ICON_FAMILIES),
  iconName: external_exports.string().min(1).max(128)
});
var OAuthLoginProviderSchema = external_exports.discriminatedUnion("type", [
  OAuthLoginPresetProviderSchema,
  OAuthLoginCustomProviderSchema
]);
var oauthLoginChildrenUniquePresets = (children, ctx) => {
  const seen = /* @__PURE__ */ new Set();
  for (let i = 0; i < children.length; i++) {
    const c = children[i];
    if (!c || c.kind !== "oauth_provider" || c.variant !== "preset") continue;
    const preset = c.provider;
    if (seen.has(preset)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `duplicate OAuth preset "${preset}"`,
        path: ["children", i, "provider"]
      });
      return;
    }
    seen.add(preset);
  }
};
var migrateOAuthLoginIncoming = (raw) => {
  if (!raw || typeof raw !== "object") return raw;
  const o = raw;
  if (o.kind !== "oauth_login") return raw;
  if (Array.isArray(o.children) && o.children.length > 0) return raw;
  const provs = o.providers;
  if (!Array.isArray(provs) || provs.length === 0) return raw;
  const pid = typeof o.id === "string" ? o.id : "lyr_oauth_legacy";
  const slug = pid.replace(/^lyr_/i, "").replace(/[^a-z0-9_]/gi, "_").replace(/^_+/, "").slice(0, 48) || "oauth";
  const children = provs.map((p, idx) => {
    const prov = p ?? {};
    const cid = `lyr_${slug}_opr_${idx}`.slice(0, 64);
    if (prov.type === "preset") {
      return {
        id: cid,
        kind: "oauth_provider",
        variant: "preset",
        provider: prov.provider
      };
    }
    return {
      id: cid,
      kind: "oauth_provider",
      variant: "custom",
      rowId: String(prov.rowId),
      buttonVariant: "secondary",
      children: [
        {
          id: `${cid}_ico`.slice(0, 64),
          kind: "icon",
          family: prov.family ?? "ionicons",
          iconName: String(prov.iconName ?? "shield")
        },
        {
          id: `${cid}_txt`.slice(0, 64),
          kind: "text",
          text: prov.label ?? { default: "Custom" }
        }
      ]
    };
  });
  const { providers: _omit, ...rest } = o;
  return { ...rest, children };
};
var OAuthLoginLayerSchemaValidated = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("oauth_login"),
  children: external_exports.lazy(
    () => external_exports.array(OAuthProviderLayerSchema).min(1).superRefine(oauthLoginChildrenUniquePresets)
  ),
  gap: external_exports.number().int().min(0).optional(),
  align: external_exports.enum(["start", "center", "end", "stretch"]).optional(),
  style: CommonStyleSchema.optional(),
  styleBreakpoints: CommonStyleBreakpointsSchema
});
var OAuthLoginLayerSchema = external_exports.preprocess(
  migrateOAuthLoginIncoming,
  OAuthLoginLayerSchemaValidated
);
var OAuthLoginProvidersArraySchema = external_exports.array(OAuthLoginProviderSchema).min(1).superRefine((providers, ctx) => {
  const seen = /* @__PURE__ */ new Set();
  for (let i = 0; i < providers.length; i++) {
    const p = providers[i];
    if (!p || p.type !== "preset") continue;
    const preset = p.provider;
    if (seen.has(preset)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `duplicate OAuth preset "${preset}"`,
        path: [i, "provider"]
      });
      return;
    }
    seen.add(preset);
  }
});

// ../contracts/src/fields.ts
var FIELD_KEY_RE = /^[a-z][a-z0-9_]*$/;
var FieldKeySchema = external_exports.string().min(1).max(64).regex(FIELD_KEY_RE, "field key must be snake_case");
var FieldClassificationSchema = external_exports.enum(FIELD_CLASSIFICATIONS);

// ../contracts/src/layers/kinds/auth/emailPasswordAuth.ts
var lazyLayer4 = () => layerSchemaStore.schema;
var EmailPasswordAuthModeSchema = external_exports.enum(EMAIL_PASSWORD_AUTH_MODES);
var migrateEmailPasswordAuthIncoming = (raw) => {
  if (!raw || typeof raw !== "object") return raw;
  const o = raw;
  if (o.kind !== "email_password_auth") return raw;
  if (Array.isArray(o.children) && o.children.length > 0) return raw;
  const idBase = typeof o.id === "string" ? o.id : "lyr_email_password_auth";
  const slugRaw = idBase.replace(/^lyr_/i, "").replace(/[^a-z0-9_]/gi, "_");
  const slug = slugRaw.length > 0 ? slugRaw.slice(0, 40) : "ep_auth";
  const mode = o.mode === "sign_up" ? "sign_up" : "sign_in";
  const pickLt = (v, fallback) => v && typeof v === "object" && v !== null && "default" in v ? v : { default: fallback };
  const mkField = (suf, slot, labelSource, fallbackPlaceholder) => ({
    id: `lyr_${slug}_fld_${suf}`.slice(0, 64),
    kind: "email_password_field",
    slot,
    ...labelSource ? { placeholder: pickLt(labelSource, fallbackPlaceholder) } : { placeholder: { default: fallbackPlaceholder } },
    children: []
  });
  const children = [];
  children.push(mkField("email", "email", o.emailLabel, "Email"));
  children.push(mkField("pw", "password", o.passwordLabel, "Password"));
  if (mode === "sign_up") {
    children.push(mkField("cf", "confirm", o.confirmPasswordLabel, "Confirm password"));
  }
  const submitLbl = o.submitLabel ?? { default: mode === "sign_in" ? "Sign in" : "Create account" };
  children.push({
    id: `lyr_${slug}_submit`.slice(0, 64),
    kind: "email_password_submit",
    buttonVariant: "primary",
    direction: "horizontal",
    align: "center",
    distribution: "center",
    gap: 8,
    children: [
      {
        id: `lyr_${slug}_submit_txt`.slice(0, 64),
        kind: "text",
        text: submitLbl
      }
    ]
  });
  const {
    emailLabel: _e,
    passwordLabel: _p,
    confirmPasswordLabel: _c,
    submitLabel: _s,
    ...rest
  } = o;
  return { ...rest, mode, children };
};
var refineEmailPasswordAuthChildren = (data, ctx) => {
  const fields = data.children.filter((c) => c.kind === "email_password_field");
  const submits = data.children.filter((c) => c.kind === "email_password_submit");
  const slotSeen = /* @__PURE__ */ new Set();
  for (const f of fields) {
    if (slotSeen.has(f.slot)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `duplicate email_password_field slot "${f.slot}"`,
        path: ["children"]
      });
    }
    slotSeen.add(f.slot);
  }
  const slotHas = new Set(fields.map((f) => f.slot));
  const requiredSlots = data.mode === "sign_up" ? ["email", "password", "confirm"] : ["email", "password"];
  for (const s of requiredSlots) {
    if (!slotHas.has(s)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: data.mode === "sign_up" ? `sign_up requires an email_password_field with slot "${s}"` : `sign_in requires an email_password_field with slot "${s}"`,
        path: ["children"]
      });
    }
  }
  if (data.mode === "sign_in" && slotHas.has("confirm")) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: 'sign_in must not include email_password_field with slot "confirm"',
      path: ["children"]
    });
  }
  if (submits.length !== 1) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: `email_password_auth must have exactly one email_password_submit (found ${submits.length})`,
      path: ["children"]
    });
  }
};
var EmailPasswordFieldLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("email_password_field"),
  slot: external_exports.enum(EMAIL_PASSWORD_SLOTS),
  placeholder: LocalizedTextSchema.optional(),
  children: external_exports.lazy(() => external_exports.array(lazyLayer4())).optional(),
  style: CommonStyleSchema.optional(),
  styleBreakpoints: CommonStyleBreakpointsSchema
});
var EmailPasswordSubmitLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("email_password_submit"),
  buttonVariant: ButtonLayerVariantSchema,
  direction: external_exports.enum(["vertical", "horizontal"]).optional(),
  gap: external_exports.number().int().min(0).optional(),
  align: external_exports.enum(["start", "center", "end", "stretch"]).optional(),
  distribution: external_exports.enum(["start", "center", "end", "between", "around"]).optional(),
  children: external_exports.lazy(() => external_exports.array(lazyLayer4()).min(1)),
  style: ButtonStyleSchema.optional(),
  styleBreakpoints: ButtonStyleBreakpointsSchema,
  buttonLayoutBreakpoints: ButtonLayoutBreakpointsSchema
});
var EmailPasswordAuthLayerSchemaValidated = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("email_password_auth"),
  mode: EmailPasswordAuthModeSchema,
  fieldKey: FieldKeySchema,
  minPasswordLength: external_exports.number().int().min(4).max(128).optional(),
  children: external_exports.lazy(
    () => external_exports.array(external_exports.union([EmailPasswordFieldLayerSchema, EmailPasswordSubmitLayerSchema])).min(1)
  ),
  gap: external_exports.number().int().min(0).optional(),
  align: external_exports.enum(["start", "center", "end", "stretch"]).optional(),
  style: CommonStyleSchema.optional(),
  styleBreakpoints: CommonStyleBreakpointsSchema
}).superRefine(refineEmailPasswordAuthChildren);
var EmailPasswordAuthLayerSchema = external_exports.preprocess(
  migrateEmailPasswordAuthIncoming,
  EmailPasswordAuthLayerSchemaValidated
);

// ../contracts/src/layers/choiceBranching.ts
var ChoiceOptionBindingSchema = external_exports.object({
  optionId: external_exports.string().min(1).max(64),
  rootLayerId: LayerIdSchema
});
var BranchConditionSchema = external_exports.object({
  choiceId: external_exports.string().min(1),
  goTo: ScreenIdSchema
});
var ChoiceBranchingSchema = external_exports.object({
  enabled: external_exports.boolean(),
  conditions: external_exports.array(BranchConditionSchema)
});

// ../contracts/src/layers/kinds/input.ts
var lazyLayer5 = () => layerSchemaStore.schema;
var ChoiceChildrenAndBindingsRefinement = (data, ctx) => {
  const childIds = /* @__PURE__ */ new Set();
  for (const c of data.children) {
    if (childIds.has(c.id)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `duplicate option child id "${c.id}"`,
        path: ["children"]
      });
    }
    childIds.add(c.id);
  }
  const seenOptionIds = /* @__PURE__ */ new Set();
  const seenRootIds = /* @__PURE__ */ new Set();
  for (const b of data.optionBindings) {
    if (seenOptionIds.has(b.optionId)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `duplicate optionId "${b.optionId}" in optionBindings`,
        path: ["optionBindings"]
      });
    }
    seenOptionIds.add(b.optionId);
    if (seenRootIds.has(b.rootLayerId)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `duplicate rootLayerId "${b.rootLayerId}" in optionBindings`,
        path: ["optionBindings"]
      });
    }
    seenRootIds.add(b.rootLayerId);
    if (!childIds.has(b.rootLayerId)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `optionBindings rootLayerId "${b.rootLayerId}" does not match any direct child stack`,
        path: ["optionBindings"]
      });
    }
  }
  if (data.optionBindings.length !== data.children.length) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: "optionBindings length must equal children length",
      path: ["optionBindings"]
    });
  }
};
var SingleChoiceLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("single_choice"),
  fieldKey: FieldKeySchema,
  children: external_exports.lazy(
    () => external_exports.array(StackLayerSchema).min(2)
  ),
  optionBindings: external_exports.array(ChoiceOptionBindingSchema).min(2),
  branching: ChoiceBranchingSchema,
  direction: external_exports.enum(["vertical", "horizontal", "grid"]).optional(),
  gap: external_exports.number().int().min(0).optional(),
  columns: external_exports.number().int().min(1).max(12).optional(),
  style: CommonStyleSchema.optional(),
  styleBreakpoints: CommonStyleBreakpointsSchema
});
var MultipleChoiceLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("multiple_choice"),
  fieldKey: FieldKeySchema,
  children: external_exports.lazy(
    () => external_exports.array(StackLayerSchema).min(2)
  ),
  optionBindings: external_exports.array(ChoiceOptionBindingSchema).min(2),
  minSelections: external_exports.number().int().nonnegative().optional(),
  maxSelections: external_exports.number().int().positive().optional(),
  branching: ChoiceBranchingSchema,
  direction: external_exports.enum(["vertical", "horizontal", "grid"]).optional(),
  gap: external_exports.number().int().min(0).optional(),
  columns: external_exports.number().int().min(1).max(12).optional(),
  style: CommonStyleSchema.optional(),
  styleBreakpoints: CommonStyleBreakpointsSchema
});
var validateChoiceChildrenAndBindings = ChoiceChildrenAndBindingsRefinement;
var TextInputLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("text_input"),
  fieldKey: FieldKeySchema,
  placeholder: LocalizedTextSchema.optional(),
  inputType: TextInputTypeSchema.optional(),
  required: external_exports.boolean().optional(),
  minLength: external_exports.number().int().min(0).max(2e3).optional(),
  maxLength: external_exports.number().int().positive().max(2e3).optional(),
  classification: FieldClassificationSchema,
  children: external_exports.lazy(() => external_exports.array(lazyLayer5())).optional(),
  style: CommonStyleSchema.optional()
});
var ScaleInputLabelStyleSchema = external_exports.object({
  fontFamily: external_exports.string().min(1).max(128).optional(),
  fontSize: external_exports.number().int().min(8).max(96).optional(),
  fontWeight: external_exports.number().int().min(100).max(900).optional(),
  color: ThemedColorSchema.optional(),
  align: external_exports.enum(["left", "center", "right"]).optional(),
  lineHeight: external_exports.number().min(0.8).max(3).optional(),
  opacity: external_exports.number().min(0).max(1).optional()
}).partial();
var ScaleInputLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("scale_input"),
  fieldKey: FieldKeySchema,
  min: external_exports.number(),
  max: external_exports.number(),
  step: external_exports.number().positive().optional(),
  defaultValue: external_exports.number().optional(),
  minLabel: LocalizedTextSchema.optional(),
  maxLabel: LocalizedTextSchema.optional(),
  labelStyle: ScaleInputLabelStyleSchema.optional(),
  valueStyle: ScaleInputLabelStyleSchema.optional(),
  showLabels: external_exports.boolean().optional(),
  showValue: external_exports.boolean().optional(),
  trackHeight: external_exports.number().int().min(2).max(32).optional(),
  trackColor: ThemedColorSchema.optional(),
  fillColor: ThemedColorSchema.optional(),
  thumbSize: external_exports.number().int().min(8).max(48).optional(),
  thumbColor: ThemedColorSchema.optional(),
  children: external_exports.lazy(() => external_exports.array(lazyLayer5())).optional(),
  style: CommonStyleSchema.optional()
});

// ../contracts/src/layers/kinds/carousel.ts
var CarouselIndicatorsStyleSchema = external_exports.object({
  width: external_exports.number().int().min(1).max(64).optional(),
  height: external_exports.number().int().min(1).max(64).optional(),
  defaultColor: ThemedColorSchema.optional(),
  defaultOpacity: external_exports.number().min(0).max(1).optional(),
  activeColor: ThemedColorSchema.optional(),
  activeOpacity: external_exports.number().min(0).max(1).optional(),
  activeWidth: external_exports.number().int().min(1).max(64).optional(),
  activeHeight: external_exports.number().int().min(1).max(64).optional(),
  border: BorderSchema.optional(),
  activeBorder: BorderSchema.optional()
}).partial();
var CarouselPageControlSchema = external_exports.object({
  position: external_exports.enum(["top", "bottom"]),
  spacing: external_exports.number().int().min(0).optional(),
  padding: PaddingSchema.optional(),
  margin: PaddingSchema.optional(),
  indicators: CarouselIndicatorsStyleSchema.optional(),
  border: BorderSchema.optional(),
  shadow: DropShadowSchema.optional()
});
var CarouselLayerSchema = external_exports.object({
  ...baseLayerShape,
  kind: external_exports.literal("carousel"),
  slides: external_exports.lazy(() => external_exports.array(StackLayerSchema).min(1)),
  pageAlignment: external_exports.enum(["top", "center", "bottom"]).optional(),
  pageSpacing: external_exports.number().int().min(0).optional(),
  pagePeek: external_exports.number().int().min(0).max(400).optional(),
  openOn: external_exports.number().int().min(0).optional(),
  loop: external_exports.boolean().optional(),
  autoAdvance: external_exports.boolean().optional(),
  autoAdvanceMs: external_exports.number().int().min(500).max(6e4).optional(),
  pageControl: CarouselPageControlSchema.optional(),
  style: CommonStyleSchema.optional(),
  styleBreakpoints: CommonStyleBreakpointsSchema
});

// ../contracts/src/layers/initLayerSchema.ts
layerSchemaStore.schema = external_exports.lazy(
  () => external_exports.union([
    StackLayerSchema,
    TextLayerSchema,
    HyperlinkLayerSchema,
    ImageLayerSchema,
    LottieLayerSchema,
    VideoLayerSchema,
    IconLayerSchema,
    ButtonLayerSchema,
    BackButtonLayerSchema,
    ProgressLayerSchema,
    LoaderLayerSchema,
    CounterLayerSchema,
    CheckboxLayerSchema,
    SingleChoiceLayerSchema,
    MultipleChoiceLayerSchema,
    TextInputLayerSchema,
    ScaleInputLayerSchema,
    OAuthLoginLayerSchema,
    OAuthProviderPresetLayerSchema,
    OAuthProviderCustomLayerSchema,
    EmailPasswordAuthLayerSchema,
    EmailPasswordFieldLayerSchema,
    EmailPasswordSubmitLayerSchema,
    CarouselLayerSchema
  ])
);
var LayerSchema = layerSchemaStore.schema;

// ../contracts/src/layers/tree.ts
var STYLE_BREAKPOINT_KEYS = ["sm", "md", "lg", "xl", "2xl"];
var commonStyleHasAbsolutePosition = (style, breakpoints) => {
  if (style?.position === "absolute") return true;
  if (!breakpoints) return false;
  for (const k of STYLE_BREAKPOINT_KEYS) {
    if (breakpoints[k]?.position === "absolute") return true;
  }
  return false;
};
var layerHasAbsolutePositionAuthored = (layer) => {
  switch (layer.kind) {
    case "stack":
      return commonStyleHasAbsolutePosition(layer.style, layer.styleBreakpoints) || layer.selectedStyle?.position === "absolute";
    case "text":
    case "counter":
      return commonStyleHasAbsolutePosition(layer.style, layer.styleBreakpoints);
    case "image":
    case "lottie":
    case "video":
      return commonStyleHasAbsolutePosition(layer.style, layer.styleBreakpoints);
    case "icon":
      return commonStyleHasAbsolutePosition(layer.style, layer.styleBreakpoints);
    case "button":
    case "back_button":
    case "hyperlink":
      return commonStyleHasAbsolutePosition(layer.style, layer.styleBreakpoints);
    case "progress":
    case "loader":
      return commonStyleHasAbsolutePosition(layer.style, void 0);
    case "text_input":
    case "scale_input":
      return commonStyleHasAbsolutePosition(layer.style, void 0);
    case "oauth_provider":
      if (layer.variant === "preset") {
        return commonStyleHasAbsolutePosition(layer.style, layer.styleBreakpoints);
      }
      return commonStyleHasAbsolutePosition(layer.style, layer.styleBreakpoints);
    case "oauth_login":
      return commonStyleHasAbsolutePosition(layer.style, layer.styleBreakpoints);
    case "email_password_auth":
      return commonStyleHasAbsolutePosition(layer.style, layer.styleBreakpoints);
    case "email_password_field":
      return commonStyleHasAbsolutePosition(layer.style, layer.styleBreakpoints);
    case "email_password_submit":
      return commonStyleHasAbsolutePosition(layer.style, layer.styleBreakpoints);
    case "carousel":
      return commonStyleHasAbsolutePosition(layer.style, void 0);
    case "checkbox":
    case "single_choice":
    case "multiple_choice":
      return commonStyleHasAbsolutePosition(layer.style, layer.styleBreakpoints);
    default:
      return false;
  }
};

// ../contracts/src/layers/layerUnion.ts
var isInputLayer = (l) => l.kind === "single_choice" || l.kind === "multiple_choice" || l.kind === "text_input" || l.kind === "scale_input";

// ../flow-runtime/src/brandGradient.ts
var BRAND_GRADIENT_PREFIX = "$brandGradient:";
var brandGradientToCss = (g) => {
  const stops = g.stops.map((s) => `${s.color} ${(s.offset * 100).toFixed(0)}%`).join(", ");
  if (g.type === "linear") {
    const angle = g.angle ?? 180;
    return `linear-gradient(${angle}deg, ${stops})`;
  }
  return `radial-gradient(circle, ${stops})`;
};
var isBrandGradientToken = (s) => s.startsWith(BRAND_GRADIENT_PREFIX);
var resolveBrandGradientToken = (branding, token) => {
  if (!isBrandGradientToken(token)) return void 0;
  const id = token.slice(BRAND_GRADIENT_PREFIX.length);
  const preset = branding?.gradientPresets.find((x) => x.id === id);
  return preset ? brandGradientToCss(preset) : void 0;
};
var isStoredLinearGradientCss = (s) => /^\s*linear-gradient\s*\(/i.test(s.trim());

// ../flow-runtime/src/layers.ts
var walkLayers = (root, fn) => {
  const visit = (l, depth) => {
    fn(l, depth);
    if (l.kind === "stack") l.children.forEach((c) => visit(c, depth + 1));
    else if (l.kind === "carousel") l.slides.forEach((c) => visit(c, depth + 1));
    else if (l.kind === "button") l.children.forEach((c) => visit(c, depth + 1));
    else if (l.kind === "back_button") l.children.forEach((c) => visit(c, depth + 1));
    else if (l.kind === "hyperlink") l.children.forEach((c) => visit(c, depth + 1));
    else if (l.kind === "single_choice" || l.kind === "multiple_choice") {
      l.children.forEach((c) => visit(c, depth + 1));
    } else if (l.kind === "text_input" || l.kind === "scale_input") {
      l.children?.forEach((c) => visit(c, depth + 1));
    } else if (l.kind === "oauth_login") {
      l.children.forEach((c) => visit(c, depth + 1));
    } else if (l.kind === "oauth_provider" && l.variant === "custom") {
      l.children.forEach((c) => visit(c, depth + 1));
    } else if (l.kind === "email_password_auth") {
      l.children.forEach((c) => visit(c, depth + 1));
    } else if (l.kind === "email_password_field") {
      l.children?.forEach((c) => visit(c, depth + 1));
    } else if (l.kind === "email_password_submit") {
      l.children.forEach((c) => visit(c, depth + 1));
    }
  };
  visit(root, 0);
};
var walkScreen = (screen, fn) => {
  if (screen.regions.header) walkLayers(screen.regions.header, fn);
  walkLayers(screen.regions.body, fn);
  if (screen.regions.footer) walkLayers(screen.regions.footer, fn);
};
var findInputLayer = (screen) => {
  let found = null;
  walkScreen(screen, (l) => {
    if (!found && isInputLayer(l)) found = l;
  });
  return found;
};
var findLayerById = (screen, id) => {
  let found = null;
  walkScreen(screen, (l) => {
    if (!found && l.id === id) found = l;
  });
  return found;
};
var collectFieldKeys = (manifest) => {
  const out = [];
  for (const screen of manifest.screens) {
    walkScreen(screen, (l) => {
      if (isInputLayer(l)) out.push({ fieldKey: l.fieldKey, screenId: screen.id });
      if (l.kind === "checkbox") out.push({ fieldKey: l.fieldKey, screenId: screen.id });
      if (l.kind === "email_password_auth") {
        out.push({ fieldKey: l.fieldKey, screenId: screen.id });
      }
    });
  }
  return out;
};

// ../contracts/src/decisions.ts
var DecisionNodeIdSchema = external_exports.string().min(1).max(64).regex(/^dec_[a-z0-9_]+$/i, "decision node id must look like dec_<id>");
var ExternalSurfaceJumpIdSchema = external_exports.string().min(1).max(64).regex(/^surf_[a-z0-9_]+$/i, "external surface node id must look like surf_<id>");
var EXTERNAL_SURFACE_NO_NEXT = "__onb_surface_no_next__";
var ExternalSurfaceTerminalTargetSchema = external_exports.literal(EXTERNAL_SURFACE_NO_NEXT);
var FlowJumpTargetSchema = ScreenIdSchema.or(DecisionNodeIdSchema).or(ExternalSurfaceJumpIdSchema).or(ExternalSurfaceTerminalTargetSchema).nullable();
var DecisionBuiltinNameSchema = external_exports.enum(["locale", "platform"]);
var DecisionVariableRefSchema = external_exports.discriminatedUnion("kind", [
  external_exports.object({ kind: external_exports.literal("builtin"), name: DecisionBuiltinNameSchema }),
  external_exports.object({ kind: external_exports.literal("sdk"), key: external_exports.string().min(1).max(128) }),
  external_exports.object({ kind: external_exports.literal("field"), fieldKey: external_exports.string().min(1).max(128) })
]);
var DecisionStringPredicateSchema = external_exports.discriminatedUnion("op", [
  external_exports.object({ op: external_exports.literal("eq"), value: external_exports.string() }),
  external_exports.object({ op: external_exports.literal("neq"), value: external_exports.string() }),
  external_exports.object({ op: external_exports.literal("contains"), value: external_exports.string() })
]);
var DecisionNumberPredicateSchema = external_exports.discriminatedUnion("op", [
  external_exports.object({ op: external_exports.literal("eq"), value: external_exports.number() }),
  external_exports.object({ op: external_exports.literal("neq"), value: external_exports.number() }),
  external_exports.object({ op: external_exports.literal("lt"), value: external_exports.number() }),
  external_exports.object({ op: external_exports.literal("lte"), value: external_exports.number() }),
  external_exports.object({ op: external_exports.literal("gt"), value: external_exports.number() }),
  external_exports.object({ op: external_exports.literal("gte"), value: external_exports.number() })
]);
var DecisionChoicePredicateSchema = external_exports.discriminatedUnion("op", [
  external_exports.object({ op: external_exports.literal("eq"), optionId: external_exports.string().min(1) }),
  external_exports.object({ op: external_exports.literal("one_of"), optionIds: external_exports.array(external_exports.string().min(1)).min(1) })
]);
var DecisionMultiPredicateSchema = external_exports.discriminatedUnion("op", [
  external_exports.object({
    op: external_exports.literal("intersects"),
    optionIds: external_exports.array(external_exports.string().min(1)).min(1)
  }),
  external_exports.object({
    op: external_exports.literal("contains_all"),
    optionIds: external_exports.array(external_exports.string().min(1)).min(1)
  }),
  external_exports.object({
    op: external_exports.literal("subset_of"),
    optionIds: external_exports.array(external_exports.string().min(1)).min(1)
  })
]);
var DecisionBooleanPredicateSchema = external_exports.discriminatedUnion("op", [
  external_exports.object({ op: external_exports.literal("eq"), value: external_exports.boolean() }),
  external_exports.object({ op: external_exports.literal("neq"), value: external_exports.boolean() })
]);
var DecisionPredicatePayloadSchema = external_exports.discriminatedUnion("type", [
  external_exports.object({ type: external_exports.literal("string"), pred: DecisionStringPredicateSchema }),
  external_exports.object({ type: external_exports.literal("number"), pred: DecisionNumberPredicateSchema }),
  external_exports.object({ type: external_exports.literal("boolean"), pred: DecisionBooleanPredicateSchema }),
  external_exports.object({ type: external_exports.literal("choice"), pred: DecisionChoicePredicateSchema }),
  external_exports.object({ type: external_exports.literal("multi"), pred: DecisionMultiPredicateSchema })
]);
var DecisionExprSchema = external_exports.lazy(
  () => external_exports.discriminatedUnion("kind", [
    external_exports.object({ kind: external_exports.literal("empty") }),
    external_exports.object({
      kind: external_exports.literal("group"),
      op: external_exports.enum(["and", "or"]),
      children: external_exports.array(DecisionExprSchema).min(1)
    }),
    external_exports.object({
      kind: external_exports.literal("predicate"),
      variable: DecisionVariableRefSchema,
      predicate: DecisionPredicatePayloadSchema
    })
  ])
);
var DecisionCaseSchema = external_exports.object({
  id: external_exports.string().min(1).max(80),
  /** Display label in the editor (e.g. “Engaged users”). */
  name: external_exports.string().min(1).max(80).optional(),
  expression: DecisionExprSchema,
  next: FlowJumpTargetSchema
});
var DecisionNodeSchema = external_exports.object({
  id: DecisionNodeIdSchema,
  name: external_exports.string().min(1).max(80).optional(),
  cases: external_exports.array(DecisionCaseSchema).min(1).max(16),
  elseNext: FlowJumpTargetSchema
});
var migrateLegacyDecisionNodeInPlace = (node) => {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node.cases)) return;
  if (!("expression" in node)) return;
  const id = typeof node.id === "string" ? node.id : "dec_unknown";
  const expression = node.expression;
  const onTrue = "onTrue" in node ? node.onTrue ?? null : null;
  const onFalse = "onFalse" in node ? node.onFalse ?? null : null;
  delete node.expression;
  delete node.onTrue;
  delete node.onFalse;
  node.cases = [
    {
      id: `${id}_case_0`,
      name: "Group 1",
      expression,
      next: onTrue
    }
  ];
  node.elseNext = onFalse;
};
var collectDecisionSdkKeys = (expr) => {
  const out = [];
  const walk = (e) => {
    if (e.kind === "empty") return;
    if (e.kind === "predicate") {
      if (e.variable.kind === "sdk") out.push(e.variable.key);
      return;
    }
    for (const c of e.children) walk(c);
  };
  walk(expr);
  return out;
};
var collectDecisionFieldKeys = (expr) => {
  const out = [];
  const walk = (e) => {
    if (e.kind === "empty") return;
    if (e.kind === "predicate") {
      if (e.variable.kind === "field") out.push(e.variable.fieldKey);
      return;
    }
    for (const c of e.children) walk(c);
  };
  walk(expr);
  return out;
};
var collectDecisionFieldKeysFromNode = (node) => {
  const seen = /* @__PURE__ */ new Set();
  for (const c of node.cases) {
    for (const k of collectDecisionFieldKeys(c.expression)) seen.add(k);
  }
  return [...seen];
};

// ../contracts/src/animations.ts
var ANIMATABLE_PROPERTIES = [
  "opacity",
  "translateX",
  "translateY",
  "scale"
];
var AnimatablePropertySchema = external_exports.enum(ANIMATABLE_PROPERTIES);
var EASING_TOKENS = [
  "linear",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "standard",
  "emphasized"
];
var EasingTokenSchema = external_exports.enum(EASING_TOKENS);
var KeyframeSchema = external_exports.object({
  t: external_exports.number().min(0).max(1),
  value: external_exports.number(),
  /** Easing applied from this keyframe to the next; defaults to linear. */
  easing: EasingTokenSchema.optional()
}).strict();
var KeyframeTrackSchema = external_exports.object({
  property: AnimatablePropertySchema,
  keyframes: external_exports.array(KeyframeSchema).min(2)
}).strict().superRefine((track, ctx) => {
  let last = -Infinity;
  for (const k of track.keyframes) {
    if (k.t < last) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `keyframe times must be monotonically non-decreasing on track "${track.property}"`
      });
      return;
    }
    last = k.t;
  }
  if (track.keyframes[0].t !== 0) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: `track "${track.property}" first keyframe must start at t=0`
    });
  }
  if (track.keyframes[track.keyframes.length - 1].t !== 1) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: `track "${track.property}" last keyframe must end at t=1`
    });
  }
});
var ANIMATION_TRIGGERS = ["mount", "stagger", "unmount"];
var AnimationTriggerSchema = external_exports.enum(ANIMATION_TRIGGERS);
var AnimationClipSchema = external_exports.object({
  id: external_exports.string().min(1).max(64),
  targetLayerId: LayerIdSchema,
  trigger: AnimationTriggerSchema,
  /** Position in the screen's stagger order. Required when trigger is `stagger`. */
  staggerIndex: external_exports.number().int().min(0).max(64).optional(),
  /** Total clip duration in milliseconds (renderer scales 0..1 keyframes by this). */
  durationMs: external_exports.number().int().min(0).max(36e5),
  /** Pre-roll delay before the clip begins, in ms. Stagger adds on top of this. */
  delayMs: external_exports.number().int().min(0).max(36e5).optional(),
  tracks: external_exports.array(KeyframeTrackSchema).min(1)
}).strict().superRefine((clip, ctx) => {
  if (clip.trigger === "unmount" && clip.staggerIndex !== void 0) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: `clip "${clip.id}" with trigger "unmount" must not set staggerIndex`,
      path: ["staggerIndex"]
    });
  }
  if (clip.trigger === "stagger" && clip.staggerIndex === void 0) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: `clip "${clip.id}" with trigger "stagger" must define staggerIndex`,
      path: ["staggerIndex"]
    });
  }
  const seenProps = /* @__PURE__ */ new Set();
  for (const track of clip.tracks) {
    if (seenProps.has(track.property)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `clip "${clip.id}" has duplicate track for property "${track.property}"`
      });
    }
    seenProps.add(track.property);
  }
});
var ScreenStaggerSchema = external_exports.object({
  /** Per-index delay multiplier in ms. */
  stepMs: external_exports.number().int().min(0).max(2e3)
}).strict();

// ../contracts/src/screenBackground.ts
var SCREEN_BACKGROUND_PLAYBACK_PREFIX = "__screen_bg__:";
var screenBackgroundPlaybackId = (screenId) => `${SCREEN_BACKGROUND_PLAYBACK_PREFIX}${screenId}`;
var isScreenBackgroundPlaybackId = (id) => id.startsWith(SCREEN_BACKGROUND_PLAYBACK_PREFIX);
var ScreenBackgroundFitSchema = external_exports.enum(["cover", "contain", "fill"]);
var ScreenBackgroundScrimSchema = external_exports.object({
  color: ThemedColorSchema.optional(),
  opacity: external_exports.number().min(0).max(1).optional()
}).partial();
var screenBackgroundMediaShape = {
  media: MediaReferenceSchema.optional(),
  fit: ScreenBackgroundFitSchema.optional(),
  opacity: external_exports.number().min(0).max(1).optional(),
  scrim: ScreenBackgroundScrimSchema.optional()
};
var ScreenBackgroundColorFillSchema = external_exports.object({
  kind: external_exports.literal("color"),
  color: ThemedColorSchema.optional(),
  opacity: external_exports.number().min(0).max(1).optional()
});
var ScreenBackgroundImageFillSchema = external_exports.object({
  kind: external_exports.literal("image"),
  ...screenBackgroundMediaShape
});
var ScreenBackgroundVideoFillSchema = external_exports.object({
  kind: external_exports.literal("video"),
  ...screenBackgroundMediaShape,
  loop: external_exports.boolean().optional(),
  autoPlay: external_exports.boolean().optional(),
  triggerLayerId: external_exports.string().min(1).optional(),
  onComplete: LoaderOnCompleteSchema.optional(),
  audioEnabled: external_exports.boolean().optional()
});
var ScreenBackgroundFillSchema = external_exports.discriminatedUnion("kind", [
  ScreenBackgroundColorFillSchema,
  ScreenBackgroundImageFillSchema,
  ScreenBackgroundVideoFillSchema
]);
var ScreenBackgroundFillPatchSchema = external_exports.object({
  color: ThemedColorSchema.optional(),
  fit: ScreenBackgroundFitSchema.optional(),
  opacity: external_exports.number().min(0).max(1).optional(),
  scrim: ScreenBackgroundScrimSchema.optional(),
  loop: external_exports.boolean().optional(),
  autoPlay: external_exports.boolean().optional(),
  triggerLayerId: external_exports.string().min(1).optional(),
  onComplete: LoaderOnCompleteSchema.optional(),
  audioEnabled: external_exports.boolean().optional()
}).partial();
var ScreenContainerBreakpointPatchSchema = external_exports.object({
  padding: PaddingSchema.optional(),
  margin: PaddingSchema.optional(),
  insetSafeArea: external_exports.boolean().optional(),
  backgroundFillPatch: ScreenBackgroundFillPatchSchema.optional()
}).partial();
var ScreenContainerStyleBreakpointsSchema = external_exports.object({
  sm: ScreenContainerBreakpointPatchSchema.optional(),
  md: ScreenContainerBreakpointPatchSchema.optional(),
  lg: ScreenContainerBreakpointPatchSchema.optional(),
  xl: ScreenContainerBreakpointPatchSchema.optional(),
  "2xl": ScreenContainerBreakpointPatchSchema.optional()
}).partial().optional();

// ../contracts/src/screens.ts
var ScreenNextSchema = external_exports.object({
  default: FlowJumpTargetSchema
});
var ScreenRegionsSchema = external_exports.object({
  header: StackLayerSchema.optional(),
  body: StackLayerSchema,
  footer: StackLayerSchema.optional()
});
var ScreenContainerStyleSchema = external_exports.object({
  padding: PaddingSchema.optional(),
  margin: PaddingSchema.optional(),
  /** When true, runtimes add device safe-area insets to shell padding (in addition to manual padding). */
  insetSafeArea: external_exports.boolean().optional(),
  backgroundFill: ScreenBackgroundFillSchema.optional()
}).partial();
var ScreenSchema = external_exports.object({
  id: ScreenIdSchema,
  name: external_exports.string().min(1).max(80),
  regions: ScreenRegionsSchema,
  next: ScreenNextSchema,
  /** Ordered animation clips bound to layers on this screen. */
  animations: external_exports.array(AnimationClipSchema).optional(),
  /** Defaults for clips with `trigger: stagger`. */
  stagger: ScreenStaggerSchema.optional(),
  /** Chrome on the outer screen container (wraps all regions). */
  containerStyle: ScreenContainerStyleSchema.optional(),
  containerStyleBreakpoints: ScreenContainerStyleBreakpointsSchema
});
var walkScreenLayersWithLayoutContext = (screen, fn) => {
  const visit = (l, ctx) => {
    fn(l, ctx);
    const childCtx = (opts = {}) => ({
      region: ctx.region,
      isRegionRoot: false,
      insideChoiceOption: opts.insideChoiceOption ?? ctx.insideChoiceOption,
      parentKind: l.kind
    });
    if (l.kind === "stack") {
      for (const c of l.children) visit(c, childCtx());
    } else if (l.kind === "carousel") {
      for (const s of l.slides) visit(s, childCtx());
    } else if (l.kind === "button" || l.kind === "back_button") {
      for (const c of l.children) visit(c, childCtx());
    } else if (l.kind === "hyperlink") {
      for (const c of l.children) visit(c, childCtx());
    } else if (l.kind === "single_choice" || l.kind === "multiple_choice") {
      for (const c of l.children) {
        visit(c, childCtx({ insideChoiceOption: true }));
      }
    } else if (l.kind === "text_input" || l.kind === "scale_input") {
      for (const c of l.children ?? []) visit(c, childCtx());
    } else if (l.kind === "oauth_login") {
      for (const c of l.children) visit(c, childCtx());
    } else if (l.kind === "oauth_provider" && l.variant === "custom") {
      for (const c of l.children) visit(c, childCtx());
    } else if (l.kind === "email_password_auth") {
      for (const c of l.children) visit(c, childCtx());
    } else if (l.kind === "email_password_field") {
      for (const c of l.children ?? []) visit(c, childCtx());
    } else if (l.kind === "email_password_submit") {
      for (const c of l.children) visit(c, childCtx());
    }
  };
  const regionCtx = (region) => ({
    region,
    isRegionRoot: true,
    insideChoiceOption: false,
    parentKind: null
  });
  if (screen.regions.header) visit(screen.regions.header, regionCtx("header"));
  visit(screen.regions.body, regionCtx("body"));
  if (screen.regions.footer) visit(screen.regions.footer, regionCtx("footer"));
};
var walkScreenLayers = (screen, fn) => {
  const visit = (l) => {
    fn(l);
    if (l.kind === "stack") l.children.forEach(visit);
    else if (l.kind === "carousel") l.slides.forEach(visit);
    else if (l.kind === "button") l.children.forEach(visit);
    else if (l.kind === "back_button") l.children.forEach(visit);
    else if (l.kind === "hyperlink") l.children.forEach(visit);
    else if (l.kind === "single_choice" || l.kind === "multiple_choice") {
      l.children.forEach(visit);
    } else if (l.kind === "text_input" || l.kind === "scale_input") {
      l.children?.forEach(visit);
    } else if (l.kind === "oauth_login") {
      l.children.forEach(visit);
    } else if (l.kind === "oauth_provider" && l.variant === "custom") {
      l.children.forEach(visit);
    } else if (l.kind === "email_password_auth") {
      l.children.forEach(visit);
    } else if (l.kind === "email_password_field") {
      l.children?.forEach(visit);
    } else if (l.kind === "email_password_submit") {
      l.children.forEach(visit);
    }
  };
  if (screen.regions.header) visit(screen.regions.header);
  visit(screen.regions.body);
  if (screen.regions.footer) visit(screen.regions.footer);
};

// ../contracts/src/externalSurfaces.ts
var ExternalSurfaceNodeIdSchema = external_exports.string().min(1).max(64).regex(/^surf_[a-z0-9_]+$/i, "external surface node id must look like surf_<id>");
var NORMALIZED_SURFACE_OUTCOMES = [
  "purchase_completed",
  "purchase_cancelled",
  "dismissed",
  "failed",
  "restore_completed"
];
var NormalizedSurfaceOutcomeSchema = external_exports.enum(NORMALIZED_SURFACE_OUTCOMES);
var SurfaceProviderSchema = external_exports.enum(["unspecified", "revenuecat"]);
var UnspecifiedExternalSurfaceConfigSchema = external_exports.object({
  provider: external_exports.literal("unspecified")
});
var RevenueCatSurfacePresentationSchema = external_exports.enum(["paywall", "paywall_if_needed"]);
var RevenueCatSurfaceConfigSchema = external_exports.object({
  provider: external_exports.literal("revenuecat"),
  offeringId: external_exports.string().min(1).max(128).optional(),
  placementId: external_exports.string().min(1).max(128).optional(),
  presentation: RevenueCatSurfacePresentationSchema.optional()
});
var ExternalSurfaceConfigSchema = external_exports.discriminatedUnion("provider", [
  UnspecifiedExternalSurfaceConfigSchema,
  RevenueCatSurfaceConfigSchema
]);
var ExternalSurfaceOutcomesMapSchema = external_exports.object({
  purchase_completed: FlowJumpTargetSchema.optional(),
  purchase_cancelled: FlowJumpTargetSchema.optional(),
  dismissed: FlowJumpTargetSchema.optional(),
  failed: FlowJumpTargetSchema.optional(),
  restore_completed: FlowJumpTargetSchema.optional()
}).strict();
var ExternalSurfaceNodeSchema = external_exports.object({
  id: ExternalSurfaceNodeIdSchema,
  name: external_exports.string().min(1).max(80).optional(),
  config: ExternalSurfaceConfigSchema,
  /** Per-outcome jump targets. Outcomes not listed here fall through to `fallback`. */
  outcomes: ExternalSurfaceOutcomesMapSchema,
  /** Required: used for any outcome not in `outcomes` (e.g. provider quirks, unmapped events). */
  fallback: FlowJumpTargetSchema
});

// ../contracts/src/sdkAttributes.ts
var RESERVED_RC_SDK_KEYS = [
  /** Last RC event observed by the SDK (e.g. `purchase_completed`, `purchase_cancelled`). */
  "onb_rc_last_event",
  /** Product identifier from the most recent successful purchase. */
  "onb_rc_last_product_id",
  /** Period type (`normal`, `intro`, `trial`) from the most recent purchase. */
  "onb_rc_last_period_type",
  /** RevenueCat offering id surfaced by the most recent paywall presentation. */
  "onb_rc_last_offering_id"
];
var RESERVED_SDK_KEYS_SET = new Set(RESERVED_RC_SDK_KEYS);
var isReservedSdkKey = (key) => RESERVED_SDK_KEYS_SET.has(key);

// ../contracts/src/manifest/version.ts
var MANIFEST_SCHEMA_VERSION = 7;

// ../contracts/src/manifest/theme.ts
var ThemeSchema = external_exports.object({
  primary: external_exports.string().optional(),
  primaryForeground: external_exports.string().optional(),
  background: external_exports.string().optional(),
  foreground: external_exports.string().optional(),
  accent: external_exports.string().optional(),
  borderRadius: external_exports.number().optional(),
  fontFamily: external_exports.string().optional()
});
var BuilderMetaSchema = external_exports.object({
  layout: external_exports.object({
    nodes: external_exports.array(
      external_exports.object({
        id: external_exports.string(),
        kind: external_exports.enum(["screen", "decision"]).optional(),
        x: external_exports.number(),
        y: external_exports.number()
      })
    ).optional(),
    canvas: external_exports.object({
      zoom: external_exports.number().optional(),
      x: external_exports.number().optional(),
      y: external_exports.number().optional()
    }).optional()
  }).optional()
}).passthrough().optional();

// ../contracts/src/manifest/migrate.ts
var migrateLayerInPlace = (layer) => {
  if (!layer || typeof layer !== "object") return;
  const l = layer;
  if (l.kind === "progress_bar") {
    l.kind = "progress";
  }
  if (l.kind === "icon" && l.family === "sf_symbol") {
    l.family = "ionicons";
    l.iconName = "star-outline";
  }
  if (l.kind === "button") {
    const hasChildren = Array.isArray(l.children);
    const hasLegacyLabel = !!l.label && typeof l.label === "object";
    if (!hasChildren && hasLegacyLabel) {
      const id = typeof l.id === "string" ? `${l.id}_text` : "lyr_btn_text";
      l.children = [
        {
          id,
          kind: "text",
          text: l.label
        }
      ];
      delete l.label;
    } else if (!hasChildren) {
      l.children = [];
    }
  }
  if (l.kind === "hyperlink") {
    const hasKids = Array.isArray(l.children) && l.children.length > 0;
    const hasLegacyText = l.text !== void 0 && l.text !== null;
    if (!hasKids && hasLegacyText) {
      const baseId = typeof l.id === "string" ? `${l.id}_lnktxt` : "lyr_hyperlink_lnktxt";
      const row = {
        id: String(baseId).slice(0, 64),
        kind: "text",
        text: l.text
      };
      if (l.style !== void 0) row.style = l.style;
      if (l.styleBreakpoints !== void 0) row.styleBreakpoints = l.styleBreakpoints;
      l.children = [row];
      delete l.text;
      delete l.style;
      delete l.styleBreakpoints;
    } else if (!Array.isArray(l.children)) {
      l.children = [];
    }
  }
  if (l.kind === "stack" && Array.isArray(l.children)) {
    for (const c of l.children) migrateLayerInPlace(c);
  } else if (l.kind === "carousel" && Array.isArray(l.slides)) {
    for (const s of l.slides) migrateLayerInPlace(s);
  } else if (l.kind === "button" && Array.isArray(l.children)) {
    for (const c of l.children) migrateLayerInPlace(c);
  } else if (l.kind === "back_button" && Array.isArray(l.children)) {
    for (const c of l.children) migrateLayerInPlace(c);
  } else if (l.kind === "hyperlink" && Array.isArray(l.children)) {
    for (const c of l.children) migrateLayerInPlace(c);
  } else if (l.kind === "oauth_login" && Array.isArray(l.children)) {
    for (const c of l.children) migrateLayerInPlace(c);
  } else if (l.kind === "oauth_provider" && l.variant === "custom" && Array.isArray(l.children)) {
    for (const c of l.children) migrateLayerInPlace(c);
  } else if (l.kind === "email_password_auth" && Array.isArray(l.children)) {
    for (const c of l.children) migrateLayerInPlace(c);
  } else if (l.kind === "email_password_field" && Array.isArray(l.children)) {
    for (const c of l.children) migrateLayerInPlace(c);
  } else if (l.kind === "email_password_submit" && Array.isArray(l.children)) {
    for (const c of l.children) migrateLayerInPlace(c);
  }
};
var migrateScreenInPlace = (screen) => {
  if (!screen || typeof screen !== "object") return;
  const s = screen;
  if (s.regions) {
    if (s.regions.header) migrateLayerInPlace(s.regions.header);
    if (s.regions.body) migrateLayerInPlace(s.regions.body);
    if (s.regions.footer) migrateLayerInPlace(s.regions.footer);
  }
  if (s.animations === void 0) {
    delete s.animations;
  }
};
var migrateManifestInPlace = (data) => {
  if (!data || typeof data !== "object") return data;
  const d = data;
  if (Array.isArray(d.screens)) {
    for (const s of d.screens) migrateScreenInPlace(s);
  }
  if (!Array.isArray(d.decisionNodes)) d.decisionNodes = [];
  if (Array.isArray(d.decisionNodes)) {
    for (const node of d.decisionNodes) {
      if (node && typeof node === "object") {
        migrateLegacyDecisionNodeInPlace(node);
      }
    }
  }
  if (!Array.isArray(d.externalSurfaceNodes)) d.externalSurfaceNodes = [];
  if (!Array.isArray(d.sdkAttributeKeys)) d.sdkAttributeKeys = [];
  if (d.schemaVersion === 6) d.schemaVersion = MANIFEST_SCHEMA_VERSION;
  if (d.schemaVersion === 5) d.schemaVersion = MANIFEST_SCHEMA_VERSION;
  if (d.schemaVersion === 4) d.schemaVersion = MANIFEST_SCHEMA_VERSION;
  return data;
};
var migrateLegacyManifest = (raw) => {
  if (!raw || typeof raw !== "object") return raw;
  const clone = JSON.parse(JSON.stringify(raw));
  return migrateManifestInPlace(clone);
};

// ../contracts/src/manifest/flowManifestObjectBaseSchema.ts
var FlowManifestObjectBaseSchema = external_exports.object({
  flowId: external_exports.string().uuid(),
  /** Manifest schema version — see {@link MANIFEST_SCHEMA_VERSION}. */
  schemaVersion: external_exports.literal(MANIFEST_SCHEMA_VERSION).optional(),
  version: external_exports.number().int().positive(),
  defaultLocale: LocaleCode,
  locales: external_exports.array(LocaleCode),
  /** When null, the draft has no wired entry target (builder connects the canvas entry node). */
  entryScreenId: external_exports.union([external_exports.string().min(1), external_exports.null()]),
  screens: external_exports.array(ScreenSchema),
  decisionNodes: external_exports.union([external_exports.array(DecisionNodeSchema), external_exports.undefined()]).transform((x) => x ?? []),
  externalSurfaceNodes: external_exports.union([external_exports.array(ExternalSurfaceNodeSchema), external_exports.undefined()]).transform((x) => x ?? []),
  sdkAttributeKeys: external_exports.union([external_exports.array(external_exports.string().min(1).max(128)), external_exports.undefined()]).transform((x) => x ?? []),
  theme: ThemeSchema.optional(),
  builderMeta: BuilderMetaSchema
});

// ../contracts/src/manifest/refineManifestGraph.ts
var buildManifestJumpTargets = (manifest) => {
  const screenIds = new Set(manifest.screens.map((s) => s.id));
  const decisionIds = new Set(manifest.decisionNodes.map((d) => d.id));
  const surfaceIds = new Set(manifest.externalSurfaceNodes.map((s) => s.id));
  return /* @__PURE__ */ new Set([
    ...screenIds,
    ...decisionIds,
    ...surfaceIds,
    EXTERNAL_SURFACE_NO_NEXT
  ]);
};
var refineManifestGraph = (manifest, ctx, jumpTargets) => {
  const screenIds = /* @__PURE__ */ new Set();
  for (const s of manifest.screens) {
    if (screenIds.has(s.id)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `duplicate screen id "${s.id}"`,
        path: ["screens"]
      });
    }
    screenIds.add(s.id);
  }
  const decisionIds = new Set(manifest.decisionNodes.map((d) => d.id));
  const surfaceIds = new Set(manifest.externalSurfaceNodes.map((s) => s.id));
  if (manifest.entryScreenId != null && !jumpTargets.has(manifest.entryScreenId)) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: `entryScreenId "${manifest.entryScreenId}" not found in screens, decisionNodes, or externalSurfaceNodes`,
      path: ["entryScreenId"]
    });
  }
  const seenDecisionId = /* @__PURE__ */ new Set();
  const sdkAllow = new Set(manifest.sdkAttributeKeys);
  manifest.decisionNodes.forEach((dn, di) => {
    if (seenDecisionId.has(dn.id)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `duplicate decision node id "${dn.id}"`,
        path: ["decisionNodes", di]
      });
    }
    seenDecisionId.add(dn.id);
    if (screenIds.has(dn.id)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `decision node id "${dn.id}" collides with a screen id`,
        path: ["decisionNodes", di]
      });
    }
    if (surfaceIds.has(dn.id)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `decision node id "${dn.id}" collides with an external surface id`,
        path: ["decisionNodes", di]
      });
    }
    dn.cases.forEach((c, ci) => {
      if (c.next != null && !jumpTargets.has(c.next)) {
        ctx.addIssue({
          code: external_exports.ZodIssueCode.custom,
          message: `decision "${dn.id}" case "${c.id}" next "${c.next}" not found`,
          path: ["decisionNodes", di, "cases", ci, "next"]
        });
      }
      for (const sk of collectDecisionSdkKeys(c.expression)) {
        if (isReservedSdkKey(sk)) continue;
        if (!sdkAllow.has(sk)) {
          ctx.addIssue({
            code: external_exports.ZodIssueCode.custom,
            message: `decision "${dn.id}" case "${c.id}" references sdk key "${sk}" not in sdkAttributeKeys`,
            path: ["decisionNodes", di, "cases", ci, "expression"]
          });
        }
      }
    });
    if (dn.elseNext != null && !jumpTargets.has(dn.elseNext)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `decision "${dn.id}" elseNext "${dn.elseNext}" not found`,
        path: ["decisionNodes", di, "elseNext"]
      });
    }
  });
  const seenSurfaceId = /* @__PURE__ */ new Set();
  manifest.externalSurfaceNodes.forEach((sn, si) => {
    if (seenSurfaceId.has(sn.id)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `duplicate external surface id "${sn.id}"`,
        path: ["externalSurfaceNodes", si]
      });
    }
    seenSurfaceId.add(sn.id);
    if (screenIds.has(sn.id)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `external surface id "${sn.id}" collides with a screen id`,
        path: ["externalSurfaceNodes", si]
      });
    }
    if (decisionIds.has(sn.id)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `external surface id "${sn.id}" collides with a decision node id`,
        path: ["externalSurfaceNodes", si]
      });
    }
    for (const [outcome, target] of Object.entries(sn.outcomes)) {
      if (target != null && !jumpTargets.has(target)) {
        ctx.addIssue({
          code: external_exports.ZodIssueCode.custom,
          message: `external surface "${sn.id}" outcome "${outcome}" target "${target}" not found`,
          path: ["externalSurfaceNodes", si, "outcomes", outcome]
        });
      }
    }
    if (sn.fallback != null && !jumpTargets.has(sn.fallback)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `external surface "${sn.id}" fallback "${sn.fallback}" not found`,
        path: ["externalSurfaceNodes", si, "fallback"]
      });
    }
  });
  return { screenIds, decisionIds, surfaceIds };
};

// ../contracts/src/manifest/refineManifestScreens.ts
var refineManifestScreens = (manifest, ctx, jumpTargets, screenIds, allFieldKeys) => {
  const layerIds = /* @__PURE__ */ new Set();
  manifest.screens.forEach((screen, screenIdx) => {
    let inputCount = 0;
    const layerIdsForScreen = /* @__PURE__ */ new Set();
    walkScreenLayers(screen, (l) => {
      layerIdsForScreen.add(l.id);
    });
    walkScreenLayers(screen, (l) => {
      if (layerIds.has(l.id)) {
        ctx.addIssue({
          code: external_exports.ZodIssueCode.custom,
          message: `duplicate layer id "${l.id}"`,
          path: ["screens", screenIdx, "regions"]
        });
      }
      layerIds.add(l.id);
      if (isInputLayer(l)) {
        inputCount += 1;
        if (allFieldKeys.has(l.fieldKey)) {
          ctx.addIssue({
            code: external_exports.ZodIssueCode.custom,
            message: `duplicate fieldKey "${l.fieldKey}" across screens or on the same screen`,
            path: ["screens", screenIdx]
          });
        }
        allFieldKeys.set(l.fieldKey, screen.id);
      }
      if (l.kind === "checkbox") {
        if (allFieldKeys.has(l.fieldKey)) {
          ctx.addIssue({
            code: external_exports.ZodIssueCode.custom,
            message: `duplicate fieldKey "${l.fieldKey}" across screens or on the same screen`,
            path: ["screens", screenIdx]
          });
        }
        allFieldKeys.set(l.fieldKey, screen.id);
      }
      if (l.kind === "button" && l.action.kind === "request_os_permission") {
        const fk = permissionCaptureFieldKey(l.action.permissionKey);
        if (!allFieldKeys.has(fk)) allFieldKeys.set(fk, screen.id);
      }
    });
    if (inputCount > 1) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `screen "${screen.id}" has ${inputCount} input layers (max 1 allowed)`,
        path: ["screens", screenIdx, "regions"]
      });
    }
    walkScreenLayersWithLayoutContext(screen, (l, layoutCtx) => {
      if (!layerHasAbsolutePositionAuthored(l)) return;
      if (layoutCtx.isRegionRoot) {
        ctx.addIssue({
          code: external_exports.ZodIssueCode.custom,
          message: `layer "${l.id}" cannot use absolute positioning on a screen region root`,
          path: ["screens", screenIdx, "regions"]
        });
      }
      if (layoutCtx.insideChoiceOption) {
        ctx.addIssue({
          code: external_exports.ZodIssueCode.custom,
          message: `layer "${l.id}" cannot use absolute positioning inside a choice option`,
          path: ["screens", screenIdx, "regions"]
        });
      }
    });
    walkScreenLayersWithLayoutContext(screen, (l, layoutCtx) => {
      if (l.kind === "oauth_provider" && layoutCtx.parentKind !== "oauth_login") {
        ctx.addIssue({
          code: external_exports.ZodIssueCode.custom,
          message: `OAuth button "${l.id}" must be nested under an OAuth login layer`,
          path: ["screens", screenIdx, "regions"]
        });
      }
      if ((l.kind === "email_password_field" || l.kind === "email_password_submit") && layoutCtx.parentKind !== "email_password_auth") {
        ctx.addIssue({
          code: external_exports.ZodIssueCode.custom,
          message: `Layer "${l.id}" (${l.kind}) must be nested under an Email / password login layer`,
          path: ["screens", screenIdx, "regions"]
        });
      }
    });
    const nextDefault = screen.next.default;
    if (nextDefault && !jumpTargets.has(nextDefault)) {
      ctx.addIssue({
        code: external_exports.ZodIssueCode.custom,
        message: `screen "${screen.id}" next.default "${nextDefault}" not found`,
        path: ["screens", screenIdx, "next", "default"]
      });
    }
    walkScreenLayers(screen, (l) => {
      if (l.kind === "single_choice" || l.kind === "multiple_choice") {
        validateChoiceChildrenAndBindings(
          { children: l.children, optionBindings: l.optionBindings },
          ctx
        );
        const knownOptionIds = new Set(l.optionBindings.map((b) => b.optionId));
        for (const cond of l.branching.conditions) {
          if (!screenIds.has(cond.goTo)) {
            ctx.addIssue({
              code: external_exports.ZodIssueCode.custom,
              message: `screen "${screen.id}" branch condition "${cond.choiceId}" -> "${cond.goTo}" not found`,
              path: ["screens", screenIdx]
            });
          }
          if (!knownOptionIds.has(cond.choiceId)) {
            ctx.addIssue({
              code: external_exports.ZodIssueCode.custom,
              message: `screen "${screen.id}" branch condition references unknown choice "${cond.choiceId}"`,
              path: ["screens", screenIdx]
            });
          }
        }
      }
      if (l.kind === "button" && l.action.kind === "go_to_step") {
        if (!screenIds.has(l.action.screenId)) {
          ctx.addIssue({
            code: external_exports.ZodIssueCode.custom,
            message: `screen "${screen.id}" button action go_to_step "${l.action.screenId}" not found`,
            path: ["screens", screenIdx]
          });
        }
      }
      if (l.kind === "button" && l.action.kind === "go_back_one_screen" && manifest.entryScreenId != null && screen.id === manifest.entryScreenId) {
        ctx.addIssue({
          code: external_exports.ZodIssueCode.custom,
          message: `screen "${screen.id}" is the flow entry screen; buttons cannot use go_back_one_screen`,
          path: ["screens", screenIdx]
        });
      }
      if (l.kind === "button" && l.action.kind === "request_os_permission") {
        for (const [label, sid] of [
          ["granted", l.action.outcomes.granted],
          ["denied", l.action.outcomes.denied],
          ["blocked", l.action.outcomes.blocked]
        ]) {
          if (sid === OS_PERMISSION_OUTCOME_END) {
          } else if (sid === OS_PERMISSION_OUTCOME_CONTINUE) {
            const def = screen.next.default;
            if (def != null && !jumpTargets.has(def)) {
              ctx.addIssue({
                code: external_exports.ZodIssueCode.custom,
                message: `screen "${screen.id}" request_os_permission outcomes.${label} uses default next (continue) but screen.next.default "${def}" is not a valid target`,
                path: ["screens", screenIdx]
              });
            }
          } else if (!jumpTargets.has(sid)) {
            ctx.addIssue({
              code: external_exports.ZodIssueCode.custom,
              message: `screen "${screen.id}" request_os_permission outcomes.${label} "${sid}" not found`,
              path: ["screens", screenIdx]
            });
          }
        }
      }
      if (l.kind === "back_button" && l.fallbackScreenId && !screenIds.has(l.fallbackScreenId)) {
        ctx.addIssue({
          code: external_exports.ZodIssueCode.custom,
          message: `screen "${screen.id}" back_button fallback "${l.fallbackScreenId}" not found`,
          path: ["screens", screenIdx]
        });
      }
      if (l.kind === "button" && l.action.kind === "go_back_one_screen" && l.action.fallbackScreenId && !screenIds.has(l.action.fallbackScreenId)) {
        ctx.addIssue({
          code: external_exports.ZodIssueCode.custom,
          message: `screen "${screen.id}" button go_back_one_screen fallback "${l.action.fallbackScreenId}" not found`,
          path: ["screens", screenIdx]
        });
      }
      if (l.kind === "text_input") {
        const minL = l.minLength;
        const maxL = l.maxLength;
        if (minL !== void 0 && maxL !== void 0 && minL > maxL) {
          ctx.addIssue({
            code: external_exports.ZodIssueCode.custom,
            message: `text_input "${l.id}" minLength cannot exceed maxLength`,
            path: ["screens", screenIdx]
          });
        }
      }
      if (l.kind === "scale_input") {
        if (l.min >= l.max) {
          ctx.addIssue({
            code: external_exports.ZodIssueCode.custom,
            message: `scale_input "${l.id}" max must be greater than min`,
            path: ["screens", screenIdx]
          });
        }
        const step = l.step ?? 1;
        if (l.defaultValue !== void 0) {
          if (l.defaultValue < l.min || l.defaultValue > l.max) {
            ctx.addIssue({
              code: external_exports.ZodIssueCode.custom,
              message: `scale_input "${l.id}" defaultValue must be between min and max`,
              path: ["screens", screenIdx]
            });
          } else {
            const rem = (l.defaultValue - l.min) / step;
            if (Math.abs(rem - Math.round(rem)) > 1e-6) {
              ctx.addIssue({
                code: external_exports.ZodIssueCode.custom,
                message: `scale_input "${l.id}" defaultValue must align with min and step`,
                path: ["screens", screenIdx]
              });
            }
          }
        }
      }
    });
    if (screen.animations) {
      const clipIds = /* @__PURE__ */ new Set();
      for (const clip of screen.animations) {
        if (clipIds.has(clip.id)) {
          ctx.addIssue({
            code: external_exports.ZodIssueCode.custom,
            message: `screen "${screen.id}" has duplicate clip id "${clip.id}"`,
            path: ["screens", screenIdx, "animations"]
          });
        }
        clipIds.add(clip.id);
        if (!layerIdsForScreen.has(clip.targetLayerId)) {
          ctx.addIssue({
            code: external_exports.ZodIssueCode.custom,
            message: `clip "${clip.id}" targets layer "${clip.targetLayerId}" not on screen "${screen.id}"`,
            path: ["screens", screenIdx, "animations"]
          });
        }
      }
    }
  });
};

// ../contracts/src/manifest/refineFlowManifest.ts
var refineFlowManifest = (manifest, ctx) => {
  const jumpTargets = buildManifestJumpTargets(manifest);
  const { screenIds } = refineManifestGraph(manifest, ctx, jumpTargets);
  const allFieldKeys = /* @__PURE__ */ new Map();
  refineManifestScreens(manifest, ctx, jumpTargets, screenIds, allFieldKeys);
  manifest.decisionNodes.forEach((dn, di) => {
    for (const fk of collectDecisionFieldKeysFromNode(dn)) {
      if (!allFieldKeys.has(fk)) {
        ctx.addIssue({
          code: external_exports.ZodIssueCode.custom,
          message: `decision "${dn.id}" references unknown fieldKey "${fk}"`,
          path: ["decisionNodes", di, "cases"]
        });
      }
    }
  });
  if (manifest.locales.length > 0 && !manifest.locales.includes(manifest.defaultLocale)) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: `defaultLocale "${manifest.defaultLocale}" must be in locales`,
      path: ["defaultLocale"]
    });
  }
};

// ../contracts/src/manifest/flowManifestSchema.ts
var FlowManifestObjectSchema = FlowManifestObjectBaseSchema.superRefine(refineFlowManifest);
var FlowManifestSchema = FlowManifestObjectSchema;

// ../contracts/src/identity.ts
var SdkIdentitySchema = external_exports.object({
  appUserId: external_exports.string().min(1),
  customUserId: external_exports.string().min(1).optional(),
  sessionId: external_exports.string().min(1).optional()
});
var SdkContextSchema = external_exports.object({
  platform: external_exports.enum(["ios", "android", "web"]).optional(),
  appVersion: external_exports.string().optional(),
  locale: external_exports.string().optional(),
  customProperties: external_exports.record(external_exports.string(), external_exports.union([external_exports.string(), external_exports.number(), external_exports.boolean()])).optional()
});

// ../contracts/src/appIntegrations.ts
var RevenueCatIntegrationSchema = external_exports.object({
  enabled: external_exports.boolean(),
  defaultOfferingId: external_exports.string(),
  defaultPlacementId: external_exports.string()
});
var AppsFlyerIntegrationSchema = external_exports.object({
  enabled: external_exports.boolean()
});
var ResolvedAppIntegrationsSchema = external_exports.object({
  revenuecat: RevenueCatIntegrationSchema,
  appsflyer: AppsFlyerIntegrationSchema
});
var AppIntegrationsSchema = external_exports.object({
  revenuecat: RevenueCatIntegrationSchema.partial().optional(),
  appsflyer: AppsFlyerIntegrationSchema.partial().optional()
}).passthrough();
var DASHBOARD_ATTRIBUTION_INTEGRATION_PROVIDER_IDS = ["appsflyer"];
var DashboardAttributionIntegrationProviderIdSchema = external_exports.enum(
  DASHBOARD_ATTRIBUTION_INTEGRATION_PROVIDER_IDS
);
var AttributionProviderSignalQuerySchema = external_exports.object({
  provider: DashboardAttributionIntegrationProviderIdSchema
});
var AttributionProviderSignalResponseSchema = external_exports.object({
  provider: external_exports.string(),
  signalDetected: external_exports.boolean(),
  /** `false` when ClickHouse was unavailable or the query failed — treat as inconclusive. */
  checked: external_exports.boolean(),
  matchCount: external_exports.number().int().nonnegative(),
  /** ISO-8601 from ClickHouse `max(timestamp)`, or null when there are no matches. */
  lastSeenAt: external_exports.string().nullable()
});

// ../contracts/src/branding.ts
var HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
var BrandColorSchema = external_exports.object({
  id: external_exports.string().uuid(),
  name: external_exports.string().min(1).max(50),
  /** Hex color, e.g. `#0F172A`. Alpha (8 chars) supported. */
  value: external_exports.string().regex(HEX, "must be a hex color (#RRGGBB or #RRGGBBAA)")
});
var BrandGradientStopSchema = external_exports.object({
  /** 0..1 position along the gradient. */
  offset: external_exports.number().min(0).max(1),
  color: external_exports.string().regex(HEX)
});
var BrandGradientSchema = external_exports.object({
  id: external_exports.string().uuid(),
  name: external_exports.string().min(1).max(50),
  type: external_exports.enum(["linear", "radial"]),
  /** Degrees, used when type === 'linear'. 0 = top → bottom (CSS convention). */
  angle: external_exports.number().min(0).max(360).optional(),
  stops: external_exports.array(BrandGradientStopSchema).min(2)
});
var FontStyleSchema = external_exports.object({
  id: external_exports.string().uuid(),
  /** Numeric CSS font-weight, e.g. 100..900. */
  weight: external_exports.number().int().min(100).max(900),
  italic: external_exports.boolean(),
  /** Optional human label (e.g. "Bold Italic"). */
  label: external_exports.string().max(40).optional(),
  /** MediaAsset id of the uploaded font file. */
  mediaAssetId: external_exports.string().uuid().optional(),
  /** Public URL of the uploaded font file (denormalized for SDK consumption). */
  url: external_exports.string().url().optional(),
  /** Original filename — useful for display. */
  filename: external_exports.string().max(200).optional()
});
var FontFamilySchema = external_exports.object({
  id: external_exports.string().uuid(),
  name: external_exports.string().min(1).max(60),
  styles: external_exports.array(FontStyleSchema)
});
var AppIconSchema = external_exports.object({
  url: external_exports.string().url(),
  source: external_exports.enum(["app_store", "play_store", "upload"])
});
var BrandingSchema = external_exports.object({
  /** Optional store / marketing icon for this app (shown in dashboard). */
  appIcon: AppIconSchema.optional(),
  colorPresets: external_exports.array(BrandColorSchema),
  gradientPresets: external_exports.array(BrandGradientSchema),
  fontFamilies: external_exports.array(FontFamilySchema)
});

// ../contracts/src/sdk.ts
var SdkResolveRequestSchema = external_exports.object({
  identity: SdkIdentitySchema,
  context: SdkContextSchema.optional()
});
var SdkResolveResponseSchema = external_exports.object({
  flowId: external_exports.string().uuid(),
  versionId: external_exports.string().uuid(),
  versionNumber: external_exports.number().int().positive(),
  /** Stable id clients can use as an ETag when re-fetching. */
  assignmentVersion: external_exports.number().int().nonnegative(),
  environment: external_exports.enum(["test", "live"]),
  /** PublicId of the channel that resolved this request (for client cache keys). */
  channelId: external_exports.string(),
  experimentId: external_exports.string().uuid().nullable(),
  variantId: external_exports.string().nullable(),
  manifest: FlowManifestSchema,
  mediaMap: external_exports.record(external_exports.string(), external_exports.string().url()),
  /** App branding (gradient presets, etc.) when present on the app record. */
  branding: BrandingSchema.optional(),
  /** Workspace-gated SDK capabilities for this resolve. */
  features: external_exports.object({
    /** When false, the SDK should not start MMP attribution listeners (Indie / lapsed billing). */
    attribution: external_exports.boolean()
  }).optional(),
  /** Per-app integration toggles from the dashboard; SDK should respect these after resolve. */
  integrations: ResolvedAppIntegrationsSchema
});
var SdkResolveAllResponseSchema = external_exports.object({
  channels: external_exports.array(SdkResolveResponseSchema)
});
var SdkResolveAssignmentSchema = SdkResolveResponseSchema.omit({
  manifest: true,
  mediaMap: true
});
var FlowTerminalCorrelationSchema = external_exports.object({
  channelId: external_exports.string(),
  flowId: external_exports.string().uuid(),
  versionId: external_exports.string().uuid(),
  assignmentVersion: external_exports.number().int().nonnegative(),
  environment: external_exports.enum(["test", "live"]),
  experimentId: external_exports.string().uuid().nullable(),
  variantId: external_exports.string().nullable()
});
var FlowTerminalDeviceSchema = external_exports.object({
  locale: external_exports.string(),
  platform: external_exports.string(),
  appVersion: external_exports.string().optional(),
  customProperties: external_exports.record(external_exports.string(), external_exports.union([external_exports.string(), external_exports.number(), external_exports.boolean()])).optional()
});
var FlowTerminalSnapshotSchema = external_exports.object({
  schemaVersion: external_exports.literal(1),
  terminal: external_exports.enum(["completed", "abandoned"]),
  /** When the flow reached a terminal status (`FlowState.completedAt`). */
  occurredAt: external_exports.string().nullable(),
  correlation: FlowTerminalCorrelationSchema,
  subject: SdkIdentitySchema,
  device: FlowTerminalDeviceSchema,
  /**
   * Normalized field-key → value summary (same shape as analytics completion map).
   * Includes every capture field from visited screens (input layers, checkboxes, OS permission keys):
   * keys with no recorded response appear as `null`. OAuth / email-password auth keys are omitted;
   * use auth provider callbacks for those.
   */
  answers: external_exports.record(external_exports.string(), external_exports.unknown()),
  /** Single merged SDK/decision context at terminal time (host + attribution + patches). */
  traits: external_exports.record(external_exports.string(), external_exports.unknown()),
  /** Walked screen / surface node ids when `includePathInTerminalPayload` is true. */
  path: external_exports.array(external_exports.string()).optional(),
  /** Raw step responses (minus auth keys) when `includeAnswerDetailInTerminalPayload` is true. */
  answersDetail: external_exports.record(external_exports.string(), external_exports.unknown()).optional(),
  manifest: FlowManifestSchema.optional()
});

// ../contracts/src/events.ts
var EventNameSchema = external_exports.enum(EVENT_NAMES);
var SdkEventSchema = external_exports.object({
  eventId: external_exports.string().uuid(),
  name: EventNameSchema,
  timestamp: external_exports.string().datetime(),
  flowId: external_exports.string().uuid(),
  /** Resolved version the SDK was rendering when the event occurred. */
  versionId: external_exports.string().uuid(),
  experimentId: external_exports.string().uuid().nullable().optional(),
  variantId: external_exports.string().nullable().optional(),
  stepId: external_exports.string().nullable().optional(),
  identity: SdkIdentitySchema,
  context: SdkContextSchema.optional(),
  properties: external_exports.record(
    external_exports.string(),
    external_exports.union([external_exports.string(), external_exports.number(), external_exports.boolean(), external_exports.null(), external_exports.array(external_exports.string())])
  ).optional(),
  /** for text_submitted, marks this value as sensitive so backend redacts */
  fieldClassification: external_exports.enum(["safe", "sensitive"]).optional()
});
var SdkEventBatchSchema = external_exports.object({
  events: external_exports.array(SdkEventSchema).min(1).max(500)
});

// ../contracts/src/iapPurchase.ts
var IapPurchasePeriodTypeSchema = external_exports.enum(["normal", "intro", "trial"]);
var IapPurchaseEventPropertiesSchema = external_exports.object({
  /** External surface provider that produced the purchase. */
  provider: external_exports.literal("revenuecat"),
  /** Manifest node id of the surface (e.g. `surf_paywall_welcome`). */
  surface_node_id: external_exports.string().min(1).max(128),
  /** Store product identifier (e.g. `pro_annual`). */
  product_id: external_exports.string().min(1).max(256),
  /** Optional RevenueCat offering id (manifest config or RC metadata). */
  offering_id: external_exports.string().min(1).max(128).optional(),
  /** Optional RevenueCat package identifier within the offering (e.g. `$rc_annual`). */
  package_id: external_exports.string().min(1).max(128).optional(),
  /** Localized gross store price at purchase time (non-negative). */
  price: external_exports.number().nonnegative().optional(),
  /** ISO 4217 currency code (e.g. `USD`, `EUR`). Stored uppercase. */
  currency: external_exports.string().regex(/^[A-Za-z]{3}$/, "currency must be a 3-letter ISO 4217 code").transform((s) => s.toUpperCase()).optional(),
  /** Period type when known. */
  period_type: IapPurchasePeriodTypeSchema.optional()
}).refine(
  (v) => v.price === void 0 === (v.currency === void 0),
  {
    message: "price and currency must be provided together",
    path: ["price"]
  }
);
var IapPurchaseStoredPropertiesSchema = IapPurchaseEventPropertiesSchema.innerType().extend({
  /** USD-normalized price computed server-side from daily FX rates. Null when FX missing. */
  price_usd: external_exports.number().nonnegative().nullable().optional(),
  /** True when client provided price + currency but FX conversion was unavailable. */
  fx_unavailable: external_exports.boolean().optional()
});

// ../contracts/src/canvasEditorGates.ts
var CanvasEditorGatesResolvedSchema = external_exports.object({
  lottie: external_exports.boolean(),
  oauthLogin: external_exports.boolean(),
  oauthProviderPreset: external_exports.boolean(),
  oauthProviderCustom: external_exports.boolean(),
  emailPasswordAuth: external_exports.boolean(),
  emailPasswordField: external_exports.boolean(),
  emailPasswordSubmit: external_exports.boolean(),
  requestOsPermission: external_exports.boolean()
});
var ALL_TRUE = {
  lottie: true,
  oauthLogin: true,
  oauthProviderPreset: true,
  oauthProviderCustom: true,
  emailPasswordAuth: true,
  emailPasswordField: true,
  emailPasswordSubmit: true,
  requestOsPermission: true
};
var CanvasEditorGatesPatchSchema = external_exports.object({
  lottie: external_exports.boolean().optional(),
  oauthLogin: external_exports.boolean().optional(),
  oauthProviderPreset: external_exports.boolean().optional(),
  oauthProviderCustom: external_exports.boolean().optional(),
  emailPasswordAuth: external_exports.boolean().optional(),
  emailPasswordField: external_exports.boolean().optional(),
  emailPasswordSubmit: external_exports.boolean().optional(),
  requestOsPermission: external_exports.boolean().optional()
}).strict();
var parseCanvasEditorGates = (raw) => {
  if (raw == null) return { ...ALL_TRUE };
  const parsed = CanvasEditorGatesPatchSchema.safeParse(raw);
  if (!parsed.success) return { ...ALL_TRUE };
  return { ...ALL_TRUE, ...parsed.data };
};
var layerViolationMessage = (screenId, layerId, label) => `Screen "${screenId}": ${label} (layer "${layerId}") is disabled for this app in canvas editor settings.`;
var buttonOsPermissionMessage = (screenId, layerId) => `Screen "${screenId}": request OS permission button actions are disabled for this app (layer "${layerId}").`;
var collectCanvasGateViolations = (manifest, gates) => {
  const issues = [];
  for (const screen of manifest.screens) {
    walkScreenLayers(screen, (l) => {
      if ((l.kind === "lottie" || l.kind === "video") && !gates.lottie) {
        issues.push(
          layerViolationMessage(
            screen.id,
            l.id,
            l.kind === "video" ? "Video layers" : "Lottie layers"
          )
        );
      }
      if (l.kind === "oauth_login" && !gates.oauthLogin) {
        issues.push(layerViolationMessage(screen.id, l.id, "OAuth login layers"));
      }
      if (l.kind === "oauth_provider") {
        if (l.variant === "preset" && !gates.oauthProviderPreset) {
          issues.push(layerViolationMessage(screen.id, l.id, "OAuth provider (preset) layers"));
        }
        if (l.variant === "custom" && !gates.oauthProviderCustom) {
          issues.push(layerViolationMessage(screen.id, l.id, "OAuth provider (custom) layers"));
        }
      }
      if (l.kind === "email_password_auth" && !gates.emailPasswordAuth) {
        issues.push(layerViolationMessage(screen.id, l.id, "Email/password auth layers"));
      }
      if (l.kind === "email_password_field" && !gates.emailPasswordField) {
        issues.push(layerViolationMessage(screen.id, l.id, "Email/password field layers"));
      }
      if (l.kind === "email_password_submit" && !gates.emailPasswordSubmit) {
        issues.push(layerViolationMessage(screen.id, l.id, "Email/password submit layers"));
      }
      if (l.kind === "button" && l.action.kind === "request_os_permission" && !gates.requestOsPermission) {
        issues.push(buttonOsPermissionMessage(screen.id, l.id));
      }
    });
  }
  return issues;
};

// ../flow-runtime/src/validation.ts
var validateManifest = (data) => {
  const migrated = migrateLegacyManifest(data);
  const result = FlowManifestSchema.safeParse(migrated);
  if (result.success) return { ok: true, manifest: result.data };
  return {
    ok: false,
    issues: result.error.issues.map((i) => {
      const screenIdx = i.path[1];
      const screenId = typeof screenIdx === "number" && Array.isArray(data?.screens) ? data.screens[screenIdx]?.id : void 0;
      return {
        stepId: screenId ?? null,
        path: [...i.path],
        message: i.message,
        code: i.code
      };
    })
  };
};
var validatePublishable = (manifest) => {
  const issues = [];
  const warnings = [];
  if (manifest.screens.length === 0) {
    issues.push({
      path: ["screens"],
      message: "flow must have at least one screen",
      code: "flow.no_screens"
    });
  }
  if (manifest.entryScreenId == null && manifest.screens.length > 0) {
    issues.push({
      path: ["entryScreenId"],
      message: "flow entry is not connected \u2014 connect the entry node on the canvas to a screen, decision, or integration step before publishing",
      code: "flow.no_entry"
    });
  }
  const screenMap = new Map(
    manifest.screens.map((s) => [s.id, s])
  );
  const decisionMap = new Map((manifest.decisionNodes ?? []).map((d) => [d.id, d]));
  const surfaceMap = new Map((manifest.externalSurfaceNodes ?? []).map((s) => [s.id, s]));
  const enqueueGraphNode = (t) => {
    if (t === null || t === void 0) return;
    if (screenMap.has(t) || decisionMap.has(t) || surfaceMap.has(t)) {
      queue.push(t);
    }
  };
  const reachable = /* @__PURE__ */ new Set();
  const queue = [];
  if (manifest.entryScreenId != null) {
    queue.push(manifest.entryScreenId);
  }
  let canTerminate = false;
  while (queue.length) {
    const id = queue.shift();
    if (reachable.has(id)) continue;
    reachable.add(id);
    const decision = decisionMap.get(id);
    if (decision) {
      for (const c of decision.cases) {
        if (c.next != null) enqueueGraphNode(c.next);
      }
      if (decision.elseNext != null) enqueueGraphNode(decision.elseNext);
      continue;
    }
    const surface = surfaceMap.get(id);
    if (surface) {
      const outcomeTargets = Object.values(surface.outcomes);
      if (outcomeTargets.some((t) => t === EXTERNAL_SURFACE_NO_NEXT) || surface.fallback === EXTERNAL_SURFACE_NO_NEXT) {
        canTerminate = true;
      }
      if (surface.fallback != null && surface.fallback !== EXTERNAL_SURFACE_NO_NEXT) {
        enqueueGraphNode(surface.fallback);
      }
      for (const t of outcomeTargets) {
        if (t != null && t !== EXTERNAL_SURFACE_NO_NEXT) enqueueGraphNode(t);
      }
      continue;
    }
    const screen = screenMap.get(id);
    if (!screen) continue;
    const targets = [];
    targets.push(screen.next.default);
    const input = findInputLayer(screen);
    if (input && (input.kind === "single_choice" || input.kind === "multiple_choice") && input.branching.enabled) {
      for (const c of input.branching.conditions) targets.push(c.goTo);
    }
    walkScreen(screen, (l) => {
      if (l.kind === "button" && l.action.kind === "go_to_step") {
        targets.push(l.action.screenId);
      }
      if (l.kind === "button" && l.action.kind === "end_flow") {
        targets.push(null);
      }
      if (l.kind === "button" && l.action.kind === "request_app_review") {
        targets.push(screen.next.default);
      }
      if (l.kind === "button" && l.action.kind === "request_os_permission") {
        const o = l.action.outcomes;
        for (const t of [o.granted, o.denied, o.blocked]) {
          if (t === OS_PERMISSION_OUTCOME_END) {
            targets.push(null);
          } else if (t === OS_PERMISSION_OUTCOME_CONTINUE) {
            targets.push(screen.next.default);
          } else {
            targets.push(t);
          }
        }
      }
      if (l.kind === "button" && l.action.kind === "go_back_one_screen" && l.action.fallbackScreenId) {
        targets.push(l.action.fallbackScreenId);
      }
      if (l.kind === "back_button" && l.fallbackScreenId) {
        targets.push(l.fallbackScreenId);
      }
    });
    if (targets.every((t) => t === null || t === void 0)) {
      canTerminate = true;
    }
    for (const t of targets) {
      if (t === null || t === void 0) {
        canTerminate = true;
      } else {
        enqueueGraphNode(t);
      }
    }
  }
  if (manifest.entryScreenId != null && !canTerminate) {
    issues.push({
      path: ["screens"],
      message: "no path from entry screen reaches completion",
      code: "flow.no_completion_path"
    });
  }
  for (const screen of manifest.screens) {
    if (manifest.entryScreenId != null && !reachable.has(screen.id)) {
      warnings.push({
        stepId: screen.id,
        path: ["screens", screen.id],
        message: `screen "${screen.id}" is not reachable from entry`,
        code: "screen.unreachable"
      });
    }
  }
  for (const sn of manifest.externalSurfaceNodes ?? []) {
    if (manifest.entryScreenId != null && !reachable.has(sn.id)) {
      warnings.push({
        stepId: null,
        path: ["externalSurfaceNodes", sn.id],
        message: `external surface "${sn.name ?? sn.id}" is not reachable from entry`,
        code: "external_surface.unreachable"
      });
    }
  }
  for (const dn of manifest.decisionNodes ?? []) {
    if (manifest.entryScreenId != null && !reachable.has(dn.id)) {
      warnings.push({
        stepId: null,
        path: ["decisionNodes", dn.id],
        message: `decision "${dn.id}" is not reachable from entry`,
        code: "decision.unreachable"
      });
    }
    for (const c of dn.cases) {
      if (c.next == null) {
        issues.push({
          stepId: null,
          path: ["decisionNodes", dn.id, "cases", c.id],
          message: `decision "${dn.id}" segment "${c.name ?? c.id}" must have a next step before publishing`,
          code: "decision.incomplete_branches"
        });
      }
    }
    if (dn.elseNext == null) {
      issues.push({
        stepId: null,
        path: ["decisionNodes", dn.id, "elseNext"],
        message: `decision "${dn.id}" needs an "everyone else" branch connected before publishing`,
        code: "decision.incomplete_branches"
      });
    }
  }
  return { ok: issues.length === 0, issues, warnings };
};

// ../flow-runtime/src/flowBuilderRules.ts
var FIELD_KEY_RE2 = /^[a-z][a-z0-9_]*$/;
var styleBucketHasColor = (s) => s !== void 0 && s.color !== void 0;
var textLayerHasAuthoringColor = (l) => {
  if (styleBucketHasColor(l.style)) return true;
  const bp = l.styleBreakpoints;
  if (!bp) return false;
  return styleBucketHasColor(bp.sm) || styleBucketHasColor(bp.md) || styleBucketHasColor(bp.lg) || styleBucketHasColor(bp.xl) || styleBucketHasColor(bp["2xl"]);
};
var iconLayerHasAuthoringColor = (l) => {
  if (styleBucketHasColor(l.style)) return true;
  const bp = l.styleBreakpoints;
  if (!bp) return false;
  return styleBucketHasColor(bp.sm) || styleBucketHasColor(bp.md) || styleBucketHasColor(bp.lg) || styleBucketHasColor(bp.xl) || styleBucketHasColor(bp["2xl"]);
};
var collectFlowBuilderIssues = (manifest) => {
  const issues = [];
  const fieldKeyOwners = /* @__PURE__ */ new Map();
  const screenIds = new Set(manifest.screens.map((s) => s.id));
  const jumpTargetIds = /* @__PURE__ */ new Set([
    ...screenIds,
    ...manifest.decisionNodes.map((d) => d.id),
    ...(manifest.externalSurfaceNodes ?? []).map((n) => n.id)
  ]);
  if (manifest.entryScreenId == null) {
    if (manifest.screens.length > 0) {
      issues.push(
        "Connect the flow entry node on the canvas to where the flow starts (a screen, decision, or integration step)."
      );
    }
  } else if (!jumpTargetIds.has(manifest.entryScreenId)) {
    issues.push(`Flow entry target "${manifest.entryScreenId}" does not exist.`);
  }
  for (const screen of manifest.screens) {
    let inputCount = 0;
    let oauthLoginLayerCount = 0;
    let emailPasswordAuthLayerCount = 0;
    let needsManualSubmit = false;
    let hasContinueButton = false;
    const screenLabel = screen.name || screen.id;
    const mediaLayerIds = /* @__PURE__ */ new Set();
    const buttonLayerIds = /* @__PURE__ */ new Set();
    const shellPlaybackId = screenBackgroundPlaybackId(screen.id);
    const shellFill = screen.containerStyle?.backgroundFill;
    const shellVideoFill = shellFill?.kind === "video" ? shellFill : void 0;
    walkScreen(screen, (l) => {
      if (l.kind === "button") buttonLayerIds.add(l.id);
    });
    if (shellFill?.kind === "image" || shellFill?.kind === "video") {
      if (!shellFill.media?.mediaAssetId) {
        issues.push(
          `Screen "${screenLabel}" ${shellFill.kind} background needs a media asset.`
        );
      }
    }
    if (shellVideoFill) {
      if (shellVideoFill.autoPlay === false) {
        const triggerId = shellVideoFill.triggerLayerId?.trim();
        if (!triggerId) {
          issues.push(
            `Screen "${screenLabel}" background video needs a trigger button when auto-play is off.`
          );
        } else if (!buttonLayerIds.has(triggerId)) {
          issues.push(
            `Screen "${screenLabel}" background video references a missing trigger button "${triggerId}".`
          );
        } else {
          const btn = findLayerById(screen, triggerId);
          if (!btn || btn.kind !== "button") {
            issues.push(
              `Screen "${screenLabel}" background video trigger must be a button layer.`
            );
          } else if (btn.action.kind !== "play_media") {
            issues.push(
              `Screen "${screenLabel}" background video trigger button must use On Tap \u2192 Play media.`
            );
          } else if (!btn.action.targetLayerIds.includes(shellPlaybackId)) {
            issues.push(
              `Screen "${screenLabel}" background video is not listed on trigger button "${triggerId}".`
            );
          }
        }
      } else if (shellVideoFill.triggerLayerId) {
        const btn = findLayerById(screen, shellVideoFill.triggerLayerId);
        if (btn?.kind === "button" && btn.action.kind === "play_media" && !btn.action.targetLayerIds.includes(shellPlaybackId)) {
          issues.push(
            `Screen "${screenLabel}" background video trigger button does not target the screen background.`
          );
        }
      }
    }
    walkScreen(screen, (l) => {
      if (l.kind === "lottie" || l.kind === "video") mediaLayerIds.add(l.id);
      if (l.kind === "oauth_login") {
        oauthLoginLayerCount += 1;
      }
      if (l.kind === "email_password_auth") {
        emailPasswordAuthLayerCount += 1;
      }
      if (l.kind === "button" && l.action.kind === "continue") {
        hasContinueButton = true;
      }
      if (isInputLayer(l)) {
        inputCount += 1;
        if (l.kind === "multiple_choice" || l.kind === "text_input" || l.kind === "scale_input") {
          needsManualSubmit = true;
        }
        const key = l.fieldKey;
        const label = screen.name || screen.id;
        if (!key || key.length === 0) {
          issues.push(`Screen "${label}" is missing a variable name (fieldKey).`);
        } else if (!FIELD_KEY_RE2.test(key)) {
          issues.push(
            `Screen "${label}" has an invalid variable name "${key}" \u2014 use snake_case (a\u2013z, 0\u20139, _).`
          );
        } else {
          const owners = fieldKeyOwners.get(key) ?? [];
          owners.push(label);
          fieldKeyOwners.set(key, owners);
        }
        if (l.kind === "single_choice" || l.kind === "multiple_choice") {
          for (const cond of l.branching.conditions) {
            if (!screenIds.has(cond.goTo)) {
              issues.push(
                `Screen "${label}" branches choice "${cond.choiceId}" to a missing screen "${cond.goTo}".`
              );
            }
          }
        }
      }
      if (l.kind === "button" && l.action.kind === "go_to_step") {
        if (!screenIds.has(l.action.screenId)) {
          issues.push(
            `Button "${l.name || l.id}" on screen "${screen.name || screen.id}" targets a missing screen "${l.action.screenId}".`
          );
        }
      }
      if (l.kind === "button" && l.action.kind === "request_app_review") {
        const def = screen.next?.default;
        if (def == null) {
          issues.push(
            `Button "${l.name || l.id}" on screen "${screen.name || screen.id}" requests app review but the screen has no default next step.`
          );
        } else if (!screenIds.has(def) && !manifest.decisionNodes?.some((d) => d.id === def)) {
          issues.push(
            `Button "${l.name || l.id}" on screen "${screen.name || screen.id}" requests app review but default next "${def}" is missing.`
          );
        }
      }
      if (l.kind === "button" && l.action.kind === "request_os_permission") {
        const o = l.action.outcomes;
        for (const slot of ["granted", "denied", "blocked"]) {
          const sid = o[slot];
          if (sid === OS_PERMISSION_OUTCOME_END) {
            continue;
          }
          if (sid === OS_PERMISSION_OUTCOME_CONTINUE) {
            const def = screen.next?.default;
            if (def == null) {
              continue;
            }
            if (!screenIds.has(def) && !manifest.decisionNodes?.some((d) => d.id === def)) {
              issues.push(
                `Button "${l.name || l.id}" on screen "${screen.name || screen.id}" (${slot}) continues to missing target "${def}".`
              );
            }
            continue;
          }
          if (!screenIds.has(sid)) {
            issues.push(
              `Button "${l.name || l.id}" on screen "${screen.name || screen.id}" (${slot}) targets a missing screen "${sid}".`
            );
          }
        }
      }
      if (l.kind === "back_button" && l.fallbackScreenId && !screenIds.has(l.fallbackScreenId)) {
        issues.push(
          `Back button "${l.name || l.id}" on screen "${screen.name || screen.id}" uses a missing fallback screen "${l.fallbackScreenId}".`
        );
      }
      if (l.kind === "button" && l.action.kind === "go_back_one_screen" && l.action.fallbackScreenId) {
        if (!screenIds.has(l.action.fallbackScreenId)) {
          issues.push(
            `Button "${l.name || l.id}" on screen "${screen.name || screen.id}" uses a missing fallback screen "${l.action.fallbackScreenId}".`
          );
        }
      }
      if (l.kind === "lottie" || l.kind === "video") {
        const media = l;
        if (media.autoPlay === false) {
          const triggerId = media.triggerLayerId?.trim();
          if (!triggerId) {
            issues.push(
              `${media.kind === "video" ? "Video" : "Lottie"} "${media.name || media.id}" on screen "${screenLabel}" needs a trigger button when auto-play is off.`
            );
          } else if (!buttonLayerIds.has(triggerId)) {
            issues.push(
              `${media.kind === "video" ? "Video" : "Lottie"} "${media.name || media.id}" on screen "${screenLabel}" references a missing trigger button "${triggerId}".`
            );
          } else {
            const btn = findLayerById(screen, triggerId);
            if (!btn || btn.kind !== "button") {
              issues.push(
                `${media.kind === "video" ? "Video" : "Lottie"} "${media.name || media.id}" on screen "${screenLabel}" trigger must be a button layer.`
              );
            } else if (btn.action.kind !== "play_media") {
              issues.push(
                `${media.kind === "video" ? "Video" : "Lottie"} "${media.name || media.id}" on screen "${screenLabel}" trigger button must use On Tap \u2192 Play media (or pick the trigger again from this screen).`
              );
            } else if (!btn.action.targetLayerIds.includes(media.id)) {
              issues.push(
                `${media.kind === "video" ? "Video" : "Lottie"} "${media.name || media.id}" on screen "${screenLabel}" is not listed on trigger button "${triggerId}".`
              );
            }
          }
        } else if (media.triggerLayerId) {
          const btn = findLayerById(screen, media.triggerLayerId);
          if (btn?.kind === "button" && btn.action.kind === "play_media" && !btn.action.targetLayerIds.includes(media.id)) {
            issues.push(
              `${media.kind === "video" ? "Video" : "Lottie"} "${media.name || media.id}" on screen "${screenLabel}" trigger button does not target this layer.`
            );
          }
        }
      }
      if (l.kind === "button" && l.action.kind === "play_media") {
        for (const targetId of l.action.targetLayerIds) {
          if (targetId === shellPlaybackId) {
            if (!shellVideoFill) {
              issues.push(
                `Button "${l.name || l.id}" on screen "${screenLabel}" targets screen background video, but this screen has no video background.`
              );
            }
            continue;
          }
          if (isScreenBackgroundPlaybackId(targetId)) {
            issues.push(
              `Button "${l.name || l.id}" on screen "${screenLabel}" play-media target "${targetId}" is not valid for this screen.`
            );
            continue;
          }
          if (!mediaLayerIds.has(targetId)) {
            issues.push(
              `Button "${l.name || l.id}" on screen "${screenLabel}" play-media target "${targetId}" must be a Lottie or video layer on this screen, or screen background video.`
            );
          }
        }
      }
    });
    if (oauthLoginLayerCount > 0 && inputCount > 0) {
      issues.push(
        `Screen "${screen.name || screen.id}" cannot combine OAuth Login with input layers (${inputCount}). Split them onto separate screens.`
      );
    }
    if (emailPasswordAuthLayerCount > 0 && inputCount > 0) {
      issues.push(
        `Screen "${screen.name || screen.id}" cannot combine Email / password login with input layers (${inputCount}). Split them onto separate screens.`
      );
    }
    if (oauthLoginLayerCount > 0 && emailPasswordAuthLayerCount > 0) {
      issues.push(
        `Screen "${screen.name || screen.id}" cannot combine OAuth Login with Email / password login. Use one login block per screen.`
      );
    }
    if (emailPasswordAuthLayerCount > 1) {
      issues.push(
        `Screen "${screen.name || screen.id}" has ${emailPasswordAuthLayerCount} Email / password login layers; only one is allowed per screen.`
      );
    }
    if (oauthLoginLayerCount > 1) {
      issues.push(
        `Screen "${screen.name || screen.id}" has ${oauthLoginLayerCount} OAuth Login layers; only one is allowed per screen.`
      );
    }
    if (inputCount > 1) {
      issues.push(
        `Screen "${screen.name || screen.id}" has ${inputCount} input layers; only one is allowed.`
      );
    }
    if (needsManualSubmit && !hasContinueButton) {
      issues.push(
        `Screen "${screen.name || screen.id}" has a multiple_choice, text_input, or scale_input but no Button with action "continue". Add a Continue button so users can submit.`
      );
    }
  }
  for (const [key, owners] of fieldKeyOwners) {
    if (owners.length > 1) {
      issues.push(`Variable name "${key}" is used by multiple screens: ${owners.join(", ")}.`);
    }
  }
  for (const screen of manifest.screens) {
    walkScreen(screen, (l) => {
      const screenLabel = screen.name || screen.id;
      if (l.kind === "text" && !textLayerHasAuthoringColor(l)) {
        issues.push(
          `Screen "${screenLabel}": text layer "${l.id}" must set style.color for light and dark (CSS inheritance does not apply on native).`
        );
      }
      if (l.kind === "icon" && !iconLayerHasAuthoringColor(l)) {
        issues.push(
          `Screen "${screenLabel}": icon layer "${l.id}" must set style.color for light and dark.`
        );
      }
    });
  }
  return issues;
};

// ../flow-runtime/src/brandGradientManifestIssues.ts
var BP_KEYS = ["sm", "md", "lg", "xl", "2xl"];
var themedStrings = (tc) => {
  if (tc === void 0) return [];
  if (typeof tc === "string") return [tc];
  const out = [];
  if (tc.light !== void 0) out.push(tc.light);
  if (tc.dark !== void 0) out.push(tc.dark);
  return out;
};
var pushIssue = (issues, stepId, layerId, field, message, code) => {
  issues.push({
    stepId,
    path: ["screens", stepId, layerId, field],
    message,
    code
  });
};
var checkThemed = (issues, stepId, layerId, field, tc, allowGradient, branding) => {
  for (const s of themedStrings(tc)) {
    if (isBrandGradientToken(s)) {
      if (!allowGradient) {
        pushIssue(
          issues,
          stepId,
          layerId,
          field,
          `Brand gradient presets can only be used on background fills (not ${field}).`,
          "brand_gradient.disallowed_field"
        );
        return;
      }
      if (branding !== void 0 && resolveBrandGradientToken(branding, s) === void 0) {
        pushIssue(
          issues,
          stepId,
          layerId,
          field,
          `Brand gradient preset not found: ${s}`,
          "brand_gradient.unknown_preset"
        );
      }
      continue;
    }
    if (isStoredLinearGradientCss(s)) {
      if (!allowGradient) {
        pushIssue(
          issues,
          stepId,
          layerId,
          field,
          `CSS linear gradients can only be used on background fills in v1 (not ${field}).`,
          "brand_gradient.linear_css_disallowed_field"
        );
        return;
      }
    }
  }
};
var checkCommon = (issues, stepId, layerId, fieldPrefix, s, branding) => {
  if (!s) return;
  checkThemed(issues, stepId, layerId, `${fieldPrefix}background`, s.background, true, branding);
  checkThemed(issues, stepId, layerId, `${fieldPrefix}border.color`, s.border?.color, false, branding);
  checkThemed(issues, stepId, layerId, `${fieldPrefix}shadow.color`, s.shadow?.color, false, branding);
};
var checkTextLike = (issues, stepId, layerId, fieldPrefix, s, branding) => {
  if (!s) return;
  checkCommon(issues, stepId, layerId, fieldPrefix, s, branding);
  checkThemed(issues, stepId, layerId, `${fieldPrefix}color`, s.color, false, branding);
};
var walkCommonBreakpoints = (issues, stepId, layerId, base, breakpoints, branding) => {
  checkCommon(issues, stepId, layerId, "style.", base, branding);
  if (!breakpoints) return;
  for (const k of BP_KEYS) {
    const patch = breakpoints[k];
    if (patch) checkCommon(issues, stepId, layerId, `styleBreakpoints.${k}.`, patch, branding);
  }
};
var walkTextBreakpoints = (issues, stepId, layerId, base, breakpoints, branding) => {
  checkTextLike(issues, stepId, layerId, "style.", base, branding);
  if (!breakpoints) return;
  for (const k of BP_KEYS) {
    const patch = breakpoints[k];
    if (patch) checkTextLike(issues, stepId, layerId, `styleBreakpoints.${k}.`, patch, branding);
  }
};
var checkCheckboxGlyph = (issues, stepId, layerId, suffix, g, branding) => {
  if (!g) return;
  const p = suffix ? `${suffix}.` : "";
  checkThemed(issues, stepId, layerId, `${p}background`, g.background, true, branding);
  checkThemed(issues, stepId, layerId, `${p}border.color`, g.border?.color, false, branding);
  checkThemed(issues, stepId, layerId, `${p}shadow.color`, g.shadow?.color, false, branding);
  checkThemed(issues, stepId, layerId, `${p}checkColor`, g.checkColor, false, branding);
};
var checkCarouselPageControl = (issues, stepId, layerId, pc, branding) => {
  if (!pc) return;
  const ind = pc.indicators;
  if (ind) {
    checkThemed(issues, stepId, layerId, "pageControl.indicators.defaultColor", ind.defaultColor, false, branding);
    checkThemed(issues, stepId, layerId, "pageControl.indicators.activeColor", ind.activeColor, false, branding);
    checkThemed(issues, stepId, layerId, "pageControl.indicators.border.color", ind.border?.color, false, branding);
    checkThemed(
      issues,
      stepId,
      layerId,
      "pageControl.indicators.activeBorder.color",
      ind.activeBorder?.color,
      false,
      branding
    );
  }
  checkThemed(issues, stepId, layerId, "pageControl.border.color", pc.border?.color, false, branding);
  checkThemed(issues, stepId, layerId, "pageControl.shadow.color", pc.shadow?.color, false, branding);
};
var scanLayer = (issues, screen, layer, branding) => {
  const stepId = screen.id;
  const id = layer.id;
  switch (layer.kind) {
    case "stack":
      walkCommonBreakpoints(issues, stepId, id, layer.style, layer.styleBreakpoints, branding);
      checkCommon(issues, stepId, id, "selectedStyle.", layer.selectedStyle, branding);
      return;
    case "text":
      walkTextBreakpoints(issues, stepId, id, layer.style, layer.styleBreakpoints, branding);
      return;
    case "image":
      walkCommonBreakpoints(issues, stepId, id, layer.style, layer.styleBreakpoints, branding);
      return;
    case "lottie":
    case "video":
      walkCommonBreakpoints(issues, stepId, id, layer.style, layer.styleBreakpoints, branding);
      return;
    case "icon": {
      const base = layer.style;
      checkCommon(issues, stepId, id, "style.", base, branding);
      checkThemed(issues, stepId, id, "style.color", base?.color, false, branding);
      const bp = layer.styleBreakpoints;
      if (bp) {
        for (const k of BP_KEYS) {
          const patch = bp[k];
          if (!patch) continue;
          checkCommon(issues, stepId, id, `styleBreakpoints.${k}.`, patch, branding);
          checkThemed(issues, stepId, id, `styleBreakpoints.${k}.color`, patch.color, false, branding);
        }
      }
      return;
    }
    case "button":
    case "back_button": {
      const base = layer.style;
      checkTextLike(issues, stepId, id, "style.", base, branding);
      const bp = layer.styleBreakpoints;
      if (bp) {
        for (const k of BP_KEYS) {
          const patch = bp[k];
          if (patch) checkTextLike(issues, stepId, id, `styleBreakpoints.${k}.`, patch, branding);
        }
      }
      return;
    }
    case "hyperlink":
      walkCommonBreakpoints(issues, stepId, id, layer.style, layer.styleBreakpoints, branding);
      return;
    case "progress":
      checkCommon(issues, stepId, id, "style.", layer.style, branding);
      checkThemed(issues, stepId, id, "trackColor", layer.trackColor, false, branding);
      checkThemed(issues, stepId, id, "fillColor", layer.fillColor, false, branding);
      return;
    case "loader":
      checkCommon(issues, stepId, id, "style.", layer.style, branding);
      checkThemed(issues, stepId, id, "trackColor", layer.trackColor, false, branding);
      checkThemed(issues, stepId, id, "fillColor", layer.fillColor, false, branding);
      return;
    case "counter":
      walkTextBreakpoints(issues, stepId, id, layer.style, layer.styleBreakpoints, branding);
      return;
    case "checkbox":
      checkCheckboxGlyph(issues, stepId, id, "uncheckedStyle", layer.uncheckedStyle, branding);
      checkCheckboxGlyph(issues, stepId, id, "checkedStyle", layer.checkedStyle, branding);
      return;
    case "carousel":
      walkCommonBreakpoints(issues, stepId, id, layer.style, void 0, branding);
      checkCarouselPageControl(issues, stepId, id, layer.pageControl, branding);
      return;
    case "single_choice":
    case "multiple_choice":
      return;
    case "text_input":
      walkCommonBreakpoints(issues, stepId, id, layer.style, void 0, branding);
      return;
    case "scale_input":
      walkCommonBreakpoints(issues, stepId, id, layer.style, void 0, branding);
      checkThemed(issues, stepId, id, "labelStyle.color", layer.labelStyle?.color, false, branding);
      checkThemed(issues, stepId, id, "valueStyle.color", layer.valueStyle?.color, false, branding);
      checkThemed(issues, stepId, id, "trackColor", layer.trackColor, false, branding);
      checkThemed(issues, stepId, id, "fillColor", layer.fillColor, false, branding);
      checkThemed(issues, stepId, id, "thumbColor", layer.thumbColor, false, branding);
      return;
    case "oauth_login":
      walkCommonBreakpoints(issues, stepId, id, layer.style, layer.styleBreakpoints, branding);
      return;
    case "oauth_provider":
      if (layer.variant === "preset") {
        walkCommonBreakpoints(issues, stepId, id, layer.style, layer.styleBreakpoints, branding);
      } else {
        const base = layer.style;
        checkTextLike(issues, stepId, id, "style.", base, branding);
        const bp = layer.styleBreakpoints;
        if (bp) {
          for (const k of BP_KEYS) {
            const patch = bp[k];
            if (patch) checkTextLike(issues, stepId, id, `styleBreakpoints.${k}.`, patch, branding);
          }
        }
      }
      return;
    case "email_password_auth":
      walkCommonBreakpoints(issues, stepId, id, layer.style, layer.styleBreakpoints, branding);
      return;
    case "email_password_field":
      walkCommonBreakpoints(issues, stepId, id, layer.style, layer.styleBreakpoints, branding);
      return;
    case "email_password_submit": {
      const base = layer.style;
      checkTextLike(issues, stepId, id, "style.", base, branding);
      const bp = layer.styleBreakpoints;
      if (bp) {
        for (const k of BP_KEYS) {
          const patch = bp[k];
          if (patch) checkTextLike(issues, stepId, id, `styleBreakpoints.${k}.`, patch, branding);
        }
      }
      return;
    }
    default:
      return;
  }
};
var collectBrandGradientManifestIssues = (manifest, branding) => {
  const issues = [];
  for (const screen of manifest.screens) {
    walkScreen(screen, (layer) => scanLayer(issues, screen, layer, branding));
  }
  return issues;
};

// ../flow-runtime/src/restingMotion/restingMotionEffects.ts
var RESTING_MOTION_KEYFRAMES_CSS = `
@keyframes ob-rm-translate {
  0%, 100% { transform: translate(0, 0); }
  50% {
    transform: translate(var(--ob-rm-translate-peak-x, 0%), var(--ob-rm-translate-peak-y, 6%));
  }
}
@keyframes ob-rm-translate-ramp {
  0% { transform: translate(0, 0); }
  100% {
    transform: translate(var(--ob-rm-translate-peak-x, 0%), var(--ob-rm-translate-peak-y, 6%));
  }
}
@keyframes ob-rm-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(calc(-1 * var(--ob-rm-bounce-px, 14px))); }
}
@keyframes ob-rm-scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(var(--ob-rm-scale-peak, 1.08)); }
}
@keyframes ob-rm-scale-ramp {
  0% { transform: scale(1); }
  100% { transform: scale(var(--ob-rm-scale-peak, 1.08)); }
}
@keyframes ob-rm-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: var(--ob-rm-pulse-min, 0.62); }
}
@keyframes ob-rm-rotate {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(var(--ob-rm-rotate-peak, 5deg)); }
}
@keyframes ob-rm-rotate-ramp {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(var(--ob-rm-rotate-peak, 5deg)); }
}
`.trim();

// ../flow-runtime/src/interpolateTemplate.ts
var extractLiquidTemplateBodies = (s) => {
  const out = [];
  let i = 0;
  while (i < s.length) {
    const open = s.indexOf("{{", i);
    if (open === -1) break;
    const close = s.indexOf("}}", open + 2);
    if (close === -1) break;
    out.push(s.slice(open + 2, close));
    i = close + 2;
  }
  return out;
};
var FIELD_KEY_SOURCE = FIELD_KEY_RE.source.replace(/^\^|\$$/g, "");
var parseDefaultFilter = (inner) => {
  const m = inner.match(/\s*\|\s*default\s*:/i);
  if (!m || m.index === void 0) return { exprPart: inner.trim() };
  const exprPart = inner.slice(0, m.index).trim();
  let tail = inner.slice(m.index + m[0].length).trim();
  if (tail.startsWith('"')) {
    const end = tail.indexOf('"', 1);
    if (end > 0) tail = tail.slice(1, end);
    else tail = tail.slice(1);
  }
  return { exprPart, defaultValue: tail };
};
var parseExpression = (exprRaw) => {
  const expr = exprRaw.trim();
  const customM = expr.match(new RegExp(`^custom\\.(${FIELD_KEY_SOURCE})$`));
  if (customM) return { kind: "custom", key: customM[1] };
  const idM = expr.match(new RegExp(`^(${FIELD_KEY_SOURCE})\\.id$`));
  if (idM) return { kind: "field", fieldKey: idM[1], mode: "id" };
  const plainM = expr.match(new RegExp(`^(${FIELD_KEY_SOURCE})$`));
  if (plainM) return { kind: "field", fieldKey: plainM[1], mode: "label" };
  return { kind: "invalid" };
};
var analyzeLiquidTemplateInner = (inner) => {
  const { exprPart, defaultValue } = parseDefaultFilter(inner);
  const p = parseExpression(exprPart);
  if (p.kind === "invalid") return { expr: { kind: "invalid" }, defaultValue };
  if (p.kind === "custom") return { expr: { kind: "custom", key: p.key }, defaultValue };
  return { expr: { kind: "field", fieldKey: p.fieldKey, mode: p.mode }, defaultValue };
};

// ../flow-runtime/src/flowGraph.ts
var localizedStrings = (t) => {
  const out = [t.default];
  if (t.translations) {
    for (const loc of Object.keys(t.translations)) {
      if (/^[a-z]{2}(-[A-Z]{2})?$/.test(loc)) {
        const v = t.translations[loc];
        if (v) out.push(v);
      }
    }
  }
  return out;
};
var collectOutgoingTargets = (screen) => {
  const out = [];
  if (screen.next.default) out.push(screen.next.default);
  walkScreen(screen, (l) => {
    if (l.kind === "single_choice" || l.kind === "multiple_choice") {
      if (l.branching.enabled) {
        for (const c of l.branching.conditions) out.push(c.goTo);
      }
    }
    if (l.kind === "button" && l.action.kind === "go_to_step") out.push(l.action.screenId);
    if (l.kind === "button" && l.action.kind === "request_os_permission") {
      const o = l.action.outcomes;
      for (const t of [o.granted, o.denied, o.blocked]) {
        if (t === OS_PERMISSION_OUTCOME_END) {
        } else if (t === OS_PERMISSION_OUTCOME_CONTINUE) {
          if (screen.next.default) out.push(screen.next.default);
        } else {
          out.push(t);
        }
      }
    }
    if (l.kind === "button" && l.action.kind === "go_back_one_screen" && l.action.fallbackScreenId) {
      out.push(l.action.fallbackScreenId);
    }
    if (l.kind === "back_button" && l.fallbackScreenId) out.push(l.fallbackScreenId);
  });
  return out;
};
var buildForwardAdjacency = (manifest) => {
  const m = /* @__PURE__ */ new Map();
  for (const s of manifest.screens) {
    m.set(s.id, collectOutgoingTargets(s));
  }
  for (const d of manifest.decisionNodes ?? []) {
    const outs = [
      ...d.cases.map((c) => c.next).filter((x) => x != null),
      d.elseNext
    ].filter((x) => x != null);
    m.set(d.id, outs);
  }
  return m;
};
var bfsForward = (entry, forward) => {
  if (entry == null) return /* @__PURE__ */ new Set();
  const seen = /* @__PURE__ */ new Set([entry]);
  const q = [entry];
  while (q.length) {
    const u = q.shift();
    for (const v of forward.get(u) ?? []) {
      if (!seen.has(v)) {
        seen.add(v);
        q.push(v);
      }
    }
  }
  return seen;
};
var computeDominators = (manifest) => {
  const forward = buildForwardAdjacency(manifest);
  const entry = manifest.entryScreenId;
  if (entry == null) return /* @__PURE__ */ new Map();
  const reachable = bfsForward(entry, forward);
  const nodes = [...reachable];
  const pred = /* @__PURE__ */ new Map();
  for (const [u, vs] of forward) {
    for (const v of vs) {
      if (!reachable.has(v)) continue;
      const arr = pred.get(v) ?? [];
      arr.push(u);
      pred.set(v, arr);
    }
  }
  const all = new Set(nodes);
  const dom = /* @__PURE__ */ new Map();
  for (const n of nodes) {
    if (n === entry) dom.set(n, /* @__PURE__ */ new Set([entry]));
    else dom.set(n, new Set(all));
  }
  let changed = true;
  while (changed) {
    changed = false;
    for (const n of nodes) {
      if (n === entry) continue;
      const ps = (pred.get(n) ?? []).filter((p) => reachable.has(p));
      let nextDom;
      if (ps.length === 0) {
        nextDom = /* @__PURE__ */ new Set([n]);
      } else {
        nextDom = /* @__PURE__ */ new Set([n]);
        const first = dom.get(ps[0]) ?? new Set(all);
        let inter = new Set(first);
        for (let i = 1; i < ps.length; i++) {
          const d = dom.get(ps[i]) ?? new Set(all);
          inter = new Set([...inter].filter((x) => d.has(x)));
        }
        for (const x of inter) nextDom.add(x);
      }
      const cur = dom.get(n);
      if (cur.size !== nextDom.size || [...nextDom].some((x) => !cur.has(x))) {
        dom.set(n, nextDom);
        changed = true;
      }
    }
  }
  return dom;
};
var fieldKeyOwnerScreenId = (manifest, fieldKey) => {
  for (const e of collectFieldKeys(manifest)) {
    if (e.fieldKey === fieldKey) return e.screenId;
  }
  return null;
};
var scanLocalizedForWarnings = (manifest, hostScreenId, text, layerId, dom, seen, out) => {
  const screenLabel = manifest.screens.find((s) => s.id === hostScreenId)?.name ?? hostScreenId;
  for (const str of localizedStrings(text)) {
    for (const inner of extractLiquidTemplateBodies(str)) {
      const { expr } = analyzeLiquidTemplateInner(inner);
      if (expr.kind === "invalid") {
        const key = `invalid:${hostScreenId}:${layerId}:${inner}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(
          `Warning: Screen "${screenLabel}" text layer "${layerId}" has an invalid template token "{{${inner}}}".`
        );
        continue;
      }
      if (expr.kind === "custom") {
        const key = `custom:${hostScreenId}`;
        if (!seen.has(key)) {
          seen.add(key);
          out.push(
            `Warning: Screen "${screenLabel}" uses \`custom.*\` template variables \u2014 values are supplied by the host SDK at runtime.`
          );
        }
        continue;
      }
      const ownerId = fieldKeyOwnerScreenId(manifest, expr.fieldKey);
      if (!ownerId) {
        const key = `unknown:${hostScreenId}:${layerId}:${expr.fieldKey}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(
          `Warning: Screen "${screenLabel}" references unknown variable "{{${expr.fieldKey}}}" (no matching input fieldKey).`
        );
        continue;
      }
      if (expr.mode === "id") {
        const ownerScreen = findScreen(manifest, ownerId);
        const input = ownerScreen ? findInputLayer(ownerScreen) : null;
        if (input?.kind !== "single_choice" && input?.kind !== "multiple_choice") {
          const key = `id:${hostScreenId}:${layerId}:${expr.fieldKey}`;
          if (seen.has(key)) continue;
          seen.add(key);
          out.push(
            `Warning: Screen "${screenLabel}" uses "{{${expr.fieldKey}.id}}" but "${expr.fieldKey}" is not a choice input \u2014 \`.id\` only applies to single or multiple choice.`
          );
        }
      }
      if (ownerId === hostScreenId) {
        const key = `same:${hostScreenId}:${layerId}:${expr.fieldKey}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(
          `Warning: Screen "${screenLabel}" references "{{${expr.fieldKey}}}" which is collected on the same screen \u2014 it will be empty until after the user submits.`
        );
        continue;
      }
      const dset = dom.get(hostScreenId);
      if (dset && !dset.has(ownerId)) {
        const key = `path:${hostScreenId}:${layerId}:${expr.fieldKey}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(
          `Warning: Screen "${screenLabel}" references "{{${expr.fieldKey}}}" which may be empty on some paths (not collected before this screen on every route).`
        );
      }
    }
  }
};
var collectInterpolationWarnings = (manifest) => {
  const dom = computeDominators(manifest);
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const screen of manifest.screens) {
    walkScreen(screen, (l) => {
      if (l.kind !== "text") return;
      scanLocalizedForWarnings(manifest, screen.id, l.text, l.id, dom, seen, out);
    });
  }
  return out;
};
var collectDecisionWarnings = (manifest) => {
  const dom = computeDominators(manifest);
  const out = [];
  for (const dn of manifest.decisionNodes ?? []) {
    const label = dn.name ?? dn.id;
    const dset = dom.get(dn.id);
    for (const fk of collectDecisionFieldKeysFromNode(dn)) {
      const ownerId = fieldKeyOwnerScreenId(manifest, fk);
      if (!ownerId) {
        out.push(`Warning: Decision "${label}" references unknown fieldKey "${fk}".`);
        continue;
      }
      if (dset && !dset.has(ownerId)) {
        out.push(
          `Warning: Decision "${label}" references "${fk}" which may be empty on some paths (not collected before this decision on every route).`
        );
      }
    }
  }
  return out;
};

// ../flow-runtime/src/layout/scalarLayoutDefaults.ts
var DEFAULT_PROGRESS_LINEAR_HEIGHT_PX = 6;
var DEFAULT_LOADER_LINEAR_HEIGHT_PX = 6;
var DEFAULT_LOADER_CIRCULAR_SIZE_PX = 48;
var DEFAULT_LOADER_STROKE_WIDTH_PX = 4;
var GAP_BY_KIND = {
  stack: 12,
  single_choice: 8,
  multiple_choice: 8,
  oauth_login: 8,
  email_password_auth: 8,
  email_password_submit: 8,
  button: 8,
  back_button: 8,
  oauth_provider: 8,
  hyperlink: 0
};
var defaultGapForLayerKind = (kind) => GAP_BY_KIND[kind] ?? null;
var defaultFeedbackStyleScalars = (kind, variant) => {
  if (kind === "progress") {
    return { height: DEFAULT_PROGRESS_LINEAR_HEIGHT_PX };
  }
  if (variant === "circular") {
    return {
      width: DEFAULT_LOADER_CIRCULAR_SIZE_PX,
      height: DEFAULT_LOADER_CIRCULAR_SIZE_PX,
      strokeWidth: DEFAULT_LOADER_STROKE_WIDTH_PX
    };
  }
  return { height: DEFAULT_LOADER_LINEAR_HEIGHT_PX };
};

// ../flow-runtime/src/layout/authoringLayoutDefaults.ts
var LAYOUT_FULL_HUG = { width: "full", height: "auto" };
var LAYOUT_FULL_FILL = { width: "full", height: "fill" };
var LAYOUT_HUG_HUG = { width: "auto", height: "auto" };
var LAYOUT_FULL_FIXED_H160 = { width: "full", height: 160 };
var LAYOUT_PROGRESS = {
  width: "full",
  height: DEFAULT_PROGRESS_LINEAR_HEIGHT_PX
};
var LAYOUT_LOADER_LINEAR = {
  width: "full",
  height: DEFAULT_LOADER_LINEAR_HEIGHT_PX
};
var defaultLayoutStyleForKind = (kind) => {
  switch (kind) {
    case "stack":
      return LAYOUT_FULL_FILL;
    case "text":
    case "counter":
      return LAYOUT_HUG_HUG;
    case "hyperlink":
      return LAYOUT_HUG_HUG;
    case "image":
    case "lottie":
    case "video":
      return LAYOUT_FULL_FIXED_H160;
    case "icon":
      return LAYOUT_HUG_HUG;
    case "button":
    case "back_button":
    case "oauth_provider":
    case "email_password_submit":
      return LAYOUT_FULL_HUG;
    case "text_input":
    case "scale_input":
    case "email_password_auth":
    case "email_password_field":
    case "oauth_login":
      return LAYOUT_FULL_FILL;
    case "progress":
      return LAYOUT_PROGRESS;
    case "loader":
      return LAYOUT_LOADER_LINEAR;
    case "checkbox":
    case "single_choice":
    case "multiple_choice":
      return LAYOUT_FULL_HUG;
    case "carousel":
      return null;
    default:
      return null;
  }
};
var mergeLayoutDefaultsIntoStyle = (kind, style) => {
  const defaults = defaultLayoutStyleForKind(kind);
  if (!defaults) return style ?? {};
  return { ...defaults, ...style };
};

// ../flow-runtime/src/layout/normalizeLayerLayout.ts
var isObj = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
var applyAxisDefaultsInPlace = (layer, kind) => {
  const current = isObj(layer.style) ? layer.style : void 0;
  if (kind === "loader" && layer.variant === "circular") {
    const feedback = defaultFeedbackStyleScalars("loader", "circular");
    layer.style = { ...feedback, ...current ?? {} };
    return;
  }
  if (!defaultLayoutStyleForKind(kind)) return;
  layer.style = mergeLayoutDefaultsIntoStyle(kind, current);
};
var applyGapDefaultInPlace = (layer, kind) => {
  const gapDefault = defaultGapForLayerKind(kind);
  if (gapDefault === null) return;
  if (kind === "oauth_provider" && layer.variant !== "custom") return;
  if (layer.gap === void 0) layer.gap = gapDefault;
};
var applyLayoutDefaultsToLayerInPlace = (layer) => {
  if (typeof layer.kind !== "string") return;
  const kind = layer.kind;
  applyAxisDefaultsInPlace(layer, kind);
  applyGapDefaultInPlace(layer, kind);
};
var recurseChildren = (parent, key) => {
  const kids = parent[key];
  if (!Array.isArray(kids)) return;
  for (const child of kids) {
    if (isObj(child)) normalizeLayerLayoutInPlace(child);
  }
};
var normalizeLayerLayoutInPlace = (layer) => {
  applyLayoutDefaultsToLayerInPlace(layer);
  const kind = layer.kind;
  if (kind === "carousel") {
    recurseChildren(layer, "slides");
    return;
  }
  recurseChildren(layer, "children");
};
var normalizeManifestLayoutInPlace = (manifest) => {
  const screens = manifest.screens;
  if (!Array.isArray(screens)) return;
  for (const screen of screens) {
    if (!isObj(screen)) continue;
    const regions = screen.regions;
    if (!isObj(regions)) continue;
    for (const key of ["header", "body", "footer"]) {
      const region = regions[key];
      if (isObj(region)) normalizeLayerLayoutInPlace(region);
    }
  }
};

// src/audit/projectRoot.ts
import { existsSync, statSync } from "node:fs";
import { dirname, join, parse, resolve } from "node:path";
var ROOT_MARKERS = [
  "package.json",
  "app.json",
  "app.config.js",
  "app.config.ts",
  "app.config.mjs",
  "Package.swift",
  "Podfile"
];
var inferProjectRoot = (fromPath) => {
  const start = resolve(fromPath);
  let dir = existsSync(start) && statSync(start).isDirectory() ? start : dirname(start);
  const { root } = parse(dir);
  for (; ; ) {
    if (ROOT_MARKERS.some((marker) => existsSync(join(dir, marker)))) return dir;
    if (dir === root) return void 0;
    dir = dirname(dir);
  }
};
var looksLikeSkillRoot = (dir) => existsSync(resolve(dir, "rheo-flow-import/scripts/lib/rheo-cli.mjs")) || existsSync(resolve(dir, "scripts/lib/rheo-cli.mjs"));

// src/validateManifestFile.ts
import { readFile as readFile3 } from "node:fs/promises";

// src/collectAnimationImportWarnings.ts
var layerIdsOnScreen = (screen) => {
  const ids = /* @__PURE__ */ new Set();
  walkScreen(screen, (l) => {
    ids.add(l.id);
  });
  return ids;
};
var collectAnimationImportWarnings = (manifest) => {
  const issues = [];
  manifest.screens.forEach((screen, screenIndex) => {
    const layerIds = layerIdsOnScreen(screen);
    const animations = screen.animations;
    if (!animations?.length) return;
    animations.forEach((clip, clipIndex) => {
      const basePath = ["screens", screenIndex, "animations", clipIndex];
      if (!layerIds.has(clip.targetLayerId)) {
        issues.push({
          path: [...basePath, "targetLayerId"],
          message: `Animation clip "${clip.id}" targets missing layer "${clip.targetLayerId}" on screen "${screen.id}".`,
          code: "animation_target_layer_missing",
          stepId: screen.id
        });
      }
      if (clip.trigger === "stagger" && clip.staggerIndex === void 0) {
        issues.push({
          path: [...basePath, "staggerIndex"],
          message: `Clip "${clip.id}" uses trigger "stagger" but omits staggerIndex.`,
          code: "animation_stagger_index_required",
          stepId: screen.id
        });
      }
      if (clip.trigger === "unmount" && clip.staggerIndex !== void 0) {
        issues.push({
          path: [...basePath, "staggerIndex"],
          message: `Clip "${clip.id}" with trigger "unmount" must not set staggerIndex.`,
          code: "animation_unmount_stagger_forbidden",
          stepId: screen.id
        });
      }
      if (clip.durationMs < 50 || clip.durationMs > 800) {
        issues.push({
          path: [...basePath, "durationMs"],
          message: `Clip "${clip.id}" durationMs=${clip.durationMs} is outside the recommended 50\u2013800ms import range.`,
          code: "animation_duration_out_of_range",
          stepId: screen.id
        });
      }
    });
  });
  return issues;
};

// src/collectBundleImportWarnings.ts
import { readFile } from "node:fs/promises";
import { dirname as dirname2, join as join2 } from "node:path";
var FONT_EXT_SET = new Set(FONT_FILE_EXTENSIONS);
var isFontPath = (path) => {
  const lower = path.toLowerCase();
  return [...FONT_EXT_SET].some((ext) => lower.endsWith(ext));
};
var readOptionalJson = async (path) => {
  try {
    const raw = await readFile(path, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
var collectBundleImportWarnings = async (manifestPath) => {
  const dir = dirname2(manifestPath);
  const assetsPath = join2(dir, "rheo-import.assets.json");
  const data = await readOptionalJson(assetsPath);
  if (!data || typeof data !== "object") return [];
  const bundle = data;
  if (!Array.isArray(bundle.assets)) return [];
  const issues = [];
  bundle.assets.forEach((row, index) => {
    const path = row.path?.trim();
    if (!path || !isFontPath(path)) return;
    const declared = row.type ? ` declares type "${row.type}"` : "";
    issues.push({
      path: ["assets", String(index), "path"],
      message: `Font file "${path}" must not be in rheo-import.assets.json${declared}. Remove this row and add the file to rheo-import.fonts.json under fontFamilies[].styles (see font-import.md). Allowed assets.json types: image, lottie, video only.`,
      code: "bundle_font_in_assets_json",
      stepId: null
    });
  });
  return issues;
};

// src/audit/i18nKeyHeuristics.ts
var looksLikeI18nKey = (value) => {
  const trimmed = value.trim();
  if (trimmed.length < 3) return false;
  if (/\s/.test(trimmed)) return false;
  if (/^[\w-]+:[\w.-]+$/.test(trimmed)) return true;
  if (/^[A-Z][A-Z0-9_]{2,}$/.test(trimmed)) return true;
  if (/^[a-z][\w]*(\.[\w]+)+$/.test(trimmed)) return true;
  return false;
};

// src/collectLocalizationImportWarnings.ts
var localizedFieldsFromLayer = (layer, basePath) => {
  const fields = [];
  const push = (suffix, value) => {
    if (!value?.trim() || !looksLikeI18nKey(value)) return;
    fields.push({ path: [...basePath, ...suffix], defaultValue: value.trim() });
  };
  if (layer.kind === "text") push(["text", "default"], layer.text?.default);
  if (layer.kind === "text_input") push(["placeholder", "default"], layer.placeholder?.default);
  if (layer.kind === "scale_input") {
    push(["minLabel", "default"], layer.minLabel?.default);
    push(["maxLabel", "default"], layer.maxLabel?.default);
  }
  if (layer.kind === "oauth_provider" && "label" in layer && layer.label) {
    push(["label", "default"], layer.label.default);
  }
  return fields;
};
var collectLocalizationImportWarnings = (manifest) => {
  const issues = [];
  manifest.screens.forEach((screen, screenIndex) => {
    walkScreen(screen, (layer) => {
      const layerPath = ["screens", String(screenIndex), layer.id ?? layer.kind];
      const fields = localizedFieldsFromLayer(layer, layerPath);
      fields.forEach((field) => {
        issues.push({
          path: field.path,
          message: `text.default looks like an i18n key ("${field.defaultValue}"), not user-facing copy. Resolve the app default locale (${manifest.defaultLocale}) string from translation files and set text.default to that value. See localization-import.md.`,
          code: "manifest_i18n_key_in_default",
          stepId: screen.id ?? null
        });
      });
    });
  });
  return issues;
};

// src/publishGates/collectPublishGateIssues.ts
var IMPORT_PUBLISH_INTEGRATIONS = {
  revenuecat: {
    enabled: true,
    defaultOfferingId: "default",
    defaultPlacementId: ""
  },
  appsflyer: { enabled: false }
};
var toBlocking = (issues, fixForCode) => issues.map((issue) => ({
  severity: "blocking",
  code: issue.code,
  message: issue.message,
  fix: fixForCode(issue.code, issue.message),
  stepId: issue.stepId,
  path: issue.path
}));
var toWarning = (issues, fixForCode) => issues.map((issue) => ({
  severity: "warning",
  code: issue.code,
  message: issue.message,
  fix: fixForCode(issue.code, issue.message),
  stepId: issue.stepId,
  path: issue.path
}));
var fixForSchemaOrPublishCode = (code, message) => {
  switch (code) {
    case "flow.no_screens":
      return "Add at least one screen with regions.body before publishing.";
    case "flow.no_entry":
      return "Set entryScreenId to the first screen (or decision / external surface) id in the graph.";
    case "flow.no_completion_path":
      return "Connect screens so a path from entry reaches end_flow, a terminal screen next, or an external surface fallback/outcome that ends the flow.";
    case "decision.incomplete_branches":
      return 'Every decision case and the "everyone else" branch must have next targets before publish.';
    case "canvas_editor_gate":
      return "Remove disabled layer types from the manifest, or enable the capability in App settings \u2192 Canvas controls before import.";
    case "brand_gradient.disallowed_field":
      return "Use `$brandGradient:` tokens only on background fills (screen containerStyle or stack backgrounds), not on text color or borders.";
    case "brand_gradient.unknown_preset":
      return "Replace unknown `$brandGradient:` ids with explicit linear-gradient CSS or hex colors from the source audit.";
    case "screen.unreachable":
    case "decision.unreachable":
    case "external_surface.unreachable":
      return "Connect orphan nodes from entry, or remove unused screens/decisions/surfaces.";
    default:
      return fixForBuilderMessage(message);
  }
};
var fixForBuilderMessage = (message) => {
  if (message.includes("style.color")) {
    return "Set style.color on every text and icon layer. Button labels are nested text children \u2014 primary buttons should use contrasting label colors (e.g. #ffffff on dark fills). Body copy needs explicit foreground hex from manifest.theme or the style audit.";
  }
  if (message.includes('no Button with action "continue"')) {
    return 'Add a button layer with action.kind "continue" on screens that use text_input, multiple_choice, or scale_input.';
  }
  if (message.includes("fieldKey")) {
    return "Give each input layer a unique snake_case fieldKey (a-z, 0-9, underscore).";
  }
  if (message.includes("only one is allowed")) {
    return "Use at most one input layer per screen; split OAuth login, email/password auth, and questionnaires onto separate screens.";
  }
  if (message.includes("cannot combine")) {
    return "Keep OAuth login, email/password auth, and other inputs on separate screens.";
  }
  if (message.includes("trigger button")) {
    return 'When Lottie/video autoPlay is false, add a button with action.kind "play_media" targeting that layer (or screen background video id).';
  }
  if (message.includes("play-media target")) {
    return "play_media buttons must target a Lottie or video layer on the same screen, or the screen background video playback id.";
  }
  if (message.includes("media asset")) {
    return "Assign uploaded placeholder mediaAssetIds to image/video/Lottie layers and screen background fills.";
  }
  if (message.includes("missing screen")) {
    return "Point go_to_step, choice branching, permission outcomes, and fallback screens at existing screen ids.";
  }
  if (message.includes("Flow entry")) {
    return "Set entryScreenId to an existing screen, decision, or external surface id.";
  }
  if (message.includes("RevenueCat")) {
    return "Enable RevenueCat in App settings \u2192 Integrations, or remove RevenueCat external surfaces from the import manifest.";
  }
  if (message.includes("integration provider")) {
    return "Set externalSurfaceNodes[].config.provider to a real provider (e.g. revenuecat), not unspecified.";
  }
  if (message.includes("Fallback edge")) {
    return "Connect every external surface fallback to the next screen/decision/surface when the paywall dismisses or fails.";
  }
  return `Resolve builder publish rule: ${message}`;
};
var collectIntegrationIssues = (manifest, integrations) => {
  const issues = [];
  for (const node of manifest.externalSurfaceNodes ?? []) {
    if (node.config.provider === "unspecified") {
      issues.push(
        `External surface "${node.name ?? node.id}" needs an integration provider \u2014 choose one in the flow editor.`
      );
    }
    if (node.fallback == null) {
      issues.push(
        `External surface "${node.name ?? node.id}" needs a connected Fallback edge \u2014 every paywall must route somewhere when no specific outcome is mapped.`
      );
    }
    if (node.config.provider === "revenuecat" && !integrations.revenuecat.enabled) {
      issues.push(
        `External surface "${node.name ?? node.id}" uses RevenueCat, but the integration is disabled. Enable it in App Settings \u2192 Integrations.`
      );
    }
  }
  return issues.map((message) => ({
    severity: "blocking",
    code: "integration.disabled",
    message,
    fix: fixForBuilderMessage(message)
  }));
};
var collectPublishGateIssues = (data, opts = {}) => {
  const validated = validateManifest(data);
  if (!validated.ok) {
    return {
      ok: false,
      kind: "invalid_schema",
      issues: toBlocking(validated.issues, fixForSchemaOrPublishCode)
    };
  }
  const manifest = validated.manifest;
  const canvasGates = opts.canvasGates ?? parseCanvasEditorGates(null);
  const integrations = opts.integrations ?? IMPORT_PUBLISH_INTEGRATIONS;
  const branding = opts.branding;
  const blocking = [];
  blocking.push(
    ...collectFlowBuilderIssues(manifest).map((message) => ({
      severity: "blocking",
      code: "builder.rule",
      message,
      fix: fixForBuilderMessage(message)
    }))
  );
  blocking.push(...collectIntegrationIssues(manifest, integrations));
  blocking.push(
    ...collectCanvasGateViolations(manifest, canvasGates).map((message) => ({
      severity: "blocking",
      code: "canvas_editor_gate",
      message,
      fix: fixForSchemaOrPublishCode("canvas_editor_gate", message)
    }))
  );
  const publishable = validatePublishable(manifest);
  blocking.push(...toBlocking(publishable.issues, fixForSchemaOrPublishCode));
  const warnings = [
    ...toWarning(publishable.warnings, fixForSchemaOrPublishCode),
    ...collectBrandGradientManifestIssues(manifest, branding).map((issue) => ({
      severity: "blocking",
      code: issue.code,
      message: issue.message,
      fix: fixForSchemaOrPublishCode(issue.code, issue.message),
      stepId: issue.stepId,
      path: issue.path
    })),
    ...collectInterpolationWarnings(manifest).map((message) => ({
      severity: "warning",
      code: "interpolation.warning",
      message,
      fix: "Fix template placeholders or add missing sdkAttributeKeys."
    })),
    ...collectDecisionWarnings(manifest).map((message) => ({
      severity: "warning",
      code: "decision.warning",
      message,
      fix: "Review decision branches and sdkAttributeKeys for consistency with source."
    }))
  ];
  return {
    ok: blocking.length === 0,
    kind: "validated",
    manifest,
    blocking,
    warnings
  };
};

// src/fetchManifestProfile.ts
import { readFile as readFile2 } from "node:fs/promises";
import { existsSync as existsSync2 } from "node:fs";
import { dirname as dirname3, resolve as resolve2 } from "node:path";
import { fileURLToPath } from "node:url";
var DEFAULT_PROFILE_URL = "https://docs.getrheo.io/docs/md/developer-guide/agent-manifest-profile";
var FALLBACK_FILENAME = "manifest-agent-profile-fallback.md";
var currentDir = dirname3(fileURLToPath(import.meta.url));
var resolveFallbackProfilePath = () => {
  const override = process.env.RHEO_FALLBACK_PROFILE_PATH?.trim();
  if (override) return resolve2(override);
  const shippedPath = resolve2(currentDir, "../../references", FALLBACK_FILENAME);
  const candidates = [
    shippedPath,
    // dev (tsx src/): src/ -> rheo/rheo-flow-import/references/
    resolve2(currentDir, "../rheo/rheo-flow-import/references", FALLBACK_FILENAME),
    // belt-and-suspenders sibling layouts
    resolve2(currentDir, "../references", FALLBACK_FILENAME),
    resolve2(currentDir, "references", FALLBACK_FILENAME)
  ];
  return candidates.find((candidate) => existsSync2(candidate)) ?? shippedPath;
};
var extractManifestProfileVersion = (content) => {
  const match = content.match(/^Profile version:\s*([^\n]+)$/im) ?? content.match(/^profileVersion:\s*([^\n]+)$/im);
  return match?.[1]?.trim() ?? null;
};
var readBundledManifestProfile = async () => {
  const content = await readFile2(resolveFallbackProfilePath(), "utf8");
  return {
    content,
    source: "fallback",
    version: extractManifestProfileVersion(content)
  };
};
var fetchManifestProfile = async (opts) => {
  if (opts?.offline) return readBundledManifestProfile();
  const url = opts?.url ?? process.env.RHEO_MANIFEST_PROFILE_URL?.trim() ?? DEFAULT_PROFILE_URL;
  const timeoutMs = opts?.timeoutMs ?? 8e3;
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { Accept: "text/markdown,text/plain;q=0.9,*/*;q=0.8" }
    });
    if (!res.ok) return readBundledManifestProfile();
    const content = await res.text();
    return {
      content,
      source: "remote",
      version: extractManifestProfileVersion(content),
      url
    };
  } catch {
    return readBundledManifestProfile();
  } finally {
    clearTimeout(timeout);
  }
};

// src/manifestSummary.ts
var walkLayer = (layer, visit) => {
  visit(layer);
  const children = "children" in layer && Array.isArray(layer.children) ? layer.children : [];
  children.forEach((child) => walkLayer(child, visit));
};
var summarizeManifest = (manifest) => {
  const layerKinds = /* @__PURE__ */ new Set();
  let layerCount = 0;
  manifest.screens.forEach((screen) => {
    Object.values(screen.regions).forEach((region) => {
      if (!region) return;
      walkLayer(region, (layer) => {
        layerCount += 1;
        layerKinds.add(layer.kind);
      });
    });
  });
  return {
    screenCount: manifest.screens.length,
    layerCount,
    layerKinds: [...layerKinds].sort(),
    decisionNodeCount: manifest.decisionNodes.length,
    externalSurfaceCount: manifest.externalSurfaceNodes.length,
    externalSurfaceProviderTypes: [
      ...new Set(manifest.externalSurfaceNodes.map((node) => node.config.provider))
    ].sort(),
    sdkAttributeKeyCount: manifest.sdkAttributeKeys.length
  };
};

// src/validateManifestFile.ts
var parseJsonFile = async (path) => {
  const raw = await readFile3(path, "utf8");
  try {
    return JSON.parse(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid JSON";
    throw new Error(`Could not parse ${path}: ${message}`, { cause: err });
  }
};
var validateManifestFile = async (path, opts) => {
  const [data, profile] = await Promise.all([
    parseJsonFile(path),
    fetchManifestProfile({ offline: opts?.offlineProfile, url: opts?.profileUrl })
  ]);
  const gates = collectPublishGateIssues(data);
  if (gates.ok === false && gates.kind === "invalid_schema") {
    return {
      ok: false,
      manifestSchemaVersion: MANIFEST_SCHEMA_VERSION,
      profile,
      issues: gates.issues.map((issue) => ({
        path: issue.path ?? [],
        message: issue.message,
        code: issue.code,
        stepId: issue.stepId ?? null
      }))
    };
  }
  const schemaIssues = gates.blocking.map((issue) => ({
    path: issue.path ?? [],
    message: issue.message,
    code: issue.code,
    stepId: issue.stepId ?? null
  }));
  const bundleWarnings = await collectBundleImportWarnings(path);
  const warnings = [
    ...gates.warnings.map((issue) => ({
      path: issue.path ?? [],
      message: issue.message,
      code: issue.code,
      stepId: issue.stepId ?? null
    })),
    ...collectAnimationImportWarnings(gates.manifest),
    ...collectLocalizationImportWarnings(gates.manifest),
    ...bundleWarnings
  ];
  return {
    ok: gates.ok,
    manifestSchemaVersion: MANIFEST_SCHEMA_VERSION,
    profile,
    summary: summarizeManifest(gates.manifest),
    warnings,
    ...gates.ok ? {} : { issues: schemaIssues }
  };
};
var formatIssues = (issues) => issues.map((issue) => {
  const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
  return `- ${path}: ${issue.message} [${issue.code}]`;
}).join("\n");

// src/normalizeManifestFile.ts
import { readFile as readFile4, writeFile } from "node:fs/promises";
var parseJsonFile2 = async (path) => {
  const raw = await readFile4(path, "utf8");
  try {
    return JSON.parse(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid JSON";
    throw new Error(`Could not parse ${path}: ${message}`, { cause: err });
  }
};
var isRecord = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var normalizeManifestObject = (data, opts) => {
  const migrated = migrateLegacyManifest(data);
  const normalized = isRecord(migrated) ? { ...migrated } : migrated;
  let changed = JSON.stringify(migrated) !== JSON.stringify(data);
  if (isRecord(normalized)) {
    const m = normalized;
    if (!Array.isArray(m.decisionNodes)) {
      normalized.decisionNodes = [];
      changed = true;
    }
    if (!Array.isArray(m.externalSurfaceNodes)) {
      normalized.externalSurfaceNodes = [];
      changed = true;
    }
    if (!Array.isArray(m.sdkAttributeKeys)) {
      normalized.sdkAttributeKeys = [];
      changed = true;
    }
    if (opts?.targetFlowId && normalized.flowId !== opts.targetFlowId) {
      normalized.flowId = opts.targetFlowId;
      changed = true;
    }
  }
  const validated = validateManifest(normalized);
  if (!validated.ok) {
    return {
      manifest: normalized,
      changed,
      valid: false,
      issues: validated.issues
    };
  }
  const before = JSON.stringify(validated.manifest);
  normalizeManifestLayoutInPlace(validated.manifest);
  if (JSON.stringify(validated.manifest) !== before) changed = true;
  return {
    manifest: validated.manifest,
    changed,
    valid: true
  };
};
var normalizeManifestFile = async (path, opts) => {
  const data = await parseJsonFile2(path);
  const result = normalizeManifestObject(data, { targetFlowId: opts?.targetFlowId });
  const output = `${JSON.stringify(result.manifest, null, 2)}
`;
  if (opts?.write) {
    await writeFile(path, output);
  } else if (opts?.outPath) {
    await writeFile(opts.outPath, output);
  }
  return result;
};

// src/audit/auditImport.ts
import { writeFile as writeFile2 } from "node:fs/promises";
import { isAbsolute, relative as relative3, resolve as resolve4 } from "node:path";

// src/audit/fileInventory.ts
import { readdir, readFile as readFile5, stat } from "node:fs/promises";
import { join as join3, relative } from "node:path";
var SKIP_DIRS = /* @__PURE__ */ new Set([
  ".git",
  ".next",
  ".turbo",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "Pods",
  ".expo"
]);
var TEXT_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".json",
  ".js",
  ".jsx",
  ".mjs",
  ".swift",
  ".ts",
  ".tsx",
  ".yaml",
  ".yml"
]);
var INTERESTING_ASSET_EXTENSIONS = /* @__PURE__ */ new Set([
  ".gif",
  ".jpeg",
  ".jpg",
  ".json",
  ".lottie",
  ".mov",
  ".mp4",
  ".otf",
  ".png",
  ".ttf",
  ".webm",
  ".webp",
  ".woff",
  ".woff2"
]);
var extname = (path) => {
  const match = path.match(/\.[^.]+$/);
  return match?.[0]?.toLowerCase() ?? "";
};
var isInteresting = (path) => {
  const ext = extname(path);
  return TEXT_EXTENSIONS.has(ext) || INTERESTING_ASSET_EXTENSIONS.has(ext);
};
var buildFileInventory = async (root, opts) => {
  const maxFiles = opts?.maxFiles ?? 600;
  const files = [];
  const walk = async (dir) => {
    if (files.length >= maxFiles) return;
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (files.length >= maxFiles) return;
      const absolutePath = join3(dir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) await walk(absolutePath);
        continue;
      }
      if (!entry.isFile() || !isInteresting(entry.name)) continue;
      const rel = relative(root, absolutePath);
      const size = (await stat(absolutePath)).size;
      const isText = TEXT_EXTENSIONS.has(extname(entry.name)) && size < 5e5;
      files.push({
        path: rel,
        absolutePath,
        content: isText ? await readFile5(absolutePath, "utf8") : null
      });
    }
  };
  await walk(root);
  return files;
};

// src/audit/entryCrawl.ts
import { readdir as readdir2, readFile as readFile6, stat as stat2 } from "node:fs/promises";
import { existsSync as existsSync3, statSync as statSync2 } from "node:fs";
import { dirname as dirname4, join as join4, relative as relative2, resolve as resolve3 } from "node:path";
var SOURCE_EXTENSIONS = /* @__PURE__ */ new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".swift"]);
var TEXT_EXTENSIONS2 = /* @__PURE__ */ new Set([
  ".css",
  ".json",
  ".js",
  ".jsx",
  ".mjs",
  ".swift",
  ".ts",
  ".tsx",
  ".yaml",
  ".yml"
]);
var ASSET_EXTENSIONS = /* @__PURE__ */ new Set([
  ".gif",
  ".jpeg",
  ".jpg",
  ".json",
  ".lottie",
  ".mov",
  ".mp4",
  ".otf",
  ".png",
  ".ttf",
  ".webm",
  ".webp",
  ".woff",
  ".woff2"
]);
var LOCALE_DIR_NAMES = ["locales", "translations", "i18n", "lang", "l10n"];
var LOCALE_FILE_RE = /^[a-z]{2}(?:-[A-Z]{2})?\.(?:json|ts|js)$/i;
var IMPORT_RE = /(?:import\s+[^'"]*from\s+|import\s+|export\s+[^'"]*from\s+|require\s*\(\s*)['"]([^'"]+)['"]/g;
var ROOT_CONFIG_FILES = [
  "package.json",
  "app.json",
  "tailwind.config.js",
  "tailwind.config.ts",
  "tailwind.config.mjs",
  "global.css",
  "nativewind-env.d.ts"
];
var extname2 = (path) => {
  const match = path.match(/\.[^.]+$/);
  return match?.[0]?.toLowerCase() ?? "";
};
var isInterestingPath = (path) => {
  const ext = extname2(path);
  return TEXT_EXTENSIONS2.has(ext) || ASSET_EXTENSIONS.has(ext);
};
var readImports = (content) => {
  const specs = [];
  let match = IMPORT_RE.exec(content);
  while (match) {
    const spec = match[1];
    if (spec) specs.push(spec);
    match = IMPORT_RE.exec(content);
  }
  IMPORT_RE.lastIndex = 0;
  return specs;
};
var resolveImportToRelPath = (fromDir, root, spec) => {
  if (!spec.startsWith(".")) return null;
  const base = resolve3(fromDir, spec);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    `${base}.swift`,
    join4(base, "index.ts"),
    join4(base, "index.tsx"),
    join4(base, "index.js"),
    join4(base, "index.swift")
  ];
  for (const candidate of candidates) {
    if (!candidate.startsWith(root) || !existsSync3(candidate)) continue;
    if (!statSync2(candidate).isFile()) continue;
    return relative2(root, candidate);
  }
  return null;
};
var toRelPath = (root, absolutePath) => relative2(root, absolutePath).replace(/^\.\//, "");
var loadAuditFile = async (root, relPath) => {
  const absolutePath = resolve3(root, relPath);
  if (!existsSync3(absolutePath) || !statSync2(absolutePath).isFile()) return null;
  if (!isInterestingPath(relPath)) return null;
  const size = (await stat2(absolutePath)).size;
  const isText = TEXT_EXTENSIONS2.has(extname2(relPath)) && size < 5e5;
  return {
    path: relPath,
    absolutePath,
    content: isText ? await readFile6(absolutePath, "utf8") : null
  };
};
var collectSourceFilesUnderDir = async (root, dirRel, maxFiles) => {
  const results = [];
  const absDir = resolve3(root, dirRel);
  const walk = async (dir) => {
    if (results.length >= maxFiles) return;
    const entries = await readdir2(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (results.length >= maxFiles) return;
      const absolutePath = join4(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".git") continue;
        await walk(absolutePath);
        continue;
      }
      if (!entry.isFile()) continue;
      const rel = toRelPath(root, absolutePath);
      if (SOURCE_EXTENSIONS.has(extname2(rel))) results.push(rel);
    }
  };
  if (existsSync3(absDir) && statSync2(absDir).isDirectory()) {
    await walk(absDir);
  }
  return results;
};
var ancestorDirs = (relPath) => {
  const dirs = [];
  let current = dirname4(relPath.replace(/^\.\//, ""));
  for (let depth = 0; depth < 5; depth += 1) {
    dirs.push(current === "." ? "" : current);
    if (current === "." || current === "") break;
    current = dirname4(current);
  }
  return dirs;
};
var discoverLocaleFiles = async (root, seedPaths) => {
  const dirsToCheck = /* @__PURE__ */ new Set();
  for (const path of seedPaths) {
    for (const dir of ancestorDirs(path)) dirsToCheck.add(dir);
  }
  const localeFiles = [];
  for (const dir of dirsToCheck) {
    for (const localeDirName of LOCALE_DIR_NAMES) {
      const localeDir = dir ? resolve3(root, dir, localeDirName) : resolve3(root, localeDirName);
      if (!existsSync3(localeDir) || !statSync2(localeDir).isDirectory()) continue;
      const entries = await readdir2(localeDir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile() || !LOCALE_FILE_RE.test(entry.name)) continue;
        localeFiles.push(toRelPath(root, join4(localeDir, entry.name)));
      }
    }
  }
  return localeFiles;
};
var discoverRootConfigFiles = (root) => ROOT_CONFIG_FILES.filter((name) => existsSync3(resolve3(root, name))).map((name) => name);
var crawlFromEntries = async (opts) => {
  const root = resolve3(opts.root);
  const maxFiles = opts.maxFiles ?? 600;
  const normalizedEntries = opts.entries.map(
    (entry) => entry.startsWith(root) ? toRelPath(root, entry) : entry.replace(/^\.\//, "").replace(/\/$/, "")
  );
  const byPath = /* @__PURE__ */ new Map();
  const queue = [];
  const visited = /* @__PURE__ */ new Set();
  let scopeMode = "import-graph";
  const enqueue = (relPath) => {
    const normalized = relPath.replace(/^\.\//, "");
    if (visited.has(normalized) || visited.size >= maxFiles) return;
    visited.add(normalized);
    queue.push(normalized);
  };
  for (const entryRel of normalizedEntries) {
    const abs = resolve3(root, entryRel);
    if (!existsSync3(abs)) continue;
    if (statSync2(abs).isDirectory()) {
      scopeMode = scopeMode === "import-graph" ? "directory" : "mixed";
      const underDir = await collectSourceFilesUnderDir(root, entryRel, maxFiles);
      underDir.forEach(enqueue);
      continue;
    }
    enqueue(entryRel);
  }
  while (queue.length > 0 && byPath.size < maxFiles) {
    const current = queue.shift();
    if (!current) continue;
    const file = byPath.get(current) ?? await loadAuditFile(root, current);
    if (!file) continue;
    byPath.set(current, file);
    if (!file.content) continue;
    const dir = dirname4(resolve3(root, current));
    for (const spec of readImports(file.content)) {
      const rel = resolveImportToRelPath(dir, root, spec);
      if (rel) enqueue(rel);
    }
  }
  const seedPaths = new Set(byPath.keys());
  const localeFiles = await discoverLocaleFiles(root, seedPaths);
  for (const localePath of localeFiles) {
    if (byPath.size >= maxFiles) break;
    if (byPath.has(localePath)) continue;
    const file = await loadAuditFile(root, localePath);
    if (file) byPath.set(localePath, file);
  }
  for (const configPath of discoverRootConfigFiles(root)) {
    if (byPath.size >= maxFiles) break;
    if (byPath.has(configPath)) continue;
    const file = await loadAuditFile(root, configPath);
    if (file) byPath.set(configPath, file);
  }
  return {
    files: [...byPath.values()],
    entries: normalizedEntries,
    scopeMode
  };
};

// src/audit/analyzers/assetAnalyzer.ts
import { createHash } from "node:crypto";
import { dirname as dirname5, normalize } from "node:path";
var ASSET_REF_RE = /(?:from\s+['"]([^'"]+\.(?:png|jpe?g|webp|gif|svg|json|lottie|mp4|mov|webm|ttf|otf|woff2?))['"]|require\(\s*['"]([^'"]+\.(?:png|jpe?g|webp|gif|svg|json|lottie|mp4|mov|webm|ttf|otf|woff2?))['"]\s*\)|['"]([^'"]+\.(?:png|jpe?g|webp|gif|svg|json|lottie|mp4|mov|webm|ttf|otf|woff2?))['"])/gi;
var UNSUPPORTED_IMAGE_EXT = /\.(heic|heif|avif|bmp|ico|tiff?)$/i;
var inferType = (path) => {
  const lower = path.toLowerCase();
  if (lower.endsWith(".ttf") || lower.endsWith(".otf") || lower.endsWith(".woff") || lower.endsWith(".woff2")) {
    return "font";
  }
  if (lower.endsWith(".json") || lower.endsWith(".lottie")) return "lottie";
  if (lower.endsWith(".mp4") || lower.endsWith(".mov") || lower.endsWith(".webm")) return "video";
  return "image";
};
var inferContentType = (path) => {
  const lower = path.toLowerCase();
  if (UNSUPPORTED_IMAGE_EXT.test(lower)) return null;
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".json") || lower.endsWith(".lottie")) return "application/json";
  if (lower.endsWith(".mp4")) return "video/mp4";
  if (lower.endsWith(".mov")) return "video/quicktime";
  if (lower.endsWith(".webm")) return "video/webm";
  if (lower.endsWith(".ttf")) return "font/ttf";
  if (lower.endsWith(".otf")) return "font/otf";
  if (lower.endsWith(".woff")) return "font/woff";
  if (lower.endsWith(".woff2")) return "font/woff2";
  return null;
};
var placeholderUuid = (path) => {
  const hash = createHash("sha1").update(path).digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-8${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
};
var resolveRef = (filePath, ref) => normalize(ref.startsWith(".") ? `${dirname5(filePath)}/${ref}` : ref).replaceAll("\\", "/");
var analyzeAssets = (files) => {
  const findings = [];
  const seen = /* @__PURE__ */ new Set();
  files.forEach((file) => {
    if (!file.content) return;
    for (const match of file.content.matchAll(ASSET_REF_RE)) {
      const ref = match[1] ?? match[2] ?? match[3];
      if (!ref) continue;
      const assetPath = resolveRef(file.path, ref);
      const key = `${file.path}:${assetPath}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const type = inferType(assetPath);
      const contentType = inferContentType(assetPath);
      if (contentType === null) {
        findings.push({
          kind: "asset",
          confidence: "high",
          file: file.path,
          evidence: `${ref} -> ${assetPath}`,
          recommendation: `BLOCKING: Rheo accepts PNG, JPEG, WebP, GIF, or SVG for images (not HEIC/AVIF). Convert ${assetPath} before bundling, or use a supported format in rheo-import.assets.json.`
        });
        continue;
      }
      findings.push({
        kind: type === "lottie" ? "lottie" : type === "font" ? "font" : "asset",
        confidence: "high",
        file: file.path,
        evidence: `${ref} -> ${assetPath}`,
        recommendation: type === "font" ? `BLOCKING: Do not add ${assetPath} to rheo-import.assets.json (fonts are not media). Copy to assets/fonts/, add a style row in rheo-import.fonts.json (placeholder id ${placeholderUuid(assetPath)}, weight/italic), set manifest.theme.fontFamily. Upload MIME is inferred from extension (font/ttf, font/otf, font/woff, font/woff2). See font-import.md.` : `Bundle as ${type} with contentType "${contentType}", placeholder id ${placeholderUuid(assetPath)}, and include it in rheo-import.assets.json. Allowed image MIME types: image/png, image/jpeg, image/webp, image/gif, image/svg+xml. Never put .ttf/.otf/.woff/.woff2 in assets.json.`
      });
    }
  });
  if (findings.length === 0) {
    findings.push({
      kind: "question",
      confidence: "medium",
      file: "(asset audit)",
      evidence: "No local image, Lottie, or video references were found in scanned files.",
      recommendation: "Only use JSON-only output if the traced flow truly has no local media assets."
    });
  }
  return findings;
};

// src/audit/analyzers/backgroundAnalyzer.ts
var GRADIENT_COLORS_RE = /colors\s*=\s*\{\s*\[([^\]]+)\]\s*\}|colors\s*=\s*\[\s*([^\]]+)\s*\]/g;
var HEX_IN_GRADIENT_RE = /#[0-9a-fA-F]{3,8}\b|['"][#][0-9a-fA-F]{3,8}['"]/g;
var extractGradientStops = (content) => {
  const stops = [];
  let match = GRADIENT_COLORS_RE.exec(content);
  while (match) {
    const raw = match[1] ?? match[2] ?? "";
    const hexes = raw.match(HEX_IN_GRADIENT_RE) ?? [];
    hexes.forEach((hex) => {
      const cleaned = hex.replace(/['"]/g, "");
      if (cleaned.startsWith("#")) stops.push(cleaned);
    });
    match = GRADIENT_COLORS_RE.exec(content);
  }
  GRADIENT_COLORS_RE.lastIndex = 0;
  return [...new Set(stops)];
};
var analyzeBackgrounds = (files) => {
  const findings = [];
  files.forEach((file) => {
    if (!file.content) return;
    const gradientStops = extractGradientStops(file.content);
    if (gradientStops.length >= 2) {
      const css = `linear-gradient(180deg, ${gradientStops[0]} 0%, ${gradientStops[gradientStops.length - 1]} 100%)`;
      findings.push({
        kind: "background",
        confidence: "high",
        file: file.path,
        evidence: `LinearGradient stops: ${gradientStops.join(" \u2192 ")}`,
        recommendation: `Set screen.containerStyle.backgroundFill to { "kind": "color", "color": "${css}" }. If the gradient wraps the whole shell (e.g. BackgroundGradient), apply to every default onboarding screen unless a screen overrides with a solid brand color.`
      });
    }
    const checks = [
      [
        /\b(LinearGradient|CAGradientLayer|expo-linear-gradient|SwiftUI\.LinearGradient)\b/,
        "Gradient background marker",
        'Do not drop gradients. Use `backgroundFill.kind: "color"` with a `linear-gradient(...)` CSS string, or approximate with the dominant stop hex when only one color is clear.'
      ],
      [
        /\bBackgroundGradient\b/,
        "Shared gradient shell component",
        "Apply the same screen-level gradient to all screens that mount this shell. Inspect default start/end colors in the component definition."
      ],
      [
        /\b(ImageBackground|backgroundImage|backgroundAsset|heroBackground)\b/,
        "Image background marker",
        "Use screen.containerStyle.backgroundFill with an image media asset when this is screen-level chrome."
      ],
      [
        /\b(VideoBackground|backgroundVideo|videoBackground)\b/,
        "Video background marker",
        "Use screen.containerStyle.backgroundFill with a video media asset when this is screen-level chrome."
      ],
      [
        /\b(backgroundColor|background|bg-(?:red|primary|teal|white|gray)[a-z0-9-]*)\b/i,
        "Container background marker",
        "Map screen-level colors into screen.containerStyle.backgroundFill. Pair with light text (`#FFFFFF`) when the fill is dark or saturated."
      ]
    ];
    checks.forEach(([pattern, label, recommendation]) => {
      const match = file.content?.match(pattern)?.[0];
      if (!match) return;
      findings.push({
        kind: "background",
        confidence: label.includes("Gradient") || label.includes("Image") ? "high" : "medium",
        file: file.path,
        evidence: `${label}: ${match}`,
        recommendation
      });
    });
  });
  return findings;
};

// src/audit/analyzers/carouselAnalyzer.ts
var CAROUSEL_NO_DUPLICATE_FOOTER = "Carousels are swipe-only (optional pageControl dots). Do not add regions.footer or body buttons for in-pager paging. Use regions.footer only for CTAs that advance the next screen in the flow, or single-slide carousels.";
var CAROUSEL_PATTERNS = [
  [
    /\binfoSteps\b/,
    "In-screen pager array (`infoSteps`)",
    `Emit a \`carousel\` layer with one vertical \`stack\` slide per entry. Map each slide image/text from the array. Do not collapse to a single static screen. ${CAROUSEL_NO_DUPLICATE_FOOTER}`
  ],
  [
    /\bcurrentInfoStep\b/,
    "Paged step index (`currentInfoStep`)",
    `The screen is multi-slide. Use \`kind: "carousel"\` (or split into multiple screens only if the user requests structure over fidelity). ${CAROUSEL_NO_DUPLICATE_FOOTER}`
  ],
  [
    /\btranslateX\b[\s\S]{0,120}\binterpolate\b/,
    "Animated horizontal pager (`translateX` + `interpolate`)",
    "Treat as carousel semantics. Each pager page needs its own slide stack and bundled assets."
  ],
  [
    /\bpagingEnabled\b|\bhorizontal\b[\s\S]{0,80}\bFlatList\b|\bPagerView\b|\breact-native-pager-view\b/,
    "Horizontal paging list",
    'Use `kind: "carousel"` when pages are distinct onboarding steps inside one route.'
  ],
  [
    /\bTestimonialCarousel\b|\bCarousel\b|\bSwiper\b/,
    "Named carousel component",
    "Inspect children/slides. For onboarding content, prefer `carousel` layers; for host paywalls, use external surfaces when appropriate."
  ],
  [
    /\bflex-row\b[\s\S]{0,200}\bscreenWidth\b/,
    "Full-width horizontal slide row",
    "Likely in-screen carousel. Emit `carousel` with `pageControl` when dot indicators are present."
  ]
];
var countArrayEntries = (content, name) => {
  const re = new RegExp(`\\b${name}\\s*=\\s*\\[`, "m");
  const start = content.search(re);
  if (start < 0) return null;
  let depth = 0;
  for (let i = start; i < content.length; i += 1) {
    const ch = content[i];
    if (ch === "[") depth += 1;
    if (ch === "]") {
      depth -= 1;
      if (depth === 0) {
        const slice = content.slice(start, i + 1);
        const objects = slice.match(/\{[\s\S]*?\}/g);
        return objects?.length ?? null;
      }
    }
  }
  return null;
};
var analyzeCarousels = (files) => {
  const findings = [];
  files.forEach((file) => {
    const content = file.content;
    if (!content) return;
    CAROUSEL_PATTERNS.forEach(([pattern, label, recommendation]) => {
      if (!pattern.test(content)) return;
      const slideCount = countArrayEntries(content, "infoSteps");
      const evidence = slideCount !== null ? `${label} (${slideCount} slides detected)` : label;
      findings.push({
        kind: "carousel",
        confidence: slideCount !== null && slideCount > 1 ? "high" : "medium",
        file: file.path,
        evidence,
        recommendation
      });
    });
  });
  return findings;
};

// src/audit/animationPresetTracks.ts
var fadeInTracks = [
  {
    property: "opacity",
    keyframes: [
      { t: 0, value: 0, easing: "standard" },
      { t: 1, value: 1 }
    ]
  }
];
var ANIMATION_PRESETS = {
  "fade-in": {
    id: "fade-in",
    build: () => ({ tracks: fadeInTracks })
  },
  "slide-up": {
    id: "slide-up",
    optionalFade: true,
    build: (opts) => {
      const translate = [
        {
          property: "translateY",
          keyframes: [
            { t: 0, value: 16, easing: "standard" },
            { t: 1, value: 0 }
          ]
        }
      ];
      return opts?.withFade ? { tracks: [fadeInTracks[0], ...translate] } : { tracks: translate };
    }
  },
  "slide-down-in": {
    id: "slide-down-in",
    optionalFade: true,
    build: (opts) => {
      const translate = [
        {
          property: "translateY",
          keyframes: [
            { t: 0, value: -16, easing: "standard" },
            { t: 1, value: 0 }
          ]
        }
      ];
      return opts?.withFade ? { tracks: [fadeInTracks[0], ...translate] } : { tracks: translate };
    }
  },
  "slide-in-left": {
    id: "slide-in-left",
    optionalFade: true,
    build: (opts) => {
      const translate = [
        {
          property: "translateX",
          keyframes: [
            { t: 0, value: -24, easing: "standard" },
            { t: 1, value: 0 }
          ]
        }
      ];
      return opts?.withFade ? { tracks: [fadeInTracks[0], ...translate] } : { tracks: translate };
    }
  },
  "slide-in-right": {
    id: "slide-in-right",
    optionalFade: true,
    build: (opts) => {
      const translate = [
        {
          property: "translateX",
          keyframes: [
            { t: 0, value: 24, easing: "standard" },
            { t: 1, value: 0 }
          ]
        }
      ];
      return opts?.withFade ? { tracks: [fadeInTracks[0], ...translate] } : { tracks: translate };
    }
  },
  "scale-in": {
    id: "scale-in",
    build: () => ({
      tracks: [
        ...fadeInTracks,
        {
          property: "scale",
          keyframes: [
            { t: 0, value: 0.96, easing: "emphasized" },
            { t: 1, value: 1 }
          ]
        }
      ]
    })
  },
  "fade-out": {
    id: "fade-out",
    build: () => ({
      tracks: [
        {
          property: "opacity",
          keyframes: [
            { t: 0, value: 1, easing: "standard" },
            { t: 1, value: 0 }
          ]
        }
      ]
    })
  },
  "slide-up-out": {
    id: "slide-up-out",
    optionalFade: true,
    build: (opts) => {
      const translate = [
        {
          property: "translateY",
          keyframes: [
            { t: 0, value: 0, easing: "standard" },
            { t: 1, value: -20 }
          ]
        }
      ];
      const fadeOut = ANIMATION_PRESETS["fade-out"].build().tracks[0];
      return opts?.withFade ? { tracks: [fadeOut, ...translate] } : { tracks: translate };
    }
  },
  "slide-down-out": {
    id: "slide-down-out",
    optionalFade: true,
    build: (opts) => {
      const translate = [
        {
          property: "translateY",
          keyframes: [
            { t: 0, value: 0, easing: "standard" },
            { t: 1, value: 20 }
          ]
        }
      ];
      const fadeOut = ANIMATION_PRESETS["fade-out"].build().tracks[0];
      return opts?.withFade ? { tracks: [fadeOut, ...translate] } : { tracks: translate };
    }
  },
  "slide-left-out": {
    id: "slide-left-out",
    optionalFade: true,
    build: (opts) => {
      const translate = [
        {
          property: "translateX",
          keyframes: [
            { t: 0, value: 0, easing: "standard" },
            { t: 1, value: -24 }
          ]
        }
      ];
      const fadeOut = ANIMATION_PRESETS["fade-out"].build().tracks[0];
      return opts?.withFade ? { tracks: [fadeOut, ...translate] } : { tracks: translate };
    }
  },
  "slide-right-out": {
    id: "slide-right-out",
    optionalFade: true,
    build: (opts) => {
      const translate = [
        {
          property: "translateX",
          keyframes: [
            { t: 0, value: 0, easing: "standard" },
            { t: 1, value: 24 }
          ]
        }
      ];
      const fadeOut = ANIMATION_PRESETS["fade-out"].build().tracks[0];
      return opts?.withFade ? { tracks: [fadeOut, ...translate] } : { tracks: translate };
    }
  },
  "scale-out": {
    id: "scale-out",
    build: () => ({
      tracks: [
        {
          property: "opacity",
          keyframes: [
            { t: 0, value: 1, easing: "standard" },
            { t: 1, value: 0 }
          ]
        },
        {
          property: "scale",
          keyframes: [
            { t: 0, value: 1, easing: "emphasized" },
            { t: 1, value: 0.96 }
          ]
        }
      ]
    })
  }
};
var DEFAULT_MOUNT_DURATION_MS = 320;
var DEFAULT_UNMOUNT_DURATION_MS = 280;
var DEFAULT_STAGGER_STEP_MS = 50;
var buildClipFromPreset = (opts) => {
  const preset = ANIMATION_PRESETS[opts.presetId];
  if (!preset) return null;
  const built = preset.optionalFade ? preset.build({ withFade: opts.withFade }) : preset.build();
  const durationMs = opts.durationMs ?? (opts.trigger === "unmount" ? DEFAULT_UNMOUNT_DURATION_MS : DEFAULT_MOUNT_DURATION_MS);
  const slug = opts.targetLayerId.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 32);
  return {
    id: `clip-${opts.presetId}-${slug}`,
    targetLayerId: opts.targetLayerId,
    trigger: opts.trigger,
    ...opts.trigger === "stagger" && opts.staggerIndex !== void 0 ? { staggerIndex: opts.staggerIndex } : {},
    durationMs,
    ...opts.delayMs !== void 0 ? { delayMs: opts.delayMs } : {},
    tracks: built.tracks
  };
};

// src/audit/analyzers/animationAnalyzer.ts
var MAX_CLIPS_PER_SCREEN = 12;
var screenSlugFromPath = (filePath) => {
  const base = filePath.split("/").pop() ?? filePath;
  const name = base.replace(/\.(tsx|ts|jsx|js|swift)$/i, "");
  return name.replace(/Screen$/i, "").replace(/View$/i, "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "screen";
};
var layerHint = (screenSlug, role) => `layer:${screenSlug}:${role}`;
var clampDurationMs = (raw, fallback) => {
  if (raw === void 0 || !Number.isFinite(raw)) return fallback;
  const n = Math.round(raw);
  if (n < 50 || n > 800) return fallback;
  return n;
};
var extractDurationMs = (content, nearIndex) => {
  const window = content.slice(Math.max(0, nearIndex - 200), nearIndex + 400);
  const patterns = [
    /\bduration\s*:\s*(\d+)/i,
    /\bdurationMs\s*:\s*(\d+)/i,
    /\b(\d{2,4})\s*,\s*(?:easing|useNativeDriver)/i
  ];
  for (const re of patterns) {
    const m = window.match(re);
    if (m?.[1]) {
      const n = Number.parseInt(m[1], 10);
      if (n >= 50 && n <= 800) return n;
    }
  }
  return void 0;
};
var extractStaggerStepMs = (content) => {
  const m = content.match(/\bstagger\s*:\s*(\d+)/i) ?? content.match(/\bstaggerDelay\s*:\s*(\d+)/i) ?? content.match(/\bstepMs\s*:\s*(\d+)/i);
  if (!m?.[1]) return void 0;
  const n = Number.parseInt(m[1], 10);
  return n >= 20 && n <= 500 ? n : void 0;
};
var countExplicitStaggerChildren = (content) => {
  if (!/\bstaggerChildren\b|\bstagger:\s*\d+/i.test(content)) return null;
  const delayArray = content.match(/\bdelays\s*=\s*\[([^\]]+)\]/);
  if (delayArray?.[1]) {
    return delayArray[1].split(",").filter((s) => s.trim().length > 0).length;
  }
  const mapDelay = content.match(/\.map\s*\([^)]*,\s*(?:index|i)\s*\)\s*=>[\s\S]{0,120}\bdelay(?:Ms)?\s*:\s*(?:index|i)\s*\*\s*(\d+)/);
  if (mapDelay) {
    const childBlocks = content.match(/\bchildren\s*=\s*\{[\s\S]{0,800}\}/g);
    if (childBlocks?.[0]) {
      const items = childBlocks[0].match(/<[\w.]+/g);
      if (items && items.length > 1) return Math.min(items.length - 1, 8);
    }
    return 3;
  }
  return null;
};
var analyzeRnContent = (content, file, screenSlug) => {
  const motions = [];
  if (/\bwithSpring\s*\(/i.test(content)) {
    motions.push({
      preset: "",
      trigger: "mount",
      role: "hero",
      confidence: "high",
      evidence: "withSpring(...)",
      unmapped: true,
      unmappedReason: "spring physics cannot map to Rheo preset tracks"
    });
  }
  const reanimatedEnter = [
    [/FadeIn\.(down|up|left|right)?/i, (m) => {
      const dir = (m[1] ?? "").toLowerCase();
      if (dir === "up") return "slide-up";
      if (dir === "down") return "slide-down-in";
      if (dir === "left") return "slide-in-left";
      if (dir === "right") return "slide-in-right";
      return "fade-in";
    }],
    [/SlideIn(Up|Down|Left|Right)/i, (m) => {
      const d = m[1]?.toLowerCase();
      if (d === "up") return "slide-up";
      if (d === "down") return "slide-down-in";
      if (d === "left") return "slide-in-left";
      return "slide-in-right";
    }],
    [/ZoomIn/i, () => "scale-in"]
  ];
  for (const [re, pick] of reanimatedEnter) {
    const m = content.match(re);
    if (m) {
      motions.push({
        preset: pick(m),
        trigger: "mount",
        role: "hero",
        confidence: "high",
        evidence: m[0],
        durationMs: extractDurationMs(content, m.index ?? 0)
      });
      break;
    }
  }
  const reanimatedExit = [
    [/FadeOut\.(down|up|left|right)?/i, (m) => {
      const dir = (m[1] ?? "").toLowerCase();
      if (dir === "up") return "slide-up-out";
      if (dir === "down") return "slide-down-out";
      if (dir === "left") return "slide-left-out";
      if (dir === "right") return "slide-right-out";
      return "fade-out";
    }],
    [/SlideOut(Up|Down|Left|Right)/i, (m) => {
      const d = m[1]?.toLowerCase();
      if (d === "up") return "slide-up-out";
      if (d === "down") return "slide-down-out";
      if (d === "left") return "slide-left-out";
      return "slide-right-out";
    }]
  ];
  for (const [re, pick] of reanimatedExit) {
    const m = content.match(re);
    if (m) {
      motions.push({
        preset: pick(m),
        trigger: "unmount",
        role: "hero",
        confidence: "high",
        evidence: m[0],
        durationMs: extractDurationMs(content, m.index ?? 0)
      });
      break;
    }
  }
  if (/\buseAnimatedStyle\b/i.test(content) || /\bAnimated\.timing\b/i.test(content)) {
    if (/translateY[\s\S]{0,80}(?:16|20|-16)/.test(content) && !motions.some((x) => x.preset === "slide-up")) {
      motions.push({
        preset: "slide-up",
        trigger: "mount",
        role: "hero",
        confidence: "medium",
        evidence: "translateY motion in animated style",
        durationMs: extractDurationMs(content, content.search(/translateY/i))
      });
    } else if (/opacity[\s\S]{0,60}(?:0\s*[,}]|from:\s*0)/i.test(content) && !motions.some((x) => x.preset === "fade-in")) {
      motions.push({
        preset: "fade-in",
        trigger: "mount",
        role: "hero",
        confidence: "medium",
        evidence: "opacity fade in animated style",
        durationMs: extractDurationMs(content, content.search(/opacity/i))
      });
    }
  }
  if (/\bLayoutAnimation\.configureNext\b/i.test(content)) {
    motions.push({
      preset: "fade-in",
      trigger: "mount",
      role: "body",
      confidence: "low",
      evidence: "LayoutAnimation.configureNext",
      durationMs: DEFAULT_MOUNT_DURATION_MS
    });
  }
  const staggerCount = countExplicitStaggerChildren(content);
  if (staggerCount !== null && staggerCount > 0) {
    const preset = motions.find((x) => x.trigger === "mount" && !x.unmapped)?.preset ?? "fade-in";
    for (let i = 0; i < staggerCount; i += 1) {
      motions.push({
        preset,
        trigger: "stagger",
        role: `child-${i}`,
        confidence: "high",
        evidence: `explicit stagger child index ${i}`,
        staggerIndex: i,
        durationMs: extractDurationMs(content, content.search(/stagger/i))
      });
    }
  }
  if (/\brepeatForever\b|\blooping\s*:\s*true\b/i.test(content)) {
    if (/\brotate\b|rotation/i.test(content)) {
      motions.push({
        preset: "rotate",
        trigger: "mount",
        role: "hero",
        confidence: "high",
        evidence: "repeatForever rotation"
      });
    } else if (/\bbounce|translateY/i.test(content)) {
      motions.push({
        preset: "bounce",
        trigger: "mount",
        role: "cta",
        confidence: "medium",
        evidence: "repeatForever vertical motion"
      });
    } else if (/\bpulse|opacity/i.test(content)) {
      motions.push({
        preset: "pulse",
        trigger: "mount",
        role: "hero",
        confidence: "medium",
        evidence: "repeatForever opacity"
      });
    }
  }
  if (motions.length === 0 && /\bwithTiming\s*\(/i.test(content)) {
    motions.push({
      preset: "fade-in",
      trigger: "mount",
      role: "hero",
      confidence: "low",
      evidence: "withTiming (preset shape unclear)",
      durationMs: extractDurationMs(content, content.search(/withTiming/i))
    });
  }
  void file;
  void screenSlug;
  return motions;
};
var analyzeSwiftContent = (content) => {
  const motions = [];
  const transitionOpacity = content.match(/\.transition\s*\(\s*\.opacity\s*\)/i);
  if (transitionOpacity) {
    motions.push({
      preset: "fade-in",
      trigger: "mount",
      role: "hero",
      confidence: "high",
      evidence: transitionOpacity[0]
    });
  }
  const moveEdge = content.match(/\.transition\s*\(\s*\.move\s*\(\s*edge\s*:\s*\.(\w+)/i);
  if (moveEdge) {
    const edge = moveEdge[1]?.toLowerCase();
    const preset = edge === "top" ? "slide-down-in" : edge === "bottom" ? "slide-up" : edge === "leading" ? "slide-in-left" : edge === "trailing" ? "slide-in-right" : "fade-in";
    motions.push({
      preset,
      trigger: "mount",
      role: "hero",
      confidence: "high",
      evidence: moveEdge[0]
    });
  }
  if (/\.transition\s*\(\s*\.scale/i.test(content)) {
    motions.push({
      preset: "scale-in",
      trigger: "mount",
      role: "hero",
      confidence: "high",
      evidence: ".transition(.scale)"
    });
  }
  if (/\.animation\s*\(\s*\.repeatForever/i.test(content)) {
    if (/\.rotateEffect|rotationEffect/i.test(content)) {
      motions.push({
        preset: "rotate",
        trigger: "mount",
        role: "hero",
        confidence: "high",
        evidence: "animation(.repeatForever) + rotation"
      });
    } else {
      motions.push({
        preset: "pulse",
        trigger: "mount",
        role: "hero",
        confidence: "medium",
        evidence: "animation(.repeatForever)"
      });
    }
  }
  if (/\bwithAnimation\s*\(/i.test(content) && motions.length === 0) {
    motions.push({
      preset: "fade-in",
      trigger: "mount",
      role: "hero",
      confidence: "medium",
      evidence: "withAnimation { ... }"
    });
  }
  return motions;
};
var isRestingPreset = (preset) => preset === "translate" || preset === "bounce" || preset === "scale" || preset === "pulse" || preset === "rotate";
var motionToFinding = (file, screenSlug, motion) => {
  if (motion.unmapped) {
    return {
      kind: "animation",
      confidence: motion.confidence,
      file,
      evidence: motion.evidence,
      recommendation: `Unmapped \u2014 omit from manifest. ${motion.unmappedReason ?? "No matching Rheo preset."}`
    };
  }
  const target = layerHint(screenSlug, motion.role);
  const trigger = motion.trigger;
  const preset = motion.preset;
  const dur = motion.durationMs !== void 0 ? ` durationMs=${motion.durationMs}` : "";
  const stagger = motion.staggerIndex !== void 0 ? ` staggerIndex=${motion.staggerIndex}` : "";
  return {
    kind: "animation",
    confidence: motion.confidence,
    file,
    evidence: motion.evidence,
    recommendation: `Map to preset \`${preset}\` trigger=\`${trigger}\` targetLayerId=\`${target}\`${stagger}${dur}. Resolve targetLayerId to a real layer id in the manifest.`
  };
};
var buildScreenSuggestion = (screenSlug, file, motions, content) => {
  const animations = [];
  const restingMotion = [];
  const omitted = [];
  let clipCount = 0;
  for (const motion of motions) {
    if (motion.unmapped) {
      omitted.push({
        reason: motion.unmappedReason ?? "unmapped motion",
        evidence: motion.evidence
      });
      continue;
    }
    if (isRestingPreset(motion.preset)) {
      if (motion.confidence === "high") {
        restingMotion.push({
          targetLayerId: layerHint(screenSlug, motion.role),
          preset: motion.preset,
          loop: true
        });
      }
      continue;
    }
    if (clipCount >= MAX_CLIPS_PER_SCREEN) continue;
    const trigger = motion.trigger;
    const durationMs = clampDurationMs(
      motion.durationMs,
      trigger === "unmount" ? DEFAULT_UNMOUNT_DURATION_MS : DEFAULT_MOUNT_DURATION_MS
    );
    animations.push({
      targetLayerId: layerHint(screenSlug, motion.role),
      trigger,
      preset: motion.preset,
      ...motion.staggerIndex !== void 0 ? { staggerIndex: motion.staggerIndex } : {},
      durationMs,
      ...motion.withFade ? { withFade: motion.withFade } : {}
    });
    clipCount += 1;
  }
  const staggerStep = extractStaggerStepMs(content);
  const hasStagger = animations.some((a) => a.trigger === "stagger");
  return {
    screenId: screenSlug,
    sourceFiles: [file],
    suggested: {
      ...hasStagger ? { stagger: { stepMs: staggerStep ?? DEFAULT_STAGGER_STEP_MS } } : {},
      animations,
      restingMotion
    },
    omitted
  };
};
var analyzeAnimations = (files) => {
  const findings = [];
  const suggestions = [];
  const screenFiles = files.filter(
    (f) => f.content && (/\.(tsx|ts|jsx|js)$/i.test(f.path) || /\.swift$/i.test(f.path)) && !/node_modules|\.test\.|__tests__|\.spec\./i.test(f.path)
  );
  for (const file of screenFiles) {
    const content = file.content;
    const screenSlug = screenSlugFromPath(file.path);
    const isSwift = /\.swift$/i.test(file.path);
    const motions = isSwift ? analyzeSwiftContent(content) : analyzeRnContent(content, file.path, screenSlug);
    if (motions.length === 0) continue;
    const mappedClips = motions.filter((m) => !m.unmapped && !isRestingPreset(m.preset));
    if (mappedClips.length > MAX_CLIPS_PER_SCREEN) {
      findings.push({
        kind: "animation",
        confidence: "medium",
        file: file.path,
        evidence: `${mappedClips.length} clip candidates on one screen`,
        recommendation: `More than ${MAX_CLIPS_PER_SCREEN} clips detected \u2014 prioritize hero and stagger children only.`
      });
    }
    for (const motion of motions) {
      findings.push(motionToFinding(file.path, screenSlug, motion));
    }
    suggestions.push(buildScreenSuggestion(screenSlug, file.path, motions, content));
  }
  if (suggestions.length === 0 && screenFiles.length > 0) {
    findings.push({
      kind: "animation",
      confidence: "low",
      file: "(animation audit)",
      evidence: "No Reanimated, Animated, LayoutAnimation, or SwiftUI motion markers in scoped files.",
      recommendation: "If the app animates screens, re-run audit with the correct entry path or confirm intake Q6=no to skip motion import."
    });
  }
  return { findings, suggestions };
};
var buildAnimationSuggestionsJson = (suggestions) => {
  const clips = [];
  for (const screen of suggestions) {
    for (const s of screen.suggested.animations) {
      const clip = buildClipFromPreset({
        presetId: s.preset,
        targetLayerId: s.targetLayerId,
        trigger: s.trigger,
        staggerIndex: s.staggerIndex,
        durationMs: s.durationMs,
        delayMs: s.delayMs,
        withFade: s.withFade
      });
      if (clip) clips.push(clip);
    }
  }
  return { screens: suggestions, clips };
};

// src/audit/analyzers/choiceStateAnalyzer.ts
var CHOICE_COMPONENT_RE = /Step[A-Z][A-Za-z0-9]*|single_choice|multiple_choice|SingleChoice|MultipleChoice/i;
var SELECTED_TERNARY_RE = /(\w+)\s*===\s*[^?]+\?\s*['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/g;
var SELECTED_STYLE_OBJECT_RE = /selected(?:Style|State)?\s*:\s*\{([^}]+)\}/gi;
var parseTailwindTokens = (value) => {
  const colors = [];
  let border;
  let background;
  value.split(/\s+/).forEach((token) => {
    if (token.startsWith("border-") && !token.startsWith("border-2")) {
      border = token;
    } else if (token.startsWith("bg-")) {
      background = token;
    } else if (token.startsWith("text-")) {
      colors.push(token);
    }
  });
  return { border, background, colors };
};
var analyzeChoiceStates = (files) => {
  const findings = [];
  files.forEach((file) => {
    if (!file.content) return;
    const choiceContext = CHOICE_COMPONENT_RE.test(file.path) || CHOICE_COMPONENT_RE.test(file.content);
    if (!choiceContext) return;
    let match = SELECTED_TERNARY_RE.exec(file.content);
    while (match) {
      const variable = match[1];
      const selected = match[2];
      const unselected = match[3];
      if (!variable || !selected || !unselected) {
        match = SELECTED_TERNARY_RE.exec(file.content);
        continue;
      }
      const selectedTokens = parseTailwindTokens(selected);
      findings.push({
        kind: "choice",
        confidence: "high",
        file: file.path,
        evidence: `${variable} selected ? "${selected}" : "${unselected}"`,
        recommendation: "Map the unselected branch to each option stack `style` and the selected branch to `selectedStyle` on the same stack (border, background, padding, radius). Map text color classes to nested text layer `style.color` for default vs selected if they differ."
      });
      if (selectedTokens.border || selectedTokens.background) {
        findings.push({
          kind: "choice",
          confidence: "high",
          file: file.path,
          evidence: `Selected chrome: ${[selectedTokens.border, selectedTokens.background].filter(Boolean).join(" ")}`,
          recommendation: "Translate selected border/background classes into option stack `selectedStyle.border` and `selectedStyle.background` hex values from theme tokens."
        });
      }
      match = SELECTED_TERNARY_RE.exec(file.content);
    }
    SELECTED_TERNARY_RE.lastIndex = 0;
    for (const styleMatch of file.content.matchAll(SELECTED_STYLE_OBJECT_RE)) {
      const body = styleMatch[1] ?? "";
      findings.push({
        kind: "choice",
        confidence: "medium",
        file: file.path,
        evidence: `Selected style object: ${body.trim().slice(0, 120)}`,
        recommendation: "Mirror this object into Rheo `selectedStyle` on choice option stacks."
      });
    }
    if (/border-primary|bg-primary|text-primary/i.test(file.content) && /border-gray|bg-gray/i.test(file.content)) {
      findings.push({
        kind: "choice",
        confidence: "medium",
        file: file.path,
        evidence: "Primary vs gray choice card classes in same file",
        recommendation: "Each single_choice / multiple_choice option child stack needs both `style` (default) and `selectedStyle` (selected). Do not only style the default state."
      });
    }
  });
  return findings;
};

// src/audit/analyzers/fontAnalyzer.ts
var FONT_LOAD_RE = /Font\.loadAsync\s*\(\s*\{([^}]+)\}/g;
var FONT_REQUIRE_RE = /['"]([^'"]+\.(?:ttf|otf|woff2?))['"]\s*:\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
var USE_FONTS_RE = /useFonts\s*\(\s*\{([^}]+)\}/g;
var TAILWIND_FONT_FAMILY_RE = /fontFamily\s*:\s*\{([^}]+)\}/g;
var FONT_CLASS_RE = /\bfont-([a-z0-9_-]+)\b/g;
var THEME_FONT_RE = /fontFamily\s*:\s*['"]([^'"]+)['"]/g;
var extractPairs = (block) => {
  const pairs = [];
  let match = FONT_REQUIRE_RE.exec(block);
  FONT_REQUIRE_RE.lastIndex = 0;
  while (match) {
    const name = match[1];
    const path = match[2];
    if (name && path) pairs.push({ name, path });
    match = FONT_REQUIRE_RE.exec(block);
  }
  return pairs;
};
var analyzeFonts = (files) => {
  const findings = [];
  const seen = /* @__PURE__ */ new Set();
  files.forEach((file) => {
    if (!file.content) return;
    for (const match of file.content.matchAll(FONT_LOAD_RE)) {
      const block = match[1] ?? "";
      extractPairs(block).forEach(({ name, path }) => {
        const key = `${name}:${path}`;
        if (seen.has(key)) return;
        seen.add(key);
        findings.push({
          kind: "font",
          confidence: "high",
          file: file.path,
          evidence: `Font.loadAsync: ${name} <- ${path}`,
          recommendation: `BLOCKING: Bundle ${path} under assets/fonts/ only in rheo-import.fonts.json (family "${name}", weight/italic, stable style id). Set manifest.theme.fontFamily to "${name}". Do not list this file in rheo-import.assets.json or use image/* MIME types.`
        });
      });
    }
    for (const match of file.content.matchAll(USE_FONTS_RE)) {
      const block = match[1] ?? "";
      extractPairs(block).forEach(({ name, path }) => {
        const key = `${name}:${path}`;
        if (seen.has(key)) return;
        seen.add(key);
        findings.push({
          kind: "font",
          confidence: "high",
          file: file.path,
          evidence: `useFonts: ${name} <- ${path}`,
          recommendation: `BLOCKING: Add ${path} to rheo-import.fonts.json for family "${name}" (not rheo-import.assets.json). Set manifest.theme.fontFamily.`
        });
      });
    }
    if (TAILWIND_FONT_FAMILY_RE.test(file.content)) {
      const block = file.content.match(TAILWIND_FONT_FAMILY_RE)?.[1] ?? file.content;
      const familyEntries = [...block.matchAll(/['"]?([a-zA-Z0-9_-]+)['"]?\s*:\s*\[([^\]]+)\]/g)];
      familyEntries.forEach((entry) => {
        const familyKey = entry[1];
        const stack = entry[2] ?? "";
        const primary = stack.match(/['"]([A-Za-z0-9 _-]+)['"]/)?.[1];
        if (!familyKey || !primary) return;
        const key = `tailwind:${familyKey}:${primary}`;
        if (seen.has(key)) return;
        seen.add(key);
        findings.push({
          kind: "font",
          confidence: "medium",
          file: file.path,
          evidence: `tailwind fontFamily.${familyKey}: ${primary}`,
          recommendation: `Set manifest.theme.fontFamily to "${primary}" and bundle every font file used for class font-${familyKey} (search Font.loadAsync / require for "${primary}").`
        });
      });
    }
    const classes = [...new Set(file.content.match(FONT_CLASS_RE) ?? [])].slice(0, 6);
    classes.forEach((cls) => {
      const familyKey = cls.replace(/^font-/, "");
      if (familyKey === "bold" || familyKey === "semibold" || familyKey === "medium") return;
      const key = `class:${familyKey}`;
      if (seen.has(key)) return;
      seen.add(key);
      findings.push({
        kind: "font",
        confidence: "low",
        file: file.path,
        evidence: `Tailwind/NativeWind class ${cls}`,
        recommendation: `Resolve ${cls} to a font family in rheo-import.fonts.json and manifest.theme.fontFamily.`
      });
    });
    const themeFonts = [...file.content.matchAll(THEME_FONT_RE)];
    themeFonts.forEach((match) => {
      const name = match[1];
      if (!name) return;
      const key = `theme:${name}`;
      if (seen.has(key)) return;
      seen.add(key);
      findings.push({
        kind: "font",
        confidence: "medium",
        file: file.path,
        evidence: `theme fontFamily: ${name}`,
        recommendation: `Set manifest.theme.fontFamily to "${name}" and bundle all font files for this family.`
      });
    });
  });
  return findings;
};

// src/audit/analyzers/i18nAnalyzer.ts
var I18N_PACKAGE_RE = /["'](i18next|react-i18next|react-intl|@formatjs\/intl|i18n-js|@lingui\/core|@lingui\/react|expo-localization|next-intl|typesafe-i18n|tolgee|rosetta|polyglot|react-native-localize)["']/i;
var CODE_SIGNALS = [
  { re: /\buseTranslation\s*\(/, label: "react-i18next useTranslation" },
  { re: /\bi18n\.t\s*\(/, label: "i18n.t()" },
  { re: /\bt\s*\(\s*['"`]/, label: "t() translation call" },
  { re: /\bformatMessage\s*\(/, label: "react-intl formatMessage" },
  { re: /\buseIntl\s*\(/, label: "react-intl useIntl" },
  { re: /<FormattedMessage\b/, label: "FormattedMessage" },
  { re: /\bI18n\.t\s*\(/, label: "i18n-js I18n.t" },
  { re: /@lingui\/macro/, label: "Lingui macro" },
  { re: /\bTrans\s+id=/, label: "Trans component" }
];
var FALLBACK_LOCALE_RE = /(?:fallbackLng|defaultLocale|defaultLanguage|primaryLocale|sourceLocale|lng)\s*[:=]\s*['"`]([a-z]{2}(?:-[A-Z]{2})?)['"`]/i;
var LOCALE_FILE_RE2 = /(?:^|\/)(?:locales|translations|i18n|lang|l10n)\/([a-z]{2}(?:-[A-Z]{2})?)\.(?:json|ts|js)$/i;
var TRANSLATION_KEY_RE = /\b(?:t|i18n\.t|I18n\.t)\s*\(\s*['"`]([^'"`]+)['"`]/g;
var getNestedString = (root, keyPath) => {
  const parts = keyPath.split(".");
  let cur = root;
  for (const part of parts) {
    if (!cur || typeof cur !== "object" || !(part in cur)) return null;
    cur = cur[part];
  }
  return typeof cur === "string" && cur.trim().length > 0 ? cur : null;
};
var parseLocaleJson = (content) => {
  try {
    const data = JSON.parse(content);
    return data && typeof data === "object" && !Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
};
var analyzeI18n = (files) => {
  const findings = [];
  const signals = /* @__PURE__ */ new Set();
  let defaultLocale;
  const localeFiles = /* @__PURE__ */ new Map();
  const keysInSource = /* @__PURE__ */ new Set();
  files.forEach((file) => {
    if (!file.content) return;
    if (file.path === "package.json" || file.path.endsWith("/package.json")) {
      const match = file.content.match(I18N_PACKAGE_RE);
      if (match?.[1]) signals.add(`npm:${match[1]}`);
    }
    CODE_SIGNALS.forEach(({ re, label }) => {
      if (re.test(file.content)) signals.add(label);
    });
    if (!defaultLocale) {
      const localeMatch = file.content.match(FALLBACK_LOCALE_RE);
      if (localeMatch?.[1]) defaultLocale = localeMatch[1];
    }
    const localePathMatch = file.path.match(LOCALE_FILE_RE2);
    if (localePathMatch?.[1] && file.content) {
      localeFiles.set(localePathMatch[1], file.path);
    }
    for (const match of file.content.matchAll(TRANSLATION_KEY_RE)) {
      const key = match[1]?.trim();
      if (key) keysInSource.add(key);
    }
  });
  if (signals.size === 0 && keysInSource.size === 0 && localeFiles.size === 0) {
    return findings;
  }
  const resolvedDefault = defaultLocale ?? (localeFiles.has("en") ? "en" : [...localeFiles.keys()].sort()[0]);
  findings.push({
    kind: "i18n",
    confidence: "high",
    file: "(i18n audit)",
    evidence: `Localization detected (${[...signals].slice(0, 6).join(", ") || "locale JSON / t() calls"}).`,
    recommendation: `BLOCKING: Resolve every user-visible string from the app default locale${resolvedDefault ? ` ("${resolvedDefault}")` : ""} into Rheo \`text.default\` (and button/link copy). Never copy raw translation keys (e.g. \`onboarding.welcome.title\`) into the manifest. Set manifest \`defaultLocale\` to the same locale. See localization-import.md.`
  });
  if (resolvedDefault) {
    findings.push({
      kind: "i18n",
      confidence: "high",
      file: "(i18n audit)",
      evidence: `Default/fallback locale: ${resolvedDefault}`,
      recommendation: `Use "${resolvedDefault}" for manifest.defaultLocale and load strings from that locale's translation files when mapping layers.`
    });
  }
  localeFiles.forEach((path, locale) => {
    findings.push({
      kind: "i18n",
      confidence: "medium",
      file: path,
      evidence: `Locale bundle: ${locale}`,
      recommendation: locale === resolvedDefault ? `Primary source for \`text.default\` strings \u2014 read this file and resolve keys to "${locale}" copy.` : `Optional: add other locales under \`text.translations\` after default copy is correct.`
    });
  });
  const defaultBundlePath = resolvedDefault ? localeFiles.get(resolvedDefault) : void 0;
  const defaultBundle = defaultBundlePath ? parseLocaleJson(files.find((f) => f.path === defaultBundlePath)?.content ?? "") : null;
  [...keysInSource].slice(0, 8).forEach((key) => {
    const resolved = defaultBundle ? getNestedString(defaultBundle, key) : null;
    findings.push({
      kind: "i18n",
      confidence: resolved ? "high" : "medium",
      file: "(i18n audit)",
      evidence: resolved ? `t("${key}") -> "${resolved}"` : `t("${key}")`,
      recommendation: resolved ? `Use text.default: "${resolved}" (not "${key}").` : `Resolve t("${key}") from the ${resolvedDefault ?? "default"} locale JSON before writing the manifest.`
    });
  });
  return findings;
};

// src/audit/analyzers/layoutAnalyzer.ts
var SHADOW_RE = /\b(shadowColor|shadowOffset|shadowOpacity|shadowRadius|elevation|boxShadow)\b[^,\n}]*/gi;
var BORDER_RE = /\b(borderWidth|borderColor|border-2|border-\[|border:\s*\{)/gi;
var ALIGN_RE = /\b(alignItems|justifyContent|alignSelf|textAlign|items-center|justify-center|text-center)\b[^,\n}]*/gi;
var CENTER_CLASS_RE = /\bitems-center\b|\bjustify-center\b|\btext-center\b/g;
var analyzeLayout = (files) => {
  const findings = [];
  files.forEach((file) => {
    if (!file.content) return;
    const shadows = [...new Set(file.content.match(SHADOW_RE) ?? [])].slice(0, 4);
    shadows.forEach((match) => {
      findings.push({
        kind: "layout",
        confidence: "high",
        file: file.path,
        evidence: match.trim(),
        recommendation: "Map to layer or stack `style.shadow` (offset/blur/color/opacity). Card chrome should use a wrapping `stack` with background, radius, padding, border, and shadow \u2014 not flat siblings."
      });
    });
    const borders = [...new Set(file.content.match(BORDER_RE) ?? [])].slice(0, 4);
    borders.forEach((match) => {
      findings.push({
        kind: "layout",
        confidence: "medium",
        file: file.path,
        evidence: match.trim(),
        recommendation: "Map to `style.border` and `style.background` on the enclosing stack. Preserve selected-state border colors on choice options."
      });
    });
    const aligns = [...new Set(file.content.match(ALIGN_RE) ?? [])].slice(0, 4);
    if (aligns.length > 0) {
      findings.push({
        kind: "layout",
        confidence: "high",
        file: file.path,
        evidence: aligns.join("; "),
        recommendation: 'Map RN/Tailwind centering to parent `stack.align: "center"` and `stack.justify: "center"`. Center hero images inside vertical body stacks. Use `style.align: "center"` on text layers.'
      });
    }
    if (CENTER_CLASS_RE.test(file.content) && /kind:\s*['"]image['"]|Image\b/.test(file.content)) {
      findings.push({
        kind: "layout",
        confidence: "high",
        file: file.path,
        evidence: "Centered layout classes near image content",
        recommendation: 'Wrap centered images in a vertical stack with `align: "center"`. Set explicit image `style.width`/`style.height` from source dimensions.'
      });
    }
    if (/\btext-white\b|\bcolor:\s*['"]#fff|#ffffff/i.test(file.content)) {
      findings.push({
        kind: "layout",
        confidence: "high",
        file: file.path,
        evidence: "Light foreground text on colored screen",
        recommendation: "When the screen uses a dark or saturated `containerStyle.backgroundFill`, set text `style.color` to `#FFFFFF` or `theme.primaryForeground` \u2014 do not rely on default `theme.foreground`."
      });
    }
  });
  return findings;
};

// src/audit/analyzers/regionAnalyzer.ts
var hasAny = (content, patterns) => {
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match?.[0]) return match[0];
  }
  return null;
};
var analyzeRegions = (files) => {
  const findings = [];
  const headerPatterns = [
    /\b(OnboardingHeader|NavigationHeader|Header|Toolbar|TopBar)\b/,
    /\b(BackButton|CloseButton|ChevronLeft|ArrowLeft|router\.back|navigation\.goBack)\b/,
    /\b(ProgressBar|StepProgress|progress)\b/i,
    /edges=\{?\[?['"]top['"]\]?/
  ];
  const footerPatterns = [
    /\b(Footer|BottomBar|StickyFooter|CTAContainer|BottomActions|BottomSheetFooter)\b/,
    /edges=\{?\[?['"]bottom['"]\]?/,
    /(position\s*:\s*['"]absolute['"][\s\S]{0,120}bottom\s*:)|(bottom\s*:\s*0[\s\S]{0,120}position\s*:\s*['"]absolute['"])/
  ];
  const bodyPatterns = [/\b(ScrollView|FlatList|SectionList|KeyboardAwareScrollView)\b/];
  files.forEach((file) => {
    if (!file.content) return;
    const header = hasAny(file.content, headerPatterns);
    if (header) {
      findings.push({
        kind: "region",
        confidence: "high",
        file: file.path,
        evidence: `Header/top chrome marker: ${header}`,
        recommendation: "Use regions.header for back/close controls, progress, and top onboarding chrome."
      });
    }
    const footer = hasAny(file.content, footerPatterns);
    const carouselPager = /\b(infoSteps|currentInfoStep)\b/.test(file.content);
    if (footer) {
      findings.push({
        kind: "region",
        confidence: "high",
        file: file.path,
        evidence: `Footer/sticky CTA marker: ${footer}`,
        recommendation: carouselPager ? "If this footer only advances in-screen pager pages (infoSteps/currentInfoStep), do not map it to regions.footer \u2014 use a swipe-only carousel layer. Use regions.footer only for CTAs that advance the next screen in the flow." : "Use regions.footer for sticky bottom CTAs instead of placing them at the end of body."
      });
    }
    const body = hasAny(file.content, bodyPatterns);
    if (body) {
      findings.push({
        kind: "region",
        confidence: "medium",
        file: file.path,
        evidence: `Scrollable/main content marker: ${body}`,
        recommendation: "Use regions.body for the main scrollable content stack."
      });
    }
  });
  return findings;
};

// src/audit/analyzers/stackDetector.ts
var detectStack = (files) => {
  const findings = [];
  const paths = new Set(files.map((file) => file.path));
  const allText = files.map((file) => file.content ?? "").join("\n");
  if (paths.has("app.json") || paths.has("app.config.ts") || allText.includes("expo-router")) {
    findings.push({
      kind: "stack",
      confidence: "high",
      file: "package/app config",
      evidence: "Expo or Expo Router markers found.",
      recommendation: "Use the React Native / Expo implementation guidance."
    });
  }
  if (allText.includes("nativewind") || paths.has("tailwind.config.js") || paths.has("tailwind.config.ts")) {
    findings.push({
      kind: "stack",
      confidence: "medium",
      file: "tailwind/nativewind config",
      evidence: "Tailwind or NativeWind markers found.",
      recommendation: "Inspect Tailwind/NativeWind tokens before generating colors and spacing."
    });
  }
  if (files.some((file) => file.path.endsWith(".swift"))) {
    findings.push({
      kind: "stack",
      confidence: "medium",
      file: "*.swift",
      evidence: "Swift source files found.",
      recommendation: "Use SwiftUI guidance when the entry point is a SwiftUI view or coordinator."
    });
  }
  return findings;
};

// src/audit/analyzers/styleTokenAnalyzer.ts
var TOKEN_FILE_RE = /(theme|token|color|typography|tailwind|nativewind|style|button|text|font)/i;
var ONBOARDING_RE = /onboarding|BackgroundGradient|tailwind\.config/i;
var HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
var RADIUS_RE = /\b(borderRadius|radius|rounded(?:-[a-z0-9]+)?)\b[^,\n}]*/gi;
var FONT_RE = /\b(fontSize|fontWeight|fontFamily|Font\.)\b[^,\n}]*/gi;
var SPACING_RE = /\b(spacing|gap|padding|margin)\b[^,\n}]*/gi;
var TAILWIND_COLOR_RE = /\b(?:bg|text|border)-(?:primary|secondary|gray|red|teal|white|black)[a-z0-9-]*/gi;
var STYLE_SHEET_RE = /StyleSheet\.create\s*\(\s*\{[\s\S]{0,400}?\}\s*\)/g;
var pushMatches = (findings, file, matches, recommendation, confidence) => {
  [...matches].slice(0, 8).forEach((match) => {
    findings.push({
      kind: "style",
      confidence,
      file: file.path,
      evidence: match.trim(),
      recommendation
    });
  });
};
var analyzeStyleTokens = (files) => {
  const findings = [];
  const seenHex = /* @__PURE__ */ new Set();
  files.forEach((file) => {
    if (!file.content) return;
    const tokenFile = TOKEN_FILE_RE.test(file.path);
    const onboardingFile = ONBOARDING_RE.test(file.path);
    const priority = tokenFile || onboardingFile;
    const hexes = [...new Set(file.content.match(HEX_RE) ?? [])].filter((hex) => {
      if (seenHex.has(hex)) return false;
      seenHex.add(hex);
      return true;
    });
    if (hexes.length > 0 && (priority || hexes.length <= 12)) {
      pushMatches(
        findings,
        file,
        hexes,
        "Map colors into `manifest.theme` and layer `style.color` / `style.background`. Do not leave text layers without `style.color` on colored screens.",
        tokenFile ? "high" : "medium"
      );
    }
    if (priority) {
      pushMatches(
        findings,
        file,
        file.content.match(RADIUS_RE) ?? [],
        "Map radius tokens to `manifest.theme.borderRadius`, stack `style.radius`, and choice-card chrome.",
        "medium"
      );
      pushMatches(
        findings,
        file,
        file.content.match(FONT_RE) ?? [],
        "Map typography to text layer `fontSize`, `fontWeight`, and optional `fontFamily`.",
        "medium"
      );
      pushMatches(
        findings,
        file,
        file.content.match(SPACING_RE) ?? [],
        "Use spacing tokens for stack `gap` and region/layer padding.",
        "low"
      );
      pushMatches(
        findings,
        file,
        file.content.match(TAILWIND_COLOR_RE) ?? [],
        "Resolve Tailwind/NativeWind classes to hex values in `manifest.theme` and layer styles.",
        "medium"
      );
      pushMatches(
        findings,
        file,
        file.content.match(STYLE_SHEET_RE) ?? [],
        "Extract `StyleSheet.create` colors, borders, and shadows into manifest layer/stack styles.",
        "high"
      );
    }
  });
  if (findings.length === 0) {
    findings.push({
      kind: "question",
      confidence: "medium",
      file: "(style audit)",
      evidence: "No obvious style token files or color constants were found.",
      recommendation: "Ask the user where brand/theme tokens live before falling back to black and white."
    });
  }
  return findings;
};

// src/audit/intakeQuestionnaire.ts
var MANDATORY_INTAKE_QUESTIONS = [
  "Which file, route, or coordinator starts the existing flow? (Required before audit.)",
  "What is the business purpose of this flow in one sentence? (e.g. onboarding, paywall, post-purchase setup.)",
  "Should the import optimize for visual fidelity or editable structure in the Rheo builder?",
  "Is source code or supplied screenshots/recordings more current when they disagree?",
  "Are there steps that must stay native/host-owned (signature pad, camera, custom WebView, paywall SDK) vs approximated in Rheo?",
  "Match motion from the codebase (may differ slightly from Rheo presets)?",
  "Does the app use i18n/localization? If yes, which locale is the default/fallback (e.g. en)? All Rheo `text.default` values must be resolved strings from that locale \u2014 never raw translation keys."
];
var buildMandatoryIntakeFindings = (opts) => {
  const findings = [];
  if (!opts.entry) {
    findings.push({
      kind: "question",
      confidence: "high",
      file: "(intake gate)",
      evidence: "Entry point was not provided to `audit-import`.",
      recommendation: "BLOCKING: Ask the user for the flow entry file/route before generating a manifest. Re-run `node scripts/audit-import.mjs --entry <path>`."
    });
  }
  MANDATORY_INTAKE_QUESTIONS.forEach((question, index) => {
    findings.push({
      kind: "question",
      confidence: "high",
      file: "(mandatory intake)",
      evidence: `Q${index + 1}: ${question}`,
      recommendation: "BLOCKING: Record the user answer in chat before manifest generation. Do not skip the intake questionnaire."
    });
  });
  if (!opts.screenshots) {
    findings.push({
      kind: "question",
      confidence: "medium",
      file: "(intake gate)",
      evidence: "No screenshots or recordings path was provided.",
      recommendation: "Ask whether the user can share screenshots or a screen recording for carousel slides, gradients, and card chrome."
    });
  }
  return findings;
};

// src/audit/renderAuditMarkdown.ts
var titleForKind = (kind) => {
  switch (kind) {
    case "stack":
      return "Stack Detection";
    case "region":
      return "Region Evidence";
    case "style":
      return "Style Token Evidence";
    case "background":
      return "Screen Background Evidence";
    case "carousel":
      return "Carousel And Pager Evidence";
    case "layout":
      return "Layout, Alignment, Border, And Shadow Evidence";
    case "font":
      return "Custom Font Evidence";
    case "choice":
      return "Choice Option Default And Selected State Evidence";
    case "animation":
      return "Animation And Motion Evidence";
    case "i18n":
      return "Localization And I18n Evidence";
    case "asset":
    case "lottie":
      return "Asset And Lottie Evidence";
    case "question":
      return "Mandatory Intake And Follow-Up Questions";
  }
};
var renderFinding = (finding) => [
  `- **${finding.confidence}** \u2014 \`${finding.file}\``,
  `  - Evidence: ${finding.evidence}`,
  `  - Recommendation: ${finding.recommendation}`
].join("\n");
var renderAuditMarkdown = (report) => {
  const groups = /* @__PURE__ */ new Map();
  report.findings.forEach((finding) => {
    const title = titleForKind(finding.kind);
    groups.set(title, [...groups.get(title) ?? [], finding]);
  });
  const sections = [...groups.entries()].map(
    ([title, findings]) => [`## ${title}`, "", ...findings.map(renderFinding)].join("\n")
  );
  const hasCarousel = report.findings.some((f) => f.kind === "carousel");
  const hasFonts = report.findings.some((f) => f.kind === "font");
  const hasChoiceStates = report.findings.some((f) => f.kind === "choice");
  const hasStyle = report.findings.some((f) => f.kind === "style" && f.file !== "(style audit)");
  const hasGradient = report.findings.some(
    (f) => f.kind === "background" && f.evidence.includes("LinearGradient")
  );
  const hasAnimation = report.findings.some(
    (f) => f.kind === "animation" && f.file !== "(animation audit)"
  );
  const hasI18n = report.findings.some((f) => f.kind === "i18n");
  const blockingIntake = !report.entry;
  return [
    "# Rheo Import Audit",
    "",
    "## Import Intake Summary",
    "",
    `- Root: \`${report.root}\``,
    `- Entries: ${report.entries?.length ? report.entries.map((e) => `\`${e}\``).join(", ") : report.entry ? `\`${report.entry}\`` : "**not provided (BLOCKING)**"}`,
    `- Scope: ${report.scopeMode ?? (report.entry ? "import-graph" : "unknown")}`,
    `- Screenshots/recordings: ${report.screenshots ? `\`${report.screenshots}\`` : "not provided"}`,
    `- Scanned files: ${report.scannedFiles}${report.scopeMode === "full-root" && report.inventoryFiles ? ` (full repo inventory)` : " (import graph + locale/config supplements only)"}`,
    "",
    "## Mandatory Intake Questionnaire (required before manifest generation)",
    "",
    "The agent must ask every question below and record answers in chat. Do not generate a manifest until complete.",
    "",
    ...MANDATORY_INTAKE_QUESTIONS.map((q, i) => `${i + 1}. ${q}`),
    "",
    blockingIntake ? "> **BLOCKING:** Re-run audit with `--entry <path>` after the user provides the entry point." : "> Entry provided. Still complete the questionnaire before generating the manifest.",
    "",
    ...sections,
    "",
    "## Required Manifest Implications",
    "",
    "- Complete the mandatory intake questionnaire before writing `rheo-import.manifest.json`.",
    "- Use high-confidence region findings when choosing `regions.header`, `regions.body`, and `regions.footer`.",
    hasStyle ? "- Populate `manifest.theme` and per-layer `style` from style-token evidence. Set `style.color` on text for colored screens." : "- No style-token evidence found \u2014 ask the user for theme sources before using black-and-white defaults.",
    hasGradient ? "- Apply gradient evidence to `screen.containerStyle.backgroundFill.color` using `linear-gradient(...)` CSS strings." : "- Map screen-level background findings before adding generic body layers.",
    hasCarousel ? '- **Carousel required:** emit `kind: "carousel"` with one slide stack per pager page. Swipe-only \u2014 no in-pager buttons. Bundle every slide asset.' : "- No carousel markers detected \u2014 still verify multi-slide routes manually.",
    hasFonts ? "- **Fonts required:** copy `.ttf`/`.otf`/`.woff`/`.woff2` under `assets/fonts/`, add `rheo-import.fonts.json`, set `manifest.theme.fontFamily`. **Never** put font files in `rheo-import.assets.json` (see `references/font-import.md`)." : "- If custom fonts appear later in review, bundle them in `rheo-import.fonts.json` only \u2014 never in `rheo-import.assets.json`.",
    hasChoiceStates ? "- **Choice selected state:** each option stack needs `style` (default) and `selectedStyle` (selected), including border/background/text colors." : "- Verify single_choice / multiple_choice option stacks for `selectedStyle` when source uses selected ternaries.",
    hasAnimation ? "- **Motion (intake Q6=yes + Grow+ plan):** apply `screen.animations`, `screen.stagger`, and conservative `restingMotion` from animation audit findings. Use `--suggest-animations` JSON for clip shapes. Omit unmapped springs/gestures." : "- **Motion:** if intake Q6=yes, re-scan entry scope; if Q6=no or plan lacks animations, omit all `animations`, `stagger`, and `restingMotion` fields.",
    hasI18n ? '- **Localization:** resolve all copy from the app default locale into `text.default`; set `manifest.defaultLocale` to match. Never import `t("key")` strings as defaults (see `references/localization-import.md`).' : "- If screens use `t()` / `formatMessage` / locale JSON, resolve default-locale strings before writing the manifest.",
    '- Center hero images: vertical body stacks need `align: "center"`; text layers use `style.align: "center"`.',
    "- Preserve card chrome: map borders and shadows to wrapping stacks, not flat sibling layers.",
    "- Bundle every high-confidence image, Lottie, and video finding or report it as missing.",
    "- Ask the user about BLOCKING question findings before proceeding.",
    ""
  ].join("\n");
};

// src/audit/auditImport.ts
var normalizeEntryList = (opts, root) => {
  const raw = opts.entries?.length ? opts.entries : opts.entry ? [opts.entry] : [];
  return raw.map(
    (entry) => entry.startsWith(root) ? relative3(root, entry) : entry.replace(/^\.\//, "")
  );
};
var buildAuditFiles = async (root, entries, maxFiles) => {
  if (entries.length > 0) {
    const crawled = await crawlFromEntries({ root, entries, maxFiles });
    return {
      files: crawled.files,
      inventoryFiles: crawled.files.length,
      scopeMode: crawled.scopeMode
    };
  }
  const inventory = await buildFileInventory(root, { maxFiles });
  return { files: inventory, inventoryFiles: inventory.length, scopeMode: "full-root" };
};
var auditImport = async (opts) => {
  const root = resolve4(opts.root ?? process.cwd());
  const entries = normalizeEntryList(opts, root);
  const entryLabel = entries.length > 0 ? entries.join(", ") : void 0;
  const { files, inventoryFiles, scopeMode } = await buildAuditFiles(root, entries, opts.maxFiles);
  const findings = [
    ...buildMandatoryIntakeFindings({ entry: entryLabel, screenshots: opts.screenshots }),
    ...detectStack(files),
    ...analyzeRegions(files),
    ...analyzeStyleTokens(files),
    ...analyzeBackgrounds(files),
    ...analyzeCarousels(files),
    ...analyzeLayout(files),
    ...analyzeFonts(files),
    ...analyzeI18n(files),
    ...analyzeChoiceStates(files),
    ...analyzeAssets(files)
  ];
  const animation = analyzeAnimations(files);
  return {
    root,
    entry: entryLabel,
    entries: entries.length > 0 ? entries : void 0,
    screenshots: opts.screenshots,
    scannedFiles: files.length,
    inventoryFiles,
    scopeMode,
    findings: [...findings, ...animation.findings],
    animationSuggestions: animation.suggestions
  };
};
var auditImportToMarkdownFile = async (opts) => {
  const reportRoot = resolve4(opts.root ?? process.cwd());
  const report = await auditImport({ ...opts, root: reportRoot });
  const markdown = renderAuditMarkdown(report);
  const outPath = opts.out ? isAbsolute(opts.out) ? opts.out : resolve4(reportRoot, opts.out) : resolve4(reportRoot, "rheo-import.audit.md");
  await writeFile2(outPath, markdown);
  if (opts.suggestAnimations && report.animationSuggestions?.length) {
    const suggestPath = isAbsolute(opts.suggestAnimations) ? opts.suggestAnimations : resolve4(reportRoot, opts.suggestAnimations);
    const payload = buildAnimationSuggestionsJson(report.animationSuggestions);
    await writeFile2(suggestPath, `${JSON.stringify(payload, null, 2)}
`);
  }
  return { report, markdown, outPath };
};

// src/publishGates/auditManifestPublish.ts
import { writeFile as writeFile3 } from "node:fs/promises";
import { resolve as resolve5 } from "node:path";

// src/publishGates/renderPublishGateMarkdown.ts
var renderIssue = (issue) => [
  `- **${issue.severity}** \`${issue.code}\`${issue.stepId ? ` (screen \`${issue.stepId}\`)` : ""}`,
  `  - Problem: ${issue.message}`,
  `  - Fix: ${issue.fix}`
].join("\n");
var renderPublishGateMarkdown = (manifestPath, result) => {
  if (result.ok === false && result.kind === "invalid_schema") {
    return [
      "# Rheo Publish Gate Audit",
      "",
      `Manifest: \`${manifestPath}\``,
      "",
      "## Result: BLOCKED (schema invalid)",
      "",
      "Fix schema validation before running publish gates. Use `node scripts/validate-manifest.mjs` first.",
      "",
      "## Blocking issues",
      "",
      ...result.issues.map(renderIssue),
      ""
    ].join("\n");
  }
  const blocking = result.blocking;
  const warnings = result.warnings;
  const passed = blocking.length === 0;
  return [
    "# Rheo Publish Gate Audit",
    "",
    `Manifest: \`${manifestPath}\``,
    "",
    passed ? "## Result: PASS (ready to import and publish in the dashboard)" : "## Result: BLOCKED (fix all blocking issues before calling the import complete)",
    "",
    blocking.length > 0 ? "## Blocking issues" : "## Blocking issues",
    "",
    blocking.length > 0 ? blocking.map(renderIssue).join("\n") : "- None",
    "",
    "## Warnings (non-blocking)",
    "",
    warnings.length > 0 ? warnings.map(renderIssue).join("\n") : "- None",
    "",
    "## Publish gate checklist (dashboard Publish button)",
    "",
    "The audit above mirrors the same rules as the flow editor **Publish** action:",
    "",
    "- Schema: valid FlowManifest (Zod)",
    "- Builder: text/icon `style.color`, Continue on manual-submit inputs, one input per screen, valid graph targets, media triggers",
    "- Publishable: entry connected, completion path, decision branches wired",
    "- Integrations: external surfaces have provider + fallback; RevenueCat enabled when used",
    "- Canvas gates: no disabled layer types (default import assumes all enabled)",
    "- Branding gradients: `$brandGradient:` only on backgrounds; known preset ids when branding is provided",
    "",
    passed ? "> Import bundle is publish-ready assuming default app canvas gates and integrations." : "> Do not deliver the import until every blocking issue is fixed and this audit passes.",
    ""
  ].join("\n");
};

// src/publishGates/auditManifestPublish.ts
var auditManifestPublish = (opts) => {
  const { manifestPath: _manifestPath, data, out, ...gateOpts } = opts;
  const result = collectPublishGateIssues(data, gateOpts);
  return { ...result, outPath: out };
};
var auditManifestPublishToFile = async (opts) => {
  const result = auditManifestPublish(opts);
  if (!opts.out) return result;
  const outPath = resolve5(opts.out);
  const markdown = renderPublishGateMarkdown(opts.manifestPath, result);
  await writeFile3(outPath, markdown, "utf8");
  return { ...result, outPath };
};

// src/scaffold/scaffoldManifest.ts
import { randomUUID } from "node:crypto";
import { readFile as readFile7, writeFile as writeFile4 } from "node:fs/promises";
import { isAbsolute as isAbsolute2, resolve as resolve6 } from "node:path";

// src/scaffold/flowSpecSchema.ts
var StyleRecordSchema = external_exports.record(external_exports.string(), external_exports.unknown());
var LocalizedOrStringSchema = external_exports.union([
  external_exports.string().min(1),
  external_exports.object({
    default: external_exports.string().min(1),
    translations: external_exports.record(external_exports.string(), external_exports.string()).optional()
  })
]);
var ActionObjectSchema = external_exports.discriminatedUnion("kind", [
  external_exports.object({ kind: external_exports.literal("none") }),
  external_exports.object({ kind: external_exports.literal("continue") }),
  external_exports.object({ kind: external_exports.literal("skip") }),
  external_exports.object({ kind: external_exports.literal("end_flow") }),
  external_exports.object({ kind: external_exports.literal("request_app_review") }),
  external_exports.object({ kind: external_exports.literal("go_back_one_screen"), fallbackScreenId: external_exports.string().min(1).optional() }),
  external_exports.object({ kind: external_exports.literal("go_to_step"), screenId: external_exports.string().min(1) }),
  external_exports.object({
    kind: external_exports.literal("request_os_permission"),
    permissionKey: OsPermissionKeySchema,
    outcomes: external_exports.object({
      granted: external_exports.string().min(1),
      denied: external_exports.string().min(1),
      blocked: external_exports.string().min(1)
    })
  }),
  external_exports.object({ kind: external_exports.literal("play_media"), targetLayerIds: external_exports.array(external_exports.string().min(1)).min(1) })
]);
var ButtonActionSpecSchema = external_exports.union([
  external_exports.enum(["none", "continue", "skip", "end_flow", "go_back_one_screen", "request_app_review"]),
  ActionObjectSchema
]);
var BranchingSpecSchema = external_exports.object({
  enabled: external_exports.boolean(),
  conditions: external_exports.array(external_exports.object({ choiceId: external_exports.string().min(1), goTo: external_exports.string().min(1) }))
});
var commonIntentShape = {
  id: external_exports.string().min(1).max(64).optional(),
  name: external_exports.string().max(80).optional(),
  style: StyleRecordSchema.optional(),
  styleBreakpoints: StyleRecordSchema.optional()
};
var ChoiceOptionSchema = external_exports.object({
  optionId: external_exports.string().min(1).max(64).optional(),
  label: LocalizedOrStringSchema,
  icon: external_exports.string().min(1).optional(),
  style: StyleRecordSchema.optional(),
  selectedStyle: StyleRecordSchema.optional(),
  labelStyle: StyleRecordSchema.optional()
});
var OAuthProviderSpecSchema = external_exports.discriminatedUnion("type", [
  external_exports.object({
    type: external_exports.literal("preset"),
    provider: external_exports.enum(["google", "github", "apple"]),
    label: LocalizedOrStringSchema.optional()
  }),
  external_exports.object({
    type: external_exports.literal("custom"),
    rowId: external_exports.string().uuid().optional(),
    label: LocalizedOrStringSchema,
    iconName: external_exports.string().min(1),
    family: external_exports.literal("ionicons").optional(),
    buttonVariant: external_exports.string().optional()
  })
]);
var LayerIntentSchema = external_exports.lazy(
  () => external_exports.discriminatedUnion("kind", [
    external_exports.object({ ...commonIntentShape, kind: external_exports.literal("text"), text: LocalizedOrStringSchema }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("image"),
      mediaAssetId: external_exports.string().uuid().optional(),
      alt: external_exports.string().max(280).optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("lottie"),
      mediaAssetId: external_exports.string().uuid().optional(),
      loop: external_exports.boolean().optional(),
      autoPlay: external_exports.boolean().optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("video"),
      mediaAssetId: external_exports.string().uuid().optional(),
      loop: external_exports.boolean().optional(),
      autoPlay: external_exports.boolean().optional(),
      audioEnabled: external_exports.boolean().optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("icon"),
      iconName: external_exports.string().min(1).max(128),
      family: external_exports.literal("ionicons").optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("button"),
      label: LocalizedOrStringSchema.optional(),
      action: ButtonActionSpecSchema.optional(),
      variant: external_exports.string().optional(),
      icon: external_exports.string().min(1).optional(),
      labelStyle: StyleRecordSchema.optional(),
      children: external_exports.lazy(() => external_exports.array(LayerIntentSchema)).optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("back_button"),
      label: LocalizedOrStringSchema.optional(),
      icon: external_exports.string().min(1).optional(),
      variant: external_exports.string().optional(),
      fallbackScreenId: external_exports.string().min(1).optional(),
      labelStyle: StyleRecordSchema.optional(),
      children: external_exports.lazy(() => external_exports.array(LayerIntentSchema)).optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("hyperlink"),
      href: external_exports.string().min(1).max(2048),
      label: LocalizedOrStringSchema.optional(),
      labelStyle: StyleRecordSchema.optional(),
      children: external_exports.lazy(() => external_exports.array(LayerIntentSchema)).optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("stack"),
      direction: external_exports.enum(["vertical", "horizontal"]).optional(),
      gap: external_exports.number().int().min(0).optional(),
      align: external_exports.enum(["start", "center", "end", "stretch"]).optional(),
      justify: external_exports.enum(["start", "center", "end"]).optional(),
      distribution: external_exports.enum(["start", "center", "end", "between", "around"]).optional(),
      wrap: external_exports.boolean().optional(),
      selectedStyle: StyleRecordSchema.optional(),
      children: external_exports.lazy(() => external_exports.array(LayerIntentSchema))
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("single_choice"),
      fieldKey: external_exports.string().min(1),
      options: external_exports.array(ChoiceOptionSchema).min(2),
      direction: external_exports.enum(["vertical", "horizontal", "grid"]).optional(),
      gap: external_exports.number().int().min(0).optional(),
      columns: external_exports.number().int().min(1).max(12).optional(),
      branching: BranchingSpecSchema.optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("multiple_choice"),
      fieldKey: external_exports.string().min(1),
      options: external_exports.array(ChoiceOptionSchema).min(2),
      direction: external_exports.enum(["vertical", "horizontal", "grid"]).optional(),
      gap: external_exports.number().int().min(0).optional(),
      columns: external_exports.number().int().min(1).max(12).optional(),
      minSelections: external_exports.number().int().nonnegative().optional(),
      maxSelections: external_exports.number().int().positive().optional(),
      branching: BranchingSpecSchema.optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("text_input"),
      fieldKey: external_exports.string().min(1),
      placeholder: LocalizedOrStringSchema.optional(),
      inputType: external_exports.enum(["plain", "email", "phone", "url", "multiline"]).optional(),
      required: external_exports.boolean().optional(),
      minLength: external_exports.number().int().min(0).max(2e3).optional(),
      maxLength: external_exports.number().int().positive().max(2e3).optional(),
      classification: external_exports.enum(["safe", "sensitive"]).optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("scale_input"),
      fieldKey: external_exports.string().min(1),
      min: external_exports.number(),
      max: external_exports.number(),
      step: external_exports.number().positive().optional(),
      defaultValue: external_exports.number().optional(),
      minLabel: LocalizedOrStringSchema.optional(),
      maxLabel: LocalizedOrStringSchema.optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("checkbox"),
      fieldKey: external_exports.string().min(1),
      blocking: external_exports.boolean().optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("counter"),
      startValue: external_exports.number().finite(),
      endValue: external_exports.number().finite(),
      durationMs: external_exports.number().int().min(0).max(36e5).optional(),
      delayMs: external_exports.number().int().min(0).max(36e5).optional(),
      decimalPlaces: external_exports.number().int().min(0).max(10).optional(),
      displayKind: external_exports.enum(["number", "time"]).optional(),
      timeFormat: external_exports.enum(["mm_ss", "hh_mm_ss", "dd_hh_mm_ss"]).optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("progress"),
      trackColor: external_exports.string().optional(),
      fillColor: external_exports.string().optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("loader"),
      variant: external_exports.enum(["linear", "circular"]).optional(),
      targetPercent: external_exports.number().int().min(0).max(100).optional(),
      fillDelayMs: external_exports.number().int().min(0).max(1e4).optional(),
      durationMs: external_exports.number().int().min(0).max(36e5).optional(),
      onComplete: external_exports.discriminatedUnion("mode", [
        external_exports.object({ mode: external_exports.literal("none") }),
        external_exports.object({ mode: external_exports.literal("next") }),
        external_exports.object({ mode: external_exports.literal("screen"), screenId: external_exports.string().min(1) })
      ]).optional(),
      trackColor: external_exports.string().optional(),
      fillColor: external_exports.string().optional(),
      align: external_exports.enum(["start", "center", "end"]).optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("carousel"),
      slides: external_exports.array(
        external_exports.object({
          id: external_exports.string().min(1).max(64).optional(),
          direction: external_exports.enum(["vertical", "horizontal"]).optional(),
          gap: external_exports.number().int().min(0).optional(),
          align: external_exports.enum(["start", "center", "end", "stretch"]).optional(),
          justify: external_exports.enum(["start", "center", "end"]).optional(),
          style: StyleRecordSchema.optional(),
          children: external_exports.lazy(() => external_exports.array(LayerIntentSchema))
        })
      ).min(1),
      pageControl: external_exports.object({ position: external_exports.enum(["top", "bottom"]) }).catchall(external_exports.unknown()).optional(),
      loop: external_exports.boolean().optional(),
      autoAdvance: external_exports.boolean().optional(),
      autoAdvanceMs: external_exports.number().int().min(500).max(6e4).optional(),
      openOn: external_exports.number().int().min(0).optional(),
      pageAlignment: external_exports.enum(["top", "center", "bottom"]).optional(),
      pageSpacing: external_exports.number().int().min(0).optional(),
      pagePeek: external_exports.number().int().min(0).max(400).optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("oauth_login"),
      providers: external_exports.array(OAuthProviderSpecSchema).min(1),
      gap: external_exports.number().int().min(0).optional(),
      align: external_exports.enum(["start", "center", "end", "stretch"]).optional()
    }),
    external_exports.object({
      ...commonIntentShape,
      kind: external_exports.literal("email_password_auth"),
      fieldKey: external_exports.string().min(1),
      mode: external_exports.enum(["sign_in", "sign_up"]),
      emailPlaceholder: LocalizedOrStringSchema.optional(),
      passwordPlaceholder: LocalizedOrStringSchema.optional(),
      confirmPlaceholder: LocalizedOrStringSchema.optional(),
      submitLabel: LocalizedOrStringSchema.optional(),
      minPasswordLength: external_exports.number().int().min(4).max(128).optional(),
      gap: external_exports.number().int().min(0).optional(),
      align: external_exports.enum(["start", "center", "end", "stretch"]).optional()
    })
  ])
);
var ScreenSpecSchema = external_exports.object({
  id: external_exports.string().min(1).max(64).optional(),
  name: external_exports.string().min(1).max(80),
  header: external_exports.array(LayerIntentSchema).optional(),
  body: external_exports.array(LayerIntentSchema),
  footer: external_exports.array(LayerIntentSchema).optional(),
  containerStyle: StyleRecordSchema.optional(),
  next: external_exports.string().min(1).nullable().optional()
});
var ExternalSurfaceSpecSchema = external_exports.object({
  id: external_exports.string().min(1).max(64),
  name: external_exports.string().min(1).max(80).optional(),
  provider: external_exports.enum(["revenuecat", "unspecified"]),
  offeringId: external_exports.string().min(1).max(128).optional(),
  placementId: external_exports.string().min(1).max(128).optional(),
  presentation: external_exports.enum(["paywall", "paywall_if_needed"]).optional(),
  outcomes: external_exports.object({
    purchase_completed: external_exports.string().min(1).nullable().optional(),
    purchase_cancelled: external_exports.string().min(1).nullable().optional(),
    dismissed: external_exports.string().min(1).nullable().optional(),
    failed: external_exports.string().min(1).nullable().optional(),
    restore_completed: external_exports.string().min(1).nullable().optional()
  }).optional(),
  fallback: external_exports.string().min(1).nullable()
});
var FlowSpecSchema = external_exports.object({
  flowId: external_exports.string().uuid().optional(),
  version: external_exports.number().int().positive().optional(),
  defaultLocale: external_exports.string().optional(),
  locales: external_exports.array(external_exports.string()).optional(),
  entry: external_exports.string().min(1).optional(),
  theme: ThemeSchema.optional(),
  sdkAttributeKeys: external_exports.array(external_exports.string().min(1).max(128)).optional(),
  screens: external_exports.array(ScreenSpecSchema).min(1),
  decisions: external_exports.array(DecisionNodeSchema).optional(),
  externalSurfaces: external_exports.array(ExternalSurfaceSpecSchema).optional()
});
var parseFlowSpec = (data) => {
  const result = FlowSpecSchema.safeParse(data);
  if (result.success) {
    return { ok: true, spec: result.data };
  }
  return {
    ok: false,
    issues: result.error.issues.map((issue) => ({
      path: issue.path,
      message: issue.message
    }))
  };
};

// src/scaffold/scaffoldManifest.ts
var VARIANT_MAP = {
  primary: "primary",
  secondary: "secondary",
  ghost: "ghost",
  destructive: "destructive",
  outline: "secondary",
  bordered: "secondary",
  tertiary: "ghost",
  text: "ghost",
  link: "ghost",
  plain: "ghost",
  default: "primary",
  filled: "primary",
  solid: "primary",
  danger: "destructive",
  error: "destructive"
};
var mapVariant = (src, fallback) => src ? VARIANT_MAP[src.trim().toLowerCase()] ?? fallback : fallback;
var slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 32) || "x";
var toLocalized = (value) => typeof value === "string" ? { default: value } : { ...value };
var normalizeAction = (action) => {
  if (action == null) return { kind: "continue" };
  if (typeof action === "string") return { kind: action };
  return { ...action };
};
var IdFactory = class {
  used = /* @__PURE__ */ new Set();
  ensure(candidate) {
    const base = candidate.slice(0, 60);
    if (!this.used.has(base)) {
      this.used.add(base);
      return base;
    }
    for (let n = 2; ; n += 1) {
      const next = `${base}_${n}`.slice(0, 64);
      if (!this.used.has(next)) {
        this.used.add(next);
        return next;
      }
    }
  }
  layer(explicit, fallbackBase) {
    if (explicit && /^lyr_[a-z0-9_]+$/i.test(explicit)) {
      return this.ensure(explicit);
    }
    return this.ensure(`lyr_${fallbackBase}`);
  }
};
var withStyle = (target, style, breakpoints) => {
  if (style && Object.keys(style).length > 0) target.style = style;
  if (breakpoints && Object.keys(breakpoints).length > 0) target.styleBreakpoints = breakpoints;
  return target;
};
var buildLayer = (intent, ctx) => {
  switch (intent.kind) {
    case "text": {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_text`);
      return withStyle({ id, kind: "text", text: toLocalized(intent.text) }, intent.style, intent.styleBreakpoints);
    }
    case "image": {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_img`);
      const out = { id, kind: "image" };
      if (intent.mediaAssetId) out.media = { mediaAssetId: intent.mediaAssetId };
      if (intent.alt) out.alt = intent.alt;
      return withStyle(out, intent.style, intent.styleBreakpoints);
    }
    case "lottie": {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_lottie`);
      const out = { id, kind: "lottie" };
      if (intent.mediaAssetId) out.media = { mediaAssetId: intent.mediaAssetId };
      if (intent.loop !== void 0) out.loop = intent.loop;
      if (intent.autoPlay !== void 0) out.autoPlay = intent.autoPlay;
      return withStyle(out, intent.style, intent.styleBreakpoints);
    }
    case "video": {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_video`);
      const out = { id, kind: "video" };
      if (intent.mediaAssetId) out.media = { mediaAssetId: intent.mediaAssetId };
      if (intent.loop !== void 0) out.loop = intent.loop;
      if (intent.autoPlay !== void 0) out.autoPlay = intent.autoPlay;
      if (intent.audioEnabled !== void 0) out.audioEnabled = intent.audioEnabled;
      return withStyle(out, intent.style, intent.styleBreakpoints);
    }
    case "icon": {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_icon`);
      return withStyle(
        { id, kind: "icon", family: intent.family ?? "ionicons", iconName: intent.iconName },
        intent.style,
        intent.styleBreakpoints
      );
    }
    case "button":
      return buildButton(intent, ctx);
    case "back_button":
      return buildBackButton(intent, ctx);
    case "hyperlink":
      return buildHyperlink(intent, ctx);
    case "stack":
      return buildStack(intent, ctx);
    case "single_choice":
    case "multiple_choice":
      return buildChoice(intent, ctx);
    case "text_input": {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_${slugify(intent.fieldKey)}`);
      const out = {
        id,
        kind: "text_input",
        fieldKey: intent.fieldKey,
        classification: intent.classification ?? "safe"
      };
      if (intent.placeholder !== void 0) out.placeholder = toLocalized(intent.placeholder);
      if (intent.inputType) out.inputType = intent.inputType;
      if (intent.required !== void 0) out.required = intent.required;
      if (intent.minLength !== void 0) out.minLength = intent.minLength;
      if (intent.maxLength !== void 0) out.maxLength = intent.maxLength;
      return withStyle(out, intent.style);
    }
    case "scale_input": {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_${slugify(intent.fieldKey)}`);
      const out = {
        id,
        kind: "scale_input",
        fieldKey: intent.fieldKey,
        min: intent.min,
        max: intent.max
      };
      if (intent.step !== void 0) out.step = intent.step;
      if (intent.defaultValue !== void 0) out.defaultValue = intent.defaultValue;
      if (intent.minLabel !== void 0) out.minLabel = toLocalized(intent.minLabel);
      if (intent.maxLabel !== void 0) out.maxLabel = toLocalized(intent.maxLabel);
      return withStyle(out, intent.style);
    }
    case "checkbox": {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_${slugify(intent.fieldKey)}`);
      const out = { id, kind: "checkbox", fieldKey: intent.fieldKey };
      if (intent.blocking !== void 0) out.blocking = intent.blocking;
      return withStyle(out, intent.style, intent.styleBreakpoints);
    }
    case "counter": {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_counter`);
      const out = {
        id,
        kind: "counter",
        startValue: intent.startValue,
        endValue: intent.endValue
      };
      if (intent.durationMs !== void 0) out.durationMs = intent.durationMs;
      if (intent.delayMs !== void 0) out.delayMs = intent.delayMs;
      if (intent.decimalPlaces !== void 0) out.decimalPlaces = intent.decimalPlaces;
      if (intent.displayKind) out.displayKind = intent.displayKind;
      if (intent.timeFormat) out.timeFormat = intent.timeFormat;
      return withStyle(out, intent.style, intent.styleBreakpoints);
    }
    case "progress": {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_progress`);
      const out = { id, kind: "progress" };
      if (intent.trackColor) out.trackColor = intent.trackColor;
      if (intent.fillColor) out.fillColor = intent.fillColor;
      return withStyle(out, intent.style);
    }
    case "loader": {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_loader`);
      const out = { id, kind: "loader" };
      if (intent.variant) out.variant = intent.variant;
      if (intent.targetPercent !== void 0) out.targetPercent = intent.targetPercent;
      if (intent.fillDelayMs !== void 0) out.fillDelayMs = intent.fillDelayMs;
      if (intent.durationMs !== void 0) out.durationMs = intent.durationMs;
      if (intent.onComplete) out.onComplete = { ...intent.onComplete };
      if (intent.trackColor) out.trackColor = intent.trackColor;
      if (intent.fillColor) out.fillColor = intent.fillColor;
      if (intent.align) out.align = intent.align;
      return withStyle(out, intent.style);
    }
    case "carousel":
      return buildCarousel(intent, ctx);
    case "oauth_login":
      return buildOAuthLogin(intent, ctx);
    case "email_password_auth":
      return buildEmailPasswordAuth(intent, ctx);
  }
};
var buildButton = (intent, ctx) => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_btn`);
  const children = buildLabelChildren(intent, ctx, id);
  return withStyle(
    {
      id,
      kind: "button",
      variant: mapVariant(intent.variant, "primary"),
      action: normalizeAction(intent.action),
      direction: "horizontal",
      align: "center",
      distribution: "center",
      children
    },
    intent.style,
    intent.styleBreakpoints
  );
};
var buildBackButton = (intent, ctx) => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_back`);
  let children;
  if (intent.children) {
    children = intent.children.map((child) => buildLayer(child, ctx));
  } else {
    children = [];
    children.push({
      id: ctx.ids.ensure(`${id}_icon`),
      kind: "icon",
      family: "ionicons",
      iconName: intent.icon ?? "chevron-back-outline"
    });
    if (intent.label !== void 0) {
      children.push(buildLabel(`${id}_label`, intent.label, ctx, intent.labelStyle));
    }
  }
  const out = {
    id,
    kind: "back_button",
    variant: mapVariant(intent.variant, "ghost"),
    children
  };
  if (intent.fallbackScreenId) out.fallbackScreenId = intent.fallbackScreenId;
  return withStyle(out, intent.style, intent.styleBreakpoints);
};
var buildHyperlink = (intent, ctx) => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_link`);
  const children = intent.children ? intent.children.map((child) => buildLayer(child, ctx)) : [buildLabel(`${id}_lnktxt`, intent.label ?? "Link", ctx, intent.labelStyle)];
  return withStyle({ id, kind: "hyperlink", href: intent.href, children }, intent.style, intent.styleBreakpoints);
};
var buildLabelChildren = (intent, ctx, parentId) => {
  if (intent.children) {
    return intent.children.map((child) => buildLayer(child, ctx));
  }
  const children = [];
  if (intent.icon) {
    children.push({
      id: ctx.ids.ensure(`${parentId}_icon`),
      kind: "icon",
      family: "ionicons",
      iconName: intent.icon
    });
  }
  if (intent.label !== void 0) {
    children.push(buildLabel(`${parentId}_label`, intent.label, ctx, intent.labelStyle));
  }
  return children;
};
var buildLabel = (baseId, label, ctx, style) => withStyle({ id: ctx.ids.ensure(baseId), kind: "text", text: toLocalized(label) }, style);
var buildStack = (intent, ctx) => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_stack`);
  const out = {
    id,
    kind: "stack",
    direction: intent.direction ?? "vertical",
    children: intent.children.map((child) => buildLayer(child, ctx))
  };
  if (intent.gap !== void 0) out.gap = intent.gap;
  if (intent.align) out.align = intent.align;
  if (intent.justify) out.justify = intent.justify;
  if (intent.distribution) out.distribution = intent.distribution;
  if (intent.wrap !== void 0) out.wrap = intent.wrap;
  if (intent.selectedStyle && Object.keys(intent.selectedStyle).length > 0) {
    out.selectedStyle = intent.selectedStyle;
  }
  return withStyle(out, intent.style, intent.styleBreakpoints);
};
var buildChoice = (intent, ctx) => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_${slugify(intent.fieldKey)}`);
  const seenOptionIds = /* @__PURE__ */ new Set();
  const optionBindings = [];
  const children = intent.options.map((opt, index) => {
    const labelText = typeof opt.label === "string" ? opt.label : opt.label.default;
    let optionId = opt.optionId ?? slugify(labelText) ?? `opt_${index}`;
    while (seenOptionIds.has(optionId)) optionId = `${optionId}_${index}`;
    seenOptionIds.add(optionId);
    const stackId = ctx.ids.ensure(`lyr_${ctx.screenSlug}_${slugify(intent.fieldKey)}_${optionId}`);
    optionBindings.push({ optionId, rootLayerId: stackId });
    const optChildren = [];
    if (opt.icon) {
      optChildren.push({
        id: ctx.ids.ensure(`${stackId}_icon`),
        kind: "icon",
        family: "ionicons",
        iconName: opt.icon
      });
    }
    optChildren.push(buildLabel(`${stackId}_text`, opt.label, ctx, opt.labelStyle));
    const optStack = {
      id: stackId,
      kind: "stack",
      direction: "horizontal",
      align: "center",
      gap: 8,
      children: optChildren
    };
    if (opt.style && Object.keys(opt.style).length > 0) optStack.style = opt.style;
    if (opt.selectedStyle && Object.keys(opt.selectedStyle).length > 0) {
      optStack.selectedStyle = opt.selectedStyle;
    }
    return optStack;
  });
  const out = {
    id,
    kind: intent.kind,
    fieldKey: intent.fieldKey,
    children,
    optionBindings,
    branching: intent.branching ?? { enabled: false, conditions: [] }
  };
  if (intent.direction) out.direction = intent.direction;
  if (intent.gap !== void 0) out.gap = intent.gap;
  if (intent.columns !== void 0) out.columns = intent.columns;
  if (intent.kind === "multiple_choice") {
    if (intent.minSelections !== void 0) out.minSelections = intent.minSelections;
    if (intent.maxSelections !== void 0) out.maxSelections = intent.maxSelections;
  }
  return withStyle(out, intent.style, intent.styleBreakpoints);
};
var buildCarousel = (intent, ctx) => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_carousel`);
  const slides = intent.slides.map((slide, index) => {
    const slideId = ctx.ids.layer(slide.id, `${ctx.screenSlug}_slide_${index}`);
    const out2 = {
      id: slideId,
      kind: "stack",
      direction: slide.direction ?? "vertical",
      children: slide.children.map((child) => buildLayer(child, ctx))
    };
    if (slide.gap !== void 0) out2.gap = slide.gap;
    if (slide.align) out2.align = slide.align;
    if (slide.justify) out2.justify = slide.justify;
    return withStyle(out2, slide.style);
  });
  const out = { id, kind: "carousel", slides };
  if (intent.pageControl) out.pageControl = { ...intent.pageControl };
  if (intent.loop !== void 0) out.loop = intent.loop;
  if (intent.autoAdvance !== void 0) out.autoAdvance = intent.autoAdvance;
  if (intent.autoAdvanceMs !== void 0) out.autoAdvanceMs = intent.autoAdvanceMs;
  if (intent.openOn !== void 0) out.openOn = intent.openOn;
  if (intent.pageAlignment) out.pageAlignment = intent.pageAlignment;
  if (intent.pageSpacing !== void 0) out.pageSpacing = intent.pageSpacing;
  if (intent.pagePeek !== void 0) out.pagePeek = intent.pagePeek;
  return withStyle(out, intent.style, intent.styleBreakpoints);
};
var buildOAuthLogin = (intent, ctx) => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_oauth`);
  const children = intent.providers.map((provider, index) => {
    const rowBase = `lyr_${ctx.screenSlug}_opr_${index}`;
    if (provider.type === "preset") {
      const row = {
        id: ctx.ids.ensure(rowBase),
        kind: "oauth_provider",
        variant: "preset",
        provider: provider.provider
      };
      if (provider.label !== void 0) row.label = toLocalized(provider.label);
      return row;
    }
    const rowId = ctx.ids.ensure(rowBase);
    return {
      id: rowId,
      kind: "oauth_provider",
      variant: "custom",
      rowId: provider.rowId ?? randomUUID(),
      buttonVariant: mapVariant(provider.buttonVariant, "secondary"),
      direction: "horizontal",
      align: "center",
      distribution: "center",
      gap: 8,
      children: [
        {
          id: ctx.ids.ensure(`${rowId}_icon`),
          kind: "icon",
          family: provider.family ?? "ionicons",
          iconName: provider.iconName
        },
        buildLabel(`${rowId}_text`, provider.label, ctx)
      ]
    };
  });
  const out = { id, kind: "oauth_login", children };
  if (intent.gap !== void 0) out.gap = intent.gap;
  if (intent.align) out.align = intent.align;
  return withStyle(out, intent.style, intent.styleBreakpoints);
};
var buildEmailPasswordAuth = (intent, ctx) => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_ep_auth`);
  const field = (slot, placeholder) => ({
    id: ctx.ids.ensure(`${id}_fld_${slot}`),
    kind: "email_password_field",
    slot,
    placeholder: toLocalized(placeholder)
  });
  const children = [
    field("email", intent.emailPlaceholder ?? "Email"),
    field("password", intent.passwordPlaceholder ?? "Password")
  ];
  if (intent.mode === "sign_up") {
    children.push(field("confirm", intent.confirmPlaceholder ?? "Confirm password"));
  }
  const submitId = ctx.ids.ensure(`${id}_submit`);
  children.push({
    id: submitId,
    kind: "email_password_submit",
    buttonVariant: "primary",
    direction: "horizontal",
    align: "center",
    distribution: "center",
    gap: 8,
    children: [
      buildLabel(
        `${submitId}_txt`,
        intent.submitLabel ?? (intent.mode === "sign_in" ? "Sign in" : "Create account"),
        ctx
      )
    ]
  });
  const out = {
    id,
    kind: "email_password_auth",
    mode: intent.mode,
    fieldKey: intent.fieldKey,
    children
  };
  if (intent.minPasswordLength !== void 0) out.minPasswordLength = intent.minPasswordLength;
  if (intent.gap !== void 0) out.gap = intent.gap;
  if (intent.align) out.align = intent.align;
  return withStyle(out, intent.style, intent.styleBreakpoints);
};
var buildRegionRoot = (intents, ctx, region) => {
  if (intents.length === 1 && intents[0]?.kind === "stack") {
    return buildLayer(intents[0], ctx);
  }
  const root = {
    id: ctx.ids.ensure(`lyr_${ctx.screenSlug}_${region}`),
    kind: "stack",
    direction: "vertical",
    gap: region === "body" ? 16 : 8,
    children: intents.map((intent) => buildLayer(intent, ctx))
  };
  if (region === "body") {
    root.style = { padding: { t: 24, r: 20, b: 24, l: 20 } };
  }
  return root;
};
var buildScreen = (screen, index, ids) => {
  const screenId = screen.id && /^scr_[a-z0-9_]+$/i.test(screen.id) ? screen.id : `scr_${slugify(screen.name)}_${index}`;
  const ctx = { ids, screenSlug: slugify(screen.name) || `s${index}` };
  const regions = { body: buildRegionRoot(screen.body, ctx, "body") };
  if (screen.header && screen.header.length > 0) {
    regions.header = buildRegionRoot(screen.header, ctx, "header");
  }
  if (screen.footer && screen.footer.length > 0) {
    regions.footer = buildRegionRoot(screen.footer, ctx, "footer");
  }
  const json = {
    id: screenId,
    name: screen.name,
    regions,
    next: { default: screen.next ?? null }
  };
  if (screen.containerStyle && Object.keys(screen.containerStyle).length > 0) {
    json.containerStyle = screen.containerStyle;
  }
  return { id: screenId, json };
};
var buildExternalSurface = (surface) => {
  const config = surface.provider === "revenuecat" ? {
    provider: "revenuecat",
    ...surface.offeringId ? { offeringId: surface.offeringId } : {},
    ...surface.placementId ? { placementId: surface.placementId } : {},
    ...surface.presentation ? { presentation: surface.presentation } : {}
  } : { provider: "unspecified" };
  const outcomes = {};
  for (const [key, value] of Object.entries(surface.outcomes ?? {})) {
    if (value !== void 0) outcomes[key] = value;
  }
  const out = { id: surface.id, config, outcomes, fallback: surface.fallback };
  if (surface.name) out.name = surface.name;
  return out;
};
var scaffoldManifest = (spec) => {
  const ids = new IdFactory();
  const screens = spec.screens.map((screen, index) => buildScreen(screen, index, ids));
  const defaultLocale = spec.defaultLocale ?? "en";
  const manifest = {
    flowId: spec.flowId ?? randomUUID(),
    schemaVersion: MANIFEST_SCHEMA_VERSION,
    version: spec.version ?? 1,
    defaultLocale,
    locales: spec.locales ?? [defaultLocale],
    entryScreenId: spec.entry ?? screens[0]?.id ?? null,
    screens: screens.map((s) => s.json),
    decisionNodes: spec.decisions ?? [],
    externalSurfaceNodes: (spec.externalSurfaces ?? []).map(buildExternalSurface),
    sdkAttributeKeys: spec.sdkAttributeKeys ?? []
  };
  if (spec.theme) manifest.theme = spec.theme;
  return manifest;
};
var resolveMaybe = (value, root) => value ? isAbsolute2(value) ? value : resolve6(root, value) : void 0;
var scaffoldManifestFromFile = async (specPath, opts = {}) => {
  const root = opts.root ?? process.cwd();
  const raw = await readFile7(specPath, "utf8");
  const parsed = parseFlowSpec(JSON.parse(raw));
  if (!parsed.ok) {
    return { ok: false, kind: "invalid_spec", specIssues: parsed.issues };
  }
  const manifest = scaffoldManifest(parsed.spec);
  const outPath = resolveMaybe(opts.out, root);
  if (outPath) {
    await writeFile4(outPath, `${JSON.stringify(manifest, null, 2)}
`);
  }
  const validated = validateManifest(manifest);
  if (!validated.ok) {
    return { ok: false, kind: "invalid_manifest", manifest, issues: validated.issues, outPath };
  }
  return { ok: true, manifest, outPath };
};

// src/cli.ts
var FILE_COMMANDS = /* @__PURE__ */ new Set(["validate", "normalize", "summary", "audit-publish", "scaffold"]);
var parseArgs = (argv) => {
  const [command = "help", ...rest] = argv;
  const flags = /* @__PURE__ */ new Map();
  const entries = [];
  const positionals = [];
  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      positionals.push(arg);
      continue;
    }
    const key = arg.slice(2);
    const next = rest[i + 1];
    if (next && !next.startsWith("--")) {
      flags.set(key, next);
      if (key === "entry") {
        entries.push(
          ...next.split(",").map((value) => value.trim()).filter(Boolean)
        );
      }
      i += 1;
    } else {
      flags.set(key, true);
    }
  }
  const file = FILE_COMMANDS.has(command) ? positionals[0] : void 0;
  return { command, file, flags, entries };
};
var printHelp = () => {
  console.log(`Rheo flow import tools

Run these from the TARGET APP's root (so they scan the app, not the skill).
The scripts are self-contained \u2014 reference them by path, e.g.
  RHEO=/abs/path/to/rheo/rheo-flow-import
  cd <target-app> && node "$RHEO/scripts/audit-import.mjs" --entry app/onboarding.tsx

  node scripts/validate-manifest.mjs <manifest.json> [--offline-profile] [--profile-url <url>]
  node scripts/audit-publish-manifest.mjs <manifest.json> [--out <path>]
  node scripts/audit-import.mjs --entry <file|dir> [--entry <file|dir> ...] [--root <appRoot>] [--out <path>] [--screenshots <path>] [--max-files <n>] [--suggest-animations <path>]
  node scripts/scaffold-manifest.mjs <flow-spec.json> [--out <path>]
  node scripts/normalize-manifest.mjs <manifest.json> [--out <path>] [--write] [--target-flow-id <uuid>]
  node scripts/print-manifest-summary.mjs <manifest.json>
  node scripts/fetch-profile.mjs [--offline-profile] [--profile-url <url>]

audit requires at least one --entry. It crawls the import graph from each entry
(file) or source subtree (directory) \u2014 it does not scan the whole repo. Multiple
entries merge into one scoped graph. Anchors to the project root inferred from
--entry (nearest package.json / app.json / Package.swift), or to --root when given;
outputs are written relative to the current directory. Paths in <manifest.json>
resolve from the current dir.
`);
};
var readJson = async (path) => {
  const raw = await readFile8(path, "utf8");
  return JSON.parse(raw);
};
var requireFile = (file) => {
  if (!file) {
    throw new Error("Missing manifest file path.");
  }
  return file;
};
var runCli = async (command, args) => {
  return runArgv([command, ...args]);
};
var runArgv = async (argv) => {
  const args = parseArgs(argv);
  if (args.command === "help" || args.command === "--help" || args.command === "-h") {
    printHelp();
    return 0;
  }
  if (args.command === "profile") {
    const profile = await fetchManifestProfile({
      offline: args.flags.has("offline-profile"),
      url: args.flags.get("profile-url")
    });
    console.log(`profile_source=${profile.source}`);
    console.log(`profile_version=${profile.version ?? "unknown"}`);
    if (profile.url) console.log(`profile_url=${profile.url}`);
    return 0;
  }
  if (args.command === "validate") {
    const result = await validateManifestFile(requireFile(args.file), {
      offlineProfile: args.flags.has("offline-profile"),
      profileUrl: args.flags.get("profile-url")
    });
    console.log(`manifest_schema_version=${result.manifestSchemaVersion}`);
    console.log(`profile_source=${result.profile.source}`);
    console.log(`profile_version=${result.profile.version ?? "unknown"}`);
    if (!result.ok) {
      console.error(formatIssues(result.issues));
      return 1;
    }
    console.log(JSON.stringify(result.summary, null, 2));
    if (result.warnings.length > 0) {
      console.warn(formatIssues(result.warnings));
    }
    return 0;
  }
  if (args.command === "audit-publish") {
    const manifestPath = requireFile(args.file);
    const data = await readJson(manifestPath);
    const outRaw = args.flags.get("out");
    const out = outRaw ?? "rheo-import.publish-gates.md";
    const result = await auditManifestPublishToFile({
      manifestPath,
      data,
      out
    });
    if (result.outPath) console.log(`publish_gate_report=${result.outPath}`);
    if (result.ok === false && result.kind === "invalid_schema") {
      console.error(formatIssues(result.issues.map((i) => ({
        path: i.path ?? [],
        message: i.message,
        code: i.code,
        stepId: i.stepId ?? null
      }))));
      return 1;
    }
    if (!result.ok) {
      result.blocking.forEach((issue) => {
        console.error(`[blocking] ${issue.code}: ${issue.message}`);
        console.error(`  fix: ${issue.fix}`);
      });
      return 1;
    }
    if (result.warnings.length > 0) {
      result.warnings.forEach((issue) => {
        console.warn(`[warning] ${issue.code}: ${issue.message}`);
      });
    }
    return 0;
  }
  if (args.command === "audit") {
    const cwd = process.cwd();
    const resolveFromCwd = (value) => value === void 0 ? void 0 : isAbsolute3(value) ? value : resolve7(cwd, value);
    const maxFilesRaw = args.flags.get("max-files");
    const maxFiles = typeof maxFilesRaw === "string" ? Number.parseInt(maxFilesRaw, 10) : void 0;
    const rootFlag = args.flags.get("root");
    const explicitRoot = resolveFromCwd(rootFlag);
    const entrySpecs = args.entries.length > 0 ? args.entries : typeof args.flags.get("entry") === "string" ? args.flags.get("entry").split(",").map((value) => value.trim()).filter(Boolean) : [];
    if (entrySpecs.length === 0) {
      console.error("audit requires at least one --entry <file|dir>.");
      console.error(
        "The audit crawls imports from the entry point(s) only \u2014 it does not scan the whole repo."
      );
      console.error(
        "Example: node scripts/audit-import.mjs --entry app/onboarding.tsx --entry app/paywall.tsx"
      );
      return 1;
    }
    const resolvedEntries = entrySpecs.map(
      (spec) => isAbsolute3(spec) ? spec : resolve7(explicitRoot ?? cwd, spec)
    );
    for (const entryPath of resolvedEntries) {
      if (!existsSync4(entryPath)) {
        console.error(`Entry not found: ${entryPath}`);
        console.error(
          "Run the audit from the target app root, or pass --root <appRoot> with --entry paths inside it (or absolute --entry paths)."
        );
        return 1;
      }
    }
    const root = explicitRoot ?? (inferProjectRoot(resolvedEntries[0]) ?? cwd);
    if (looksLikeSkillRoot(root)) {
      console.error(`Audit root resolves inside the Rheo skill itself: ${root}`);
      console.error(
        "cd into the target app (or pass --root <appRoot>) before running the audit \u2014 auditing the skill folder only scans its own examples."
      );
      return 1;
    }
    const { outPath, report } = await auditImportToMarkdownFile({
      root,
      entries: resolvedEntries,
      out: resolveFromCwd(args.flags.get("out")),
      screenshots: resolveFromCwd(args.flags.get("screenshots")),
      maxFiles: Number.isFinite(maxFiles) ? maxFiles : void 0,
      suggestAnimations: resolveFromCwd(
        args.flags.get("suggest-animations")
      )
    });
    console.log(`audit_root=${report.root}`);
    console.log(`audit_entries=${report.entries?.join(", ") ?? report.entry ?? "(none)"}`);
    console.log(`audit_scope=${report.scopeMode ?? "unknown"}`);
    console.log(`audit_scanned_files=${report.scannedFiles}`);
    console.log(`audit_report=${outPath}`);
    if (report.animationSuggestions?.length) {
      const suggestPath = resolveFromCwd(
        args.flags.get("suggest-animations")
      );
      if (suggestPath) console.log(`animation_suggestions=${suggestPath}`);
    }
    return 0;
  }
  if (args.command === "scaffold") {
    const specPath = requireFile(args.file);
    const out = args.flags.get("out");
    const result = await scaffoldManifestFromFile(specPath, { out });
    if (!result.ok && result.kind === "invalid_spec") {
      console.error("Invalid flow spec:");
      console.error(
        result.specIssues.map((issue) => {
          const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
          return `- ${path}: ${issue.message}`;
        }).join("\n")
      );
      return 1;
    }
    if (result.outPath) {
      console.log(`scaffold_manifest=${result.outPath}`);
    } else {
      console.log(JSON.stringify(result.manifest, null, 2));
    }
    if (!result.ok) {
      console.error("Scaffolded manifest failed schema validation:");
      console.error(formatIssues(result.issues));
      return 1;
    }
    console.log("scaffold_status=schema_valid");
    return 0;
  }
  if (args.command === "normalize") {
    const result = await normalizeManifestFile(requireFile(args.file), {
      targetFlowId: args.flags.get("target-flow-id"),
      outPath: args.flags.get("out"),
      write: args.flags.has("write")
    });
    if (!args.flags.has("write") && !args.flags.has("out")) {
      console.log(JSON.stringify(result.manifest, null, 2));
    }
    if (!result.valid) {
      console.error(formatIssues(result.issues ?? []));
      return 1;
    }
    return 0;
  }
  if (args.command === "summary") {
    const data = await readJson(requireFile(args.file));
    const validated = validateManifest(data);
    if (!validated.ok) {
      console.error(formatIssues(validated.issues));
      return 1;
    }
    console.log(JSON.stringify(summarizeManifest(validated.manifest), null, 2));
    return 0;
  }
  printHelp();
  return 1;
};
var isInvokedDirectly = () => {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return fileURLToPath2(import.meta.url) === resolve7(entry);
  } catch {
    return false;
  }
};
if (isInvokedDirectly()) {
  runArgv(process.argv.slice(2)).then((code) => {
    process.exitCode = code;
  }).catch((err) => {
    console.error(err instanceof Error ? err.message : String(err));
    process.exitCode = 1;
  });
}
export {
  runCli
};
