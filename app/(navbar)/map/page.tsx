"use client";

import React, { useRef, useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import ReactMapGl from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
// import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

type Props = {};
const Page = (props: Props) => {
  // const mapContainer = useRef(null);
  // const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState<number>();
  const [lat, setLat] = useState<number>();
  const [zoom, setZoom] = useState(11);

  const places = [
    {
      name: "A Heart Like His Ministries",
      latitude: 29.802444299999998,
      longitude: -95.80743009999999,
      address: "5140 Franz Rd Suite 700, Katy, TX 77493",
    },
    {
      name: "ARTreach",
      latitude: 29.754117599999997,
      longitude: -95.55035,
      address: "Unknown",
    },
    {
      name: "Katy Heritage Society",
      latitude: 29.791165,
      longitude: -95.82595239999999,
      address: "5990 George Bush Dr, Katy, TX 77493",
    },
    {
      name: "The Arc Of Katy",
      latitude: 29.7944224,
      longitude: -95.8241022,
      address: "5819 10th St C, Katy, TX 77493",
    },
    {
      name: "Color Codes Foundation",
      latitude: 29.7880394,
      longitude: -95.79476269999999,
      address: "24600 Katy Fwy Suite 834 - 1075, Katy, TX 77493",
    },
    {
      name: "St. Vincent de Paul Society",
      latitude: 29.797258699999997,
      longitude: -95.8137802,
      address: "5356 11th St, Katy, TX 77493",
    },
    {
      name: "Act of Life Inc.",
      latitude: 29.7867236,
      longitude: -95.820758,
      address: "5510 1st St, Katy, TX 77493",
    },
    {
      name: "Vanessa's Big Heart Foundation",
      latitude: 29.747612099999998,
      longitude: -95.7729732,
      address: "2306 Morning Park Dr, Katy, TX 77494",
    },
    {
      name: "Baraka Services",
      latitude: 29.7695208,
      longitude: -95.7880611,
      address: "24222 Calico Trace Ln, Katy, TX 77494",
    },
    {
      name: "Heart4Heroes",
      latitude: 29.785776499999997,
      longitude: -95.8245093,
      address: "None, Katy, TX 77493",
    },
    {
      name: "Katy Responds",
      latitude: 29.733881,
      longitude: -95.763025,
      address: "22765 Westheimer Pkwy, Katy, TX 77450",
    },
    {
      name: "Young Life",
      latitude: 29.776955299999997,
      longitude: -95.7438576,
      address: "423 Mason Park Blvd b1, Katy, TX 77450",
    },
    {
      name: "Joe Joe Bear Foundation",
      latitude: 29.792361999999997,
      longitude: -95.723044,
      address: "1846 Snake River Rd, Katy, TX 77449",
    },
    {
      name: "Compassion Katy",
      latitude: 29.7746042,
      longitude: -95.73002319999999,
      address: "802 Dominion Dr #900a, Katy, TX 77450",
    },
    {
      name: "Making Things Matter",
      latitude: 29.732466,
      longitude: -95.7637898,
      address: "5703 2nd St, Katy, TX 77493",
    },
  ];

  useEffect(() => {
    // Ask for user's location
    navigator.geolocation.getCurrentPosition((position) => {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
    });

    // if (map.current || lng == undefined || lat == undefined) return; // initialize map only once
    // map.current = new mapboxgl.Map({
    //   container: mapContainer.current as unknown as HTMLElement,
    //   style: "mapbox://styles/mapbox/streets-v12",
    //   center: [lng, lat],
    //   zoom: zoom,
    //   pitch: 65,
    // });
  }, [lng, lat]);

  return (
    <div className="grid h-full grow grid-cols-6 grid-rows-1 overflow-x-hidden">
      <div className="col-span-1">test</div>
      {/* <div ref={mapContainer} className="col-span-5 h-[calc(100vh-89px)]" /> */}

      <div className="col-span-5">
        {lng != undefined && lat != undefined && (
          <>
            <ReactMapGl
              mapLib={import("mapbox-gl")}
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
              initialViewState={{
                latitude: lat,
                longitude: lng,
                zoom: zoom,
                pitch: 65,
              }}
              style={{ width: "100%", height: "100%" }}
              onMove={(e) => {
                setLng(e.viewState.longitude);
                setLat(e.viewState.latitude);
                setZoom(e.viewState.zoom);
                console.log(e.viewState.zoom);
              }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              maxZoom={15}
              minZoom={12}
            >
              {/* <Marker latitude={lat} longitude={lng}>
                <div>📍</div>
              </Marker> */}

              {places.map((place) => (
                <div className={"hidden"} key={place.name}>
                  <Marker
                    key={place.name}
                    latitude={place.latitude}
                    longitude={place.longitude}
                  >
                    <div
                      className={cn(
                        " items-center gap-x-1 rounded-lg bg-black/80 p-1 font-sans font-bold text-blue-100 ",
                        zoom < 10 ? "hidden" : "flex",
                      )}
                    >
                      <MapPin />
                      <span className="">{place.name}</span>
                    </div>
                  </Marker>
                </div>
              ))}
            </ReactMapGl>
          </>
        )}
      </div>
    </div>
  );
};
export default Page;
