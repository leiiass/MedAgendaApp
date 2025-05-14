import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Dados mockados para simulação
const users = [
  {
    id: 1,
    nome: "Admin",
    email: "admin@example.com",
    password: "$2a$10$X7UrH5YxX5YxX5YxX5YxX.5YxX5YxX5YxX5YxX5YxX5YxX5YxX5YxX",
    role: "admin",
  },
];

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    },
  });
};

export const register = async (req: Request, res: Response) => {
  const { nome, email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    nome,
    email,
    password: hashedPassword,
    role: "user",
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  );

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      nome: newUser.nome,
      email: newUser.email,
      role: newUser.role,
    },
  });
};

export const logout = async (req: Request, res: Response) => {
  res.json({ message: "Logout realizado com sucesso" });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.user?.id);
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  res.json({
    id: user.id,
    nome: user.nome,
    email: user.email,
    role: user.role,
  });
};
