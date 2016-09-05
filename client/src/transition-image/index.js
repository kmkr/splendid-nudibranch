import React, {PureComponent, PropTypes} from 'react';

import './transition-image.scss';

class TransitionImage extends PureComponent {
    constructor() {
        super();
        this.state = {loaded: false};
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
