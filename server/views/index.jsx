import React from 'react';
import Layout from './layouts/default';

const Index = ({data, keywords, selectedPhotoKey}) => (
    <Layout
        data={data}
        keywords={keywords}
        selectedPhotoKey={selectedPhotoKey}>
        <div>
            <div id="app">
                <div className="loading-placeholder">
                    <div className="spinner" />
                </div>
            </div>
            <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
                window.sn = {
                    data: ${JSON.stringify(data)}
                };
            `}}>
            </script>
            <script
                type="text/javascript"
                src="/static/scripts/bundle.js"
                async
                charSet="utf-8" />
        </div>
    </Layout>
);

export default Index;
