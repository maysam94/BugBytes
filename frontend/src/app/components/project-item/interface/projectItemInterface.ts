import { SdgInterface } from "../../sdg/interfaces/sdgInterface";

export interface ProjectItemInterface {
    projectId: number;
    title: string;
    description: string;
    sdgs: SdgInterface[];
    assignmentId?: number; //Temperarily undefined
    createdAt: string;
    updatedAt: string;
}