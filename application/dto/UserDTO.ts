
export interface UserDTO {
    id: string;
    name: string;
    lastName: string;
    email: string;
    // password: string;
    role: string;
    mobile: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface SimpleUserDTO {
    id: string;
    email: string;
    role: string;
}

export interface UserLoginDTO {
    token: string;
    userInfo: {
        id: string;
        name: string;
        lastName: string;
        email: string;
        role: string;
    };
}