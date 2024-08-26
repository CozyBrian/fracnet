import LoadingSpinner from '@/components/layout/loadingSpinner';
import PatientsTable from '@/components/patientsTable';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/patientlist')({
  component: PatientList
})

function PatientList() {
  const authAxios = useAxiosAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: () => authAxios.get<{
      patient_id: string;
      name: string;
      gender: string;
    }[]>("/patients/all/"),
  });

  const scans = data?.data || [];

  return (
    <div className='w-full h-full flex flex-col items-center px-16'>
      {isLoading ? (
       <LoadingSpinner /> 
      ) : (
        <PatientsTable scans={scans} />
      )}
    </div>
  )
}