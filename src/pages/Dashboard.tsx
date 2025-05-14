import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import consultaService from "@/services/consultaService";
import exameService from "@/services/exameService";
import pacienteService from "@/services/pacienteService";
import { Consulta, Exame } from "@/types/entities";
import { formatDate } from "@/utils/date";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarClock, ClipboardList, Clock, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [consultasPendentes, setConsultasPendentes] = useState<Consulta[]>([]);
  const [examesPendentes, setExamesPendentes] = useState<Exame[]>([]);
  const [countPacientes, setCountPacientes] = useState(0);
  const [proximasConsultas, setProximasConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [consultasData, examesData, pacientesData] = await Promise.all([
          consultaService.getByStatus("Agendada"),
          exameService.getByStatus("Agendado"),
          pacienteService.getAll(),
        ]);

        setConsultasPendentes(consultasData);
        setExamesPendentes(examesData);
        setCountPacientes(pacientesData.length);

        // Order by date and get the next 5 appointments
        const orderedConsultas = [...consultasData]
          .sort(
            (a, b) =>
              new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
          )
          .slice(0, 5);

        setProximasConsultas(orderedConsultas);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 my-auto">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medapp-blue"></div>
      </div>
    );
  }

  const allPending = [
    ...(consultasPendentes || []),
    ...(examesPendentes || []),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-medapp-dark">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo(a), {user?.nome}! Aqui está um resumo das suas atividades.
          </p>
        </div>
        <div className="text-sm text-muted-foreground mt-2 md:mt-0">
          {format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Consultas Pendentes
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medapp-blue">
              {consultasPendentes.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {consultasPendentes.length === 1
                ? "Consulta agendada"
                : "Consultas agendadas"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Exames Pendentes
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medapp-blue">
              {examesPendentes.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {examesPendentes.length === 1
                ? "Exame agendado"
                : "Exames agendados"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pacientes Cadastrados
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medapp-blue">
              {countPacientes}
            </div>
            <p className="text-xs text-muted-foreground">
              {countPacientes === 1
                ? "Paciente no sistema"
                : "Pacientes no sistema"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Próxima Consulta
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {proximasConsultas.length > 0 ? (
              <>
                <div className="text-lg font-medium line-clamp-1">
                  {proximasConsultas[0].paciente?.nome}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDate(
                    proximasConsultas[0].dataHora,
                    "dd 'de' MMMM', às' HH:mm"
                  )}
                </p>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                Nenhuma consulta agendada
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            {proximasConsultas.length > 0 ? (
              <div className="space-y-4">
                {proximasConsultas.map((consulta) => (
                  <div key={consulta.id} className="border-b pb-3">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {consulta.paciente?.nome}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(new Date(consulta.dataHora), "dd/MM/yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">
                        Dr(a). {consulta.medico?.nome}
                      </span>
                      <span className="text-sm font-medium text-medapp-blue">
                        {formatDate(consulta.dataHora, "HH:mm")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                Nenhuma consulta agendada
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allPending.length > 0 ? (
                allPending
                  .sort(
                    (a, b) =>
                      new Date(b.dataHora || "").getTime() -
                      new Date(a.dataHora || "").getTime()
                  )
                  .slice(0, 5)
                  .map((item) => {
                    const isConsulta =
                      "pacienteId" in item && !("tipo" in item);
                    return (
                      <div
                        key={`${isConsulta ? "consulta" : "exame"}-${item.id}`}
                        className="border-b pb-3"
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {isConsulta ? "Consulta" : "Exame"}:{" "}
                            {item.paciente?.nome}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(item.dataHora, "dd/MM/yyyy")}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-muted-foreground">
                            {isConsulta
                              ? `Dr(a). ${item.medico?.nome}`
                              : `Tipo: ${(item as Exame).tipo}`}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              item.status === "Agendada" ||
                              item.status === "Agendado"
                                ? "bg-blue-100 text-blue-800"
                                : item.status === "Cancelada" ||
                                  item.status === "Cancelado"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  Nenhuma atividade recente
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
