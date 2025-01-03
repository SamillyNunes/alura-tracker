import IProject from "./IProject";

export default interface ITask{
    id: string,
    durationInSeconds: number,
    description: string,
    project: IProject,
}