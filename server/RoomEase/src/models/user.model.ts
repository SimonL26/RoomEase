import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AllowNull,
  NotEmpty,
  Unique,
  DataType,
  Index,
} from "sequelize-typescript";
import crypto from "crypto";

@Table
export default class User extends Model {
  @PrimaryKey
  @Unique
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  public id!: any;

  @Index("useremail_index")
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

  @AllowNull(false)
  @NotEmpty
  @Column({
    type: DataType.BOOLEAN,
  })
  public verified!: boolean;

  @Index("verificationCode_index")
  @Column({
    type: DataType.TEXT,
  })
  public verificationCode!: string | null;

  static createVerificationCode() {
    const verificationCode = crypto.randomBytes(32).toString("hex");

    const hashedVerificationCode = crypto
      .createHash("sha256")
      .update(verificationCode)
      .digest("hex");

    return { verificationCode, hashedVerificationCode };
  }
}
