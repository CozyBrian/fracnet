
import LoadingSpinner from '@/components/layout/loadingSpinner'
import PatientScansTable from '@/components/patientScansTable'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { IScanResult } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/')({
  component: Index,
});

function Index(){
  const authAxios = useAxiosAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["patients", "scanresults"],
    queryFn: () => authAxios.get<IScanResult[]>("/patients/scanresults/"),
  });

  const scans = data?.data || [];

  return (
    <div className='w-full h-full flex flex-col items-center px-16 gap-10'>
      <div className='w-full flex flex-row gap-10'>
        <div className='h-[150px] rounded-md flex flex-col justify-between p-5 flex-1 shadow'>
          <p className='text-xl font-medium'>Number of Scans</p>
          <p className='text-5xl font-bold'>{scans.length}</p>
        </div>
        <div className='h-[150px] rounded-md flex flex-col justify-between p-5 flex-1 shadow'>
          <p className='text-xl font-medium'>Total Positive Scans</p>
          <p className='text-5xl font-bold'>0</p>
        </div>
        <div className='h-[150px] rounded-md flex flex-col justify-between p-5 flex-1 shadow'>
          <p className='text-xl font-medium'>Total Negative Scans</p>
          <p className='text-5xl font-bold'>0</p>
        </div>
      </div>
      {isLoading ? (
       <LoadingSpinner /> 
      ) : (
        <PatientScansTable scans={scans} />
      )}
    </div>
  )
}
