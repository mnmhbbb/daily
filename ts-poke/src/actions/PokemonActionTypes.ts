export const POKEMON_SUCCESS = 'POKEMON_SUCCESS';
export const POKEMON_FAIL = 'POKEMON_FAIL';

// 받아올 데이터 묶음
export type PokemonType = {
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
};
// 받아올 데이터의 타입
export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};
export type PokemonSprites = {
  front_default: string;
};

// 액션에 따라 사용할 디스패치 타입이 다름
export interface pokemonFailDispatch {
  type: typeof POKEMON_FAIL;
}
export interface pokemonSuccessDispatch {
  type: typeof POKEMON_SUCCESS;
  payload: {
    abilities: PokemonAbility[];
    sprites: PokemonSprites;
  };
}
// 그 디스패치 타입을 제네릭하게 하기 위함
export type PokemonDispatchType = pokemonFailDispatch | pokemonSuccessDispatch;
