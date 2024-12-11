import { GetFormStats } from "@/app/_actions/form";
import StatsCard from "../_components/StatsCard";

export async function CardStatsWrapper() {
    const stats = await GetFormStats();
    return <StatsCard loading={false} data={stats} />;
  }