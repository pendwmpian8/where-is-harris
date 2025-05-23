
    var map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
      attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap',
      subdomains: 'abcd',
      minZoom: 1,
      maxZoom: 16
    }).addTo(map);

    const currentCountry = "DEU";
    const visitedCountries = ["GBR"];

    function style(feature) {
      let fillColor = 'transparent';
      if (feature.id === currentCountry) {
        fillColor = 'green';
      } else if (visitedCountries.includes(feature.id)) {
        fillColor = 'orange';
      }
      return {
        fillColor: fillColor,
        weight: 1,
        opacity: 1,
        color: '#5c4d3b',
        fillOpacity: 0.4
      };
    }

    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
      .then(res => res.json())
      .then(data => {
        L.geoJson(data, {
          style: style,
          onEachFeature: function (feature, layer) {
            layer.bindPopup("<strong>Realm:</strong> " + feature.properties.name);
          }
        }).addTo(map);
      });

    // Coordinates for visited path
    const journeyCoords = [

      [51.5074, -0.1278], // London, UK
      [50.1109, 8.6821], // Frankfurt, Germany
    ];

    const journeyLine = L.polyline(journeyCoords, {
      color: 'goldenrod',
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 10'
    }).addTo(map);

    const decorator = L.polylineDecorator(journeyLine, {
      patterns: [
        {
          offset: 0,
          repeat: 20,
          symbol: L.Symbol.dash({
            pixelSize: 10,
            pathOptions: {
              color: 'gold',
              weight: 2,
              opacity: 0.9,
              className: 'animated-dash'
            }
          })
        }
      ]
    }).addTo(map);
