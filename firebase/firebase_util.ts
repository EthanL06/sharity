import { GeoPoint, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase_config";

type DonationRequest = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  donationItems: {
    current: number;
    needed: number;
    name: string;
  }[];
};

export const addDonationRequest = async (data: DonationRequest) => {
  const latitude = data.latitude;
  const longitude = data.longitude;

  // Create geo point
  const location = new GeoPoint(latitude, longitude);

  const docRef = await addDoc(collection(db, "donationRequests"), {
    name: data.name,
    address: data.address,
    location,
    donationItems: data.donationItems,
  });
  return docRef;
};

export const getDonationRequests = async () => {
  const querySnapshot = await getDocs(collection(db, "donationRequests"));
  const donationRequests: DonationRequest[] = [];
  querySnapshot.forEach((doc) => {
    donationRequests.push(doc.data() as DonationRequest);
  });
  return donationRequests;
};
