import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AllowNull,
  NotEmpty,
  Unique,
  DataType,
} from "sequelize-typescript";

@Table
export default class User extends Model {
  @PrimaryKey
  @Unique
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  public id!: any;

  @AllowNull(false)
  @Unique
  @NotEmpty
  @Column({
    type: DataType.STRING,
  })
  public email!: string;

  @AllowNull(false)
  @NotEmpty
  @Column({
    type: DataType.STRING,
  })
  public password!: string;
}
