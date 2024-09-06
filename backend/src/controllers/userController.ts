import { User } from "../data/models/user";
import express from 'express';

/**
 * @author Ömer Aynaci
 * @returns returns de users die opgeslagen zijn in de database
 * selecteert alle users in de database en wordt opgehaald
 */
export const getUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.log(error);
    }
}

