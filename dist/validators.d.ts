import * as types from './types';
export declare const validateOptions: (options: unknown) => types.Options;
export declare const validatePokemon: (options: types.Options, poke: types.ListPokemon, dexNo: number, allTypes: types.TypeMap) => types.Pokemon | null;
