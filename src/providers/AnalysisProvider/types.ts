import { Record } from "@/database/types";

export type AnalysisViewRange = "week" | "month" | "all";
export type Records = Record[] | undefined;
export interface NormalizedRecord extends Record {
    isEmpty?: boolean;
}