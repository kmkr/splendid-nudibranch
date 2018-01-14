import React from 'react';
import Layout from './layouts/default';

const Index = ({photos, keywords, selectedPhotoKey, year, location}) => (
    <Layout
        photos={photos}
        keywords={keywords}
        year={year}
        location={location}
        selectedPhotoKey={selectedPhotoKey}>
        <div>
            <div id="app">
                <div className="loading-placeholder">
                    <div className="spinner" />
                </div>
            </div>
            <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
                window.snPhotos = ${JSON.stringify(photos)}
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
