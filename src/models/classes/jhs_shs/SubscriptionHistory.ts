import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, BelongsTo, ForeignKey, Column } from 'sequelize-typescript'

import { School } from '../../index.models'

@Table({
  tableName: 'subscription_histories',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'SubscriptionHistory'
})
export class SubscriptionHistory extends Model {

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
    type: DataType.BOOLEAN
  })
  active!: boolean

  @Column({
    type: DataType.DATE
  })
  start_date!: Date

  @Column({
    type: DataType.DATE
  })
  end_date!: Date

  @ForeignKey(() => School)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  schools_id!: string
  
  @BelongsTo(() => School)
  school!: School

}
