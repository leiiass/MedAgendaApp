# MedAgendaApp (Frontend)

Aplicativo mobile criado com *React Native* utilizando *Expo*, focado na gestão de agendamentos médicos.  
Este repositório contém a *parte do cliente (frontend)* da aplicação, que *já está integrada com a API* hospedada em outro repositório.

### 🎬 Video da apresentação do projeto
- [Apresentação do projeto](https://drive.google.com/file/d/1zCVifnTDqTuPjPHXvCwBrk5iSBmy432P/view?usp=sharing)

### 👩‍💻👨‍💻 Desenvolvedores do Grupo 13
> - FLAVIO RICARDO PRADO PASTROLIN
> - GUILHERME DE LIMA IRGANG
> - JAYANNE QUEIROZ MOURA
> - KARINE DIAS RAMALHO
> - LEIA SOARES DA SILVA MENDES
> - TIFFANY PAULINO DA SILVA
> - VICTOR DE SOUZA SANTOS

## 🚀 Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/)
- [Eslint + Prettier](https://eslint.org/)

## 📁 Estrutura de pastas


app/                     # Telas e rotas da aplicação
├── dashboard/           # Tela principal após login
├── dashboard-medico/    # Dashboard específico para médicos
├── login/               # Tela de login
├── register/            # Tela de registro
├── nova-consulta/       # Agendamento de nova consulta
├── meu-perfil-medico/   # Perfil médico
├── meu-perfil-paciente/ # Perfil paciente
└── usuario/             # Configurações do usuário

assets/                  # Imagens e fontes
components/              # Componentes reutilizáveis
constants/               # Constantes da aplicação
hooks/                   # Hooks personalizados
modelos/                 # Tipagens e modelos
scripts/                 # Scripts auxiliares
services/                # Serviços de comunicação com a API


## ▶️ Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- Expo CLI instalado globalmente (opcional):  
  npm install -g expo-cli

### Passos

```bash
# Instale as dependências
npm install

# Inicie o projeto
npx expo start



