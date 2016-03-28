import React, {Component, PropTypes} from 'react';
import smoothScroll from 'smooth-scroll';

class SmoothScrollLink extends Component {

    onClick(e) {
        e.preventDefault();
        history.replaceState(null, null, this.props.href);
        this.props.onClick();
        // Anchor er ikke oppdatert i denne fasen
        setTimeout(() => {
            smoothScroll.animateScroll(this.props.selector || this.props.href, null, {updateURL: false});
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
    href: PropTypes.string.isRequired,
    selector: PropTypes.string,
    onClick: PropTypes.func
};

SmoothScrollLink.defaultProps = {
    onClick: () => {}
};

export default SmoothScrollLink;
