import { useState, useEffect } from "react";
import {
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
import { companyService } from "../../services/companyService";
import { Company } from "../../types/company";
import { Shell } from "../../layout/Shell/Shell";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

export function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    try {
      const res = await companyService.getAll();
      setCompanies(res);
    } catch (err: any) {
      console.error(err);
    }
  }

  const handleNewCompany = () => {
    navigate("/empresas/create");
  };

  const handleViewCompany = (id: string) => {
    navigate(`/empresas/${id}`);
  };

  return (
    <Shell>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Contas de Empresas</h2>
        <Button onClick={handleNewCompany}>Nova Empresa</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.cnpj}</TableCell>
                  <TableCell>
                    <Badge className="border-slate-300">{c.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        c.status === "active"
                          ? "border-emerald-300 text-emerald-700"
                          : "border-yellow-300 text-yellow-800"
                      }
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Edit
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                      size={18}
                      onClick={() => handleViewCompany(c.id)}
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
