/** @jsx h */
import { h, Component } from "./preact";

import Authenticator from "../authenticator";
import snFetch from "../fetch";
import Graph from "./graph";

function changeDays(date, numDays) {
  var d = new Date(date);
  d.setDate(d.getDate() + numDays);
  d.setHours(0, 0, 0);
  d.setMilliseconds(0);
  return d;
}

function pad(num) {
  if (num < 9) {
    return `0${num}`;
  }

  return num;
}

function dateToStr(date) {
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join("-");
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      fromDate: changeDays(new Date(), -7),
      token: "",
      toDate: changeDays(new Date(), +1),
      stats: [],
    };

    this.onSetToken = this.onSetToken.bind(this);
    this.getStats = this.getStats.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getStats();
  }

  componentWillMount() {
    snFetch.addHeaderRequestInterceptor(() => ({
      "x-auth": this.state.token,
    }));
  }

  onSetToken(token) {
    this.setState({ token });
  }

  getStats() {
    const { fromDate, toDate } = this.state;
    if (!this.state.fromDate || !this.state.toDate) {
      return;
    }

    const url = `/stats?fromDate=${fromDate.getTime()}&toDate=${toDate.getTime()}`;
    snFetch
      .get(url)
      .then((stats) => stats.json())
      .then((stats) =>
        this.setState({
          stats,
        })
      );
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: new Date(e.target.value),
      },
      () => this.getStats()
    );
  }

  render() {
    const { fromDate, stats, toDate } = this.state;
    return (
      <div>
        <Authenticator onSetToken={this.onSetToken} />
        <form>
          <label>
            From date{" "}
            <input
              name="fromDate"
              type="date"
              onChange={this.handleChange}
              value={dateToStr(fromDate)}
            />
          </label>
          <label>
            To date{" "}
            <input
              name="toDate"
              type="date"
              onChange={this.handleChange}
              value={dateToStr(toDate)}
            />
          </label>
        </form>
        {!!stats.length && <Graph data={stats} />}
      </div>
    );
  }
}

export default App;
