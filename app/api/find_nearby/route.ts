import { getDonationRequests } from "@/firebase/firebase_util";
import { NextResponse } from "next/server";

// https://serpapi.com/google-maps-api)
//serpapi.com/search.json?engine=google_maps&q=coffee&ll=@40.7455096,-74.0083012,15.1z&type=search&api_key=f0029c4e91ee9ffdf9df2cc585740df9123a97e2229cd91ba1e6934cfeb88f66

const donationItems = [
  { item: "Clothing" },
  { item: "Shoes" },
  { item: "Books" },
  { item: "Toys" },
  { item: "Electronics" },
  { item: "Furniture" },
  { item: "Kitchenware" },
  { item: "Bedding" },
  { item: "Hygiene products" },
  { item: "Non-perishable food items" },
  { item: "Blankets" },
  { item: "Baby supplies" },
  { item: "School supplies" },
  { item: "Pet food and supplies" },
  { item: "Sporting equipment" },
  { item: "Art supplies" },
  { item: "Musical instruments" },
  { item: "Tools" },
  { item: "Gardening supplies" },
  { item: "Craft supplies" },
  { item: "Board games and puzzles" },
  { item: "Canned goods" },
  { item: "Dry pasta and rice" },
  { item: "Cereal and granola bars" },
  { item: "Canned soups and stews" },
  { item: "Baby food and formula" },
  { item: "Toiletries" },
  { item: "Cleaning supplies" },
  { item: "First aid kits" },
  { item: "Educational materials" },
];

const getRandomDonationItems = () => {
  // Get three random donation items
  const randomItems = [] as any;

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * donationItems.length);
    if (randomItems.includes(donationItems[randomIndex])) {
      i--;
      continue;
    }
    randomItems.push(donationItems[randomIndex]);
  }

  return randomItems;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  const query = "food banks, charities, non profits near me";

  // const fetchUrl = `https://maps-data.p.rapidapi.com/nearby.php?query=${query}&lat=${lat}lng=${lon}&limit=20&country=us&lang=en&offset=0&zoom=5`;
  const fetchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${query}&location=${lat},${lon}&radius=50000&key=${process.env.GOOGLE_MAP_KEY}`;

  console.log(fetchUrl);

  const res = await fetch(fetchUrl);

  const data = await res.json();

  const placesData = data.results.map((result: any) => {
    console.log(result);
    const { name, vicinity, geometry } = result;
    const { lat, lng } = geometry.location;

    const donationItems = getRandomDonationItems();

    const donationsNeeded = donationItems.map((item: any) => {
      const current = Math.floor(Math.random() * 100) + 1;
      const needs = Math.floor(Math.random() * (100 - current)) + current;

      return {
        ...item,
        current,
        needs,
      };
    });

    return {
      name,
      address: vicinity,
      latitude: lat,
      longitude: lng,
      donationsNeeded,
    };
  });

  return NextResponse.json(placesData);
}
