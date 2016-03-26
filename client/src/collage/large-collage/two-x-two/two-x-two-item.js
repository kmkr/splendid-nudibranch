import React, {Component, PropTypes} from 'react';

function delegate(e, delegatee, ...rest) {
    e.preventDefault();
    delegatee(...rest);
}


class TwoXTwoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }

    render() {
        const {itemClicked, collageItem, scroll} = this.props;
        let imgStyle;

        if (scroll.innerWidth < 1700) {
            imgStyle = {
                width: '800px',
                marginTop: '-70px'
            };
        } else {
            imgStyle = {
                width: '1000px',
                marginTop: '-150px'
            };
        }
        return (
            <img
                onClick={e => delegate(e, itemClicked, collageItem.key)}
                onLoad={() => this.setState({loaded: true})}
                style={{
                    opacity: this.state.loaded ? 1 : 0,
                    ...imgStyle
                }}
                src={collageItem.url} />
        );
    }
}

TwoXTwoItem.propTypes = {
    collageItem: PropTypes.object.isRequired,
    itemClicked: PropTypes.func.isRequired,
    scroll: PropTypes.object.isRequired
};

export default TwoXTwoItem;
