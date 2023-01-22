import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, BelongsTo, ForeignKey, Column } from 'sequelize-typescript'

import { MInstitution } from '../../index.models'

@Table({
  tableName: 'subscriptions',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'MSubscription'
})
export class MSubscription extends Model {

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
  duration!: string

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  price!: number

  @ForeignKey(() => MInstitution)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  institutions_id!: string

  @BelongsTo(() => MInstitution)
  institution!: MInstitution


}
