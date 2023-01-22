import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, BelongsTo, ForeignKey, Column } from 'sequelize-typescript'

import { School, Class, Teacher, Student } from '../../index.models'

@Table({
  tableName: 'subjects',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'Subject'
})
export class Subject extends Model {

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

  @ForeignKey(() => Teacher)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  teachers_id!: string
  
  @BelongsTo(() => Teacher)
  teacher!: Teacher

  @ForeignKey(() => Student)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  students_id!: string
  
  @BelongsTo(() => Student)
  student!: Student

}
