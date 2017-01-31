import React, {Component} from 'react';
import {connect} from 'react-redux';
import smoothScroll from 'smooth-scroll';
import './add-wheel-listener';

const UP_KEYS = [33/* pgup */, 37/* arrow left *//* 38 arrow up */];
const DOWN_KEYS = [32/* space */, 34/* pgdn */, 39/* arrow right *//*, 40 arrow down */];
const WHEEL_SCROLL_PAUSE = 1200;
const HIGH_FREQUENCY_WHEEL_SCROLL_PAUSE = 1400;

function now() {
    return new Date().getTime();
}

class ScrollOnEventHandler extends Component {
    componentWillMount() {
        window.addEventListener('keydown', e => this.handleKeyDown(e));
        window.addEventListener('keyup', e => this.handleKeyUp(e));
        window.addWheelListener(document.body, e => this.handleWheel(e));
        this.lastScrollStarted = 0;
        this.scrolling = false;
        this.scrollToIndex = null;

        // Some browsers (at least Safari) fires bursts of wheel events with small deltas instead of
        // one event with a large delta. The events can come after the physical event finished.
        this.highFrequencyWheel = false;
    }

    componentWillReceiveProps() {
        this.scrollToQueued();
    }

    shouldComponentUpdate() {
        return false;
    }

    scrollToQueued() {
        if (this.scrolling || typeof this.scrollToIndex !== 'number') {
            return;
        }

        const {anchors} = this.props;
        const scrollToIndex = this.scrollToIndex;
        const anchor = anchors[scrollToIndex];
        if (!anchor) {
            return;
        }

        this.scrolling = true;
        this.highFrequencyWheel = null;
        this.lastScrollStarted = now();

        smoothScroll.animateScroll(`#${anchor.domId}`, null, {
            speed: 600,
            updateURL: false,
            callback: () => {
                this.scrolling = false;
                // Sjekk om scrollToIndex er oppdatert mens scroll pågikk
                if (this.scrollToIndex !== scrollToIndex) {
                    this.scrollToQueued();
                } else {
                    this.scrollToIndex = null;
                }
            }
        });
    }

    followingAnchorIndex() {
        const {anchors, currentOffset} = this.props;
        const followingAnchor = anchors
            .filter((anchor, index) => {
                const followsCurrentOffset = anchor.position.offsetTop > currentOffset;
                const followsQueuedScroll = index > (this.scrollToIndex || 0);

                return followsCurrentOffset && followsQueuedScroll;
            })[0];
        return anchors.indexOf(followingAnchor);
    }

    previousAnchorIndex() {
        const {anchors, currentOffset} = this.props;
        const previousAnchor = anchors
            .filter((anchor, index) => {
                const isBeforeCurrentOffset = anchor.position.offsetTop < currentOffset;
                const isBeforeQueuedScroll = index < ((!this.scrollToIndex || this.scrollToIndex === -1) ? Number.MAX_VALUE : this.scrollToIndex);
                return isBeforeCurrentOffset && isBeforeQueuedScroll;
            })
            .reverse()[0];
        return anchors.indexOf(previousAnchor);
    }

    handleWheel(e) {
        e.preventDefault();
        const sinceLastScroll = now() - this.lastScrollStarted;

        if (!this.highFrequencyWheel && sinceLastScroll < 10) {
            this.highFrequencyWheel = true;
        }

        const PAUSE = this.highFrequencyWheel ? HIGH_FREQUENCY_WHEEL_SCROLL_PAUSE : WHEEL_SCROLL_PAUSE;

        if (this.scrolling || sinceLastScroll < PAUSE) {
            return;
        }

        let nextAnchorIndex;

        if (e.deltaY > 0) { // moving down
            nextAnchorIndex = this.followingAnchorIndex();
        } else {
            nextAnchorIndex = this.previousAnchorIndex();
        }

        if (typeof nextAnchorIndex === 'number' && nextAnchorIndex >= 0) {
            this.scrollToIndex = nextAnchorIndex;
            this.scrollToQueued();
        }
    }

    handleKeyDown(e) {
        const keyCode = e.keyCode || e.detail.keyCode;

        let nextAnchorIndex;
        if (UP_KEYS.indexOf(keyCode) !== -1) {
            nextAnchorIndex = this.scrolling ? this.scrollToIndex - 1 : this.previousAnchorIndex();
        } else if (DOWN_KEYS.indexOf(keyCode) !== -1) {
            nextAnchorIndex = this.scrolling ? this.scrollToIndex + 1 : this.followingAnchorIndex();
        }

        if (typeof nextAnchorIndex === 'number') {
            e.preventDefault();
            this.scrollToIndex = nextAnchorIndex;
        }
    }

    handleKeyUp() {
        this.scrollToQueued();
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
