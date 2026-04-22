import { useState } from "react";
import Swal from "sweetalert2";
import { createFleet, type FleetData } from "../services/fleet.services";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";

interface FleetFormProps {
  onFleetCreated: () => void;
}

export const FleetForm = ({ onFleetCreated }: FleetFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FleetData>({
    patent: "",
    type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    const upperPatent = name === "patent" ? value.toUpperCase() : value;
    const newValue = upperPatent.valueOf().replace(/\s/g, "");

    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const patentRegex = /^[A-Za-z]{3}[0-9]{3}$/;

    if (!patentRegex.test(form.patent)) {
      Swal.fire(
        "Patente inválida",
        "Debe tener 3 letras seguidas de 3 números (ej: ABC123)",
        "warning",
      );
      return;
    }

    try {
      await createFleet(form);
      Swal.fire("Guardado", "Vehículo agregado con éxito", "success");
      setForm({ patent: "", type: "" });
      setIsOpen(false);
      onFleetCreated();
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar", "error");
    }
  };

  return (
    <div className="relative max-w-md mx-auto mt-20 mb-4 px-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 rounded-xl shadow-lg border transition-all ${
          isOpen
            ? "bg-red-50 border-red-200 text-red-600"
            : "bg-blue-600 text-white border-blue-600"
        }`}
      >
        <div className="flex items-center gap-2 font-bold uppercase text-sm">
          {isOpen ? <X size={20} /> : <Plus size={20} />}
          {isOpen ? "Cancelar" : "Nuevo Vehículo"}
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[-1]"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full left-4 right-4 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200 z-50">
            <h2 className="text-xs font-black text-gray-400 uppercase mb-4 tracking-tighter italic">
              Registro de nueva unidad
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase ml-1">
                  Patente
                </label>
                <input
                  maxLength={6}
                  type="text"
                  name="patent"
                  value={form.patent}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg font-mono focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none uppercase"
                  placeholder="ABC123"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase ml-1">
                  Tipo
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                  required
                >
                  <option value="" disabled>
                    Seleccionar...
                  </option>
                  <option value="chassis">Chasís</option>
                  <option value="trailer">Acoplado</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-all font-bold uppercase tracking-widest shadow-blue-200 shadow-lg active:scale-95"
              >
                Guardar Vehículo
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
