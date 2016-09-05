import React, {PureComponent, PropTypes} from 'react';
import smoothScroll from 'smooth-scroll';

class SmoothScrollLink extends PureComponent {

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
        const {easing, selector, speed, onClick, ...props} = this.props; // eslint-disable-line no-unused-vars
        return (
            <a
                {...props}
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
