//import { useEffect, useState} from "react";
//import Axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { taskProps } from "../Tasks";

type Props = {
  tasks: taskProps;
};

//import "./style.css";

function Details({ tasks }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        color="primary"
        variant="light"
        aria-label="Edit task"
        onPress={onOpen}
      >
        Detalhes:
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-xl font-bold">Detalhes </h1>Tarefa:{" "}
                {tasks.nome}
              </ModalHeader>
              <ModalBody>
                <p>{tasks.detalhes}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Details;
