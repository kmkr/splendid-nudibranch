/** @jsx h */
import { h, Component } from 'preact'
import Chartist from 'chartist'
import moment from 'moment'

function parseData(data) {
  const withDates = data.map(entry => ({
    ...entry,
    createdAt: new Date(entry.createdAt)
  }))

  const bots = withDates.map(entry => ({
    x: entry.createdAt,
    y: entry.isBot ? 1 : 0
  }))

  const humans = withDates.map(entry => ({
    x: entry.createdAt,
    y: entry.isBot ? 0 : 1
  }))

  return [
    {
      name: 'Bots',
      data: bots
    },
    {
      name: 'Humans',
      data: humans
    }
  ]
}

class Graph extends Component {
  componentDidMount() {
    const data = parseData(this.props.data)

    console.log(data)
    new Chartist.Line(
      '#graph',
      {
        series: data
      },
      {
        axisX: {
          type: Chartist.FixedScaleAxis,
          divisor: 5,
          labelInterpolationFnc: function(value) {
            return moment(value).format('MMM D')
          }
        },
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
