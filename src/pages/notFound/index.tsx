import { Link } from "react-router";
import { Container } from "../../components/container";

export function NotFound() {
  return (
    <Container>
      <div className="flex justify-center items-center flex-col h-dvh">
        <h1 className="font-bold text-6xl">404</h1>
        <h2 className="font-bold text-4xl my-1">Página não encontrada</h2>
        <p className="italic my-1">Você caiu em uma página que não existe!</p>
        <Link
          className="bg-black text-white flex items-center justify-center px-5 py-1 rounded-md mt-2"
          to={"/"}
        >
          Voltar para Home
        </Link>
      </div>
    </Container>
  );
}
