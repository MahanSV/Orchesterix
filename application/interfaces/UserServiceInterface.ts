import {SimpleUserDTO, UserDTO, UserLoginDTO} from "#application/dto/UserDTO.ts";
import {createUserCommand, loginUserCommand, updateUserCommand} from "#application/types/user/command.ts";


export interface UserServiceInterface {
    createUser(command: createUserCommand): Promise<UserDTO>;
    getUser(id: string): Promise<SimpleUserDTO> ;
    loginUser(command: loginUserCommand): Promise<UserLoginDTO>
}