import { Button, Input } from "../../../components/ui";

interface UserFormProps {
  form: {
    fullName: string;
    cpf: string;
    email: string;
    phone: string;
    password: string;
  };
  isNew: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export function UserForm({
  form,
  isNew,
  onChange,
  onSubmit,
  onBack,
}: UserFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Nome completo</label>
          <Input
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">CPF</label>
          <Input
            mask="999.999.999-99"
            placeholder="000.000.000-00"
            onlyNumbers
            name="cpf"
            value={form.cpf}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Telefone</label>
          <Input
            mask="(99) 99999-9999"
            placeholder="(00) 00000-0000"
            onlyNumbers
            name="phone"
            value={form.phone}
            onChange={onChange}
          />
        </div>

        <div>
          <label className="block mb-1">Senha</label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="ghost" onClick={onBack}>
          Voltar
        </Button>
        <Button type="submit">{isNew ? "Criar" : "Salvar"}</Button>
      </div>
    </form>
  );
}
