
import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExameModal } from '@/components/exames/ExameModal';
import { ExameList } from '@/components/exames/ExameList';
import { Exame, ExameStatus } from '@/types/entities';
import exameService from '@/services/exameService';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

const Exames: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exames, setExames] = useState<Exame[]>([]);
  const [status, setStatus] = useState<ExameStatus>('Agendado');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const fetchExames = async () => {
    setIsLoading(true);
    try {
      const data = await exameService.getByStatus(status);
      setExames(data);
    } catch (error) {
      console.error('Error fetching exames:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os exames.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExames();
  }, [status]);

  const handleCreateSuccess = () => {
    fetchExames();
    setIsModalOpen(false);
    toast({
      title: 'Sucesso',
      description: 'Exame criado com sucesso.',
    });
  };

  const handleUpdateStatus = async (id: number, newStatus: ExameStatus) => {
    try {
      await exameService.updateStatus(id, newStatus);
      fetchExames();
      toast({
        title: 'Sucesso',
        description: `Exame ${newStatus.toLowerCase()} com sucesso.`,
      });
    } catch (error) {
      console.error('Error updating exame status:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status do exame.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-medapp-dark">Exames</h1>
          <p className="text-muted-foreground">Gerencie os exames médicos.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-medapp-blue hover:bg-medapp-teal mt-4 sm:mt-0"
        >
          <Plus className="mr-2 h-4 w-4" />
          {isMobile ? 'Novo' : 'Novo Exame'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Exames</CardTitle>
          <CardDescription>
            Visualize e gerencie os exames por status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Agendado" onValueChange={(value) => setStatus(value as ExameStatus)}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="Agendado">Agendados</TabsTrigger>
                <TabsTrigger value="Realizado">Realizados</TabsTrigger>
                <TabsTrigger value="Cancelado">Cancelados</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </div>
            
            <TabsContent value="Agendado">
              <ExameList
                exames={exames}
                isLoading={isLoading}
                onUpdateStatus={handleUpdateStatus}
              />
            </TabsContent>
            
            <TabsContent value="Realizado">
              <ExameList
                exames={exames}
                isLoading={isLoading}
                onUpdateStatus={handleUpdateStatus}
              />
            </TabsContent>
            
            <TabsContent value="Cancelado">
              <ExameList
                exames={exames}
                isLoading={isLoading}
                onUpdateStatus={handleUpdateStatus}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ExameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default Exames;
