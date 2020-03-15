import React, { Fragment } from 'react'

import './Header.css'

import logoUrl from '../../assets/images/Pokemon_logo.png'
function Header() {
    return (
        <Fragment>
            <section className="header-layout">
                <div>
                    <img src={logoUrl} className="logo-img" alt="" />
                </div>
                <div className="user-text">Welcome Guest!!</div>
            </section>
        </Fragment>
    );
}

export default Header;