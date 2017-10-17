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

// GPX Pfad auslesen und als String wiedergeben
 function GPX_Pfad(&$var){
  $suchmuster = '/(.*)<a href=\"(.*)(.*)\" rel=\"\">(.*)/';
  preg_match($suchmuster, $var, $treffer); // $treffer[2] wird der tatsächliche link ausgegeben

  //$var =  $treffer[2]; // Einfache ausgabe des HTML-Link´s
  $zusammensetzen = array('\'',$treffer[2],'\'' ); // Array erstellen
  $var = implode('',$zusammensetzen); // Verbindet Array-Elemente zu einem String
 }

class karte{
  var $a;

  function __construct(){
    add_action( 'wp_enqueue_scripts', array( $this, 'map_script_laden')); // Script aufrufen
    add_shortcode('landkarte', array( $this, 'landkarte_shortcode')); // Shortcode [landkarte] aufrufen
  }

// Shortcode [landkarte]
  function landkarte_shortcode($atts, $content = null){
  	require(STOCK_UND_STEIN_ROOT . '/php/ausgabe.php');
  	extract(shortcode_atts( array(
  			'gpx' => '',
  			), $atts, 'landkarte' ));

        GPX_Pfad($gpx);
        $this->a = $gpx;
        echo $this->a;
  }

  function map_script_laden(){
  	// GPX Datei laden
    //$gpxdatei = plugin_dir_url( STOCK_UND_STEIN_ROOT ) . 'stockundstein/gpx/test2.gpx';
    $gpxdatei = $this->a;
    echo $this->a;
    //echo $gpxdatei;
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

}

$karte = new karte;
 ?>
