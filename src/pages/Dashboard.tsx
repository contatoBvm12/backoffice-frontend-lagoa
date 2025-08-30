import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui";
import { KPI } from "../layout/KPI/KPI";
import { Shell } from "../layout/Shell/Shell";

const mockFinance = {
  mrr: 128000,
  arr: 1536000,
  churnRate: 2.1,
  arpu: 420,
  ledger: [
    {
      id: "TX-5001",
      type: "credit",
      label: "Assinatura Plano Pro - Acme",
      amount: 3500,
      date: "2025-08-01",
    },
    {
      id: "TX-5002",
      type: "debit",
      label: "Reembolso parcial - Globex",
      amount: -500,
      date: "2025-08-03",
    },
    {
      id: "TX-5003",
      type: "credit",
      label: "Assinatura Plano Business - Globex",
      amount: 5900,
      date: "2025-08-05",
    },
  ],
};

export function DashboardPage() {
  const series = [
    { name: "Jan", value: 24 },
    { name: "Fev", value: 28 },
    { name: "Mar", value: 32 },
    { name: "Abr", value: 31 },
    { name: "Mai", value: 36 },
    { name: "Jun", value: 40 },
    { name: "Jul", value: 45 },
  ];
  const bar = [
    { name: "Receita", value: 58 },
    { name: "Custos", value: 22 },
    { name: "Lucro", value: 36 },
  ];

  return (
    <Shell>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPI
          title="MRR"
          value={`R$ ${mockFinance.mrr.toLocaleString("pt-BR")}`}
        />
        <KPI
          title="ARR"
          value={`R$ ${mockFinance.arr.toLocaleString("pt-BR")}`}
        />
        <KPI title="Churn" value={`${mockFinance.churnRate}%`} />
        <KPI
          title="ARPU"
          value={`R$ ${mockFinance.arpu.toLocaleString("pt-BR")}`}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Crescimento de Assinaturas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Receita vs Custos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bar}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}
