"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allOf = exports.oneOf = exports.at = exports.has = exports.isArray = exports.isUndefined = exports.isNull = exports.isBoolean = exports.isNumber = exports.isString = void 0;
var stringifyPath = function (path, context) {
    var _a;
    return path.reduce(function (acc, segment, index) {
        var _a;
        if (index < ((_a = context === null || context === void 0 ? void 0 : context.cutOff) !== null && _a !== void 0 ? _a : 0))
            return acc;
        if (typeof segment === 'string')
            return "".concat(acc, ".").concat(segment);
        return "".concat(acc, "[").concat(segment, "]");
    }, "".concat(' '.repeat(((_a = context === null || context === void 0 ? void 0 : context.depth) !== null && _a !== void 0 ? _a : 0) * 2), "$"));
};
function isString(exact) {
    var error = function (path) { return ({
        expected: 'string',
        path: path,
        toString: function (context) {
            return "".concat(stringifyPath(path, context), ": expected string");
        }
    }); };
    if (exact !== undefined)
        return function (value, path) {
            if (value !== exact)
                throw error(path !== null && path !== void 0 ? path : []);
            return true;
        };
    return function (value, path) {
        if (typeof value !== 'string')
            throw error(path !== null && path !== void 0 ? path : []);
        return true;
    };
}
exports.isString = isString;
function isNumber(exact) {
    var error = function (path) { return ({
        expected: 'number',
        path: path,
        toString: function (context) { return "".concat(stringifyPath(path, context), ": expected number"); },
    }); };
    if (exact !== undefined)
        return function (value, path) {
            if (value !== exact)
                throw error(path !== null && path !== void 0 ? path : []);
            return true;
        };
    return function (value, path) {
        if (typeof value !== 'number')
            throw error(path !== null && path !== void 0 ? path : []);
        return true;
    };
}
exports.isNumber = isNumber;
function isBoolean(exact) {
    var error = function (path) { return ({
        expected: 'boolean',
        path: path,
        toString: function (context) { return "".concat(stringifyPath(path, context), ": expected boolean"); },
    }); };
    if (exact !== undefined)
        return function (value, path) {
            if (value !== exact)
                throw error(path !== null && path !== void 0 ? path : []);
            return true;
        };
    return function (value, path) {
        if (typeof value !== 'boolean')
            throw error(path !== null && path !== void 0 ? path : []);
        return true;
    };
}
exports.isBoolean = isBoolean;
var isNull = function (value, path) {
    if (value !== null)
        throw {
            expected: 'null',
            path: path,
            toString: function (context) { return "".concat(stringifyPath(path !== null && path !== void 0 ? path : [], context), ": expected null"); },
        };
    return true;
};
exports.isNull = isNull;
var isUndefined = function (value, path) {
    if (value !== undefined)
        throw {
            expected: 'undefined',
            path: path,
            toString: function (context) { return "".concat(stringifyPath(path !== null && path !== void 0 ? path : [], context), ": expected undefined"); },
        };
    return true;
};
exports.isUndefined = isUndefined;
function isArray(schema) {
    var error = function (path) { return ({
        expected: 'array',
        path: path,
        toString: function (context) { return "".concat(stringifyPath(path, context), ": expected array"); },
    }); };
    if (schema === undefined)
        return function (value, path) {
            if (!Array.isArray(value))
                throw error(path !== null && path !== void 0 ? path : []);
            return true;
        };
    return function (value, path) {
        if (!Array.isArray(value))
            throw error(path !== null && path !== void 0 ? path : []);
        value.forEach(function (element, index) { return schema(element, __spreadArray(__spreadArray([], path !== null && path !== void 0 ? path : [], true), [index], false)); });
        return true;
    };
}
exports.isArray = isArray;
function has(key, schema) {
    return function (value, path) {
        if (typeof value !== 'object' || Array.isArray(value))
            throw {
                expected: 'object',
                path: path,
                toString: function (context) { return "".concat(stringifyPath(path !== null && path !== void 0 ? path : [], context), ": expected object"); },
            };
        return schema(value[key], __spreadArray(__spreadArray([], path !== null && path !== void 0 ? path : [], true), [key], false));
    };
}
exports.has = has;
function at(key, schema) {
    return function (value, path) {
        if (!Array.isArray(value))
            throw {
                expected: 'array',
                path: path,
                toString: function (context) { return "".concat(stringifyPath(path !== null && path !== void 0 ? path : [], context), ": expected array"); },
            };
        return schema(value[key], __spreadArray(__spreadArray([], path !== null && path !== void 0 ? path : [], true), [key], false));
    };
}
exports.at = at;
function oneOf() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (value, path) {
        var errors = [];
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var schema = args_1[_i];
            try {
                schema(value, path !== null && path !== void 0 ? path : []);
            }
            catch (error) {
                errors.push(error);
            }
        }
        if (errors.length < args.length)
            return true;
        throw {
            expected: 'one-of',
            errors: errors,
            path: path,
            toString: function (context) {
                var _a, _b, _c;
                var innerContext = {
                    depth: ((_a = context === null || context === void 0 ? void 0 : context.depth) !== null && _a !== void 0 ? _a : 0) + 1,
                    cutOff: (_b = path === null || path === void 0 ? void 0 : path.length) !== null && _b !== void 0 ? _b : 0,
                };
                return "".concat(stringifyPath(path !== null && path !== void 0 ? path : [], context), ": one-of [\n").concat(errors.reduce(function (acc, error) {
                    if (acc === undefined)
                        return error.toString(innerContext);
                    return "".concat(acc, "\n").concat(error.toString(innerContext));
                }, undefined), "\n").concat(' '.repeat(((_c = context === null || context === void 0 ? void 0 : context.depth) !== null && _c !== void 0 ? _c : 0) * 2), "]");
            }
        };
    };
}
exports.oneOf = oneOf;
function allOf() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (value, path) {
        var errors = [];
        for (var _i = 0, args_2 = args; _i < args_2.length; _i++) {
            var schema = args_2[_i];
            try {
                schema(value, path !== null && path !== void 0 ? path : []);
            }
            catch (error) {
                errors.push(error);
            }
        }
        if (errors.length === 0)
            return true;
        throw {
            expected: 'all-of',
            errors: errors,
            path: path,
            toString: function (context) {
                var _a, _b, _c;
                var innerContext = {
                    depth: ((_a = context === null || context === void 0 ? void 0 : context.depth) !== null && _a !== void 0 ? _a : 0) + 1,
                    cutOff: (_b = path === null || path === void 0 ? void 0 : path.length) !== null && _b !== void 0 ? _b : 0,
                };
                return "".concat(stringifyPath(path !== null && path !== void 0 ? path : [], context), ": all-of [\n").concat(errors.reduce(function (acc, error) {
                    if (acc === undefined)
                        return error.toString(innerContext);
                    return "".concat(acc, "\n").concat(error.toString(innerContext));
                }, undefined), "\n").concat(' '.repeat(((_c = context === null || context === void 0 ? void 0 : context.depth) !== null && _c !== void 0 ? _c : 0) * 2), "]");
            }
        };
    };
}
exports.allOf = allOf;
