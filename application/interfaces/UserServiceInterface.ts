import {UserDTO, UserLoginDTO} from "#application/dto/UserDTO.ts";
import {createUserCommand, loginUserCommand} from "#application/types/user/command.ts";


export interface UserServiceInterface {
    createUser(command: createUserCommand): Promise<UserDTO>;
    getUser(id: string): Promise<UserDTO> ;
    loginUser(command: loginUserCommand): Promise<UserLoginDTO>
}