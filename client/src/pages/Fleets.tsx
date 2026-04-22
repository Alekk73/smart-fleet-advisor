import { FleetForm } from "../features/fleets/componets/FleetForm";
import Nav from "../components/layout/Nabvar";
import { CardFleet } from "../features/fleets/componets/CardFleet";
import {
  allFleets,
  type FleetData,
} from "../features/fleets/services/fleet.services";
import { useEffect, useState } from "react";

export type FleetWithId = FleetData & {
  id: number;
  createdAt: string;
};

export const Fleets = () => {
  const [fleets, setFleets] = useState<FleetWithId[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFleets = async () => {
    try {
      const res = await allFleets();
      setFleets(res.data);
    } catch (error) {
      console.error("Error al cargar flota", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFleets();
  }, []);
  return (
    <div>
      <Nav />
      <FleetForm onFleetCreated={fetchFleets} />
      <CardFleet fleets={fleets} loading={loading} />
    </div>
  );
};
