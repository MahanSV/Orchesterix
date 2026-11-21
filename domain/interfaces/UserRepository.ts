import User from "#models/User.ts";

export interface UserRepositoryInterface {
    getAllUsers(): Promise<User[]>
    getAllUsersWithInquiries(): Promise<User[]>;
    createUser(user: User): Promise<User>;
    getUserById(id: string): Promise<User | null>;
    getUserByNationalIdAndMobile(nationalId: string, mobile: string): Promise<User | null>;
    getUserByMobile(mobile: string): Promise<User | null>;
    updateUser(entity: User): Promise<User>;
}
