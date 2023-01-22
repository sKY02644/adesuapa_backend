import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, HasMany, Column } from 'sequelize-typescript'

import { Student } from '../../index.models'

@Table({
  tableName: 'parents',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'Parent'
})
export class Parent extends Model {

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
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  occupation!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  phone_number!: string

  @HasMany(() => Student)
  students!: Student[]

}
