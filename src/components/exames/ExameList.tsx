import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import exameService from "@/services/exameService";
import { Exame, ExameStatus } from "@/types/entities";
import { formatDate } from "@/utils/date";
import { Check, X } from "lucide-react";
import React, { useState } from "react";

interface ExameListProps {
  exames: Exame[];
  isLoading: boolean;
  onUpdateStatus: (id: number, status: ExameStatus) => Promise<void>;
}

export const ExameList: React.FC<ExameListProps> = ({
  exames,
  isLoading,
  onUpdateStatus,
}) => {
  const isMobile = useIsMobile();
  const [resultadoExame, setResultadoExame] = useState("");
  const [selectedExameId, setSelectedExameId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-medapp-blue"></div>
      </div>
    );
  }

  if (exames.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Nenhum exame encontrado.</p>
      </div>
    );
  }

  const renderStatusBadge = (status: ExameStatus) => {
    switch (status) {
      case "Agendado":
        return <span className="status-badge-pending">Agendado</span>;
      case "Realizado":
        return <span className="status-badge-completed">Realizado</span>;
      case "Cancelado":
        return <span className="status-badge-cancelled">Cancelado</span>;
      default:
        return <span className="status-badge-pending">Pendente</span>;
    }
  };

  const handleSaveResultado = async () => {
    if (!selectedExameId || !resultadoExame.trim()) return;

    setIsSaving(true);
    try {
      await exameService.addResultado(selectedExameId, resultadoExame);
      await onUpdateStatus(selectedExameId, "Realizado");
      setResultadoExame("");
      setSelectedExameId(null);
      toast({
        title: "Sucesso",
        description: "Resultado do exame salvo com sucesso.",
      });
    } catch (error) {
      console.error("Error saving exame result:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o resultado do exame.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderActionButtons = (exame: Exame) => {
    if (exame.status === "Agendado") {
      return (
        <div className="flex space-x-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 border-red-200"
            onClick={() => onUpdateStatus(exame.id, "Cancelado")}
          >
            <X className="h-4 w-4" />
            {!isMobile && <span className="ml-1">Cancelar</span>}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-green-500 border-green-200"
            onClick={() => {
              setSelectedExameId(exame.id);
              setResultadoExame(exame.resultado || "");
            }}
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
      {exames.map((exame) => (
        <Dialog key={exame.id}>
          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="space-y-1 mb-2 md:mb-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{exame.paciente?.nome}</h4>
                  {renderStatusBadge(exame.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Tipo: <span className="font-medium">{exame.tipo}</span> -
                  Dr(a). {exame.medico?.nome}
                </p>
                <p className="text-sm text-medapp-blue">
                  {formatDate(exame.dataHora, "dd 'de' MMMM', às' HH:mm")}
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end space-x-2">
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </DialogTrigger>
                {renderActionButtons(exame)}
              </div>
            </div>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes do Exame</DialogTitle>
              <DialogDescription>
                Informações completas sobre o exame.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Paciente
                  </h4>
                  <p className="text-base">{exame.paciente?.nome}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h4>
                  <p className="text-base">{exame.status}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Tipo de Exame
                  </h4>
                  <p className="text-base">{exame.tipo}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Médico
                  </h4>
                  <p className="text-base">Dr(a). {exame.medico?.nome}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Data
                  </h4>
                  <p className="text-base">
                    {formatDate(exame.dataHora, "dd/MM/yyyy")}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Hora
                  </h4>
                  <p className="text-base">
                    {formatDate(exame.dataHora, "HH:mm")}
                  </p>
                </div>
              </div>

              {exame.resultado && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Resultado
                  </h4>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    {exame.resultado}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Ações
                </h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  {exame.status === "Agendado" && (
                    <>
                      <Button
                        variant="outline"
                        className="text-red-500 border-red-200"
                        onClick={() => onUpdateStatus(exame.id, "Cancelado")}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar Exame
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}

      {/* Modal para adicionar resultado do exame */}
      <Dialog
        open={selectedExameId !== null}
        onOpenChange={(open) => !open && setSelectedExameId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Resultado do Exame</DialogTitle>
            <DialogDescription>
              Informe o resultado do exame para concluí-lo.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <Textarea
              placeholder="Digite o resultado do exame aqui..."
              className="min-h-[150px]"
              value={resultadoExame}
              onChange={(e) => setResultadoExame(e.target.value)}
            />

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setSelectedExameId(null)}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveResultado}
                className="bg-medapp-blue hover:bg-medapp-teal"
                disabled={isSaving || !resultadoExame.trim()}
              >
                {isSaving ? "Salvando..." : "Salvar e Concluir Exame"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
