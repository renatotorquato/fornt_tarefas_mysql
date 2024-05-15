import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "../NewTask";
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

export default function TasksCompleted() {
  //O selectedKeys é a linha que foi selecionada.
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const [listTask, setListTask] = useState<taskProps[]>([]);

  // const urlString =
  //   "database-1-aws.cx2s0yaeu498.us-east-2.rds.amazonaws.com:3306";

  useEffect(() => {
    Axios.get(`https://server-tarefas.vercel.app/getData`).then((response) => {
      setListTask(response.data);
    });
  }, []);

  return (
    <div>
      <Table
        onSelectionChange={setSelectedKeys}
        //com essa função ao clicar na linha não acontece nada, apenas se clicar no seletor de tarefas.
        onRowAction={() => {
          undefined;
        }}
        aria-label="Tarefas Concluídas"
        selectionMode="single"
        color="primary"
        bottomContent={
          <div>
            <h2 className="text-xl ">Tarefa selecionada: {selectedKeys}</h2>
          </div>
        }
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
            <Modal />
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
    </div>
  );
}
