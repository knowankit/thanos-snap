class ThanosSnap extends HTMLElement {
    constructor() {
        super();
        loadCss(this);
        loadJs('html2canvas.js');
        loadJs('chance.js');
        loadJs('jquery.js');
        loadJs('jquery-ui.min.js');
        var span = document.createElement('span');
        span.classList.add('snap');
        span.textContent = "Web content working fine";
        this.appendChild(span)
    }

}

function loadCss(component) {
    const style = document.createElement('link')
    style.setAttribute('rel', 'stylesheet'); 
    style.setAttribute('type', 'text/css');
    style.setAttribute('href', 'thanos-snap.css');
    // component.appendChild(style);
    document.getElementsByTagName('head')[0].appendChild(style)
}

function loadJs(file) {
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src',`script/${file}`)
    document.body.appendChild(script)
}

customElements.define('thanos-snap', ThanosSnap)