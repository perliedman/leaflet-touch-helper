Leaflet Touch Helper
====================

Make it easy to touch things in [Leaflet](http://leafletjs.com/). [See the demo](http://www.liedman.net/leaflet-touch-helper/).

This plugin makes an invisible touch surface around paths, like polygons or polylines, to make it easier to hit them with your clumsy fingers.

Technically, this plugin adds another, larger but transparent layer on top of the original layer, and forwards any events to the original layer.
Depending on the number of layers and the complexity of your geometries, this might be expensive in terms of performance - you might want to use
a more clever solution in those cases. For basics, this is easy and works well, though!

## Usage

When adding a layer you want to make easy to touch, also create an instance of `L.Path.TouchHelper` and add to the map:

```
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);

L.path.touchHelper(polygon).addTo(map);
```

To explicitly add even more touch margin, for extra fat fingers, you can specify the `extraWeight` option:

```
L.path.touchHelper(polygon, {extraWeight: 50}).addTo(map); // Super fat
```

(Default for `extraWeight` is 25 pixels.)

When the original layer is removed from the map, the touch helper layer will also be removed. Note however,
that if you re-add the original layer, the touch helper layer _will not_ be re-added, you will have to create
a new. (Technically, this is because there is no way to know if the layer is permanently removed or just
temporarily; assuming that layers are always just temporarily removed would keep around _all_ created touch
helper layers forever, which is rarely what you want.)
