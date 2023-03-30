import type {UserType} from "@/types/userType";
import type {TodoType} from "@/types/todoType";

export interface StateType {
    user: UserType,
    todos: TodoType[],
    errorMsg: string,
    errorName: string,
    errorSurname: string,
    errorLogin: string,
    errorPassword: string,
}