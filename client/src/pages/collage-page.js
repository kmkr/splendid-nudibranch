import React, {Component} from 'react';
import {connect} from 'react-redux';

import {pushHistory} from '../history/history-actions';
import {PAGES} from './constants';
import Collage from '../collage';

class CollagePage extends Component {
    onCollageLinkClick(e) {
        e.preventDefault();
        this.props.dispatch(pushHistory(PAGES.PHOTOS));
    }

    render() {
        return (
            <Collage onLinkClick={this.onCollageLinkClick.bind(this)} />
        );
    }
}

function select() {
    return {};
}


export default connect(select)(CollagePage);
