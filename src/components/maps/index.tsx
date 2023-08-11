import { useEffect, useState } from "react";
import L, { MapOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen.js";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.js";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";

export interface Marker {
  latlng: [number, number];
  popup: string;
}

interface Props {
  markers?: Array<Marker>;
}

export default function (props: Props) {
  const [maps, setMaps] = useState<L.Map>();
  const [control, setControl] = useState<any>();

  const render = () => {
    const map = L.map("map", {
      fullscreenControl: true,
    } as MapOptions).setView([-8.168959596070266, 113.70214465744915], 15);

    L.tileLayer("https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      zIndex: 5,
    }).addTo(map);

    if (!maps) {
      const lc = (L.control as any)
        .locate({ initialZoomLevel: 15, drawCircle: false })
        .addTo(map);

      setControl(lc);
    }

    setMaps(map);

    props.markers?.forEach((item) => {
      const circle = L.circle(item.latlng, {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 100,
      }).addTo(map);

      const popup = L.popup()
        .setLatLng(item.latlng)
        .setContent(`${item.popup}`);

      circle.bindPopup(popup);
      map.addLayer(popup);
    });
  };

  useEffect(() => {
    render();
  }, []);

  useEffect(() => {
    return () => {
      if (control) {
        control.stop();
      }
    };
  });

  return (
    <div className="w-full">
      <div id="map" className="h-72 bg-gray-100 rounded"></div>
    </div>
  );
}
