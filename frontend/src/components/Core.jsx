
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import routing from '../utils/routing';
import { setClearAlert, setAlert } from '../redux/actions/ui';

const Core = ({ Component, Layout, redirect, setClearAlert, alert, routeName, history, setAlert }) => {

    useEffect(() => {
        console.log('<Core /> useEffect...');
        alert && setClearAlert();
    }, []);

    console.log('<Core />...');
    if (redirect.to && redirect.to !== routeName) return <Redirect to={routing.getPathByRouteName(redirect.to)} />
    return <Layout Component={Component} />

};

const mapStateToProps = ({ ui: { alert, redirect } }) => ({ alert, redirect });
export default connect(mapStateToProps, { setClearAlert, setAlert })(withRouter(Core));
