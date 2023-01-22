import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, BelongsTo, ForeignKey, Column } from 'sequelize-typescript'

import { Json } from '../../types'
import { School } from './School'

@Table({
  tableName: 'payment_histories',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'PaymentHistory'
})
export class PaymentHistory extends Model {

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
  })
  user_id!: string
  
  @Column({
    type: DataType.STRING,
  })
  email!: string

  @Column({
    type: DataType.STRING,
  })
  payment_type!: string

  @Column({
    type: DataType.FLOAT,
  })
  amount!: number

  @Column({
    type: DataType.STRING,
  })
  authorization_url!: string

  @Column({
    type: DataType.STRING,
  })
  access_code!: string

  @Column({
    type: DataType.STRING,
  })
  reference!: string

  @Column({
    type: DataType.STRING,
  })
  webhook_response!: Json | null

  @Column({
    type: DataType.ENUM('pending', 'success', 'failed'),
  })
  status!: string

  @ForeignKey(() => School)
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  schools_id!: string

  @BelongsTo(() => School)
  school!: School


}
