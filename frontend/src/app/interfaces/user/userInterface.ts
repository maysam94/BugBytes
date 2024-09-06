import { Role } from "src/app/helpers/role";

export interface User {
    userId: number;
    firstName: string;
    prefixes?: string;
    lastName: string;
    email: string;
    password: string;
    areaOfExpertiseId: number;
}

export interface userProfileData {
    userId: number;
    firstName: string;
    prefixes?: string;
    lastName: string;
    email: string;
    areaOfExpertiseId: number;
}

export interface CurrentUserData {
    firstName: string;
    prefixes: string;
    lastName: string;
    role: Role;
    userId: number;
}

export interface UserProfile {
    firstName: string;
    prefixes?: string;
    lastName: string;
    description: string;
    email: string;
    areaOfExpertiseId: number;
    role: Role.STUDENT;
}

export interface UserAttributes {
    firstName: string;
    prefixes?: string;
    lastName: string;
    email: string;
    password: string;
    areaOfExpertiseId: number;
}

export interface UserSocials {
    platformName: string;
    socialUserName: string;
    socialUrl: string;
}

export interface InvitableStudent {
    userId: number;
    firstName: string;
    prefixes?: string;
    lastName: string;
}
