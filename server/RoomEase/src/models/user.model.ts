import { Model, Table, Column, PrimaryKey, AllowNull, NotEmpty, Unique, DataType } from 'sequelize-typescript';

@Table
export default class User extends Model{
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    public id!: any;

    @AllowNull(false)
    @Unique
    @NotEmpty
    @Column
    public email!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    public password!: string;
}