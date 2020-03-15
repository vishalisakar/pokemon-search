
const reducer = (pokemonList, {type, payload}) => {
    if ( type === 'MARK_FAV') {
        return pokemonList.map(poke => {
            if(poke.name === payload) {
              poke.isFav = false;
            }
            return poke;
          });
    }
}

export default reducer;