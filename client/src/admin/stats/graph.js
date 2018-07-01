/** @jsx h */
import { h, Component } from 'preact'
import Chartist from 'chartist'

function parseData(data) {
  return data.reduce((prevVal, curVal) => {
    const ca = new Date(curVal.createdAt)
    const dateKey = [ca.getFullYear(), ca.getMonth() + 1, ca.getDate()].join(
      '-'
    )
    const newObj = prevVal[dateKey] || {
      bots: 0,
      humans: 0
    }
    const valueKey = curVal.isBot ? 'bots' : 'humans'
    newObj[valueKey] = newObj[valueKey] + 1
    prevVal[dateKey] = newObj
    return prevVal
  }, {})
}

class Graph extends Component {
  componentDidMount() {
    this.updateGraph()
  }

  componentDidUpdate() {
    this.updateGraph()
  }

  updateGraph() {
    const data = parseData(this.props.data)

    const labels = Object.keys(data)
    const hits = Object.values(data)
    const series = [hits.map(h => h.bots), hits.map(h => h.humans)]

    new Chartist.Line(
      '#graph',
      {
        labels,
        series
      },
      {
        fullWidth: true,
        chartPadding: {
          right: 40
        }
      }
    )
  }

  render() {
    return <div id="graph" />
  }
}

export default Graph
