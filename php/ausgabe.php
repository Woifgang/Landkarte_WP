<?php
defined('ABSPATH') or die("Verspiss dich aus meinen Code!!!");
/**
* Plugin Name: stockundstein
* Plugin URI: http://xn--ber-stock-und-stein-49b.de/
* Description: Landkarte mit Leaflet - a JavaScript library for interactive maps
* Version: 1.0.0
* Author: Wolfgang Aschenbrenner
* Author URI: http://xn--ber-stock-und-stein-49b.de/
* License: GPL2
*/
//add_action( 'wp_footer', 'map_script_laden' );

?>

	<script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
	<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
	<script type="text/javascript" src="<?php echo WP_PLUGIN_URL."/".STOCK_UND_STEIN_PLUGIN."/";?>js/leaflet.elevation-0.0.4.min.js"></script>
	<link rel="stylesheet" href="<?php echo WP_PLUGIN_URL."/".STOCK_UND_STEIN_PLUGIN."/";?>css/leaflet.elevation-0.0.4.css" />
	<script type="text/javascript" src="<?php echo WP_PLUGIN_URL."/".STOCK_UND_STEIN_PLUGIN."/";?>js/gpx.js"></script>
	<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js'></script>
	<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css' rel='stylesheet' />
	<!--<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>-->
	<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>

	<!-- In diesem DIV wird die Landkarte angezeigt -->
	<div id="map" style="height:600px;width:auto"></div>

	<!-- Aufruf der Funktionen für die Landkarte-->
	<script type="text/javascript" src="<?php echo WP_PLUGIN_URL."/".STOCK_UND_STEIN_PLUGIN."/";?>js/map.js"></script>
