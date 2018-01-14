/** @jsx h */
import {h, Component} from 'preact';

class TransitionImage extends Component {
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
        const {alt, src, srcSet, sizes, width} = this.props;

        return (
            <img
                alt={alt}
                className="transition-image"
                style={{opacity: this.state.loaded ? 1 : 0}}
                onLoad={this.onLoad.bind(this)}
                srcSet={srcSet}
                sizes={sizes}
                width={width}
                src={src}/>
        );
    }
}

TransitionImage.defaultProps = {
    alt: '',
    onLoad: () => {}
};

export default TransitionImage;
