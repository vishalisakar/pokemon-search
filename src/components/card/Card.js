import React from 'react'

import './card.css'

function PokeCard(props) {
    return (
        <>
            <div className="card">
                {/* <div className="card-header">
                   
                </div> */}
                <div className="card-image">
                    <img src={`https://pokeres.bastionbot.org/images/pokemon/${props.poke.id}.png`} ></img>
                </div>
                <div className="card-footer">
                    {props.poke.name}
                </div>
            </div>
        </>
    );
}

export default PokeCard;