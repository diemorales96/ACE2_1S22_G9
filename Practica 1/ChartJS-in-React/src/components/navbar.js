import React from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends React.Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg  navbar-light bg-warning">
                    <div class='container'>
                        <a class="navbar-brand" href='/'>POZOS PROVENZALES</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item active">
                                    <ul>
                                    <Link to='/1'>
                                        <a class="nav-link">Experimento 1</a>
                                    </Link>
                                    </ul>
                                    <ul>
                                    <Link to='/2'>
                                        <a class="nav-link">Experimento 2</a>
                                    </Link>
                                    </ul>
                                    <ul>
                                    <Link to='/3'>
                                        <a class="nav-link">Experimento 3</a>
                                    </Link>
                                    </ul>
                                    <ul>
                                    <Link to='/4'>
                                        <a class="nav-link">Experimento CO2</a>
                                    </Link>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}