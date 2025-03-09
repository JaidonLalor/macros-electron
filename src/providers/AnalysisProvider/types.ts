import { Record } from "@/database/types";

export type AnalysisViewRange = "week" | "month" | "all" | "custom";
export type Records = Record[] | undefined;
export interface NormalizedRecord extends Record {
    isEmpty?: boolean;
}