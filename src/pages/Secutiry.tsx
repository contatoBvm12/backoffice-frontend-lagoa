import { useState } from "react";
import { Label } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
} from "../components/ui";
import { authService } from "../services/authService";
import { Shell } from "../layout/Shell/Shell";
import { LockKeyhole } from "lucide-react";

export function SecurityPage() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    if (next !== confirm) {
      setErr("Nova senha e confirmação não coincidem.");
      return;
    }
    try {
      setLoading(true);
      await authService.changePassword(current, next);
      setMsg("Senha alterada.");
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (error: any) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Shell>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <LockKeyhole className="h-5 w-5" /> Segurança
      </h2>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Alteração de Senha</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label>Senha atual</Label>
              <Input
                type="password"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Nova senha</Label>
              <Input
                type="password"
                value={next}
                onChange={(e) => setNext(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirmar nova senha</Label>
              <Input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            {msg && <div className="text-sm text-emerald-700">{msg}</div>}
            {err && <div className="text-sm text-red-600">{err}</div>}
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Shell>
  );
}
