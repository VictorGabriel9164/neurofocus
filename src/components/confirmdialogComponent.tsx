

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

type ConfirmDialogCompProps = {
  onConfirm: () => void;
};

function ConfirmDialogComp({
  onConfirm,
}: ConfirmDialogCompProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl cursor-pointer">
          CONCLUIR
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-gray-100 border-gray-300">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Concluir atividade?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Tem certeza que deseja marcar esta
            atividade como concluída?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-gray-200 cursor-pointer">
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction onClick={onConfirm} className="bg-neuro-light-green hover:bg-neuro-dark-green cursor-pointer">
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDialogComp;