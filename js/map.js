//setTimeout(wartezeit, 800)

//function wartezeit(){
// Landkarte + Overlay hinzufügen


	var mapboxAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid29pZmdhbmciLCJhIjoiY2lqdmhxZXBkMDc2Znc4bTNncWxkMGM0YiJ9.p8Kxga4m-9kvzFuNNF7Gww';

	var waymarkedtrails = L.tileLayer('http://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png',{
		maxZoom: 18,
		attribution: 'overlay &copy; <a target="_blank" href="http://hiking.waymarkedtrails.org">Waymarked Trails</a> '
              + '(<a target="_blank" href="http://creativecommons.org/licenses/by-sa/3.0/de/deed.en">CC-BY-SA 3.0 DE</a>)'
	});

	var hillshading = L.tileLayer('http://a.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png');



	var wandern = L.tileLayer(mapboxUrl, {id: 'mapbox.run-bike-hike', attribution: mapboxAttribution}),
		strass = L.tileLayer(mapboxUrl, {id: 'mapbox.streets', attribution: mapboxAttribution});

	var map = L.map('map', {
		center: [49.1922, 13.0531],
		zoom: 13,
		maxZoom: 18,
		layers: [wandern]
	});

	var baseMaps = {
		"Wandern": wandern,
		"Strasse": strass
	};

	var overlayMaps = {
		"wanderwege": waymarkedtrails,
		"hügel": hillshading
	};

// ########### GPX importieren ##########

	 	 window.alert(track.gpxdatei);


	var el = L.control.elevation();

	var g = new L.GPX(track.gpxdatei, {
		async: true,
		marker_options: {
			startIconUrl: track.icon_start,
			endIconUrl: track.icon_end,
			shadowUrl: track.icon_shadow
		}
	});
	g.on('loaded', function(e) {
					map.fitBounds(e.target.getBounds());
	});
	g.on("addline", function(e){
					el.addData(e.line);
	});


// Ausgabe
	L.control.layers(baseMaps, overlayMaps).addTo(map);	// Maps + Overlays ausgeben
	L.control.fullscreen().addTo(map); // Fullscreen Button anzeigen
	el.addTo(map); // Höhenprofil
	g.addTo(map);	// GPX
