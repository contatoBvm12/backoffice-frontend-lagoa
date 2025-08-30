import { useState, useEffect } from "react";
import {
  Select,
  Card,
  CardContent,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  Badge,
  Button,
} from "../../components/ui";
import { userService } from "../../services/userService";
import { User } from "../../types/user";
import { Shell } from "../../layout/Shell/Shell";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UsersPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await userService.getAll();
        setUsers(res);
      } catch (err: any) {
        console.error(err);
      }
    }

    fetchUsers();
  }, []);

  const handleNewUser = () => {
    navigate(`/usuarios/create`);
  };

  const handleViewUser = (cpf: string) => {
    navigate(`/usuarios/${cpf}`);
  };

  return (
    <Shell>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Usuários</h2>
        <Button onClick={handleNewUser}>Novo Usuário</Button>
      </div>

      <div className="flex items-center justify-between">
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todos</option>
          <option value="active">Ativos</option>
          <option value="blocked">Bloqueados</option>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.fullName}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge className="border-slate-300">{u.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        u.status === "active"
                          ? "border-emerald-300 text-emerald-700"
                          : "border-red-300 text-red-700"
                      }
                    >
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Edit
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                      size={18}
                      onClick={() => handleViewUser(u.cpf)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Shell>
  );
}
