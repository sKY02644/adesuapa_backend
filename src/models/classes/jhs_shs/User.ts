import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, BelongsTo, ForeignKey, Column, BeforeCreate } from 'sequelize-typescript'

import { School, MInstitution } from '../../index.models'

import { PasswordHash } from '../../../utils/password-hash'


const PROTECTED_ATTRIBUTES = ['password']

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'User'
})
export class User extends Model {

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
  })
  user_id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string

  @Column({
    type: DataType.STRING,
  })
  address!: string

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  login_date_time!: Date

  @Column({
    type: DataType.STRING,
  })
  contact!: string

  @Column({
    type: DataType.STRING,
    validate: {
      isIP: true
    }
  })
  ip!: string

  @Column({
    type: DataType.JSON,
  })
  role_permission!: string

  @Column({
    type: DataType.BOOLEAN,
  })
  status!: string
  
  @Column({
    type: DataType.STRING,
  })
  country!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  country_code!: string

  @Column({
    type: DataType.STRING,
  })
  user_type!: string

  @Column({
    type: DataType.STRING,
  })
  reset_password_token!: string
  

  @ForeignKey(() => School)
  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  schools_id!: string

  @BelongsTo(() => School)
  school!: School

  // @ForeignKey(() => MInstitution)
  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  institutions_id!: string

  // @BelongsTo(() => MInstitution)
  // institution!: MInstitution

  toJSON() {
    let attributes: any = Object.assign({}, this.get())
    for (let a of PROTECTED_ATTRIBUTES) {
      delete attributes[a]
    }
    return attributes
  }

  @BeforeCreate
  static async hashPassword (user: User){
    console.log("PASSWORD: >>> : ", user.password)
    const hashed = await PasswordHash.toHash(user.password!)
    user.password = hashed
  }
}

User.prototype.validPassword = async function (password) {
  return await PasswordHash.compare(this.password!, password)
}