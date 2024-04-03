import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

type Props = {
  nextPage: () => void;
  prevPage: () => void;
  formData: any;
  setFormData: (data: any) => void;
};

const formSchema = z
  .object({
    name: z.string().min(3),
    current: z.number().min(0),
    needed: z.number().min(0),
  })
  .refine((data) => data.current < data.needed, {
    message: "Needed must be greater than current",
  });

type FormInputs = z.infer<typeof formSchema>;

const DonationItemFormOne = ({
  nextPage,
  prevPage,
  formData,
  setFormData,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formData?.donationItems?.[0]?.name,
      current: formData?.donationItems?.[0]?.current,
      needed: formData?.donationItems?.[0]?.needed,
    },
  });

  const onSubmit = (data: FormInputs) => {
    const donationItems = formData?.donationItems || [];
    // Make the donationItem in the 0th index the first donation item
    donationItems[0] = data;
    setFormData({
      ...formData,
      donationItems,
    });
    nextPage();
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Donation Request Submission</CardTitle>
        <CardDescription>
          Fill in the top three donation items needed by your organization.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label id="donation-name" htmlFor="donation-name">
                Donation Item #1
              </Label>
              <Input
                id="donation-name"
                {...register("name")}
                placeholder="Clothes, canned goods, etc."
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex space-x-1.5">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="current">Current Amount</Label>
                  <Input
                    id="current"
                    placeholder="How much you have"
                    type="number"
                    {...register("current", { valueAsNumber: true })}
                  />
                  {errors.current && (
                    <p className="text-sm text-red-500">
                      {errors.current.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="needed">Needed Amount</Label>
                  <Input
                    id="needed"
                    placeholder="How much you need"
                    type="number"
                    {...register("needed", { valueAsNumber: true })}
                  />
                  {errors.needed && (
                    <p className="text-sm text-red-500">
                      {errors.needed.message}
                    </p>
                  )}

                  {(errors as any)[""] && (
                    <p className="text-sm text-red-500">
                      {(errors as any)[""].message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => {
              prevPage();
            }}
            variant="outline"
          >
            Back
          </Button>

          <Button type="submit">Next</Button>
        </CardFooter>
      </form>
    </>
  );
};
export default DonationItemFormOne;
