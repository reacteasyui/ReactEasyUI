import React from 'react';
import {Link} from "react-router";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="navbar navbar-fixed-top" id="top" role="banner">
                <div className="navbar-header">
                    <a href="#" className="navbar-brand">
                        <span className="logo"></span>ReactEasyUI
                    </a>
                    <button className="navbar-toggle collapsed" type="button">
                        <span className="sr-only">导航</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <nav className="collapse navbar-collapse" role="navigation">
                    <ul className="nav navbar-nav">
                        {/*<li><a href="http://www.itbbb.com" target="_blank">动感实验室</a></li>*/}
                        <li><a href="http://www.itbbb.com/jsfunction/jsfunction.html" target="_blank">JSFunction</a>
                        </li>
                        <li><a href="https://react-bootstrap.github.io/components.html" target="_blank">Bootstrap</a>
                        </li>
                        <li><a href="https://github.com/reacteasyui/ReactEasyUI" target="_blank">GitHub</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="about" activeClassName="active">About Us</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}