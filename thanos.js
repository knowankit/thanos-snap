class ThanosSnap extends HTMLElement {
    constructor() {
        super();
        
    }
    connectedCallback() {
        loadCss(this);
        loadExternal(['html2canvas.js', 'chance.js']).then(() => {
            let weapon = this.hasAttribute('weapon') ? this.getAttribute('weapon') : false
            let object = this.hasAttribute('object') ? this.getAttribute('object') : false
            if(weapon && object) {  
                initial(object, weapon);
        }
        });
}
}
customElements.define('thanos-snap', ThanosSnap)

function loadCss(file) {
    const style = document.createElement('link')
    style.setAttribute('rel', 'stylesheet'); 
    style.setAttribute('type', 'text/css');
    style.setAttribute('href', 'thanos-snap.css');
    // component.appendChild(style);
    document.getElementsByTagName('head')[0].appendChild(style)
}

function loadExternal(files) {
    console.log(files)
    const promises = files.map(x => {
        return createPromise(x)
    })
    return Promise.all(promises)
}
 
function createPromise(item) {
    const promise = new Promise((resolve, reject) => {
        const script = createScript(item);
        document.body.appendChild(script);
        if(script) {
            resolve('loaded');
        } else {
            reject('failed to load');
        }
    })
    return promise;
}

function createScript(file) {
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', `scripts/${file}`)

    return script;
}

function weightedRandomDistrib(peak, canvasCount) {
    var prob = [], seq = [];
    for (let i = 0; i < canvasCount; i++) {
        prob.push(Math.pow(canvasCount - Math.abs(peak - i), 3));
        seq.push(i);
    }
    return chance.weighted(seq, prob);
}
function animateBlur(elem, radius, duration) {
    var r = 0;
    $({ rad: 0 }).animate({ rad: radius }, {
        duration: duration,
        easing: "easeOutQuad",
        step: function (now) {
            elem.css({
                filter: 'blur(' + now + 'px)'
            });
        }
    });
}
function animateTransform(elem, sx, sy, angle, duration) {
    var td = tx = ty = 0;
    $({ x: 0, y: 0, deg: 0 }).animate({ x: sx, y: sy, deg: angle }, {
        duration: duration,
        easing: "easeInQuad",
        step: function (now, fx) {
            if (fx.prop == "x")
                tx = now;
            else if (fx.prop == "y")
                ty = now;
            else if (fx.prop == "deg")
                td = now;
            elem.css({
                transform: 'rotate(' + td + 'deg)' + 'translate(' + tx + 'px,' + ty + 'px)'
            });
        }
    });
}
function createBlankImageData(imageData, canvasCount, imageDataArray) {
    for (let i = 0; i < canvasCount; i++) {
        let arr = new Uint8ClampedArray(imageData.data);
        for (let j = 0; j < arr.length; j++) {
            arr[j] = 0;
        }
        imageDataArray.push(arr);
    }
}
function newCanvasFromImageData(imageDataArray, w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    tempCtx = canvas.getContext("2d");
    tempCtx.putImageData(new ImageData(imageDataArray, w, h), 0, 0);

    return canvas;
}

function initial(id, buttonId) {
    var imageDataArray = [];
    var canvasCount = 35;
    
   
    $(`#${buttonId}`).click(function () {
        
        html2canvas($(`#${id}`)[0]).then(canvas => {
            //capture all div data as image
            ctx = canvas.getContext("2d");
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var pixelArr = imageData.data;
            createBlankImageData(imageData, canvasCount, imageDataArray);
            //put pixel info to imageDataArray (Weighted Distributed)
            for (let i = 0; i < pixelArr.length; i += 4) {
                //find the highest probability canvas the pixel should be in
                let p = Math.floor((i / pixelArr.length) * canvasCount);
                let a = imageDataArray[weightedRandomDistrib(p, canvasCount)];
                a[i] = pixelArr[i];
                a[i + 1] = pixelArr[i + 1];
                a[i + 2] = pixelArr[i + 2];
                a[i + 3] = pixelArr[i + 3];
            }
            const div = document.querySelector(`#${id}`)
            let height = div.clientHeight;
            let width = div.clientWidth
            div.innerHTML = ''
            div.style.height = `${height}px`;
            div.style.width = `${width}px`;
            div.classList.add('iron-man');
            //create canvas for each imageData and append to target element
            for (let i = 0; i < canvasCount; i++) {
                let c = newCanvasFromImageData(imageDataArray[i], canvas.width, canvas.height);
                c.classList.add("dust");
                div.appendChild(c);
                //   c.classList.add('content');
                //   $("body").append(c);
            }
            //clear all children except the canvas
            $(`#${id}`).children().not(".dust").fadeOut(5000);
            //apply animation
            $(".dust").each(function (index) {
                animateBlur($(this), 0.8, 800);
                setTimeout(() => {
                    animateTransform($(this), 100, -100, chance.integer({ min: -15, max: 15 }), 800 + (110 * index));
                }, 70 * index);
                //remove the canvas from DOM tree when faded
                $(this).delay(70 * index).fadeOut((110 * index) + 800, "easeInQuint", () => { $(this).remove(); });
            });
        });
    });
}

