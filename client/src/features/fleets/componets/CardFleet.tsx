import chassisImg from "../../../assets/chassis.png";
import trailerImg from "../../../assets/trailer.png";
import type { FleetWithId } from "../../../pages/Fleets";

interface CardFleetProps {
  fleets: FleetWithId[];
  loading: boolean;
}

export const CardFleet = ({ fleets, loading }: CardFleetProps) => {
  console.log(fleets);

  const getImageByType = (type: string) => {
    return type === "chassis" ? chassisImg : trailerImg;
  };

  if (loading)
    return <div className="p-4 text-center font-medium">Cargando flota...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      {fleets.map((fleet) => (
        <div
          key={fleet.id}
          className="flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-32 hover:border-blue-400 transition-colors"
        >
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-none uppercase">
                {fleet.patent}
              </h3>
              <div className="mt-2">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    fleet.type === "chassis"
                      ? "bg-blue-50 text-blue-600 border border-blue-100"
                      : "bg-amber-50 text-amber-600 border border-amber-100"
                  }`}
                >
                  {fleet.type
                    ? fleet.type === "chassis"
                      ? "chasís"
                      : "acoplado"
                    : "sin tipo"}
                </span>
              </div>
            </div>

            <div className="text-[10px] text-gray-400 font-mono truncate max-w-37.5">
              ID: {fleet.id}
            </div>
          </div>

          <div className="w-32 bg-gray-50 flex items-center justify-center p-2 border-l border-gray-100">
            <img
              src={getImageByType(fleet.type)}
              alt={fleet.type}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
