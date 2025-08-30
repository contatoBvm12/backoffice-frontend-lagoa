import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui";
import { userService } from "../../services/userService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Shell } from "../../layout/Shell/Shell";
import { UserForm } from "./components/UserForm";
interface UserFormData {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  companyId: string | undefined;
  password: string;
}

export function UserDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = !id;

  const location = useLocation();
  const companyId = location.state?.companyId as string | undefined;

  const [form, setForm] = useState<UserFormData>({
    fullName: "",
    cpf: "",
    email: "",
    phone: "",
    isAdmin: false,
    companyId: companyId,
    password: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(location);

    if (isNew) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const user = await userService.getById(id!);
        setForm({
          fullName: user.fullName,
          cpf: user.cpf,
          email: user.email,
          phone: user.phoneNumber,
          isAdmin: user.isAdmin,
          companyId: user.companyId,
          password: user.password,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, isNew]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type } = e.target;
    const value =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        await userService.create(form);
        alert("Usuário criado com sucesso!");
      } else {
        await userService.update(id!, form);
        alert("Usuário atualizado com sucesso!");
      }
      navigate("/usuarios");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar usuário.");
    }
  };

  const handleBack = () => {
    if (!companyId) {
      navigate("/usuarios");
      return;
    }
    navigate(`/empresas/${companyId}`);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <Shell>
      <Card>
        <CardContent>
          <UserForm
            form={form}
            isNew={isNew}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        </CardContent>
      </Card>
    </Shell>
  );
}
