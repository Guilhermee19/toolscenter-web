"use client";

import { ReactNode } from "react"; // Importando ReactNode para definir children como prop

interface CardScreenProps {
  children: ReactNode; // Definindo children como prop do tipo ReactNode
}

const CardScreen = ({ children }: CardScreenProps) => {
  const isHomeRoute = window.location.pathname === "/"; // Você pode usar o uso de roteador aqui, caso necessário

  return (
    <div className="relative w-full flex flex-1 lg:ml-2 h-[calc(100dvh-2rem)] lg:h-auto">
      {/* Imagem de fundo com efeito de degradê */}
      {isHomeRoute && <div className="bg-image-with-gradient"></div>}

      <div className="flex h-11/12 mt-auto w-full flex-1 flex-col gap-2 rounded-2xl bg-[#1f2735] p-4 md:p-6 shadow-2xl">
        {children} {/* Exibindo os children passados para o componente */}
      </div>
    </div>
  );
};

export default CardScreen;
