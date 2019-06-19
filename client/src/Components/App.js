import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './../store/actions/index';
import Header from './Header/Header';
import OpeningPage from './OpeningPage/OpeningPage';
import MainPage from './MainPage/MainPage';
import EditPage from './EditPage/EditPage';
import CheckoutPage from './CheckoutPage/CheckoutPage';
import './App.css';

class App extends Component {
    componentDidMount() {
        this.props.onFetchUser();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={OpeningPage} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.user) {
            routes = (
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/edit" exact component={EditPage} />
                    <Route path="/checkout" exact component={CheckoutPage} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div className="mainDiv">
                <BrowserRouter>
                    <div className="container cntClass">
                        <Header />
                        {routes}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.authStore.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: () => dispatch(actions.fetchUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
