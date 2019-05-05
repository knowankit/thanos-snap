# thanos-snap
A custom web component  to make your html element disappear with one snap of thanos. But unlike thanos power, this componentdoes not bring back the dead. Use it wisely. :)

![Hover gif](https://github.com/knowankit/thanos-snap/blob/master/thanos-hand.gif)
## Installation
### Install via npm:

`$ npm install thanos-snap`

## Usage
To use thanos-snap in your website, just add the `thanos.min.js` into your document's `<head>`. That's it! You've thanos power now. Please use it wisely.

Add the custom component tag, give the `id` of the `object` and of the `weapon`. 
For example:

`<thanos-snap object='iron-man' weapon='thumb'> </thanos-snap>`

In the above component `iron-man` and `thumb` are id given to the `div` and the `button` respectively.

```html
<div id='iron-man' class="iron-man mt-4">
    <img src="iron-man.png" />
</div>
<button id='thumb'>Snap</button>
```

### Adding js file to your page
```html
<script src="thanos.min.js"></script>
```

or use a CDN version by [jsDelivr](https://cdn.jsdelivr.net/npm/thanos-snap/thanos.min.js)

**You need to add the css as well to make pixel effect work properly**
```css
.dust {
    position: absolute;
  }
  * {
      margin: 0px;
      overflow-x: hidden;
  }
.iron-man {
    display: inline-block;
}
You can rename the `.iron man` class with the one which you gave in the component. 
```

## Dependencies
`html2canvas`
`chance`
`jQuery`
`jQueryUi`

Add the scripts in sequential manner as per the above list.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
```

Add the scripts present in scripts folder after doing npm install

```html
<script type="text/javascript" src="scripts/html2canvas.js"></script>
<script type="text/javascript" src="scripts/chance.js"></script>
```

## Demo

[Click here](https://thanos.knowankit.com/)