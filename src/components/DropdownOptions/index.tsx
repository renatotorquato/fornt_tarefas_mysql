import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Modal,
  Input,
  Textarea,
  Spacer,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { taskProps } from "../Tasks";
import { taskPropsInput } from "../NewTask";
import Axios from "axios";
//import EditTask from "../EditTask";

import { VerticalDotsIcon } from "../VerticalDotsIcon/VerticalDotsIcon";

type Props = {
  taskSelected: taskProps;
};

export function DropdownOptions({ taskSelected }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [valueInput, setValueInput] = useState<taskPropsInput>();

  async function completedTask() {
    const text = `Deseja realmente Concluir a tarefa: \n ${taskSelected.nome}.`;
    if (confirm(text) == true) {
      Axios.put(`https://server-tarefas.vercel.app/complete`, {
        //É passado apenas o código para mudar o status para completa
        cod_task: taskSelected.cod_task,
      }).then((response) => {
        alert("Tarefa " + response + " : Concluída");
        console.log(response);
      });
      window.location.reload();
    } else {
      window.location.reload();
    }
  }

  function deleteTask(key: number, name: string) {
    Axios.delete(`https://server-tarefas.vercel.app/delete`, {
      data: { cod_task: key },
    });

    alert("Deletado tarefa: " + JSON.stringify(name));
    window.location.reload();
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setValueInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function savedDataEdited() {
    Axios.put(`https://server-tarefas.vercel.app/edit`, {
      name: valueInput?.name == null ? taskSelected.nome : valueInput.name,
      date:
        valueInput?.date == null ? String(taskSelected.data) : valueInput.date,
      details:
        valueInput?.details == null
          ? taskSelected.detalhes
          : valueInput.details,
      cod_task: String(taskSelected.cod_task),
    }).then((response) => {
      console.log(response);
    });

    alert("salvou" + JSON.stringify(taskSelected.cod_task));
    window.location.reload();
  }

  return (
    <>
      <Dropdown className="bg-background border-1 border-default-200">
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="sm" variant="light">
            <VerticalDotsIcon className="text-default-400" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={completedTask}>Concluir</DropdownItem>
          <DropdownItem onClick={onOpen}>Editar</DropdownItem>

          <DropdownItem
            color="danger"
            onClick={() => deleteTask(taskSelected.cod_task, taskSelected.nome)}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* Modal para editar as tarefas */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeButton
        aria-labelledby="modal-title"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar Tarefa!</ModalHeader>
              <ModalBody>
                <Spacer y={0.5} />
                <Input
                  isClearable
                  variant="bordered"
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Titulo da tarefa"
                  name="name"
                  defaultValue={String(taskSelected.nome)}
                  onChange={handleChange}
                  isRequired
                />
                <Input
                  isClearable
                  variant="bordered"
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder=" "
                  label="Data Limite"
                  name="date"
                  defaultValue={String(taskSelected.data)}
                  onChange={handleChange}
                  isRequired
                />

                <Spacer y={0.5} />
                <Textarea
                  variant="bordered"
                  color="primary"
                  placeholder="Detalhes:"
                  name="details"
                  defaultValue={String(taskSelected.detalhes)}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" color="warning" onPress={onClose}>
                  Close
                </Button>
                <Button onPress={savedDataEdited}>Save</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
