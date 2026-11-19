(function(){
var S=window.STOPS||[];
var TH={hydro:'#1F6F8B',hist:'#2F5D46',geo:'#9A6A2F'};
function icon(s){
  return L.divIcon({className:'',iconSize:[34,44],iconAnchor:[17,42],popupAnchor:[0,-38],
    html:'<span class="pin t-'+s.theme+(s.long?' lo':'')+'" style="--t:'+TH[s.theme]+'"><svg viewBox="0 0 34 44"><path d="M17 42C17 42 3 27 3 16a14 14 0 1 1 28 0c0 11-14 26-14 26z"/></svg><b>'+s.n+'</b></span>'});
}
function layers(map){
  var topo=L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{maxZoom:17,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'}).addTo(map);
  var osm=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'});
  L.control.layers({'Turistická':topo,'Základná':osm},null,{collapsed:true}).addTo(map);
}
var big=document.getElementById('map');
if(big){
  var map=L.map(big,{scrollWheelZoom:false});layers(map);
  var ms=[];
  S.filter(function(s){return s.lat}).forEach(function(s){
    var m=L.marker([s.lat,s.lng],{icon:icon(s),title:s.n+'. '+s.short,keyboard:true}).addTo(map);
    m.bindPopup('<div class="pp"><small>Zastavenie '+s.n+(s.long?' · len dlhá trasa':'')+'</small><strong>'+s.title+'</strong><a href="'+s.n+'/">Otvoriť zastavenie →</a></div>');
    ms.push({s:s,m:m});
  });
  var all=L.latLngBounds(ms.map(function(x){return x.m.getLatLng()}));
  map.fitBounds(all,{padding:[40,40]});
  map.on('click',function(){map.scrollWheelZoom.enable()});
  document.querySelectorAll('.chip').forEach(function(b){b.addEventListener('click',function(){
    document.querySelectorAll('.chip').forEach(function(c){c.classList.toggle('on',c===b)});
    var r=b.dataset.r,pts=[];
    ms.forEach(function(x){var show=r!=='short'||!x.s.long;
      if(show){x.m.addTo(map);pts.push(x.m.getLatLng())}else{map.removeLayer(x.m)}});
    map.fitBounds(L.latLngBounds(pts),{padding:[40,40]});
  })});
}
var mini=document.getElementById('minimap');
if(mini){
  var n=+mini.dataset.n,s=S.filter(function(x){return x.n===n})[0];
  var mm=L.map(mini,{scrollWheelZoom:false}).setView([s.lat,s.lng],16);layers(mm);
  L.marker([s.lat,s.lng],{icon:icon(s),title:s.short}).addTo(mm);
}
})();
