import React from 'react';

const Style = () => (
    <style dangerouslySetInnerHTML={{__html: `
        .spinner {
            width: 40px;
            height: 40px;
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
    `}} />
);

export default Style;
