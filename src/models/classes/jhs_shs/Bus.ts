import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, BelongsTo, ForeignKey, Column } from 'sequelize-typescript'

import { School } from '../../index.models'

@Table({
  tableName: 'buses',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'Bus'
})
export class Bus extends Model {

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
  type!: string

  @ForeignKey(() => School)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  schools_id!: string
  
  @BelongsTo(() => School)
  school!: School

}
