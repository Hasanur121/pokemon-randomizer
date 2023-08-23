"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePokemon = exports.validateOptions = void 0;
const lodash_1 = __importDefault(require("lodash"));
const data = __importStar(require("./data"));
const DEFAULT_NUMBER = 6;
const isBoolString = (value) => {
    if (typeof value === 'string') {
        const lowerCase = value.trim().toLowerCase();
        if (lowerCase === 'true' || lowerCase === 'false') {
            return true;
        }
    }
    return false;
};
const booleanValidator = (optionName, value) => {
    if (value === undefined || value === null) {
        return undefined;
    }
    if (value === true || value === false) {
        return value;
    }
    if (isBoolString(value)) {
        return value.trim().toLowerCase() === 'true';
    }
    throw Error(`Option ${optionName} must be a boolean. Received: ${typeof value}`);
};
const positiveIntegerValidator = (optionName, value) => {
    if (value === undefined || value === null) {
        return undefined;
    }
    const parsed = Number(value);
    const isInteger = !!value && !Number.isNaN(parsed) && Number.isInteger(parsed) && parsed > 0;
    if (isInteger) {
        return parsed;
    }
    throw Error(`Option ${optionName} must be a positive integer. Received: ${typeof value}`);
};
const stringValidator = (optionName, value) => {
    if (value === undefined || value === null) {
        return undefined;
    }
    if (lodash_1.default.isString(value)) {
        const lower = value.trim().toLowerCase();
        return lower;
    }
    throw Error(`Option ${optionName} must be a string. Received: ${typeof value}`);
};
const typeValidator = (optionName, value) => {
    var _a;
    if (value === null || value === undefined) {
        return undefined;
    }
    const lowerCase = (_a = stringValidator(optionName, value)) !== null && _a !== void 0 ? _a : '';
    const validTypes = data.getTypes();
    if (Object.keys(validTypes).includes(lowerCase)) {
        return lowerCase;
    }
    throw Error(`Option ${optionName} must be a valid type. Received: ${typeof value}`);
};
const generationArrayValidator = (optionName, value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (lodash_1.default.isArray(value)) {
        const generations = data.getGenerations();
        const generationList = Object.keys(generations);
        if (value.every((element) => generationList.includes(element))) {
            return value.map((generation) => generation.toString());
        }
        throw Error(`option ${optionName} must be an array of existing generation numbers. Received: ${typeof value}`);
    }
    throw Error(`option ${optionName} must be an array of generation numbers. Received: ${typeof value}`);
};
const pokemonListValidator = (optionName, value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (lodash_1.default.isArray(value)) {
        const pokemonNameList = Object.values(data.getPokemon()).map((pokemon) => pokemon.name.toLowerCase());
        if (value.every((entryValue) => pokemonNameList.includes(entryValue.toLowerCase()))) {
            return value.map((name) => name.toLowerCase());
        }
    }
    throw Error(`option ${optionName} must be an array of Pokémon names. Received: ${typeof value}`);
};
const validateOptions = (options) => {
    var _a;
    let inputOptions;
    if (lodash_1.default.isObject(options)) {
        inputOptions = options;
    }
    else if (options !== null && options !== undefined) {
        throw new Error(`Options must be an object. Received: ${typeof options}`);
    }
    const sanitizedOptions = {
        number: DEFAULT_NUMBER,
    };
    sanitizedOptions.number = (_a = positiveIntegerValidator('number', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.number)) !== null && _a !== void 0 ? _a : DEFAULT_NUMBER;
    sanitizedOptions.baby = booleanValidator('baby', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.baby);
    sanitizedOptions.basic = booleanValidator('basic', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.basic);
    sanitizedOptions.evolved = booleanValidator('evolved', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.evolved);
    sanitizedOptions.unique = booleanValidator('unique', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.unique);
    sanitizedOptions.randomType = booleanValidator('randomType', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.randomType);
    sanitizedOptions.type = typeValidator('type', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.type);
    sanitizedOptions.superEffective = typeValidator('superEffective', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.superEffective);
    sanitizedOptions.starter = booleanValidator('starter', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.starter);
    sanitizedOptions.legendary = booleanValidator('legendary', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.legendary);
    sanitizedOptions.mythical = booleanValidator('mythical', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.mythical);
    sanitizedOptions.forms = booleanValidator('forms', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.forms);
    sanitizedOptions.generations = generationArrayValidator('generations', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.generations);
    sanitizedOptions.customList = pokemonListValidator('customList', inputOptions === null || inputOptions === void 0 ? void 0 : inputOptions.customList);
    return sanitizedOptions;
};
exports.validateOptions = validateOptions;
const validatePokemon = (options, poke, dexNo, allTypes) => {
    const pokeCopy = Object.assign({}, poke);
    if (options) {
        if (!options.forms) {
            delete pokeCopy.forms;
        }
        if (options.customList) {
            return options.customList.includes(pokeCopy.name.toLowerCase())
                ? Object.assign(Object.assign({}, pokeCopy), { dexNo }) : null;
        }
        if (options.baby
            && (!pokeCopy.evolveTo
                || parseInt(pokeCopy.evolveTo, 10) > dexNo)) {
            return null;
        }
        if (options.basic && !pokeCopy.basic) {
            return null;
        }
        if (options.evolved) {
            if (pokeCopy.evolveTo) {
                return null;
            }
            if (options.forms && pokeCopy.forms) {
                pokeCopy.forms = pokeCopy.forms.filter((form) => !form.evolveTo);
            }
        }
        const pokeTypes = pokeCopy.type.split(' ');
        if (options.type) {
            if (options.forms && pokeCopy.forms) {
                let allMonTypes = pokeTypes;
                pokeCopy.forms.forEach((form) => allMonTypes.push(...form.type.split(' ')));
                allMonTypes = lodash_1.default.uniq(allMonTypes);
                if (!allMonTypes.includes(options.type)) {
                    return null;
                }
                pokeCopy.forms = pokeCopy.forms.filter((form) => {
                    const formTypes = form.type.split(' ');
                    return formTypes.includes(options.type);
                });
            }
            if (!pokeTypes.includes(options.type)) {
                return null;
            }
        }
        if (options.superEffective) {
            const type = allTypes[options.superEffective];
            if (type) {
                const vulnerables = type.vulnerable.split(' ');
                if (!lodash_1.default.intersection(pokeTypes, vulnerables).length) {
                    return null;
                }
            }
        }
        if (options.starter && !pokeCopy.starter) {
            return null;
        }
        if (options.legendary && !pokeCopy.legendary && !pokeCopy.mythical) {
            return null;
        }
        if (options.mythical && !pokeCopy.mythical) {
            return null;
        }
        if (options.generations) {
            const allGens = data.getGenerations();
            if (!options.generations.some((gen) => dexNo >= allGens[gen].first
                && dexNo <= allGens[gen].last)) {
                return null;
            }
        }
    }
    return Object.assign(Object.assign({}, pokeCopy), { dexNo });
};
exports.validatePokemon = validatePokemon;
//# sourceMappingURL=validators.js.map
