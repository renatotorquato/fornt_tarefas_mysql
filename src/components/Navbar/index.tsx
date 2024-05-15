import { Link } from "@nextui-org/react";
import "./style.css";

function Navbar() {
  return (
    <div className="Navbar">
      <Link href="/">Home</Link>
      <Link href="/tarefas">Tarefas</Link>
    </div>
  );
}
export default Navbar;