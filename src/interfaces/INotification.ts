export enum NotificationType {
    SUCCESS,
    FAIL,
    WARNING,
}

export interface INotification{
    title: string,
    text: string,
    type: NotificationType,
    id: number,
}