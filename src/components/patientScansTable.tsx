import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IScanResult } from "@/types"
import { useNavigate } from "@tanstack/react-router"
import { Ellipsis } from "lucide-react"

const PatientScansTable = ({
  scans
}:{
   
  scans: IScanResult[]
}) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="bg-[#0D1840]">
        <TableRow>
          <TableHead className="text-white">Scan ID</TableHead>
          <TableHead className="text-white">Name</TableHead>
          <TableHead className="text-white">Date</TableHead>
          <TableHead className="text-white">Results</TableHead>
          <TableHead className="text-white">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scans.map((scan, i) => (
          <TableRow key={i} className="cursor-pointer" onClick={() => navigate({ to: "/scans/$id", params: { id: scan.scan_id } })}>
            <TableCell>{scan.scan_id}</TableCell>
            <TableCell>{scan.patient_name}</TableCell>
            <TableCell>{scan.date}</TableCell>
            <TableCell>{scan.result}</TableCell>
            <TableCell>
              <button>
                <Ellipsis />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PatientScansTable
