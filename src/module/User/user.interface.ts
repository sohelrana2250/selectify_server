import { USER_ROLE } from "./user.constant";

export type TUser={

    name:string;
    email:string;
    password:string,
    photo?:string,
    role: 'USER' | 'EMPLOYEE' | 'ADMIN',
    os:string,
    browser:string,
    creationTime:string,
    device:string,
    districtName:string,
    isDeleted:boolean;
    isVerify:boolean;
}

export type TUserRole=keyof typeof USER_ROLE;
