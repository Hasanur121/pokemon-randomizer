"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenerations = exports.getTypes = exports.getPokemon = void 0;
const generations_json_1 = __importDefault(require("./data/generations.json"));
const pokemon_json_1 = __importDefault(require("./data/pokemon.json"));
const types_json_1 = __importDefault(require("./data/types.json"));
const getPokemon = () => pokemon_json_1.default;
exports.getPokemon = getPokemon;
const getTypes = () => types_json_1.default;
exports.getTypes = getTypes;
const getGenerations = () => generations_json_1.default;
exports.getGenerations = getGenerations;
//# sourceMappingURL=data.js.map
