"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import OrganizationForm from "./components/organization-form";
import { useCallback, useEffect, useState } from "react";
import DonationItemFormOne from "./components/donation-item-form-one";
import DonationItemFormTwo from "./components/donation-item-form-two";
import DonationItemFormThree from "./components/donation-item-form-three";
import { addDonationRequest } from "@/firebase/firebase_util";

type Props = {};
const Page = (props: Props) => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const nextPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const prevPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    if (page === 5) {
      setLoading(true);
      addDonationRequest(formData as any).then((docRef) => {
        setLoading(false);
        nextPage();
      });
    }
  }, [page, formData, nextPage]);

  const displayPage = () => {
    switch (page) {
      case 1:
        return (
          <OrganizationForm
            setFormData={setFormData}
            formData={formData}
            nextPage={nextPage}
          />
        );
      case 2:
        return (
          <DonationItemFormOne
            setFormData={setFormData}
            formData={formData}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        );
      case 3:
        return (
          <DonationItemFormTwo
            setFormData={setFormData}
            formData={formData}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        );
      case 4:
        return (
          <DonationItemFormThree
            setFormData={setFormData}
            formData={formData}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        );
      case 5:
        return <Loading />;
      case 6:
        return <SubmissionComplete />;
    }
  };

  return (
    <div className="relative grid min-h-[calc(100vh-115px)] place-items-center bg-dot-large-slate-400/50">
      <Card className="z-20 w-[400px]">{displayPage()}</Card>
      <div className="pointer-events-none absolute z-10 h-full w-full bg-gradient-to-t from-background via-background/0 to-background"></div>
      <div className="pointer-events-none absolute z-10 h-full w-full bg-gradient-to-l from-background via-background/0 to-background"></div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-8 text-xl font-medium">
      <svg
        aria-hidden="true"
        className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="text-center">Submitting request to database...</span>
    </div>
  );
};
const SubmissionComplete = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Donation Request Success!</CardTitle>
        <CardDescription className="text-center">
          Your donation request has been submitted successfully and will now
          appear on the site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
export default Page;
