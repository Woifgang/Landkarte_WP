/*! Leaflet.Elevation 03-07-2013 */
L.Control.Elevation=L.Control.extend({options:{position:"topright",theme:"lime-theme",width:600,height:175,margins:{top:10,right:20,bottom:30,left:50},useHeightIndicator:!0,interpolation:"linear",hoverNumber:{decimalsX:3,decimalsY:0,formatter:void 0},xTicks:void 0,yTicks:void 0},onRemove:function(){this._container=null,this._data=null,this._dist=null},onAdd:function(a){this._map=a;var b=this.options,c=b.margins;b.width=b.width-c.left-c.right,b.height=b.height-c.top-c.bottom,b.xTicks=b.xTicks||Math.round(b.width/75),b.yTicks=b.yTicks||Math.round(b.height/30),b.hoverNumber.formatter=b.hoverNumber.formatter||this._formatter,d3.select("body").classed(b.theme,!0);var d=this._x=d3.scale.linear().range([0,b.width]),e=this._y=d3.scale.linear().range([b.height,0]);this._area=d3.svg.area().interpolate(b.interpolation).x(function(a){return d(a.dist)}).y0(b.height).y1(function(a){return e(a.altitude)});var f=this._container=L.DomUtil.create("div","elevation"),g=b.width+c.left+c.right,h=d3.select(f);h.attr("width",g);var i=h.append("svg");i.attr("width",g).attr("class","background").attr("height",b.height+c.top+c.bottom).append("g").attr("transform","translate("+c.left+","+c.top+")");var j=d3.svg.line();j=j.x(function(){return d3.mouse(i.select("g"))[0]}).y(function(){return b.height});var k=d3.select(this._container).select("svg").select("g");this._areapath=k.append("path").attr("class","area");var l=this._background=k.append("rect").attr("width",b.width).attr("height",b.height).style("fill","none").style("stroke","none").style("pointer-events","all");l.on("mousemove",this._mousemoveHandler.bind(this)),l.on("mouseout",this._mouseoutHandler.bind(this)),this._xaxisgraphicnode=k.append("g"),this._yaxisgraphicnode=k.append("g"),this._appendXaxis(this._xaxisgraphicnode),this._appendYaxis(this._yaxisgraphicnode);var m=this._focusG=k.append("g");return this._mousefocus=m.append("svg:line").attr("class","mouse-focus-line").attr("x2","0").attr("y2","0").attr("x1","0").attr("y1","0"),this._focuslabelX=m.append("svg:text").style("pointer-events","none").attr("class","mouse-focus-label-x"),this._focuslabelY=m.append("svg:text").style("pointer-events","none").attr("class","mouse-focus-label-y"),f},_formatter:function(a,b,c){var d;d=0===b?Math.round(a)+"":L.Util.formatNum(a,b)+"";var e=d.split(".");if(e[1]){for(var f=b-e[1].length;f>0;f--)e[1]+="0";d=e.join(c||".")}return d},_appendYaxis:function(a){a.attr("class","y axis").call(d3.svg.axis().scale(this._y).ticks(this.options.yTicks).orient("left")).append("text").attr("x",15).style("text-anchor","end").text("m")},_appendXaxis:function(a){a.attr("class","x axis").attr("transform","translate(0,"+this.options.height+")").call(d3.svg.axis().scale(this._x).ticks(this.options.xTicks).orient("bottom")).append("text").attr("x",this.options.width+15).style("text-anchor","end").text("km")},_updateAxis:function(){this._xaxisgraphicnode.selectAll("axis").remove(),this._yaxisgraphicnode.selectAll("axis").remove(),this._appendXaxis(this._xaxisgraphicnode),this._appendYaxis(this._yaxisgraphicnode)},_mouseoutHandler:function(){this._marker&&(this._map.removeLayer(this._marker),this._marker=null),this._mouseHeightFocus&&(this._mouseHeightFocus.style("visibility","hidden"),this._mouseHeightFocusLabel.style("visibility","hidden")),this._pointG&&this._pointG.style("visibility","hidden"),this._focusG.style("visibility","hidden")},_mousemoveHandler:function(){if(this._data&&0!==this._data.length){var a=d3.mouse(this._background.node()),b=this.options;this._focusG.style("visibility","visible"),this._mousefocus.attr("x1",a[0]).attr("y1",0).attr("x2",a[0]).attr("y2",b.height).classed("hidden",!1);var c=d3.bisector(function(a){return a.dist}).left,d=this._x.invert(a[0]),e=c(this._data,d),f=this._data[e].altitude,g=this._data[e].dist,h=this._data[e].latlng,i=b.hoverNumber.formatter(f,b.hoverNumber.decimalsY),j=b.hoverNumber.formatter(g,b.hoverNumber.decimalsX);this._focuslabelX.attr("x",a[0]).text(i+" m"),this._focuslabelY.attr("y",b.height-5).attr("x",a[0]).text(j+" km");var k=this._map.latLngToLayerPoint(h);if(b.useHeightIndicator){if(!this._mouseHeightFocus){var l=d3.select(".leaflet-overlay-pane svg").append("g");this._mouseHeightFocus=l.append("svg:line").attr("class","height-focus line").attr("x2","0").attr("y2","0").attr("x1","0").attr("y1","0");var m=this._pointG=l.append("g");m.append("svg:circle").attr("r",6).attr("cx",0).attr("cy",0).attr("class","height-focus circle-lower"),this._mouseHeightFocusLabel=l.append("svg:text").attr("class","height-focus-label").style("pointer-events","none")}var n=this.options.height/this._maxElevation*f,o=k.y-n;this._mouseHeightFocus.attr("x1",k.x).attr("x2",k.x).attr("y1",k.y).attr("y2",o).style("visibility","visible"),this._pointG.attr("transform","translate("+k.x+","+k.y+")").style("visibility","visible"),this._mouseHeightFocusLabel.attr("x",k.x).attr("y",o).text(f+" m").style("visibility","visible")}else this._marker?this._marker.setLatLng(h):this._marker=new L.Marker(h).addTo(this._map)}},_addGeoJSONData:function(a){if(a){for(var b=this._data||[],c=this._dist||0,d=this._maxElevation||0,e=0;e<a.length;e++){var f=new L.LatLng(a[e][1],a[e][0]),g=new L.LatLng(a[e?e-1:0][1],a[e?e-1:0][0]),h=f.distanceTo(g);c+=h/1e3,d=d<a[e][2]?a[e][2]:d,b.push({dist:c,altitude:a[e][2],x:a[e][0],y:a[e][1],latlng:f})}this._dist=c,this._data=b,this._maxElevation=d}},_addGPXdata:function(a){if(a){for(var b=this._data||[],c=this._dist||0,d=this._maxElevation||0,e=0;e<a.length;e++){var f=a[e],g=a[e?e-1:0],h=f.distanceTo(g);c+=h/1e3,d=d<f.meta.ele?f.meta.ele:d,b.push({dist:c,altitude:f.meta.ele,x:f.lng,y:f.lat,latlng:f})}this._dist=c,this._data=b,this._maxElevation=d}},_addData:function(a){var b,c=a&&a.geometry&&a.geometry;if(c)switch(c.type){case"LineString":this._addGeoJSONData(c.coordinates);break;case"MultiLineString":for(b=0;b<c.coordinates.length;b++)this._addGeoJSONData(c.coordinates[b]);break;default:throw new Error("Invalid GeoJSON object.")}var d=a&&"FeatureCollection"===a.type;if(d)for(b=0;b<a.features.length;b++)this._addData(a.features[b]);a&&a._latlngs&&this._addGPXdata(a._latlngs)},addData:function(a){this._addData(a);var b=d3.extent(this._data,function(a){return a.dist}),c=d3.extent(this._data,function(a){return a.altitude});this._x.domain(b),this._y.domain(c),this._areapath.datum(this._data).attr("d",this._area),this._updateAxis()}}),L.control.elevation=function(a){return new L.Control.Elevation(a)};