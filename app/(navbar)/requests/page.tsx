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
import { useEffect, useState } from "react";
import DonationItemFormOne from "./components/donation-item-form-one";
import DonationItemFormTwo from "./components/donation-item-form-two";
import DonationItemFormThree from "./components/donation-item-form-three";

type Props = {};
const Page = (props: Props) => {
  const [page, setPage] = useState(5);
  const [formData, setFormData] = useState({});

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

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

const SubmissionComplete = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Request Success!</CardTitle>
        <CardDescription>
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
