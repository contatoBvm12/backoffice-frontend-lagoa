import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../components/ui";
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

export function FinancePage() {
  return (
    <Shell>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      <Card>
        <CardHeader>
          <CardTitle>Livro Razão</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFinance.ledger.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.id}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.label}</TableCell>
                  <TableCell>
                    {new Date(tx.date).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      tx.amount < 0 ? "text-red-600" : "text-emerald-700"
                    }`}
                  >
                    {tx.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
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
