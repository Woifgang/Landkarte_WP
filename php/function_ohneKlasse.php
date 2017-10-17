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
// Funktion HTML-Link zerlegen
function GPX_Pfad(&$var){
	$suchmuster = '/(.*)<a href=\"(.*)(.*)\" rel=\"\">(.*)/';
	preg_match($suchmuster, $var, $treffer); // $treffer[2] wird der tatsächliche link ausgegeben

	$var =  $treffer[2];
}


function map_script_laden(&$wert){
	// GPX Datei laden
//	$gpxdatei = plugin_dir_url( STOCK_UND_STEIN_ROOT ) . 'stockundstein/gpx/test2.gpx';
	$gpxdatei = $wert;
	echo $gpxdatei;
	// Icon´s laden
	$icon_start = plugin_dir_url( STOCK_UND_STEIN_ROOT ) . 'stockundstein/images/pin-icon-start.png';
	$icon_end = plugin_dir_url( STOCK_UND_STEIN_ROOT ) . 'stockundstein/images/pin-icon-end.png';
	$icon_shadow = plugin_dir_url( STOCK_UND_STEIN_ROOT ) . 'stockundstein/images/pin-shadow.png';

	wp_enqueue_script(
		'map',
		plugin_dir_url( STOCK_UND_STEIN_ROOT ) . 'stockundstein/js/map.js',
		array('jquery')
		);

		$track = array(
			'gpxdatei' => $gpxdatei ,
			'icon_start' => $icon_start,
			'icon_end' => $icon_end,
			'icon_shadow' => $icon_shadow
		 );

		wp_localize_script( 'map', 'track', $track);
}

add_action( 'wp_enqueue_scripts', 'map_script_laden' );
// Shortcode [landkarte]
add_shortcode('landkarte', 'landkarte_shortcode');
function landkarte_shortcode($atts, $content = null){
	require(STOCK_UND_STEIN_ROOT . '/php/ausgabe.php');
	extract(shortcode_atts( array(
			'gpx' => '',
			), $atts, 'landkarte' ));

			$bla = $gpx;
			GPX_Pfad($bla);
			$fix = array('\'',$bla,'\'' );
			$fixstring = implode('',$fix);
			//echo $fixstring;

			$blabla = $fixstring;
			map_script_laden($fixstring);
			//add_action( 'wp_enqueue_scripts', 'map_script_laden' );
}





// GPX Datei in map.js übertragen
/*
function map_script_laden(){
	// GPX Datei laden
//	$gpxdatei = plugin_dir_url( STOCK_UND_STEIN_ROOT ) . 'stockundstein/gpx/test2.gpx';
	$gpxdatei = 'http://entwicklung.xn--ber-stock-und-stein-49b.de/wp-content/uploads/2016/01/Prag-Pilsen.gpx';
	// Icon´s laden
	$icon_start = plugin_dir_url( STOCK_UND_STEIN_ROOT ) . 'stockundstein/images/pin-icon-start.png';
	$icon_end = plugin_dir_url( STOCK_UND_STEIN_ROOT ) . 'stockundstein/images/pin-icon-end.png';
	$icon_shadow = plugin_dir_url( STOCK_UND_STEIN_ROOT ) . 'stockundstein/images/pin-shadow.png';

	wp_enqueue_script(
		'map',
		plugin_dir_url( STOCK_UND_STEIN_ROOT ) . 'stockundstein/js/map.js',
		array('jquery')
		);

		$track = array(
			'gpxdatei' => $gpxdatei ,
			'icon_start' => $icon_start,
			'icon_end' => $icon_end,
			'icon_shadow' => $icon_shadow
		 );

		wp_localize_script( 'map', 'track', $track);
}

	add_action( 'wp_enqueue_scripts', 'map_script_laden' );
*/


?>
