# Cody

A library to embed demos for front-end developers. It has no dependencies and it's fully customizable.

[**DEMO**](http://lmgonzalves.github.io/cody/)

## Install

You can install Cody using `npm` or just downloading it manually.

### NPM

npm install cody.js

## Basic usage

### 1. Include the Cody `scripts` and `styles`.

```html
<link rel="stylesheet" href="css/cody.css">
<script src="js/cody.js"></script>
```

### 2. Setup the code in the HTML.

The structure should be as follows:

- A wrapper: `.cody` is default class used to apply basic styles.
- An HTML element for each language needed (`.html`, `.css` and/or `.js`): Can be any type of HTML tag, but I recommend `code` (if you only want to link files) or `textarea` (if you want to put the code directly inside).

```html
<div class="cody">
    <!-- Attribute [data-code]:   Code that you want to show. -->
    <!-- Attribute [data-assets]: Code that you don't want to show, but needed in execution. Useful for external libraries and dependencies. -->
    <!-- You can link as many `code` or `assets` as needed separated by comma. -->
    <code class="html" data-code="demo.html"></code>
    <code class="css" data-assets="css/normalize.css" data-code="css/demo.css"></code>
    <code class="js" data-assets="js/segment.min.js, js/d3-ease.v0.6.min.js" data-code="js/demo.js"></code>
</div>
```

**Or you can easily include a Codepen demo:**

```html
<!-- Attribute [data-pen]: The URL of the desired pen. -->
<div class="cody" data-pen="http://codepen.io/lmgonzalves/pen/vLaXNR"></div>
```

Note that in case the pen have external dependencies, you need to include them too as follows:

```html
<!-- Attribute [data-css-assets]: External CSS dependencies. -->
<!-- Attribute [data-js-assets]:  External JS dependencies. -->
<div class="cody"
     data-pen="http://codepen.io/lmgonzalves/pen/JbeQKG"
     data-css-assets="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css"
     data-js-assets="https://cdnjs.cloudflare.com/ajax/libs/segment-js/1.0.3/segment.min.js, https://d3js.org/d3-ease.v0.6.min.js"
></div>
```

### 3. Initialize it in JavaScript.

```js
// The `init` function receive an object with options. See details below.
Cody.init({
    boxesHeight: 400,
    css: ['css/cody-basic.css']
});
```

## Options

The `options` should be passed to the `init` function in object notation. Here is the complete list, for reference:

| Name                    | Type                    | Default                                                              | Description |
|-------------------------|-------------------------|----------------------------------------------------------------------|-------------|
|`target`                 | String                  | `'.cody'`                                                            | CSS selector to initialize all matched elements. |
|`boxesHeight`            | Float                   | `145`                                                                | Height (in pixels) for the boxes that will show the code and the result. |
|`tabsHeight`             | Float                   | `35`                                                                 | Height (in pixels) for the tabs. |
|`tabsVisible`            | Boolean                 | `true`                                                               | Choose if you want to show the tabs or not. |
|`tabsSpace`              | Boolean                 | `true`                                                               | If `true`, the space for tabs will be reserved. Set it to `false` if you want to set the tabs to `position: absolute` or something like that. |
|`tabs`                   | String                  | `'html, css, js, result'`                                            | Tabs you want to show separated by comma. |
|`selected`               | String                  | `'result'`                                                           | Tab that will be selected initially. |
|`htmlTitle`              | String                  | `'HTML'`                                                             | Title for HTML tab. |
|`cssTitle`               | String                  | `'CSS'`                                                              | Title for CSS tab. |
|`jsTitle`                | String                  | `'JS'`                                                               | Title for JS tab. |
|`resultTitle`            | String                  | `'Result'`                                                           | Title for Result tab. |
|`lineNumbers`            | Boolean                 | `false`                                                              | Choose if you want to show line numbers or not using Prism. |
|`resultAlwaysVisible`    | Boolean or Float        | `false`                                                              | If true, the Result will be showed in a separate box and always visible. Define it as a float value to specify a different height (in pixels) for this box. |
|`loading`                | String                  | `'<div class="cody-loading"><div class="spinner"></div></div>'`       | HTML code for the loading indicator. |
|`css`                    | Array                   | `undefined`                                                          | Array of String values representing links to CSS files, or code directly, that you want to inject in the Cody `iframe`. Here you need to link at least `cody-basic.css` (basic theme styles), and one of the themes available (`cody-classic.css` or `cody-ligth.css`). You also need to provide the styles for the highlight system you prefer, such as Prism. And of course, here you can provide your own styles as well, and customize it as much as you like. |
|`js`                     | Array                   | `undefined`                                                          | Array of String values representing links to JS files, or code directly, that you want to inject in the Cody `iframe`. Here you may only need to provide the scripts for the highlight system. And just like styles, you can also provide your own scripts. |
|`baseUrl`                | String                  | `''`                                                                 | String to be used as base URL for all links, allowing you to use relative URLs. |

### Overriding options

Another way to specify options is in the HTML. You can override any option you like setting it as `data-*`, and in "dash-case" instead "camelCase". For example, if you want to override the `resultTitle` option, you need something like this:

```html
<div class="cody" data-result-title="The new result title">
    <!-- CODE HERE -->
</div>
```