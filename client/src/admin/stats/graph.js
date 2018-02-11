/** @jsx h */
import { h, Component } from 'preact'
import Chartist from 'chartist'

function parseData(data) {
  return data.reduce((prevVal, curVal) => {
    const ca = new Date(curVal.createdAt)
    const key = [ca.getFullYear(), ca.getMonth() + 1, ca.getDate()].join('-')
    prevVal[key] = (prevVal[key] || 0) + 1
    return prevVal
  }, {})
}

class Graph extends Component {
  componentDidMount() {
    const data = parseData(this.props.data)

    const labels = Object.keys(data)
    const series = [Object.values(data)]

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
