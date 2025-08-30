import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { companyService } from "../../services/companyService";
import { Shell } from "../../layout/Shell/Shell";
import {
  Card,
  CardContent,
  Input,
  Table,
  Badge,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "../../components/ui";
import { User } from "../../types/user";
import { CompanyForm } from "./components/CompanyForm";

interface CompanyForm {
  name: string;
  cnpj: string;
  description: string;
  type: string;
  companySlug: string;
}

export function CompanyDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = !id;

  const [activeTab, setActiveTab] = useState<"empresa" | "colaboradores">(
    "empresa"
  );

  const [form, setForm] = useState<CompanyForm>({
    name: "",
    cnpj: "",
    description: "",
    type: "",
    companySlug: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    const fetchCompany = async () => {
      try {
        const company = await companyService.getById(id!);
        setForm({
          name: company.name,
          cnpj: company.cnpj,
          description: company.description || "",
          type: company.type || "",
          companySlug: company.companySlug,
        });
      } catch (err) {
        console.error("Erro ao buscar empresa:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id, isNew]);

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await companyService.getUsersByCompanyId(id as string);
        setUsers(res);
      } catch (err: any) {
        console.error(err);
      }
    }

    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        await companyService.create(form);
        alert("Empresa criada com sucesso!");
      } else {
        await companyService.update(id!, form);
        alert("Empresa atualizada com sucesso!");
      }
      navigate("/empresas");
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => navigate("/empresas");

  const handleNewUser = () => {
    const companyId = id;
    navigate(`/empresas/create/user`, { state: { companyId } });
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <Shell>
      <div className="w-full">
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("empresa")}
            className={`px-4 py-2 ${
              activeTab === "empresa"
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            {isNew ? "Cadastrar Nova Empresa" : "Detalhes da Empresa"}
          </button>
          {!isNew && (
            <button
              onClick={() => setActiveTab("colaboradores")}
              className={`px-4 py-2 ${
                activeTab === "colaboradores"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Colaboradores
            </button>
          )}
        </div>
        <div>
          {activeTab === "empresa" && (
            <div>
              <Card>
                <CardContent>
                  <CompanyForm
                    form={form}
                    isNew={isNew}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onBack={handleBack}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "colaboradores" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Usuários</h2>
                <Button onClick={handleNewUser}>Novo Usuário</Button>
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
                          <TableCell className="font-medium">
                            {u.fullName}
                          </TableCell>
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
}
