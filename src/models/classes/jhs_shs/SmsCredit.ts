import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, ForeignKey, BelongsTo, Column } from 'sequelize-typescript'

import { School } from '../../index.models'

@Table({
  tableName: 'sms_credits',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'SmsCredit'
})
export class SmsCredit extends Model {

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
    type: DataType.INTEGER,
    allowNull: false
  })
  smsLeft!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  smsUsed!: number

  @ForeignKey(() => School)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  schools_id!: string

  @BelongsTo(() => School)
  school!: School

}
