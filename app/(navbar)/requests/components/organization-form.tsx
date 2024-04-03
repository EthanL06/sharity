import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  nextPage: () => void;
  formData: any;
  setFormData: (data: any) => void;
};
const formSchema = z.object({
  name: z.string().min(3).max(50),
  address: z.string().min(3).max(100),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

type FormInputs = z.infer<typeof formSchema>;

const OrganizationForm = ({ nextPage, formData, setFormData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formData.name,
      address: formData.address,
      latitude: formData.latitude,
      longitude: formData.longitude,
    },
  });

  const onSubmit = (data: FormInputs) => {
    setFormData({
      ...formData,
      name: data.name,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
    });

    nextPage();
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Donation Request Submission</CardTitle>
        <CardDescription>
          Fill in the details of your organization.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Name of organization"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register("address")}
                placeholder="Address of organization"
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>
            <div className="flex space-x-1.5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="latitude">Latitude</Label>
                <Input id="latitude" {...register("latitude")} />
                {errors.latitude && (
                  <p className="text-sm text-red-500">
                    {errors.latitude.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="longitude">Longitude</Label>
                <Input id="longitude" {...register("longitude")} />
                {errors.longitude && (
                  <p className="text-sm text-red-500">
                    {errors.longitude.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline">Cancel</Button>
          </Link>

          <Button type="submit">Next</Button>
        </CardFooter>
      </form>
    </>
  );
};
export default OrganizationForm;
