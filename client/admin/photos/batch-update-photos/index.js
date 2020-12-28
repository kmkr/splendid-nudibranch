/** @jsx h */
import { h, Component } from "./preact";
import { map } from "./batch-update-mapper";

export default class BatchUpdatePhotos extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
    };
  }

  onSubmit() {
    const mapped = map(this.state.content, this.props.photos);
    this.setState({
      content: "",
    });

    this.props.onSubmit(mapped);
  }

  render() {
    return (
      <div>
        <div>
          <textarea
            value={this.state.content}
            cols="100"
            rows="10"
            onChange={(e) => this.setState({ content: e.target.value })}
          />
        </div>
        <div>
          <button onClick={this.onSubmit.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}
