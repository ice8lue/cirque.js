# cirque.js

A small, dependency-free JS lib for drawing circular SVG charts.

<img src="https://cdn.rawgit.com/ice8lue/cirque.js/master/sample.svg" width="400">

## Usage
Add cirque.js to your page's head:

```
<head>
  ...
  <script type="text/javascript" src="./js/cirque.js"></script>
  ...
</head>
```

Setup the chart and append it to the DOM:

```
<script type="text/javascript">
  var c = new Cirque(options);
  document.body.appendChild(c);
</script>

```

## Options

**size:** (Integer, Default: 200)
The size of the viewbox (as SVG can be scaled free).

**data:** (Array, Default: [ ])
An array of data objects like this:
```
{
  percent: 75,     // the percentage to be displayed,
  color: '#123456' // a color for this ring (optional), if no color is set, a shade of grey will be used
}
```

**baseColor:** (String, Default: '#EEEEEE')
The base color used for the lowest chart circle.

**innerColor:** (String, Default: '#FFFFFF')
The color of the top inner circle.

**shadedRings:** (Boolean, Default: true)
If set to true, all rings will have a light background shade. Else, they will be filled with the baceColor.

**roundEndings:** (Boolean, Default: true)
If set to true, all rings will have rounded endings, instead of sharp ones.

## Versions

v1.0: Initial version. Support for round and square endings, colors.
