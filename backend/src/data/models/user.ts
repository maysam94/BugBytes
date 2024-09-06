import { Column, Table, Model } from "sequelize-typescript";

/**
 * @author Ömer Aynaci
 * @description een test table gemaakt om te testen als de backend gekoppelt is met de database
 */
@Table
export class User extends Model {
    @Column
    public username!: string;
    @Column
    public password!: string;
}