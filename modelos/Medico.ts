import { Especialidade } from "./Especialidade"

export type Medico = {
    id?: number,
    nome: string,
    crm: string,
    email: string,
    telefone: string,
    especialidade: Especialidade
}