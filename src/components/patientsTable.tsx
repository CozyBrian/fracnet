import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCopyToClipboard } from "@/hooks/useClipboard"
import { Copy } from "lucide-react"

const PatientsTable = ({
  scans
}:{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scans: any[]
}) => {
  const [, copy] = useCopyToClipboard()

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log('Copied!', { text })
      })
      .catch(error => {
        console.error('Failed to copy!', error)
      })
  }
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="bg-[#0D1840]">
        <TableRow>
          <TableHead className="text-white">Id</TableHead>
          <TableHead className="text-white">Name</TableHead>
          <TableHead className="text-white">Gender</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scans.map((patient, i) => (
          <TableRow key={i}>
           <TableCell>
              <div className="flex flex-row gap-2">
              {patient.patient_id} 
              
              <button onClick={() => handleCopy(patient.patient_id)}>
                <Copy size={16}/>
              </button>
              </div>
            </TableCell>
           <TableCell>{patient.name}</TableCell>
           <TableCell>{patient.gender}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PatientsTable
