"use client";

import React, { useRef, useEffect, useState } from "react";
import Map, { MapRef, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ArrowLeftCircle, ArrowRightCircle, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useList } from "@/context/ListContext";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Place = {
  name: string;
  latitude: number;
  longitude: number;
  address: string;
};

type Props = {};
const Page = (props: Props) => {
  const mapRef = useRef<MapRef | null>(null);
  const { list, setList } = useList();
  const [lng, setLng] = useState<number>();
  const [lat, setLat] = useState<number>();
  const [initialLng, setInitialLng] = useState<number>();
  const [initialLat, setInitialLat] = useState<number>();
  const [zoom, setZoom] = useState(11);

  // const [places, setPlaces] = useState<Place[]>([]);

  const [placeIndex, setPlaceIndex] = useState(0);

  const places = [
    {
      name: "A Heart Like His Ministries",
      latitude: 29.802444299999998,
      longitude: -95.80743009999999,
      address: "5140 Franz Rd Suite 700, Katy, TX 77493",
      donationsNeeded: [
        { item: "blanket", current: 20, needs: 50 },
        { item: "canned food", current: 25, needs: 40 },
        { item: "toiletries", current: 15, needs: 30 },
      ],
    },
    {
      name: "Katy Heritage Society",
      latitude: 29.791165,
      longitude: -95.82595239999999,
      address: "5990 George Bush Dr, Katy, TX 77493",
      donationsNeeded: [
        { item: "hygiene products", current: 10, needs: 25 },
        { item: "baby formula", current: 30, needs: 60 },
        { item: "socks", current: 40, needs: 70 },
      ],
    },
    {
      name: "The Arc Of Katy",
      latitude: 29.7944224,
      longitude: -95.8241022,
      address: "5819 10th St C, Katy, TX 77493",
      donationsNeeded: [
        { item: "school supplies", current: 20, needs: 45 },
        { item: "diapers", current: 15, needs: 35 },
        { item: "winter coats", current: 25, needs: 50 },
      ],
    },
    {
      name: "Color Codes Foundation",
      latitude: 29.7880394,
      longitude: -95.79476269999999,
      address: "24600 Katy Fwy Suite 834 - 1075, Katy, TX 77493",
      donationsNeeded: [
        { item: "books", current: 30, needs: 60 },
        { item: "canned soup", current: 20, needs: 40 },
        { item: "gloves", current: 10, needs: 30 },
      ],
    },
    {
      name: "St. Vincent de Paul Society",
      latitude: 29.797258699999997,
      longitude: -95.8137802,
      address: "5356 11th St, Katy, TX 77493",
      donationsNeeded: [
        { item: "cleaning supplies", current: 15, needs: 35 },
        { item: "non-perishable food", current: 25, needs: 50 },
        { item: "winter hats", current: 20, needs: 40 },
      ],
    },
    {
      name: "Act of Life Inc.",
      latitude: 29.7867236,
      longitude: -95.820758,
      address: "5510 1st St, Katy, TX 77493",
      donationsNeeded: [
        { item: "baby clothes", current: 30, needs: 60 },
        { item: "cereal", current: 20, needs: 40 },
        { item: "toothbrushes", current: 10, needs: 30 },
      ],
    },
    {
      name: "Vanessa's Big Heart Foundation",
      latitude: 29.747612099999998,
      longitude: -95.7729732,
      address: "2306 Morning Park Dr, Katy, TX 77494",
      donationsNeeded: [
        { item: "toys", current: 25, needs: 50 },
        { item: "juice boxes", current: 15, needs: 30 },
        { item: "baby wipes", current: 20, needs: 40 },
      ],
    },
    {
      name: "Baraka Services",
      latitude: 29.7695208,
      longitude: -95.7880611,
      address: "24222 Calico Trace Ln, Katy, TX 77494",
      donationsNeeded: [
        { item: "bedding sets", current: 20, needs: 45 },
        { item: "canned vegetables", current: 30, needs: 60 },
        { item: "socks", current: 25, needs: 50 },
      ],
    },
    {
      name: "Heart4Heroes",
      latitude: 29.785776499999997,
      longitude: -95.8245093,
      address: "None, Katy, TX 77493",
      donationsNeeded: [
        { item: "first aid kits", current: 15, needs: 30 },
        { item: "rice", current: 20, needs: 40 },
        { item: "baby blankets", current: 25, needs: 50 },
      ],
    },
    {
      name: "Katy Responds",
      latitude: 29.733881,
      longitude: -95.763025,
      address: "22765 Westheimer Pkwy, Katy, TX 77450",
      donationsNeeded: [
        { item: "canned meat", current: 20, needs: 40 },
        { item: "backpacks", current: 25, needs: 50 },
        { item: "feminine hygiene products", current: 15, needs: 30 },
      ],
    },
    {
      name: "Young Life",
      latitude: 29.776955299999997,
      longitude: -95.7438576,
      address: "423 Mason Park Blvd b1, Katy, TX 77450",
      donationsNeeded: [
        { item: "winter gloves", current: 25, needs: 50 },
        { item: "snacks", current: 20, needs: 40 },
        { item: "flashlights", current: 15, needs: 30 },
      ],
    },
    {
      name: "Joe Joe Bear Foundation",
      latitude: 29.792361999999997,
      longitude: -95.723044,
      address: "1846 Snake River Rd, Katy, TX 77449",
      donationsNeeded: [
        { item: "teddy bears", current: 30, needs: 60 },
        { item: "pasta", current: 20, needs: 40 },
        { item: "coloring books", current: 25, needs: 50 },
      ],
    },
    {
      name: "Compassion Katy",
      latitude: 29.7746042,
      longitude: -95.73002319999999,
      address: "802 Dominion Dr #900a, Katy, TX 77450",
      donationsNeeded: [
        { item: "school uniforms", current: 15, needs: 30 },
        { item: "canned fruit", current: 20, needs: 40 },
        { item: "toothpaste", current: 25, needs: 50 },
      ],
    },
    {
      name: "Making Things Matter",
      latitude: 29.732466,
      longitude: -95.7637898,
      address: "5703 2nd St, Katy, TX 77493",
      donationsNeeded: [
        { item: "pillows", current: 20, needs: 45 },
        { item: "canned beans", current: 25, needs: 50 },
        { item: "soap", current: 15, needs: 30 },
      ],
    },
  ];

  const flyToPlace = (index: number) => {
    let placeIndex = index % places.length;

    mapRef.current?.flyTo({
      center: [places[placeIndex].longitude, places[placeIndex].latitude],
      animate: true,
      zoom: 20,
    });
  };

  // useEffect(() => {
  //   if (initialLng == undefined || initialLat == undefined) {
  //     return;
  //   }

  //   console.log(initialLng, initialLat);

  //   fetch(`/api/find_nearby?lat=${initialLng}&lon=${initialLat}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setPlaces(data);
  //     });
  // }, [initialLng, initialLat]);

  useEffect(() => {
    // Ask for user's location
    navigator.geolocation.getCurrentPosition((position) => {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);

      setInitialLng(position.coords.longitude);
      setInitialLat(position.coords.latitude);
    });
  }, [lng, lat]);

  if (places.length == 0) {
    return <div>Loading...</div>;
  }

  const isIncludedInList = (item: string) => {
    return list.some((listItem) => {
      return listItem.name.toLowerCase() == item.toLowerCase();
    });
  };

  return (
    <div className="grid h-full grow grid-cols-10 grid-rows-1 overflow-x-hidden">
      <div className="col-span-3  px-8 pt-8">
        <h1 className="text-center text-4xl font-semibold">
          Locations Near You.
        </h1>
        <p className="mx-auto mt-1 text-pretty text-center text-base text-slate-600">
          Nearby food banks, shelters, non-profits, and other organizations that
          match with your donations.
        </p>

        <Separator className="mt-6" />

        <div className="mt-6 flex items-center justify-center gap-x-4">
          <Button
            className="shrink-0 rounded-full"
            size={"icon"}
            variant={"default"}
            onClick={() => {
              if (placeIndex == 0) {
                flyToPlace(places.length - 1);
                setPlaceIndex(places.length - 1);
                return;
              }
              flyToPlace((placeIndex - 1) % places.length);
              setPlaceIndex((placeIndex - 1) % places.length);
            }}
          >
            <ArrowLeftCircle />
          </Button>
          <div className="flex grow flex-col">
            <Link
              className="w-full text-center text-2xl font-bold text-primary hover:underline"
              href={`https://maps.google.com/maps?q=${places[placeIndex % places.length].latitude},${places[placeIndex % places.length].longitude}`}
            >
              {places[placeIndex % places.length].name}
            </Link>

            <div className="text-center font-medium">
              {places[placeIndex % places.length].address}
            </div>
          </div>
          <Button
            className="shrink-0 rounded-full"
            size={"icon"}
            variant={"default"}
            onClick={() => {
              flyToPlace((placeIndex + 1) % places.length);
              setPlaceIndex((placeIndex + 1) % places.length);
            }}
          >
            <ArrowRightCircle />
          </Button>
        </div>

        <div className=" mt-6 text-center text-2xl font-semibold text-slate-700">
          Donations Needed
        </div>
        <div className="mt-4 grid grid-cols-3 grid-rows-1 gap-x-2">
          {places[placeIndex % places.length].donationsNeeded.map(
            (donation, index) => (
              <div
                key={index}
                className={cn(
                  " flex flex-col items-center justify-center rounded border px-1 py-4",
                  isIncludedInList(donation.item)
                    ? "outline outline-green-500"
                    : "bg-white",
                )}
              >
                <div className="size-24">
                  <CircularProgressbar
                    styles={buildStyles({
                      strokeLinecap: "round",
                      pathColor: `rgba(37, 99, 235)`,
                      trailColor: "#d6d6d6",
                      textColor: "#2563EB",
                      textSize: "1.5rem",
                    })}
                    value={(donation.current / donation.needs) * 100}
                    text={`${Math.floor((donation.current / donation.needs) * 100)}%`}
                  />
                </div>

                <div className="mt-2 grow text-pretty text-center text-base font-medium text-slate-600">
                  {donation.current} {donation.item} needed
                </div>
              </div>
            ),
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="rounded-full py-7 text-lg font-semibold md:py-8 md:text-xl"
                variant={"default"}
                size={"lg"}
              >
                Confirm Donation!
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-center text-2xl font-bold text-transparent">
                  Thank you for donating!
                </DialogTitle>
                <DialogDescription className="text-pretty text-center text-base font-medium leading-loose text-black">
                  Please drop off your donations at the selected location. Your
                  support is greatly appreciated!
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="mx-auto" type="button" variant={"outline"}>
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="col-span-7">
        {lng != undefined && lat != undefined && (
          <>
            <Map
              ref={mapRef}
              id="map"
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
              }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              maxZoom={18}
              minZoom={12}
            >
              {places.map((place) => (
                <div className={"hidden"} key={place.name}>
                  <Marker
                    key={place.name}
                    latitude={place.latitude}
                    longitude={place.longitude}
                  >
                    <button
                      onClick={() => {
                        flyToPlace(places.indexOf(place));
                        setPlaceIndex(places.indexOf(place));
                      }}
                      className={cn(
                        " items-center gap-x-1 rounded-lg bg-black/80 p-1 font-sans font-bold text-blue-100 hover:cursor-pointer",
                        zoom < 10 ? "hidden" : "flex",
                      )}
                    >
                      <MapPin />
                      <span className="">{place.name}</span>
                    </button>
                  </Marker>
                </div>
              ))}
            </Map>
          </>
        )}
      </div>
    </div>
  );
};
export default Page;
