import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerType } from './Store';
import { useState } from 'react';
import { fetchPokemonData } from './actions/PokemonActions';

function App() {
  const dispatch = useDispatch();
  const [pokemonName, setPokeMonName] = useState('');
  const pokemonReducer = useSelector((state: RootReducerType) => state.PokemonReducer);

  const handlePokemonName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokeMonName(e.target.value);
  };

  const searchButtonTapped = () => {
    dispatch(fetchPokemonData(pokemonName));
  };

  return (
    <div className="App">
      <input value={pokemonName} onChange={handlePokemonName} />
      <button onClick={searchButtonTapped}>포켓몬 찾기</button>

      {pokemonReducer.success && (
        <div>
          <p>{pokemonName}</p>
          {pokemonReducer.pokemon?.abilities.map((ability) => {
            return (
              <div>
                <p>{ability.ability.name}</p>
                <p>{ability.slot}</p>
              </div>
            );
          })}
          <img
            src={pokemonReducer.pokemon?.sprites.front_default}
            alt={pokemonReducer.pokemon?.sprites.front_default}
          />
        </div>
      )}
    </div>
  );
}

export default App;
