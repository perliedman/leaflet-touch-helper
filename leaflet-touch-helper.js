!(function() {
    L.Path.TouchHelper = L[L.Layer ? 'Layer' : 'Class'].extend({
        options: {
            extraWeight: 25
        },

        initialize: function(path, options) {
            L.setOptions(this, options);
            var touchPathOptions = L.extend({}, path.options, { opacity: 0, fillOpacity: 0 });
            touchPathOptions.weight += this.options.extraWeight;

            if (path.eachLayer) {
                this._layer = L.layerGroup();
                path.eachLayer(function(l) {
                    if (l.eachLayer || l.getLatLngs) {
                        this._layer.addLayer(L.path.touchHelper(l, L.extend({}, options, {parentLayer: this._layer})));
                    }
                }, this);
            } else if (path.getLatLngs) {
                this._layer = new path.constructor(path.getLatLngs(), touchPathOptions);
            } else {
                throw new Error('Unknown layer type, neither a group or a path');
            }

            this._layer.on('click dblclick mouseover mouseout mousemove', function(e) {
                (this.options.parentLayer ? this.options.parentLayer : path).fire(e.type, e);
            }, this);
        },

        onAdd: function(map) {
            this._layer.addTo(map);
        },

        onRemove: function(map) {
            this._map.removeLayer(this._layer);
        },

        addTo: function(map) {
            map.addLayer(this);
        }
    });

    L.path = L.path || {};

    L.path.touchHelper = function(path, options) {
        return new L.Path.TouchHelper(path, options);
    }
})();
