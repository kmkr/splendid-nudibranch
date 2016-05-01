import React, {Component} from 'react';
import {connect} from 'react-redux';
import smoothScroll from 'smooth-scroll';

const UP_KEYS = [33/* pgup */, 37/* arrow left */, 38/* arrow up */];
const DOWN_KEYS = [32/* space */, 34/* pgdn */, 39/* arrow right */, 40/* arrow down */];

class KeyUpScroller extends Component {
    componentWillMount() {
        window.addEventListener('keydown', e => this.handleKeyDown(e));
        window.addEventListener('keyup', e => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        const keyCode = e.keyCode || e.detail.keyCode;
        const {anchors, currentOffset} = this.props;

        let nextAnchors;
        if (UP_KEYS.indexOf(keyCode) !== -1) {
            nextAnchors = anchors
                .filter(anchor => anchor.position.offsetTop < currentOffset)
                .reverse();
        } else if (DOWN_KEYS.indexOf(keyCode) !== -1) {
            nextAnchors = anchors
                .filter(anchor => anchor.position.offsetTop > currentOffset);
            if (!nextAnchors[0]) {
                console.log('todo: håndter at anchors ikke er lastet enda');
            }
        }

        if (nextAnchors) {
            // Don't interfer if the user is holding down the button
            if (this.nextQueuedAnchor) {
                this.abortChange = true;
                return;
            }

            if (nextAnchors[0] !== this.nextQueuedAnchor) {
                e.preventDefault();
                this.nextQueuedAnchor = nextAnchors[0];
            }
        }

    }

    handleKeyUp() {
        if (this.nextQueuedAnchor && !this.abortChange) {
            smoothScroll.animateScroll(`#${this.nextQueuedAnchor.domId}`, null, {
                speed: 200,
                updateURL: false
            });
        }
        this.abortChange = null;
        this.nextQueuedAnchor = null;
    }

    render() {
        return <span />;
    }
}

function select(state) {
    return {
        anchors: state.anchors,
        currentOffset: state.scroll.pageYOffset
    };
}

export default connect(select)(KeyUpScroller);
