import { Button, CardContent, Input } from "../../../components/ui";

interface CompanyFormProps {
  form: {
    name: string;
    cnpj: string;
    description: string;
    companySlug: string;
    type: string;
  };
  isNew: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack?: () => void;
}

export function CompanyForm({
  form,
  isNew,
  onChange,
  onSubmit,
  onBack,
}: CompanyFormProps) {
  return (
    <CardContent>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Nome</label>
            <Input name="name" value={form.name} onChange={onChange} required />
          </div>

          <div>
            <label className="block mb-1">CNPJ</label>
            <Input name="cnpj" value={form.cnpj} onChange={onChange} required />
          </div>

          <div>
            <label className="block mb-1">Descrição</label>
            <Input
              name="description"
              value={form.description}
              onChange={onChange}
            />
          </div>

          <div>
            <label className="block mb-1">Apelido</label>
            <Input
              name="companySlug"
              value={form.companySlug}
              onChange={onChange}
            />
          </div>

          <div>
            <label className="block mb-1">Tipo</label>
            <Input name="type" value={form.type} onChange={onChange} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={onBack}>
            Voltar
          </Button>
          <Button type="submit">{isNew ? "Criar" : "Salvar"}</Button>
        </div>
      </form>
    </CardContent>
  );
}
