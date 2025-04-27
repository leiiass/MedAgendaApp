import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Consulta, ConsultaStatus } from "@/types/entities";
import { formatDate } from "@/utils/date";
import { Check, X } from "lucide-react";
import React from "react";

interface ConsultaListProps {
  consultas: Consulta[];
  isLoading: boolean;
  onUpdateStatus: (id: number, status: ConsultaStatus) => Promise<void>;
}

export const ConsultaList: React.FC<ConsultaListProps> = ({
  consultas,
  isLoading,
  onUpdateStatus,
}) => {
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-medapp-blue"></div>
      </div>
    );
  }

  if (consultas.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Nenhuma consulta encontrada.</p>
      </div>
    );
  }

  const renderStatusBadge = (status: ConsultaStatus) => {
    switch (status) {
      case "Agendada":
        return <span className="status-badge-pending">Agendada</span>;
      case "Realizada":
        return <span className="status-badge-completed">Realizada</span>;
      case "Cancelada":
        return <span className="status-badge-cancelled">Cancelada</span>;
      default:
        return <span className="status-badge-pending">Pendente</span>;
    }
  };

  const renderActionButtons = (consulta: Consulta) => {
    if (consulta.status === "Agendada") {
      return (
        <div className="flex space-x-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 border-red-200"
            onClick={() => onUpdateStatus(consulta.id, "Cancelada")}
          >
            <X className="h-4 w-4" />
            {!isMobile && <span className="ml-1">Cancelar</span>}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-green-500 border-green-200"
            onClick={() => onUpdateStatus(consulta.id, "Realizada")}
          >
            <Check className="h-4 w-4" />
            {!isMobile && <span className="ml-1">Concluir</span>}
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {consultas.map((consulta) => (
        <Dialog key={consulta.id}>
          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="space-y-1 mb-2 md:mb-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{consulta.paciente?.nome}</h4>
                  {renderStatusBadge(consulta.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Dr(a). {consulta.medico?.nome} -{" "}
                  {consulta.medico?.especialidade?.nome}
                </p>
                <p className="text-sm text-medapp-blue">
                  {formatDate(consulta.dataHora, "dd 'de' MMMM', às' HH:mm")}
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end space-x-2">
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </DialogTrigger>
                {renderActionButtons(consulta)}
              </div>
            </div>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes da Consulta</DialogTitle>
              <DialogDescription>
                Informações completas sobre a consulta.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Paciente
                  </h4>
                  <p className="text-base">{consulta.paciente?.nome}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h4>
                  <p className="text-base">{consulta.status}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Médico
                  </h4>
                  <p className="text-base">Dr(a). {consulta.medico?.nome}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Especialidade
                  </h4>
                  <p className="text-base">
                    {consulta.medico?.especialidade?.nome}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Data
                  </h4>
                  <p className="text-base">
                    {formatDate(consulta.dataHora, "dd/MM/yyyy")}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Hora
                  </h4>
                  <p className="text-base">
                    {formatDate(consulta.dataHora, "HH:mm")}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Ações
                </h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  {consulta.status === "Agendada" && (
                    <>
                      <Button
                        variant="outline"
                        className="text-red-500 border-red-200"
                        onClick={() => onUpdateStatus(consulta.id, "Cancelada")}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar Consulta
                      </Button>
                      <Button
                        variant="outline"
                        className="text-green-500 border-green-200"
                        onClick={() => onUpdateStatus(consulta.id, "Realizada")}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Marcar como Realizada
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};
