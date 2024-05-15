import { Button } from "@nextui-org/react";
import { taskProps } from "../Tasks";

//esta é a tipagem vinda do index com os dados vindos do server

type Props = {
  taskSelected: taskProps;
};

export default function ButtonCompleted({ taskSelected }: Props) {
  return (
    <Button
      size="sm"
      variant="light"
      color="success"
      shadow-md
      onPress={() => alert(JSON.stringify(taskSelected.cod_task))}
    >
      Concluir
    </Button>
  );
}
