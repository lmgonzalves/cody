(function () {

    // We need to set a base URL as we are using relative URLs
    var baseUrl = 'https://lmgonzalves.github.io/cody/';

    // The `init` function receive an object with options
    Cody.init({
        target: '.cody-classic',    // Our wrapper this time
        boxesHeight: 225,           // The boxes that will show the code and the result will have a `height = 225px`
        baseUrl: baseUrl,
        css: [
            'css/cody-basic.css',   // Basic styles
            'css/cody-classic.css', // Classic theme
            'css/prism-okaidia.css' // Highlight theme for Prism
        ],
        js: [
            'js/prism.js'           // Highlight library Prism
        ]
    });

    Cody.init({
        target: '.cody-custom',     // Our wrapper this time
        selected: 'html',           // HTML will be the selected tab at the beginning
        tabsSpace: false,           // We don't want space for tabs (because we are positioning it as `absolute` in CSS)
        lineNumbers: true,          // We want line numbers for the code
        // The following are SVG icons to replace the tab titles
        htmlTitle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="devicon"><path d="M9.032 2l10.005 112.093 44.896 12.401 45.02-12.387 10.015-112.107h-109.936zm89.126 26.539l-.627 7.172-.276 3.289h-52.665000000000006l1.257 14h50.156000000000006l-.336 3.471-3.233 36.119-.238 2.27-28.196 7.749v.002l-.034.018-28.177-7.423-1.913-21.206h13.815000000000001l.979 10.919 15.287 4.081h.043v-.546l15.355-3.875 1.604-17.579h-47.698l-3.383-38.117-.329-3.883h68.939l-.33 3.539z"/></svg>',
        cssTitle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="devicon"><path d="M8.76 1l10.055 112.883 45.118 12.58 45.244-12.626 10.063-112.837h-110.48zm89.591 25.862l-3.347 37.605.01.203-.014.467v-.004l-2.378 26.294-.262 2.336-28.36 7.844v.001l-.022.019-28.311-7.888-1.917-21.739h13.883l.985 11.054 15.386 4.17-.004.008v-.002l15.443-4.229 1.632-18.001h-32.282999999999994l-.277-3.043-.631-7.129-.331-3.828h34.748999999999995l1.264-14h-52.926l-.277-3.041-.63-7.131-.332-3.828h69.281l-.331 3.862z"/></svg>',
        jsTitle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="devicon"><path d="M2 1v125h125v-125h-125zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065-.001-10.115.046-20.188.046-30.188h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-11.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z"/></svg>',
        boxesHeight: 225,           // The boxes for code will have `height = 225px`
        resultAlwaysVisible: 200,   // The result will be showed in a different box, always visible and will have `height = 200px`
        baseUrl: baseUrl,
        css: [
            'css/cody-basic.css',           // Basic styles
            'css/cody-modern.css',          // Modern theme (tabs with position `absolute`, etc.)
            'css/prism.css',                // Default highlight theme for Prism
            'css/prism-line-numbers.css',   // Prism styles for plugin line numbers
            // Some additional styles for the SVG icons. Yes, you can put code here, not only links!
            '.devicon{height:21px;margin-top:7px}.devicon path{fill:rgba(255,255,255,0.9)}'
        ],
        js: [
            'js/prism.js',                  // Highlight library Prism
            'js/prism-line-numbers.min.js'  // Prism plugin to get line numbers
        ]
    });

    Cody.init({
        target: '.cody-nexus',      // Our wrapper this time
        tabsVisible: false,         // We don't need tabs this time, we just want to show the selected one (HTML by default)
        boxesHeight: 400,           // The box will have `height = 400px`
        baseUrl: baseUrl,
        css: ['css/cody-basic.css'] // We just need the basic styles
    });

})();
