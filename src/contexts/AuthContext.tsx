import { useToast } from "@/hooks/use-toast";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService, {
  LoginRequest,
  RegisterRequest,
} from "../services/authService";
import { AuthState } from "../types/entities";

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const user = await authService.getCurrentUser();
          setAuthState({
            isAuthenticated: true,
            token,
            user,
          });
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    try {
      const { token, user } = await authService.login(credentials);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setAuthState({
        isAuthenticated: true,
        token,
        user,
      });

      toast({
        title: "Login bem-sucedido",
        description: `Bem-vindo, ${user.nome}!`,
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    setLoading(true);
    try {
      const { token, user } = await authService.register(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setAuthState({
        isAuthenticated: true,
        token,
        user,
      });

      toast({
        title: "Registro bem-sucedido",
        description: `Bem-vindo, ${user.nome}!`,
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erro ao registrar",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setAuthState({
        isAuthenticated: false,
        token: null,
        user: null,
      });
      navigate("/login");
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if API call fails
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuthState({
        isAuthenticated: false,
        token: null,
        user: null,
      });
      navigate("/login");
    }
  };

  const value = {
    ...authState,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
