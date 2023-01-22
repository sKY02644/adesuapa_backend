import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, Column } from 'sequelize-typescript'

import { Json } from '../../types'

// id, content { user_name, user_uid, default_password, email, school_id, institution_id }, type [welcome_mail, confirmation_mail] , status [failed, sent]

@Table({
  tableName: 'mails',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'MMail'
})
export class MMail extends Model {

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
    type: DataType.JSON
  })
  content!: Json

  @Column({
    type: DataType.ENUM('welcome_mail', 'confirmation_mail'),
    allowNull: false
  })
  type!: string

  @Column({
    type: DataType.ENUM('failed', 'sent'),
    allowNull: false
  })
  status!: string
}
