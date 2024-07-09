// ==UserScript==
// @id             Remove Data Attributes
// @name           Remove Data Attributes
// @namespace      https://github.com/SeanClancy84/Remove-google-redirection
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
// @icon           https://github.com/SeanClancy84/Remove-google-redirection/raw/main/favicon.png
// @run-at         document-end
// ==/UserScript==

        const aTags = document.querySelectorAll('a');

        // Loop through all <a> tags
        aTags.forEach(a => {
            // Remove data-ved attribute if it exists
            if (a.hasAttribute('data-ved')) {
                a.removeAttribute('data-ved');
            }

            // Remove data-sb attribute if it exists
            if (a.hasAttribute('data-sb')) {
                a.removeAttribute('data-sb');
            }
        });

