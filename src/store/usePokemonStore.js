import {useState} from 'react'

const usePokemonState = () => {
    const [pokemonList, setPokemonList] = useState([{name: 'test', favourt: 'false'}]);

    const action = (action) => {
        const {type, payload} = action;

        switch(type) {
            case 'SET_POKEMON_LIST' :
                return setPokemonList( () => [...payload]);
            default:
                return pokemonList;
        }
    }
    return {pokemonList, action}
}

export default usePokemonState;