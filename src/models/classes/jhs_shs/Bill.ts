import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, ForeignKey, BelongsTo, Column } from 'sequelize-typescript'

import { School, Class } from '../../index.models'

@Table({
  tableName: 'bills',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'Bill'
})
export class Bill extends Model {

  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: UUIDV4
  })
  id!: string

  @ForeignKey(() => School)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  schools_id!: string

  @BelongsTo(() => School)
  school!: School

  @ForeignKey(() => Class)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  classes_id!: string
  
  @BelongsTo(() => Class)
  class!: Class

}
