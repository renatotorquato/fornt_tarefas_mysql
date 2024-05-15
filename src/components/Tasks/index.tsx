import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  Button,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import Axios from "axios";
import NewTask from "../NewTask";
import Details from "../Details";
import { format } from "date-fns";
import { DropdownOptions } from "../DropdownOptions";
import "./style.css";

export type taskProps = {
  nome: string;
  data: string;
  cod_task: number;
  detalhes: string;
  status_task: string;
};

export type keyProps = {
  selectedKey: Selection;
};
("");

export default function Tasks() {
  //const urlLocal = "http://localhost:3001";
  // const urlString =
  //   "database-1-aws.cx2s0yaeu498.us-east-2.rds.amazonaws.com:3001";
  //O selectedKeys é a linha que foi selecionada.
  //const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [tasksCompleted, setTaskCompleted] = useState(false);

  const [listTask, setListTask] = useState<taskProps[]>([]);

  useEffect(() => {
    Axios.get(`https://server-tarefas.vercel.app/getTaskOpen`).then(
      (response) => {
        setListTask(response.data);
      }
    );
  }, []);

  function showTaskOpened() {
    Axios.get(`https://server-tarefas.vercel.app/getTaskOpen`).then(
      (response) => {
        setListTask(response.data);
      }
    );
    setTaskCompleted(false);
  }

  function showTaskCompleted() {
    Axios.get(`https://server-tarefas.vercel.app/getTaskCompleted`).then(
      (response) => {
        setListTask(response.data);
      }
    );
    setTaskCompleted(true);
  }

  return (
    <div>
      {tasksCompleted ? (
        <>
          <Table
            //onSelectionChange={setSelectedKeys}
            //com essa função ao clicar na linha não acontece nada, apenas se clicar no seletor de tarefas.
            onRowAction={() => {
              undefined;
            }}
            aria-label="Tarefas Concluídas"
            selectionMode="single"
            color="primary"
          >
            <TableHeader>
              <TableColumn className="text-center ...">
                <p className="font-black">TAREFAS</p>
              </TableColumn>
              <TableColumn className="text-center ...">
                <p className="font-black">ATÉ A DATA:</p>
              </TableColumn>

              <TableColumn className="text-center ...">
                <p className="font-black">ID</p>
              </TableColumn>
              <TableColumn className="text-center ...">
                <p className="font-black">STATUS</p>
              </TableColumn>
              <TableColumn className=" flex text-center ... ">
                <NewTask />
              </TableColumn>
            </TableHeader>
            <TableBody>
              {listTask &&
                listTask.map((value: taskProps) => (
                  <TableRow key={value.cod_task}>
                    <TableCell>{value.nome}</TableCell>
                    <TableCell>
                      {format(String(value.data), "dd/MM/yyyy")}
                    </TableCell>

                    <TableCell> {value.cod_task}</TableCell>
                    <TableCell> {value.status_task}</TableCell>
                    <TableCell className="flex">
                      <DropdownOptions taskSelected={value} />
                      <Details tasks={value} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <Button color="warning" onPress={showTaskOpened}>
            Abertas
          </Button>
        </>
      ) : (
        <>
          <Table
            //onSelectionChange={setSelectedKeys}
            //com essa função ao clicar na linha não acontece nada, apenas se clicar no seletor de tarefas.
            onRowAction={() => {
              undefined;
            }}
            aria-label="Lista de Tarefas"
            selectionMode="single"
            color="primary"
          >
            <TableHeader>
              <TableColumn className="text-center ...">
                <p className="font-black">TAREFAS</p>
              </TableColumn>
              <TableColumn className="text-center ...">
                <p className="font-black">ATÉ A DATA:</p>
              </TableColumn>

              <TableColumn className="text-center ...">
                <p className="font-black">ID</p>
              </TableColumn>
              <TableColumn className="text-center ...">
                <p className="font-black">STATUS</p>
              </TableColumn>
              <TableColumn className=" flex text-center ... ">
                <NewTask />
              </TableColumn>
            </TableHeader>
            <TableBody>
              {listTask &&
                listTask.map((value: taskProps) => (
                  <TableRow key={value.cod_task}>
                    <TableCell>{value.nome}</TableCell>
                    <TableCell>
                      {format(String(value.data), "dd/MM/yyyy")}
                    </TableCell>

                    <TableCell> {value.cod_task}</TableCell>
                    <TableCell> {value.status_task}</TableCell>
                    <TableCell className="flex">
                      <DropdownOptions taskSelected={value} />
                      <Details tasks={value} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <Button color="success" onPress={showTaskCompleted}>
            Concluídas
          </Button>
        </>
      )}
    </div>
  );
}
