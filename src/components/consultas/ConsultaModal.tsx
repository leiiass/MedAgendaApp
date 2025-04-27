import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import consultaService from "@/services/consultaService";
import medicoService from "@/services/medicoService";
import pacienteService from "@/services/pacienteService";
import { Medico, Paciente } from "@/types/entities";
import { formatDate } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ConsultaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

const formSchema = z.object({
  pacienteId: z.string().min(1, "Selecione um paciente"),
  medicoId: z.string().min(1, "Selecione um médico"),
  data: z.date({
    required_error: "Selecione uma data",
  }),
  hora: z.string().min(1, "Selecione um horário"),
});

export const ConsultaModal: React.FC<ConsultaModalProps> = ({
  isOpen,
  onClose,
  onCreateSuccess,
}) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pacienteId: "",
      medicoId: "",
      hora: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pacientesData, medicosData] = await Promise.all([
          pacienteService.getAll(),
          medicoService.getAll(),
        ]);
        setPacientes(pacientesData);
        setMedicos(medicosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      // Combine date and time
      const [hour, minute] = values.hora.split(":");
      const dataHora = new Date(values.data);
      dataHora.setHours(parseInt(hour), parseInt(minute));

      await consultaService.create({
        pacienteId: parseInt(values.pacienteId),
        medicoId: parseInt(values.medicoId),
        dataHora: dataHora.toISOString(),
        status: "Agendada",
      });

      form.reset();
      onCreateSuccess();
    } catch (error) {
      console.error("Error creating consulta:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Consulta</DialogTitle>
          <DialogDescription>
            Preencha os dados para agendar uma nova consulta.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="pacienteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paciente</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um paciente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {pacientes.map((paciente) => (
                        <SelectItem
                          key={paciente.id}
                          value={paciente.id.toString()}
                        >
                          {paciente.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Médico</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um médico" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {medicos.map((medico) => (
                        <SelectItem
                          key={medico.id}
                          value={medico.id.toString()}
                        >
                          {medico.nome} - {medico.especialidade?.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              formatDate(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          locale={ptBR}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hora"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="mr-2"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-medapp-blue hover:bg-medapp-teal"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Agendando..." : "Agendar Consulta"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
