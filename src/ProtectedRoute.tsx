import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Lê a senha de forma segura a partir das variáveis de ambiente
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se a senha já foi validada nesta sessão do navegador
    const sessionAuth = sessionStorage.getItem('isAdminAuthenticated');

    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      // Pede a senha ao usuário
      const password = prompt('Para aceder a esta página, por favor, insira a senha de administrador:');
      
      // Compara a senha digitada com a senha da nossa variável de ambiente
      if (password === ADMIN_PASSWORD) {
        // Se estiver correta, marca como autenticado para esta sessão
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        setIsAuthenticated(true);
      } else {
        // Se estiver errada, avisa o usuário e o envia de volta para a página inicial
        alert('Senha incorreta!');
        navigate('/'); 
      }
    }
  }, [navigate]);

  // Se o usuário ainda não estiver autenticado, não mostra nada (ou poderia mostrar um "Carregando...")
  if (!isAuthenticated) {
    return null;
  }

  // Se a autenticação for um sucesso, mostra a página de admin que está "dentro" deste componente
  return <>{children}</>;
};

export default ProtectedRoute;