"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.logout = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }
    const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });
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
exports.login = login;
const register = async (req, res) => {
    const { nome, email, password } = req.body;
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "Email já cadastrado" });
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = {
        id: users.length + 1,
        nome,
        email,
        password: hashedPassword,
        role: "user",
    };
    users.push(newUser);
    const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });
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
exports.register = register;
const logout = async (req, res) => {
    res.json({ message: "Logout realizado com sucesso" });
};
exports.logout = logout;
const getCurrentUser = async (req, res) => {
    const user = users.find((u) => { var _a; return u.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); });
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
exports.getCurrentUser = getCurrentUser;
