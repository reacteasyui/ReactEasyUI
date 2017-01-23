import React from 'react';
import {Link} from "react-router";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header">
                <Link className="logo" to="/">ReactEasyUI</Link>
                <button className="btn-menu">
                    <span className="menu-icon"></span>
                </button>
                <nav className="nav" role="navigation">
                    <ul className="navlist">
                        <li><a href="http://www.itbbb.com/jsfunction/jsfunction.html" target="_blank">JSFunction</a></li>
                        <li><a href="https://react-bootstrap.github.io/components.html" target="_blank">Bootstrap</a></li>
                        <li><a href="https://github.com/reacteasyui/ReactEasyUI" target="_blank">GitHub</a></li>
                    </ul>
                    <ul className="navlist navlist-right">
                        <li><Link to="about" activeClassName="active">About Us</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}