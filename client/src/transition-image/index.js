import React, {Component, PropTypes} from 'react';
import shallowCompare from 'shallow-compare-without-functions';

import './transition-image.scss';

class TransitionImage extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    onLoad() {
        if (this.state.loaded) {
            // Some browsers call onLoad multiple times, perhaps due to srcSet
            return;
        }

        this.setState({
            loaded: true
        });

        this.props.onLoad();
    }

    render() {
        const className = this.props.className ? `${this.props.className} transition-image` : 'transition-image';
        return (
            <img
                {...this.props}
                className={className}
                style={{
                    ...this.props.style,
                    opacity: this.state.loaded ? 1 : 0
                }}
                onLoad={this.onLoad.bind(this)} />
        );
    }
}

TransitionImage.propTypes = {
    style: PropTypes.object,
    onLoad: PropTypes.func
};

TransitionImage.defaultProps = {
    style: {},
    onLoad: () => {}
};

export default TransitionImage;
