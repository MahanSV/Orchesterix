import {SimpleUserDTO, UserDTO, UserLoginDTO} from "#application/dto/UserDTO.ts";
import User from "#domain/models/User.ts";


export class UserMapper {
        /**
        * Maps a domain entity to a DTO
        */
        public static toDTO(entity: User): UserDTO {
                return {
                  id: entity.id,
                  name: entity.name,
                  lastName: entity.lastName,
                  nationalId: entity.nationalId,
                  mobile: entity.mobile,
                  status: entity.status,
                  password: entity.password,
                  createdAt: entity.createdAt,
                  updatedAt: entity.updatedAt,
                  bankAccounts: entity.bankAccounts ? BankAccountMapper.toDTOList(entity.bankAccounts) : [],
                  tickets: entity.tickets ? TicketMapper.toDTOList(entity.tickets) : [],
                  userInqueries: entity.userInqueries ? UserInqueryMapper.toDTO(entity.userInqueries) : null,
                };
        };
        /**
         * it's for simple users DTO
         */
        public static toSimpleUserDTO(entity: User): SimpleUserDTO {
                return {
                        id: entity.id,
                        email: entity.email,
                        role: entity.role,
                };
        };
        /**
         * Maps a list of domain entities to DTOs
         */
        public static toDTOList(entities: User[]): UserDTO[] {
                return entities.map(entity => this.toDTO(entity));
        };
        /**
         * it's for simple users DTOs
         */
        public static toSimpleUserDTOList(entities: User[]): SimpleUserDTO[] {
                return entities.map(entity => this.toSimpleUserDTO(entity));
        };

        /**
         * for only login
        */
        public static toLoginUserDTO(entity: User, userToken: string): UserLoginDTO {
            return {
                token: userToken,
                userInfo: {
                  id: entity.id,
                  name: entity.name,
                  lastName: entity.lastName,
                  nationalId: entity.nationalId,
                  mobile: entity.mobile,
                }
            };
        }
}



