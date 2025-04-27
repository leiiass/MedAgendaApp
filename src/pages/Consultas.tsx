
import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConsultaModal } from '@/components/consultas/ConsultaModal';
import { ConsultaList } from '@/components/consultas/ConsultaList';
import { Consulta, ConsultaStatus } from '@/types/entities';
import consultaService from '@/services/consultaService';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

const Consultas: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [status, setStatus] = useState<ConsultaStatus>('Agendada');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const fetchConsultas = async () => {
    setIsLoading(true);
    try {
      const data = await consultaService.getByStatus(status);
      setConsultas(data);
    } catch (error) {
      console.error('Error fetching consultas:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as consultas.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, [status]);

  const handleCreateSuccess = () => {
    fetchConsultas();
    setIsModalOpen(false);
    toast({
      title: 'Sucesso',
      description: 'Consulta criada com sucesso.',
    });
  };

  const handleUpdateStatus = async (id: number, newStatus: ConsultaStatus) => {
    try {
      await consultaService.updateStatus(id, newStatus);
      fetchConsultas();
      toast({
        title: 'Sucesso',
        description: `Consulta ${newStatus.toLowerCase()} com sucesso.`,
      });
    } catch (error) {
      console.error('Error updating consulta status:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status da consulta.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-medapp-dark">Consultas</h1>
          <p className="text-muted-foreground">Gerencie as consultas médicas.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-medapp-blue hover:bg-medapp-teal mt-4 sm:mt-0"
        >
          <Plus className="mr-2 h-4 w-4" />
          {isMobile ? 'Nova' : 'Nova Consulta'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Consultas</CardTitle>
          <CardDescription>
            Visualize e gerencie as consultas por status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Agendada" onValueChange={(value) => setStatus(value as ConsultaStatus)}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="Agendada">Agendadas</TabsTrigger>
                <TabsTrigger value="Realizada">Realizadas</TabsTrigger>
                <TabsTrigger value="Cancelada">Canceladas</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </div>
            
            <TabsContent value="Agendada">
              <ConsultaList
                consultas={consultas}
                isLoading={isLoading}
                onUpdateStatus={handleUpdateStatus}
              />
            </TabsContent>
            
            <TabsContent value="Realizada">
              <ConsultaList
                consultas={consultas}
                isLoading={isLoading}
                onUpdateStatus={handleUpdateStatus}
              />
            </TabsContent>
            
            <TabsContent value="Cancelada">
              <ConsultaList
                consultas={consultas}
                isLoading={isLoading}
                onUpdateStatus={handleUpdateStatus}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ConsultaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default Consultas;
