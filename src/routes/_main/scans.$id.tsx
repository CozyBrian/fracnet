import TextArea from '@/components/formElements/textArea';
import LoadingSpinner from '@/components/layout/loadingSpinner';
import { Button } from '@/components/ui/button';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react';
import { Oval } from 'react-loader-spinner';

type Scan = {
  patient_id: string;
  date: string;
  patient_name: string;
  gender: string;
  status: string;
  patient_class: string;
  remarks: null;
  image_base64: string;
}

export const Route = createFileRoute('/_main/scans/$id')({
  component: ScanDetailsPage,
});

function ScanDetailsPage() {
  const authAxios = useAxiosAuth();
  const params = Route.useParams();
  const [remarks, setRemarks] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["scan", params.id],
    queryFn: () => authAxios.post<Scan>("/patients/viewdetails/", {
      scan_id: params.id,
    }),
  });

  const scan = data?.data;
  
  const { mutate: print } = useMutation({
    mutationKey: ["print", params.id],
    mutationFn: () => authAxios.post("/patients/print/", scan),
  });

  const { mutate: save, isPending } = useMutation({
    mutationKey: ["scan", params.id],
    mutationFn: () => authAxios.post("/patients/save/", {
      patient_id: scan?.patient_id,
      scan_id: params.id,
      remarks: remarks,
    }),
  });

  useEffect(() => {
    if (scan) setRemarks(scan.remarks ?? "")
  }, [scan])

  const imageUrl = useMemo(() => {
    return getImageFromB64(scan!.image_base64)
  }, [scan])

  return (
    <div className='flex flex-col gap-5'>
      <h2 className="text-3xl font-semibold">Results</h2>
      {isLoading && <div className='w-full h-[400px] flex items-center justify-center'>
        <LoadingSpinner />
        </div>
      }
      {scan && (
        <div className='flex flex-row gap-10'>
          <div className='w-[400px] h-[400px] bg-slate-200'>
            <img src={imageUrl} className='w-[400px] h-[400px] object-contain' alt="scan" />
          </div>
          <div className='w-[350px] flex flex-col gap-4'>
            <div className='grid grid-cols-2 gap-x-8 gap-y-3'>
              <p className='font-bold text-xl'>Patients ID:</p>
              <p className='text-xl'>{scan.patient_id}</p>
              <p className='font-bold text-xl'>Name:</p>
              <p className='text-xl'>{scan.patient_name}</p>
              <p className='font-bold text-xl'>Sex:</p>
              <p className='text-xl'>{scan.gender}</p>
              <p className='font-bold text-xl'>State:</p>
              <p className='text-xl'>{scan.status}</p>
              <p className='font-bold text-xl'>Class:</p>
              <p className='text-xl'>{scan.patient_class}</p>
            </div>
            <TextArea label='Remarks:' value={remarks} onChange={(e) => setRemarks(e.target.value)} labelClassName='font-bold text-xl' className='h-[150px]'/>
            <div className='flex flex-row justify-end gap-4'>
              <Button onClick={() => save()}>
              {isPending ? (
                <Oval
                width={28}
                color="#fff"
                secondaryColor="#ffffff84"
                strokeWidth={3}
              />
              ): "Save" }
              </Button>
              <Button onClick={() => print()} className='bg-[#3360FF] hover:bg-[#5276fa]'>Print Results</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getImageFromB64(base64String: string) {
  // Decode the Base64 string into a binary string
  const byteCharacters = atob(base64String);

  // Convert the binary string to an array of bytes
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // Convert the byte array to a Blob
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {type: 'image/png'});

  return URL.createObjectURL(blob);
}