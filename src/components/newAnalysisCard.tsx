import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./formElements/input";
import { useForm } from "react-hook-form";
import SingleImageDropzone from "./singleFileDropzone";
import { useMutation } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { IScan } from "@/types";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "@tanstack/react-router";

type formInput = {
  patientId: string;
  image: File;
}

function NewAnalysisCard() {
  const axios = useAxiosAuth();
  const navigate = useNavigate();
  const {
    watch, register, setValue, handleSubmit } = useForm<formInput>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["patients", "scan"],
    mutationFn: async (data: formInput) => {
      if (!data.image) {
        throw Error("No Error");
      }
      const formData = new FormData();
      formData.append("patient_id", data.patientId);
      formData.append("image", data.image);

      return axios.post<IScan>("/patients/analyse/", formData,  {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    },
    onSuccess: (data) => {
      navigate({ to: "/scans/$id", params: {
        id: data.data.scan_id
      }});
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='bg-[#3360FF] h-10 px-6 text-white'>
          New Analysis
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Scan</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col gap-2">
          <div>
            <Input label="Enter Patient ID" {...register("patientId", { required: true })}/>
          </div>
          <SingleImageDropzone
            dropzoneOptions={{
              maxFiles: 1,
              accept: {
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
              },
              maxSize: 5 * 1024 * 1024,
            }}
            height={280}
            width={373}
            label="Front"
            value={watch("image")}
            {...register("image")}
            onChange={(file) => setValue("image", file!)}
          />
        <DialogFooter>
          <Button type="submit" className="p-0 w-[130px]">
          {isPending ? (
            <Oval
              width={28}
              color="#fff"
              secondaryColor="#ffffff84"
              strokeWidth={3}
            />
            ): "Save changes" }
          </Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewAnalysisCard;