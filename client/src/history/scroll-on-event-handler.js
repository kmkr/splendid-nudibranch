import React, {Component} from 'react';
import {connect} from 'react-redux';
import smoothScroll from 'smooth-scroll';

const UP_KEYS = [33/* pgup */, 37/* arrow left *//* 38 arrow up */];
const DOWN_KEYS = [32/* space */, 34/* pgdn */, 39/* arrow right *//*, 40 arrow down */];

class ScrollOnEventHandler extends Component {
    componentWillMount() {
        window.addEventListener('keydown', e => this.handleKeyDown(e));
        window.addEventListener('keyup', e => this.handleKeyUp(e));
        window.addEventListener('wheel', e => this.handleWheel(e));
    }

    shouldComponentUpdate() {
        return false;
    }

    scrollTo(anchor) {
        if (this.scrolling) {
            return;
        }

        this.scrolling = true;
        smoothScroll.animateScroll(`#${anchor.domId}`, null, {
            speed: 300,
            updateURL: false,
            callback: () => {
                this.scrolling = false;
            }
        });
    }

    followingAnchors() {
        const {anchors, currentOffset} = this.props;
        return anchors.filter(anchor => anchor.position.offsetTop > currentOffset);
    }

    previousAnchors() {
        const {anchors, currentOffset} = this.props;
        return anchors
            .filter(anchor => anchor.position.offsetTop < currentOffset)
            .reverse();
    }

    handleWheel(e) {
        e.preventDefault();
        let nextAnchors;

        if (e.deltaY > 0) { // moving down
            nextAnchors = this.followingAnchors();
        } else {
            nextAnchors = this.previousAnchors();
        }

        if (nextAnchors.length) {
            this.scrollTo(nextAnchors[0]);
        }
    }

    handleKeyDown(e) {
        const keyCode = e.keyCode || e.detail.keyCode;

        let nextAnchors;
        if (UP_KEYS.indexOf(keyCode) !== -1) {
            nextAnchors = this.previousAnchors();
        } else if (DOWN_KEYS.indexOf(keyCode) !== -1) {
            nextAnchors = this.followingAnchors();
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
            this.scrollTo(this.nextQueuedAnchor);
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

export default connect(select)(ScrollOnEventHandler);
