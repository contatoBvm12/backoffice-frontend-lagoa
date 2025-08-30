import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui";

export function Topbar() {
  return (
    <div className="flex items-center justify-between px-4 lg:px-6 h-16 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="font-semibold">Backoffice</div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/seguranca"
          className="text-sm text-slate-600 hover:underline"
        >
          Alterar senha
        </Link>
      </div>
    </div>
  );
}
