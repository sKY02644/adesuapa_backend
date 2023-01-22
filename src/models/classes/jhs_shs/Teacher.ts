import { Model, Table, DataType, HasMany, BelongsTo, ForeignKey, Column } from 'sequelize-typescript'

import { School, Class, Subject } from '../../index.models'

@Table({
  tableName: 'teachers',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'Teacher'
})
export class Teacher extends Model {

  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
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
  code!: string

  @Column({
    type: DataType.ENUM('active', 'blocked', 'pending'),
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

  @ForeignKey(() => Class)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  classes_id!: string

  @BelongsTo(() => Class)
  class!: Class

  @HasMany(() => Subject)
  subjects!: Subject[]

}
