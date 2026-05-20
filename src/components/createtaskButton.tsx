import { useState } from "react";
import { cn } from "#/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CreateTaskButtonProps = {
  className?: string;
};

const CreateTaskButton = ({ className }: CreateTaskButtonProps) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const handleCreateTask = () => {
    console.log({
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      time: taskTime,
    });

    alert("Atividade criada com sucesso!");
  };

  return (
    <div className={cn(className)}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-neuro-light-green hover:bg-neuro-dark-green border-none px-14 rounded-3xl text-white">
            Criar atividade
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="sm:max-w-125 bg-gray-200 border-gray-300">
          <AlertDialogHeader>
            <AlertDialogTitle>Nova atividade</AlertDialogTitle>

            <AlertDialogDescription>
              Defina as informações da atividade abaixo.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Título</label>

              <Input
                placeholder="Digite o título da atividade"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Descrição</label>

              <Textarea
                placeholder="Digite a descrição da atividade"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Data de entrega</label>

                <Input
                  type="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Horário</label>

                <Input
                  type="time"
                  value={taskTime}
                  onChange={(e) => setTaskTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction onClick={handleCreateTask}>
              Salvar atividade
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreateTaskButton;
