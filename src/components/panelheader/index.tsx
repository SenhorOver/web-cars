import { signOut } from "firebase/auth";
import { Link } from "react-router";
import { auth } from "../../services/firebaseConnection";

export function DashboardHeader() {
  async function handleLogout() {
    await signOut(auth);
  }
  return (
    <div className="w-full flex items-center h-10 bg-red-500 text-white gap-4 font-bold rounded-lg px-4 mb-4">
      <Link to={"/dashboard"}>Dashboard</Link>
      <Link to={"/dashboard/new"}>Cadastrar carro</Link>

      <button className="ml-auto" onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  );
}
