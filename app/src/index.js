(function () {
    
    function setElementHeight(className, height) {
        var elm = document.getElementsByClassName(className)[0];
        elm.style.height = `${height}px`;
    }
    
    function resize() {
        var height = window.innerHeight;
        setElementHeight("menu", height);
        setElementHeight("panel", height);
    }
    
    window.onresize = resize;
    resize();
    
})();