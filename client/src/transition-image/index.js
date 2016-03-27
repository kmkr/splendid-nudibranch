import React, {Component, PropTypes} from 'react';

import './transition-image.scss';

class TransitionImage extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
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
                onLoad={() => this.setState({loaded: true})} />
        );
    }
}

TransitionImage.propTypes = {
    style: PropTypes.object
};

TransitionImage.defaultProps = {
    style: {}
};

export default TransitionImage;
