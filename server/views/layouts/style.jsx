import React from 'react';

const styles = `
.spinner {
    width: 70px;
    height: 70px;
    background-color: #333;
    margin: 0 auto;

    border-radius: 100%;
    -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
    animation: sk-scaleout 1.0s infinite ease-in-out;
}

#app > .spinner {
    margin-top: 100px;
}

@-webkit-keyframes sk-scaleout {
    0% { -webkit-transform: scale(0) }
    100% {
        -webkit-transform: scale(1.0);
        opacity: 0;
    }
}

@keyframes sk-scaleout {
    0% {
        -webkit-transform: scale(0);
        transform: scale(0);
    } 100% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
        opacity: 0;
    }
}

#app > .loading-placeholder {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #dea392;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}`.replace(/\s{2,}/g, '').replace(/\n/g, '');

const Style = () => (
    <style dangerouslySetInnerHTML={{__html: styles}} />
);

export default Style;
