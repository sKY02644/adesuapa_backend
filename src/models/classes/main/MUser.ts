import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, Column, BeforeCreate } from 'sequelize-typescript'

import { PasswordHash } from '../../../utils/password-hash'


const PROTECTED_ATTRIBUTES = ['password']

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'MUser'
})
export class MUser extends Model {

  public validPassword!: (password: string) => Promise<boolean>
  public reHashPassword!: (password: string) => Promise<string>;

  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: UUIDV4
  })
  id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  user_id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address!: string

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  login_date_time!: Date

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  contact!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isIP: true
    }
  })
  ip!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  role_permission!: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  status!: string
  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  country!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  country_code!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  reset_password_token!: string

  toJSON() {
    let attributes: any = Object.assign({}, this.get())
    for (let a of PROTECTED_ATTRIBUTES) {
      delete attributes[a]
    }
    return attributes
  }

  @BeforeCreate
  static async hashPassword (user: MUser){
    console.log("PASSWORD: >>> : ", user.password)
    const hashed = await PasswordHash.toHash(user.password!)
    user.password = hashed
  }


}

MUser.prototype.validPassword = async function (password) {
  return await PasswordHash.compare(this.password!, password)
}