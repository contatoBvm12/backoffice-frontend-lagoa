import {
  LayoutDashboard,
  Users,
  Building2,
  Wallet2,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui";
import { useAuth } from "../../context/AuthContext";

export function Sidebar() {
  const { logout, user } = useAuth();
  const nav = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    { to: "/usuarios", label: "Usuários", icon: <Users className="h-4 w-4" /> },
    {
      to: "/empresas",
      label: "Empresas",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      to: "/financeiro",
      label: "Financeiro",
      icon: <Wallet2 className="h-4 w-4" />,
    },
    {
      to: "/seguranca",
      label: "Segurança",
      icon: <ShieldCheck className="h-4 w-4" />,
    },
  ];
  return (
    <div className="hidden lg:flex w-64 flex-col border-r bg-white/60 backdrop-blur-sm">
      <div className="px-6 py-5 border-b">
        <div className="font-bold text-xl">Codex Backoffice</div>
        <div className="text-xs text-slate-500">Olá, {user?.fullName}</div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 text-sm"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" /> Sair
        </Button>
      </div>
    </div>
  );
}
