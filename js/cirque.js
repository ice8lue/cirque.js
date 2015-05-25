/**
 * CIRQUE.js
 * by Frank Adler
 * v1.0
 */

'use strict';

var Cirque = function(options) {
  options = (options && typeof options === 'object') ? options : {};

  this.options ={
    size: options.size || 200,
    data: options.data || [],
    baseColor: options.baseColor || '#EEEEEE',
    innerColor: options.innerColor || '#FFFFFF',
    roundEndings: options.roundEndings !== undefined && options.roundEndings !== null ? options.roundEndings : true
  }; 

  this.element = this._createEl( 'svg', {
                  'viewBox': '0 0 ' + this.options.size + ' ' + this.options.size,
                  //'width': this.options.size,
                  //'height': this.options.size
                 });

  this.radius = this.options.size / 2;

  this.center = {
    x: this.radius,
    y: this.radius
  };

  this._renderChart(this.options.data);

  return this.element;
};

Cirque.prototype = {

  _createEl: function(type, parameters, appendTo) {
    if (!type) { return; }

    var element = document.createElementNS('http://www.w3.org/2000/svg', type);

    if (parameters && typeof parameters === 'object') {
      for (var key in parameters) {
        element.setAttribute(key, parameters[key]);
      }
    }

    if (appendTo) {
      appendTo.appendChild(element);
    }

    return element;
  },

  _renderChart: function(data) {
    this.options.strokeWidth = (this.radius / 2) / data.length;

    var shade, lightShade;

    for (var i = 0; i < data.length; i++) {
      if (!data[i].color) {
        shade = Math.round((250/data.length) * i + 5);
        shade = 'rgb(' + shade + ',' + shade + ',' + shade + ')';
      }

      lightShade = Math.round(250 - (data.length - i) * 10);
      lightShade = 'rgb(' + lightShade + ',' + lightShade + ',' + lightShade + ')';

      this._renderPath(data[i].percent, this.radius - (this.options.strokeWidth * i), data[i].color || shade, lightShade);
    };

    this._createEl('circle', {
      cx: this.center.x,
      cy: this.center.y,
      r: this.radius / 2,
      fill: this.options.innerColor
    }, this.element);
  },

  _getCoordinates: function(radius, angle) {
    var radians = (angle - 90) * Math.PI / 180.0;

    return {
      x: this.center.x + (radius * Math.cos(radians)),
      y: this.center.y + (radius * Math.sin(radians))
    };
  },

  _renderPath: function(percent, radius, color, shade) {

    // First, render the colored base circle.

    this._createEl('circle', {
      cx: this.center.x,
      cy: this.center.y,
      r: radius,
      fill: shade
    }, this.element);

    // To make round endings start and end at the correct positions/angles, we need to know,
    // how far we need to alter the angles. Fist, calculate the positions for zero and one degrees.
    var start = this._getCoordinates(radius, 0),
        one = this._getCoordinates(radius, 1);

    // Next, calculate the distance between both of them and get the angular representation of 1px.    

    var diff = Math.sqrt(Math.pow(one.x - start.x, 2) + Math.pow(one.y - start.y, 2));
        diff = (1 / diff) * (this.options.strokeWidth/2);

    // Got it. Now calculate the starting position.

    start = this._getCoordinates(radius, this.options.roundEndings ? diff : 0);

    // Now, calculate the angular representation of the percentage given and get the corresponding coordinates.

    var alpha = percent * 3.6;
    var end = this._getCoordinates(radius, alpha - (this.options.roundEndings ? diff : 0));

    // Determine if the arc should be drawn clockwise or counter-clockwise.

    var sweep = alpha - 90 <= 90 ? "0" : "1";

    var d = [
        "M", this.center.x, this.center.y, 
        "L", start.x, start.y,
        "A", radius, radius, 0, sweep, 1, end.x, end.y
    ].join(" ");

    this._createEl('path', {
      d: d,
      fill: color
    }, this.element);

    // If roundEndings is set, draw small colored circles to the start and end points with half strokewidth radius.
    if (this.options.roundEndings) {
      var startOrb = this._getCoordinates(radius - this.options.strokeWidth/2, diff),
          endOrb = this._getCoordinates(radius - this.options.strokeWidth/2, alpha - diff);

      this._createEl('circle', {
        cx: startOrb.x,
        cy: startOrb.y,
        r: this.options.strokeWidth/2,
        fill: color
      }, this.element);

      this._createEl('circle', {
        cx: endOrb.x,
        cy: endOrb.y,
        r: this.options.strokeWidth/2,
        fill: color
      }, this.element);
    }
  }

};