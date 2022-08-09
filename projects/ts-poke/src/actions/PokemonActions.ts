import axios from 'axios';
import { Dispatch } from 'redux';
import { PokemonDispatchType, POKEMON_SUCCESS, POKEMON_FAIL } from './PokemonActionTypes';

export const fetchPokemonData =
  (pokemonName: string) => async (dispatch: Dispatch<PokemonDispatchType>) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = res.data;

      dispatch({
        type: POKEMON_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: POKEMON_FAIL,
      });
    }
  };
