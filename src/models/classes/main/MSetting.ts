import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, Column } from 'sequelize-typescript'

import { Json } from '../../types'


@Table({
  tableName: 'settings',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'MSetting'
})
export class MSetting extends Model {

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
  key!: string

  @Column({
    type: DataType.JSON,
    allowNull: false
  })
  value!: Json | null
}
