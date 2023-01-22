import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, HasMany, Column, ForeignKey, BelongsTo } from 'sequelize-typescript'

import { School, Student, Teacher, Bill, GradingSystem, Subject } from '../../index.models'

@Table({
  tableName: 'classes',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'Class'
})
export class Class extends Model {

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
    type: DataType.ENUM('active', 'blocked'),
    allowNull: false
  })
  status!: string

  @ForeignKey(() => School)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  schools_id!: string
  
  @BelongsTo(() => School)
  school!: School

  @HasMany(() => Student)
  students!: Student[]

  @HasMany(() => Teacher)
  teachers!: Teacher[]

  @HasMany(() => Bill)
  bills!: Bill[]

  @HasMany(() => GradingSystem)
  grading_systems!: GradingSystem[]

  @HasMany(() => Subject)
  subjects!: Subject[]

}
