import React from 'react';

const License = () => (
    <div dangerouslySetInnerHTML={{__html: `<!--
                                        __              __
                                       /  |            |  \\
                                       \\  \\            /  /
                                        \\  \\          /  /
                                         \\  \\        /  /
                                          \\  \\      /  /
                                           \\  \\____/  /
                                        ___/          \\___
                                       /                  \\
                                      ´                    \`
                                      |____________________|

   Hi, and welcome!

   The entire source code for this site can be found on https://github.com/kmkr/splendid-nudibranch

   Content found on The Splendid Nudibranch (photos and text) is licensed under a
   Creative Commons Attribution-ShareAlike 4.0 International License. If you don't mind, please
   contact me if you use any of this. You can use krismikael <at> protonmail <dot> com
   -->

    <div style="display: none">
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
            <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" />
        </a>
        <span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">The Splendid Nudibranch</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.thesplendidnudibranch.pink" property="cc:attributionName" rel="cc:attributionURL">Kris Mikael Krister</a>
            is licensed under a
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
    </div>
       `}}/>
);

export default License;
