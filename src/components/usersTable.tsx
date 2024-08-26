import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const UsersTable = ({ users }: {users: { 
  lastname: string;
  email: string;
  username: string;
  lastlogin: string;
 }[]
}) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="bg-[#0D1840]">
        <TableRow>
          <TableHead className="text-white">Username</TableHead>
          <TableHead className="text-white">Name</TableHead>
          <TableHead className="text-white">Email</TableHead>
          <TableHead className="text-white">Last Login</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, i) => (
          <TableRow key={i}>
           <TableCell>
             {user.username}
            </TableCell>
           <TableCell>{user.lastname}</TableCell>
           <TableCell>{user.email}</TableCell>
           <TableCell>{user.lastlogin}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UsersTable