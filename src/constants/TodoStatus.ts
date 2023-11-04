import { gray, green, orange } from "./Color";

export const NON_STARTED: string = "未着手";
export const PROGRESS: string = "進行中";
export const COMPLETED: string = "完了";

export const TodoStatuses: string[] = [NON_STARTED, PROGRESS, COMPLETED];

export const statusColor = (status: string) => {
  if (status === PROGRESS) {
    return orange;
  } else if (status == COMPLETED) {
    return green;
  } else {
    return gray;
  }
};
