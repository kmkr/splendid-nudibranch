import React, {Component, PropTypes} from 'react';
import smoothScroll from 'smooth-scroll';
import shallowCompare from 'shallow-compare-without-functions';

class SmoothScrollLink extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    onClick(e) {
        e.preventDefault();
        history.replaceState(null, null, this.props.href);
        this.props.onClick();
        // Anchor er ikke oppdatert i denne fasen
        setTimeout(() => {
            smoothScroll.animateScroll(this.props.selector || this.props.href, null, {
                easing: this.props.easing,
                speed: this.props.speed,
                updateURL: false
            });
        }, 100);
    }

    render() {
        return (
            <a
                {...this.props}
                onClick={this.onClick.bind(this)} />
        );
    }
}

SmoothScrollLink.propTypes = {
    speed: PropTypes.number,
    href: PropTypes.string.isRequired,
    selector: PropTypes.string,
    onClick: PropTypes.func
};

SmoothScrollLink.defaultProps = {
    easing: 'linear',
    onClick: () => {},
    speed: 100
};

export default SmoothScrollLink;
