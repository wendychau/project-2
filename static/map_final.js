var queryURL = "http://127.0.0.1:5000/api/v1.0/all_geoJSON";

d3.json(queryURL, function(data) {
    createFeatures(data.features);
});


function createFeatures(lostKittyData) {
    var lostKitties = L.geoJSON(lostKittyData, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h4>Name: " + feature.properties.name + "</h4>" +
                "<hr><p>Status: " + feature.properties.status + "</p>" +
                "<p>Color: " + feature.properties.color + "</p>");
        },
        pointToLayer: function(feature, latlng) {
            return new L.circle(latlng, {
                radius: 1000,
                fillOpacity: 0.4,
                color: feature.properties.color_hex,
                stroke: false,
                weight: 1
            })
        }
    });

    var lostFilter = L.geoJSON(lostKittyData, {filter: lostOnly}, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h4>Name: " + feature.properties.name + "</h4>" +
                "<hr><p>Status: " + feature.properties.status + "</p>" +
                "<p>Color: " + feature.properties.color + "</p>");
        },
        pointToLayer: function(feature, latlng) {
            return new L.marker(latlng)
        }
    });

    var foundFilter = L.geoJSON(lostKittyData, {filter: foundOnly}, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h4>Name: " + feature.properties.name + "</h4>" +
                "<hr><p>Status: " + feature.properties.status + "</p>" +
                "<p>Color: " + feature.properties.color + "</p>");
        },
        pointToLayer: function(feature, latlng) {
            return new L.marker(latlng)
        }
    });

    var reunitedFilter = L.geoJSON(lostKittyData, {filter: reunitedOnly}, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h4>Name: " + feature.properties.name + "</h4>" +
                "<hr><p>Status: " + feature.properties.status + "</p>" +
                "<p>Color: " + feature.properties.color + "</p>");
        },
        pointToLayer: function(feature, latlng) {
            return new L.marker(latlng)
        }
    });

    createMap(lostKitties, lostFilter, foundFilter, reunitedFilter);
}


function lostOnly(feature) {
    if (feature.properties.status === "LOST") return true
};

function foundOnly(feature) {
    if (feature.properties.status === "FOUND") return true
};

function reunitedOnly(feature) {
    if (feature.properties.status === "SAFE") return true
};


function createMap(lostKitties, lostFilter, foundFilter, reunitedFilter) {

var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=" + access_token);



var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=" + access_token);


var baseMaps = {
    "Dark": darkMap,
    "Light": lightMap
    
};

var overlayMaps = {
    "All Cats": lostKitties,
    "Lost Only": lostFilter,
    "Found Only": foundFilter,
    "Reunited ;_;": reunitedFilter
};

var myMap = L.map("map", {
    center: [37.8044, -122.2711],
    zoom: 11,
    layers: [lightMap, darkMap, lostKitties]
});

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

}