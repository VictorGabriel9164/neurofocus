// CreateTaskButton -----------------------------

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

type Task = {
  title: string;
  description: string;
  date: string;
  time: string;
};

type CreateTaskButtonProps = {
  className?: string;
  onCreateTask: (task: Task) => void;
};

const CreateTaskButton = ({
  className,
  onCreateTask,
}: CreateTaskButtonProps) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const handleCreateTask = () => {
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      time: taskTime,
    };

    onCreateTask(newTask);

    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setTaskTime("");
  };

  return (
    <div className={cn(className)}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="
              bg-neuro-light-green
              hover:bg-neuro-dark-green
              border-none
              px-14
              rounded-3xl
              text-white
            "
          >
            Criar atividade
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="sm:max-w-125 bg-gray-100">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Nova atividade
            </AlertDialogTitle>

            <AlertDialogDescription>
              Defina as informações da atividade abaixo.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <Input
              placeholder="Título"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />

            <Textarea
              placeholder="Descrição"
              value={taskDescription}
              onChange={(e) =>
                setTaskDescription(e.target.value)
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
              />

              <Input
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>

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