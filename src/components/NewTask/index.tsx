import "./style.css";
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
import { useState } from "react";
//import { taskProps } from "../Tasks";

import Axios from "axios";

export type taskPropsInput = {
  name?: string;
  date?: string;
  time?: string;
  details?: string;
};

export default function NewTask() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [valueInput, setValueInput] = useState<taskPropsInput>();

  // const urlString =
  //   "database-1-aws.cx2s0yaeu498.us-east-2.rds.amazonaws.com:3306";

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setValueInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function savedData() {
    if (valueInput?.name && valueInput?.date) {
      Axios.post(`https://server-tarefas.vercel.app/register`, {
        name: valueInput?.name,
        date: valueInput?.date,
        hour: valueInput?.time,
        details: valueInput?.details,
      }).then((response) => {
        console.log(response);
      });

      alert("salvou" + JSON.stringify(valueInput?.name));
      window.location.reload();
    } else {
      alert("campo nome e data são obrigatórios");
    }
  }

  return (
    <div>
      <Button size="sm" shadow-md color="primary" onPress={onOpen}>
        Nova
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
              <ModalHeader>Nova Tarefa!</ModalHeader>
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
                  onChange={handleChange}
                  isRequired
                />

                <Input
                  type={"date"}
                  isClearable
                  variant="bordered"
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder=" "
                  label="Data Limite"
                  name="date"
                  onChange={handleChange}
                  isRequired
                />

                <Spacer y={0.5} />
                <Textarea
                  variant="bordered"
                  color="primary"
                  placeholder="Detalhes:"
                  name="details"
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" color="warning" onPress={onClose}>
                  Close
                </Button>
                <Button variant="flat" color="primary" onPress={savedData}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
