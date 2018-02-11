/** @jsx h */
import { h, Component } from 'preact'

import Authenticator from '../authenticator'
import snFetch from '../fetch'
import Graph from './graph'

class App extends Component {
  constructor() {
    super()
    this.state = {
      token: '',
      stats: []
    }

    this.onSetToken = this.onSetToken.bind(this)
    this.getStats = this.getStats.bind(this)
  }
  componentWillMount() {
    snFetch.addHeaderRequestInterceptor(() => ({
      'x-auth': this.state.token
    }))
  }

  onSetToken(token) {
    this.setState({ token })
  }

  getStats() {
    snFetch
      .get('/stats')
      .then(stats => stats.json())
      .then(stats =>
        this.setState({
          stats
        })
      )
  }

  render() {
    const { stats } = this.state
    return (
      <div>
        <Authenticator onSetToken={this.onSetToken} />
        <button onClick={this.getStats}>Fetch</button>

        {!!stats.length && <Graph data={stats} />}
      </div>
    )
  }
}

export default App
