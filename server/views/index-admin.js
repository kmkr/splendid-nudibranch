import React from 'react';
import Layout from './layouts/default';

const Index = ({data, keywords}) => (
    <Layout keywords={keywords}>
        <div>
            <div id="app">
                <div className="spinner" />
            </div>
            <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
                window.sn = {
                    data: ${JSON.stringify(data)}
                };
            `}}>
            </script>
            <script
                type="text/javascript"
                src="/static/scripts/admin-bundle.js"
                charSet="utf-8" />
        </div>
    </Layout>
);

export default Index;
