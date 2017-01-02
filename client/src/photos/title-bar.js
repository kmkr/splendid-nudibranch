import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import getActiveAnchor from '../navigation/active-anchor-service';

import './title-bar.scss';

class TitleBar extends PureComponent {
    constructor() {
        super();
        this.state = {
            title: ''
        };
    }
    componentWillReceiveProps({anchors, scroll, photos}) {
        const activeAnchor = getActiveAnchor({anchors, scroll});

        let title = '';
        if (activeAnchor) {
            // todo: finn en bedre måte å knytte dette på?
            const photo = photos.find(p => activeAnchor.name.indexOf(p.key) > -1);

            if (photo && photo.loaded && photo.title) {
                title = photo.title;
            }
        }
        this.setState({
            title
        });
    }

    render() {
        const {title} = this.state;
        if (!title) {
            return <span/>;
        }

        return (
            <div id="title-bar">{title}</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        anchors: state.anchors,
        scroll: state.scroll,
        photos: state.photos.data
    };
}

export default connect(mapStateToProps)(TitleBar);
