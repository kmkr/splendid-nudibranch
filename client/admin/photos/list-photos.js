/** @jsx h */
import { h, Component } from "./preact";
import arrayMove from "./array-move";
import ListPhoto from "./list-photo";

function orderFunc(photo) {
  return photo.key;
}
class ListPhotos extends Component {
  constructor(props) {
    super();
    this.state = {
      showText: true,
      order: props.photos.map(orderFunc),
    };

    this.toggleText = this.toggleText.bind(this);
    this.handleOrderUpdate = this.handleOrderUpdate.bind(this);
    this.handleSubmitOrderUpdate = this.handleSubmitOrderUpdate.bind(this);
  }

  toggleText() {
    this.setState((oldState) => ({
      showText: !oldState.showText,
    }));
  }

  handleOrderUpdate(photo, newOrder) {
    this.setState((curState) => ({
      order: arrayMove(
        curState.order,
        curState.order.indexOf(photo.key),
        newOrder
      ),
    }));
  }

  handleSubmitOrderUpdate(e) {
    e.preventDefault();
    this.props.onSubmitOrder(
      this.state.order.map((photoKey, index) => ({
        key: photoKey,
        order: index,
      }))
    );
  }

  render({ photos, onDeleteClick }, { order, showText }) {
    return (
      <div className="list-photos-wrapper">
        <button className="submit-order" onClick={this.handleSubmitOrderUpdate}>
          Update order
        </button>
        <label>
          Show text
          <input type="checkbox" checked={showText} onClick={this.toggleText} />
        </label>
        <div className="list-photos">
          {photos
            .sort(
              (p1, p2) =>
                order.indexOf(orderFunc(p1)) - order.indexOf(orderFunc(p2))
            )
            .map((photo, index) => (
              <ListPhoto
                key={photo.key}
                photo={photo}
                order={index}
                onDeleteClick={onDeleteClick}
                onOrderUpdate={this.handleOrderUpdate}
                showText={showText}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default ListPhotos;
