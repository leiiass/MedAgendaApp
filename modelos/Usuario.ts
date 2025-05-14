import { TipoUsuario } from "./TipoUsuario";

export type Usuario = {
  id?: number;
  nome?: string;
  email: string;
  password: string;
  tipo: TipoUsuario;
};