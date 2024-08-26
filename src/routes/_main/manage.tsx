import LoadingSpinner from '@/components/layout/loadingSpinner';
import PatientScansTable from '@/components/patientScansTable';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import { IScanResult } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/manage')({
  component: ManagePage,
})

function getClassList(data: IScanResult[]) {
  const m = ['avulsion', 'comminuted', 'greenstick', 'hairline', 'impacted', 'oblique', 'pathological', 'spiral'];
  const map = new Map<string, number>()

  m.forEach(item => {
    map.set(item, 0);
  });

  data.forEach(item => {
    if (map.has(item.p_class)) {
      map.set(item.p_class, map.get(item.p_class)! + 1);
    } else {  
      map.set(item.p_class, 1);
    }
  })

  return Array.from(map.entries()).map(([key, value]) => ({ key, value }));
}


function ManagePage() {
  const authAxios = useAxiosAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["patients", "scanresults"],
    queryFn: () => authAxios.get<IScanResult[]>("/patients/scanresults/"),
  });

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["patients", "users"],
    queryFn: () => authAxios.get<{ 
      lastname: string;
      email: string;
      username: string;
      lastlogin: string;
     }[]>("/auth/users/"),
  });

  const scans = data?.data || [];

  const classList = getClassList(scans);

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
      <div className='w-full grid grid-cols-4 gap-10'>
        {classList.map((item) => (
          <div key={item.key} className='h-[150px] rounded-md flex flex-col justify-between p-5 flex-1 shadow'>
            <p className='text-xl font-medium'>Total {item.key}</p>
            <p className='text-5xl font-bold'>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}