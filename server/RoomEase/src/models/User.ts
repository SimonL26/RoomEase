import { Model, Table, Column, AutoIncrement, PrimaryKey, AllowNull, NotEmpty, Unique } from 'sequelize-typescript';

export interface UserInterface {
    id?: number | null;
    email: string;
    password: string;
}

@Table({
    tableName: 'user',
    timestamps: true
})
export default class User extends Model implements UserInterface{
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number | null | undefined;
    
    @AllowNull(false)
    @NotEmpty
    @Unique
    @Column
    email!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    password!: string;

}