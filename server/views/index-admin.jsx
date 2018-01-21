const React = require('react')
const Layout = require('./layouts/default')

const Index = ({data, keywords}) => (
  <Layout data={data} keywords={keywords}>
    <div>
      <div id='app'>
        <div className='spinner' />
      </div>
      <script type='text/javascript' dangerouslySetInnerHTML={{__html: `
                window.sn = {
                    data: ${JSON.stringify(data)}
                };
            `}} />
      <script
        type='text/javascript'
        src='/static/scripts/admin-bundle.js'
        async
        charSet='utf-8' />
    </div>
  </Layout>
)

module.exports = Index
