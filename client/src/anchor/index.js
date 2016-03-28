import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {registerAnchor, unregisterAnchor, updateAnchor} from './anchor-actions';
import idGenerator from '../../../common/id-generator';

class Anchor extends Component {
    constructor(props) {
        super(props);
        this.registeredOffsetTop = 0;
        this.state = {
            id: idGenerator()
        };
    }

    componentDidMount() {
        this.props.dispatch(registerAnchor({
            id: this.state.id,
            name: this.props.name,
            position: {
                offsetTop: this.anchor.offsetTop
            }
        }));
    }

    componentDidUpdate() {
        this.considerUpdate();
    }

    componentWillUnmount() {
        this.props.dispatch(unregisterAnchor(this.state.id));
    }

    considerUpdate() {
        const currentOffsetTop = this.anchor.offsetTop;
        if (currentOffsetTop === this.registeredOffsetTop) {
            return;
        }

        this.registeredOffsetTop = currentOffsetTop;
        this.props.dispatch(updateAnchor(this.state.id, {
            position: {offsetTop: currentOffsetTop}
        }));
    }

    render() {
        return (
            <div
                ref={div => this.anchor = div}
                {...this.props} />
        );
    }
}

Anchor.propTypes = {
    name: PropTypes.string.isRequired
};

function select(state) {
    return {
        scroll: state.scroll
    };
}

export default connect(select)(Anchor);
