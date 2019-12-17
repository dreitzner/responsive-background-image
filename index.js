'use strict';
(function (window, document) {
    function _handleElements(elements) {
        elements.forEach(function (element) {
            function update() {
                var src = typeof img.currentSrc !== 'undefined' ? img.currentSrc : img.src;
                if (curSrc !== src) {
                    curSrc = src;
                    element.style.backgroundImage = 'url(' + curSrc.replace('images', 'assets') + ')';
                }
            };
            var curSrc;
            var img = element.querySelector('img');
            img.addEventListener('load', update);
            if (img.complete) update();
        });
    }
    function addResponsiveBackground() {
        var elements = document.querySelectorAll('[data-responsive-background]');
        _handleElements(elements);
        window.removeEventListener('load', addResponsiveBackground);
    };
    window.addEventListener('load', addResponsiveBackground);

    function applyToSelector(ev) {
        if (!ev.detail) return;
        var selector = '[data-responsive-background=' + ev.detail + ']';
        var elements = document.querySelectorAll(selector);
        _handleElements(elements);
    }
    window.addEventListener('responsive-background', applyToSelector);
}(window, document));
