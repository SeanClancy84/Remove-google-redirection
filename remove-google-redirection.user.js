// ==UserScript==
// @id             remove-google-redirection
// @name           Remove Google Redirection
// @namespace      http://kodango.com
// @description    Prohibit click-tracking, and prevent url redirection when clicks on the result links in Google search page.
// @version        1.1.0
// @include        http*://www.google.*/
// @include        http*://www.google.*/#hl=*
// @include        http*://www.google.*/search*
// @include        http*://www.google.*/webhp?hl=*
// @include        https://encrypted.google.com/
// @include        https://encrypted.google.com/#hl=*
// @include        https://encrypted.google.com/search*
// @include        https://encrypted.google.com/webhp?hl=*
// @include        http://ipv6.google.com/
// @include        http://ipv6.google.com/search*
// @updateURL      https://github.com/SeanClancy84/Remove-google-redirection/raw/main/remove-google-redirection.user.js
// @icon           https://github.com/dangoakachan/Remove-Google-Redirection/raw/master/extension/firefox/icon.png
// @run-at         document-end
// ==/UserScript==

(function (window) {
    "use strict";

    function injectFunction(func) {
        var ele = document.createElement('script');
        var s = document.getElementsByTagName('script')[0];

        ele.type = 'text/javascript';
        ele.textContent = '(' + func + ')();';

        s.parentNode.insertBefore(ele, s);
    }

    function disableURLRewrite() {
        function inject_init() {
            Object.defineProperty(window, 'rwt', {
                value: function() { return true; },
                writable: false,
                configurable: false
            });
            console.log("Function injected");
        }

        injectFunction(inject_init);
        console.log("URL rewrite function disabled");
    }

    function cleanTheLink(a) {
        if (a.dataset['cleaned'] == 1) {
            return;
        }

        console.log("Attempting to clean link:", a.href);

        var need_clean = false;
        var result = /\/(?:url|imgres).*[&?](?:url|q|imgurl)=([^&]+)/i.exec(a.href);

        console.log("Regex result:", result);

        if (result) {
            need_clean = true;
            a.href = decodeURIComponent(result[1]);
            console.log("Restored original URL:", a.href);
        }

        var val = a.getAttribute('onmousedown') || '';
        console.log("onmousedown attribute value:", val);

        if (val.indexOf('return rwt(') != -1) {
            need_clean = true;
            a.removeAttribute('onmousedown');
        }

        var cls = a.className || '';
        console.log("Link class name:", cls);

        if (cls.indexOf('irc_') != -1) need_clean = true;

        if (need_clean) {
            var clone = a.cloneNode(true);
            a.parentNode.replaceChild(clone, a);
            clone.dataset['cleaned'] = 1;
            console.log("Link cleaned:", clone.href);
        }
    }

    function main() {
        disableURLRewrite();

        document.addEventListener('mouseover', function (event) {
            var a = event.target;

            while (a && a.tagName != 'A')
                a = a.parentNode;

            if (a && a.tagName == 'A') {
                console.log("Mouseover link detected:", a.href);
                cleanTheLink(a);
            }
        }, true);

        document.addEventListener('click', function (event) {
            var a = event.target;

            while (a && a.tagName != 'A')
                a = a.parentNode;

            if (a && a.tagName == 'A') {
                console.log("Click link detected:", a.href);
                cleanTheLink(a);
            }
        }, true);

        console.log("Event listeners added");
    }

    main();
})(window);
