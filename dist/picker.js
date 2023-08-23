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
const chance_1 = __importDefault(require("chance"));
const lodash_1 = __importDefault(require("lodash"));
const data = __importStar(require("./data"));
const validators = __importStar(require("./validators"));
const chance = new chance_1.default();
const getRandomKey = (items) => {
    const keys = Object.keys(items);
    const numItems = keys.length;
    const randomNum = chance.integer({ min: 0, max: numItems - 1 });
    return keys[randomNum];
};
const getFilteredPokemon = (options) => {
    const allPokemon = data.getPokemon();
    const allTypes = data.getTypes();
    const filteredPokemon = [];
    Object.entries(allPokemon).forEach(([dexNo, poke]) => {
        const validated = validators.validatePokemon(options, poke, parseInt(dexNo, 10), allTypes);
        if (validated !== null) {
            filteredPokemon.push(validated);
        }
    });
    if (filteredPokemon.length === 0) {
        throw Error(`No Pokémon satisfy those options${options.randomType ? `\nChosen type: ${options.type}` : ''}`);
    }
    return filteredPokemon;
};
const pickRandomPokemonAndOptions = (unsanitizedOptions) => {
    const options = validators.validateOptions(unsanitizedOptions);
    if (options && options.randomType === true && !options.type) {
        const pokemonTypes = data.getTypes();
        const randomType = getRandomKey(pokemonTypes);
        options.type = randomType;
    }
    const pokemonToPickFrom = getFilteredPokemon(options);
    const pokemonKeys = Object.keys(pokemonToPickFrom);
    const numPokemon = pokemonKeys.length;
    if (options.unique && numPokemon < options.number) {
        throw Error(`only ${numPokemon} Pokémon satisf${numPokemon === 1 ? 'ies' : 'y'} those options${options.randomType ? `\nChosen type: ${options.type}` : ''}`);
    }
    const chosenPokemon = [];
    lodash_1.default.times(options.number, () => {
        const randomIndex = parseInt(getRandomKey(pokemonToPickFrom), 10);
        const randomPokemon = options.unique
            ? pokemonToPickFrom.splice(randomIndex, 1)[0]
            : pokemonToPickFrom[randomIndex];
        chosenPokemon.push(randomPokemon);
    });
    return {
        pokemon: chosenPokemon,
        options,
    };
};
const pickRandomPokemon = (unsanitizedOptions) => {
    const result = pickRandomPokemonAndOptions(unsanitizedOptions);
    return result.pokemon;
};
exports.default = pickRandomPokemon;
//# sourceMappingURL=picker.js.map
