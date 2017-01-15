(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Cody = factory();
    }
}(this, function () {

    // Utils

    var is = {
        arr: function(a) { return Array.isArray(a) },
        str: function(a) { return typeof a === 'string' },
        und: function(a) { return typeof a === 'undefined' },
        num: function(a) { return !isNaN(parseFloat(a)) },
        sta: function(a, b) { return a.substr(0, b.length) === b },
        end: function(a, b) { return a.substr(-b.length) === b },
        ast: function(a) { return is.str(a) && (is.end(a, '.html') || is.end(a, '.css') || is.end(a, '.js')) }
    };

    function capitalize(s){
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    function splitStr(str) {
        return str.split(',').map(function (item) {
            return item.trim();
        });
    }

    function pushArray(arr, arr2) {
        arr.push.apply(arr, arr2);
    }

    function extendSingle(target, source) {
        for (var key in source)
            target[key] = is.arr(source[key]) ? source[key].slice(0) : source[key];
        return target;
    }

    function extend(target, source) {
        if (!target) target = {};
        for (var i = 1; i < arguments.length; i++)
            extendSingle(target, arguments[i]);
        return target;
    }

    function createElement(tag, clas, id, root) {
        var el = document.createElement(tag);
        if (is.str(clas)) el.className = clas;
        if (is.str(id)) el.id = id;
        if (!is.und(root)) root.appendChild(el);
        return el;
    }

    function createCountDown(callback) {
        return {
            count: 0,
            async: false,
            add: function () {
                this.count++;
                this.async = true;
            },
            check: function () {
                if (--this.count == 0) callback();
            }
        };
    }

    function getAsync(url, callback, countDown) {
        if (countDown) countDown.add();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                callback(xhr.status === 200 ? xhr.responseText : '');
                if (countDown) countDown.check();
            }
        };
        xhr.send();
    }

    function $(selector, root) {
        if (!root) root = document;
        return root.querySelector(selector);
    }

    function addClass(el, clas) {
        el.classList.add(clas);
    }

    function removeClass(el, clas) {
        el.classList.remove(clas);
    }

    function camelCase(str) {
        return str.replace(/-([a-z])/g, function (m, w) {
            return w.toUpperCase();
        });
    }

    function getData(el) {
        return el.dataset || [].slice.call(el.attributes).reduce(function (o, a) {
            return /^data-/.test(a.name) && (o[camelCase(a.name.substr(5))] = a.value), o;
        }, {});
    }

    function parseData(dataset) {
        var data = {}, item;
        for (var key in dataset) {
            item = dataset[key];
            data[key] = is.num(item) ? parseFloat(item) : item;
        }
        return data;
    }


    // Cody

    var defaults = {
        target: '.cody',
        boxesHeight: 145,
        tabsHeight: 35,
        tabsVisible: true,
        tabsSpace: true,
        tabs: 'html, css, js, result',
        selected: 'result',
        lineNumbers: false,
        resultAlwaysVisible: false,
        loading: '<div class="cody-loading"><div class="spinner"></div></div>',
        baseUrl: ''
    };

    function init(options) {
        var o = extend({}, defaults, options);
        var all = document.querySelectorAll(o.target);
        var cody;
        for (var i = 0; i < all.length; i++) {
            cody = all[i];
            populate(cody, extend(o, parseData(getData(cody))));
        }
    }

    function populate(cody, o) {
        var resultAlwaysVisible = o.resultAlwaysVisible;
        var resultHeight = is.num(resultAlwaysVisible) ? resultAlwaysVisible : o.boxesHeight;
        var codyHeight = o.boxesHeight;
        if (o.tabsVisible && o.tabsSpace) codyHeight += o.tabsHeight;
        if (resultAlwaysVisible) codyHeight += resultHeight;
        cody.style.height = codyHeight + 'px';
        setupLoading(cody, o);
        var tabsNamesAll = ['html', 'css', 'js', 'result'];
        var tabsNames = splitStr(o.tabs);
        if (resultAlwaysVisible && o.selected === 'result') o.selected = tabsNames[0];
        var tabItems = {}, name, el, code, item;

        function insert() {
            var rootIframe = createIframe('cody-container', cody, extend(o, {height: codyHeight + 'px'}));
            var wrapper = rootIframe.contentWindow.document.body;
            if (resultAlwaysVisible) {
                addClass(wrapper, 'result-always-visible');
            }

            var tabs = createElement('div', 0, 'tabs', wrapper);
            var boxes = createElement('div', 0, 'boxes', wrapper);
            var tabsHeight = o.tabsVisible ? o.tabsHeight + 'px' : 0;
            var boxesHeight = o.boxesHeight + 'px';
            tabs.style.height = tabsHeight;
            tabs.style.lineHeight = tabsHeight;
            boxes.style.height = boxesHeight;

            var tabOptions = extend({}, o, tabItems, {tabs: tabs, boxes: boxes, height: resultHeight + 'px'});
            for (var key in tabItems) {
                if (~tabsNames.indexOf(key)) {
                    createTab(key, tabItems[key], tabOptions);
                }
            }

            var wrapperWindow = rootIframe.contentWindow;
            if (wrapperWindow.Prism) wrapperWindow.Prism.highlightAll();

            removeLoading(o);
        }

        var asyncCountDown = createCountDown(insert);
        for (var i = 0; i < tabsNamesAll.length; i++) {
            name = tabsNamesAll[i];
            el = $('.' + name, cody);
            item = {el: el};
            if (el) {
                code = el.getAttribute('data-code');
                if (code) {
                    (function(item) {
                        getAsync((is.sta(code, 'http') ? '' : o.baseUrl) + code, function (content) {
                            item.code = content;
                        }, asyncCountDown);
                    })(item);
                } else {
                    item.code = el.value || '';
                }
            } else if (o.pen && name !== 'result') {
                (function(item) {
                    getAsync(o.pen + '.' + name, function (content) {
                        item.code = item.el = content;
                    }, asyncCountDown);
                })(item);
            } else {
                item.code = '';
            }
            tabItems[name] = item;
        }
        if (!asyncCountDown.async) insert();
    }

    function setupLoading(cody, o) {
        if (o.loading) {
            cody.insertAdjacentHTML('afterbegin', o.loading);
            var loading = $('.cody-loading', cody);
            addClass(loading, 'cody-loading-visible');
            o.loading = loading;
        }
    }

    function removeLoading(o) {
        var loading = o.loading;
        if (loading) {
            removeClass(loading, 'cody-loading-visible');
        }
    }

    function addCode(value, box, key, o) {
        var text = document.createTextNode(value);
        var preClass = o.lineNumbers ? 'highlight line-numbers' : 'highlight';
        var pre = createElement('pre', preClass, 0, box);
        var code = createElement('code', 'language-' + key, 0, pre);
        code.appendChild(text);
    }

    function createTab(key, item, o) {
        var isSelected = key === o.selected;
        var isResult = key === 'result';
        var resultAlwaysVisible = o.resultAlwaysVisible;
        if (isSelected || o.tabsVisible || (isResult || resultAlwaysVisible)) {
            var box = createElement('div', 'box', key, o.boxes);
            if (o.tabsVisible && (!isResult || !resultAlwaysVisible)) {
                var tab = createElement('a', 'tab', 'tab-' + key, o.tabs);
                tab.innerHTML = o[key + 'Title'] || (isResult ? capitalize(key) : key.toUpperCase());
                tab.href = '#' + key;
            }
            if (isResult) {
                box.style.height = o.height;
                createIframe('cody-result', box, o);
            } else {
                addCode(item.code, box, key, o);
            }
            if (isSelected) {
                if (o.tabsVisible && tab) addClass(tab, 'tab-active');
                addClass(box, 'box-active');
            }
            if (o.tabsVisible && tab) initTabEvents(tab, box, o);
        }
    }

    function initTabEvents(tab, box, o) {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            removeClass($('.tab-active', o.tabs), 'tab-active');
            removeClass($('.box-active', o.boxes), 'box-active');
            addClass(tab, 'tab-active');
            addClass(box, 'box-active');
        });
    }

    function formatCode(lang, str, baseUrl) {
        switch (lang) {
            case 'html':
                return str;
            case 'css':
                return is.ast(str) ? '<link rel="stylesheet" href="' + (is.sta(str, 'http') ? '' : baseUrl) + str + '">' : '<style>' + str + '</style>';
            case 'js':
                return is.ast(str) ? '<script src="' + (is.sta(str, 'http') ? '' : baseUrl) + str + '"></script>' : '<script>' + str + '</script>';
            default:
                return '';
        }
    }

    function getCode(lang, o) {
        var item, el, assets, output = '', arr;
        item = o[lang];
        if (is.arr(item)) {
            arr = item;
        } else {
            arr = is.und(item) ? [] : [item.el];
        }
        // Global assets
        assets = o[lang + 'Assets'];
        if (assets) {
            var newArr = [];
            pushArray(newArr, splitStr(assets));
            pushArray(newArr, arr);
            arr = newArr;
        }
        while (arr.length) {
            el = arr.shift();
            if (is.str(el)) {
                output += formatCode(lang, el, o.baseUrl);
            } else if (el) {
                arr = [];
                assets = el.getAttribute('data-assets');
                if (assets) {
                    pushArray(arr, splitStr(assets));
                }
                if (item.code) arr.push(item.code);
            }
        }
        return output;
    }

    function createIframe(clas, root, o) {
        var html = getCode('html', o);
        var css = getCode('css', o);
        var js = getCode('js', o);
        var content = '<!DOCTYPE html>' + '<html><head>' + css + '</head><body>' + html + js + '</body></html>';
        var iframe = createElement('iframe', clas, 0, root);
        iframe.width = '100%';
        iframe.height = o.height;
        iframe.src = 'about:blank';
        iframe.style.overflow = 'hidden';
        iframe.setAttribute('frameborder', '0');
        iframe.contentWindow.document.open('text/html', 'replace');
        iframe.contentWindow.document.write(content);
        iframe.contentWindow.document.close();
        return iframe;
    }

    return {
        init: init
    };

}));
