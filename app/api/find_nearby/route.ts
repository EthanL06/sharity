import { getDonationRequests } from "@/firebase/firebase_util";
import { NextResponse } from "next/server";

// https://serpapi.com/google-maps-api)
//serpapi.com/search.json?engine=google_maps&q=coffee&ll=@40.7455096,-74.0083012,15.1z&type=search&api_key=f0029c4e91ee9ffdf9df2cc585740df9123a97e2229cd91ba1e6934cfeb88f66
export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  const query = "food banks near me";

  const fetchUrl = `https://maps-data.p.rapidapi.com/nearby.php?query=${query}&lat=${lat}lng=${lon}&limit=20&country=us&lang=en&offset=0&zoom=5`;

  console.log(fetchUrl);

  const res = await fetch(fetchUrl, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_API_KEY as string,
      "X-RapidAPI-Host": "maps-data.p.rapidapi.com",
    },
  });

  const data = await res.json();

  const placesData = data["data"].map((result: any) => {
    const { name, full_address, latitude, longitude } = result;

    return {
      name,
      address: full_address,
      latitude,
      longitude,
    };
  });

  // const data = await res.json();

  // const placesData = data["local_results"].map((result) => {
  //   const { title, address} = result;
  //   const { lat, lng } = result["gps_coordinates"];

  //   return {
  //     title,
  //     address,
  //     lat,
  //     lng,
  //   }

  return NextResponse.json(placesData);
}

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const { searchParams } = url;

//   const lat = searchParams.get("lat");
//   const lon = searchParams.get("lon");

//   const donationRequests = await getDonationRequests();

//   // Filter out donation requests that are within 10km of the user's location

//   const nearbyDonationRequests = donationRequests.filter((donationRequest) => {
//     const distance = Math.sqrt(
//       Math.pow(donationRequest.latitude - Number(lat), 2) +
//         Math.pow(donationRequest.longitude - Number(lon), 2),
//     );

//     return distance <= 0.1;
//   });

//   return NextResponse.json(nearbyDonationRequests);
// }
