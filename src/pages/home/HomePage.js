import React, { Fragment, useState, useContext, useEffect } from 'react';

import './homePage.css'
//lib
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Button, Badge, Container, Modal, ProgressBar } from 'react-bootstrap';

import PokeCard from '../../components/card/Card'

import Context from '../../store/context';

function HomePage() {

    const [selected, setSelected] = useState([]);
    const [pokemon, setPokemon] = useState({});
    const { pokemonList, action } = useContext(Context);
    const [displayList, setDisplayList] = useState([]);
    let scroll = 0;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let firstArray = pokemonList.slice(0, 50);
        setDisplayList(firstArray);
    }, [pokemonList.length]);

    const onPokemonSelected = async (poke) => {
        // get the selected pokemon
        if (poke && poke.name) {
            const url = 'https://pokeapi.co/api/v2/pokemon/' + poke.name;
            const response = await fetch(url);
            const jsonRes = await response.json();
            const selectedItem = {
                name: jsonRes.name,
                order: jsonRes.order,
                types: jsonRes.types.map(e => e.type.name),
                species: jsonRes.species.name,
                height: jsonRes.height,
                weight: jsonRes.weight,
                abilities: jsonRes.abilities,
                images: jsonRes.sprites,
                stats: jsonRes.stats
            }
            setPokemon({ ...selectedItem });

            handleShow();
        }
    }

    const getStatsDisply = (stat) => {
        
        if(stat.base_stat <= 30) {
            return <ProgressBar variant="danger" now={stat.base_stat} label={stat.base_stat} />
        } else if (stat.base_stat > 30 && stat.base_stat <= 60) {
            return <ProgressBar variant="warning" now={stat.base_stat} label={stat.base_stat}/>
        } else if (stat.base_stat > 60) {
            return <ProgressBar variant="success" now={stat.base_stat} label={stat.base_stat}/>
        }
    }

    return (
        <Container fluid>
            <div className="search-bar">
                <input
                    value={selected}
                    onChange={(e) => {
                        let query = e.target.value;
                        setSelected(query);
                        let result = pokemonList.filter(poke => {
                            return poke.name.includes(query)
                        });
                        setDisplayList(result.slice(0, 50));
                    }}
                    placeholder="Search"
                    className="form-control search-input"
                ></input>
            </div>
            <div className="card-view">
                {
                    displayList.map((val, index) => {
                        return <div key={index} onClick={() => onPokemonSelected(val)}><PokeCard key={index} poke={val}></PokeCard></div>
                    })
                }
            </div>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title >{pokemon?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="detail-display">
                        <div className="image-area">
                            <div className="image-normal">
                                <span>NORMAL</span>
                                <img src={pokemon?.images?.front_default} alt="fornt" width="96" height="96" />
                                <img src={pokemon?.images?.back_default} alt="back" width="96" height="96"/>
                            </div>
                            <div className="image-normal">
                                <span>SHINE</span>
                                <img src={pokemon?.images?.front_shiny} alt="shine-fornt" width="96" height="96"/>
                                <img src={pokemon?.images?.back_shiny} alt="shine-back" width="96" height="96"/>
                            </div>
                        </div>
                        {/* <div className="content-area"> */}
                            <div className="base-area">
                                <h4>BASE</h4>
                                <div className="base-card">
                                    <label>Order</label>
                                    <span>{pokemon?.order}</span>
                                </div>
                                <div className="base-card">
                                    <label>Type</label>
                                    <span>
                                    {pokemon?.types?.map((name, idx) => {
                                        return <Badge variant="primary">{name}</Badge>
                                    })
                                    }
                                    </span>
                                </div>
                                <div className="base-card">
                                    <label>species</label>
                                    <span>{pokemon?.species}</span>
                                </div>
                                <div className="base-card">
                                    <label>height</label>
                                    <span>{pokemon?.height}</span>
                                </div>
                                <div className="base-card">
                                    <label>weight</label>
                                    <span>{pokemon?.weight}</span>
                                </div>
                                <div className="base-card">
                                    <label>Order</label>
                                    <span>{pokemon?.order}</span>
                                </div>
                            </div>
                            <div className="stat-area">
                                <h4>STAT</h4>

                                {
                                    pokemon?.stats?.map( (val, idx) => {
                                        return <div key={idx}>
                                            <span>
                                                {val.stat.name} 
                                            </span>
                                            <span>
                                                { getStatsDisply(val)}
                                            </span>
                                        </div>
                                    })
                                }
                            </div>
                        {/* </div> */}
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default HomePage;