const SLACK_FACTOR = 1.8;

export default ({anchors, scroll}) => {
    const currentOffset = scroll.pageYOffset;

    return (anchors
        .filter(anchor => currentOffset >= (anchor.position.offsetTop - (scroll.innerHeight / SLACK_FACTOR)))
        .reverse())[0];
};
