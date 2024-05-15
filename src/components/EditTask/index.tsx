import {
  Modal,
  Button,
  Input,
  Textarea,
  Spacer,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { taskProps } from "../Tasks";
import { format } from "date-fns";
import { taskPropsInput } from "../NewTask";

//import "./style.css";

import Axios from "axios";
type Props = {
  taskSelected: taskProps;
};

export default function EditTask({ taskSelected }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [valueInput, setValueInput] = useState<taskPropsInput>();

  // const urlString = "database-1-aws.cx2s0yaeu498.us-east-2.rds.amazonaws.com";

  useEffect(() => {
    onOpen;
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setValueInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function savedData() {
    Axios.put(`https://server-tarefas.vercel.app/edit`, {
      name: valueInput?.name == null ? taskSelected.nome : valueInput.name,
      date:
        valueInput?.date == null
          ? format(String(taskSelected.data), "dd/MM/yyyy")
          : valueInput.date,
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
    <div>
      <Button
        variant="light"
        size="sm"
        shadow-md
        color="secondary"
        onPress={onOpen}
      >
        Edit
      </Button>
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
                <Button onPress={savedData}>Save</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
