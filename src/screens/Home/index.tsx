import "./style.css";
import Tasks from "../../components/Tasks";

export default function Home() {
  return (
    <>
      <div className="home">
        <div
          style={{
            backgroundColor: "green",
            marginBottom: 15,
            height: 50,
            textAlign: "center",
            alignItems: "center",
            alignContent: "center",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          <h1 style={{ backgroundColor: "white" }}>Lista de Tarefas!</h1>
        </div>
        <Tasks />
      </div>
    </>
  );
}
