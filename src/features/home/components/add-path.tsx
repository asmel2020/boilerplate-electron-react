import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Folder } from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AddPathDialog({ isOpen, onClose }: Props) {
  const [ruta, setRuta] = useState("");
  const handelRutaClick = async () => {
    const ruta = await window.api.common.chooseFolder();
    if (!ruta) return;
    setRuta(ruta);

    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Ruta de la Biblioteca
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {/* URL Input */}
          <span className="text-gray-700 w-md">
            Selecciona la ruta de la biblioteca donde se encuentran los libros
          </span>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                id="book-url"
                value={ruta}
                className="flex-1"
                readOnly={true}
              />
              <Button onClick={handelRutaClick} size="default">
                Seleccionar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
