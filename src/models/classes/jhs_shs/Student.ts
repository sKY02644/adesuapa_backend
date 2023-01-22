import { Model, Table, DataType, HasMany, BelongsTo, Column, ForeignKey } from 'sequelize-typescript'

import { School, Parent, Class, Subject } from '../../index.models'

@Table({
  tableName: 'countries',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'Student'
})
export class Student extends Model {

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
  first_name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  last_name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  other_name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  date_of_birth!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  religious_denomition!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  admission_date!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  photo!: string

  @Column({
    type: DataType.ENUM('male', 'female', 'others'),
    allowNull: false
  })
  gender!: string

  @Column({
    type: DataType.ENUM('active', 'blocked', 'pending'),
    allowNull: false
  })
  status!: string

  @ForeignKey(() => School)
  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  schools_id!: string

  @BelongsTo(() => School)
  schools!: School

  @ForeignKey(() => Class)
  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  classes_id!: string

  @BelongsTo(() => Class)
  class!: Class

  @ForeignKey(() => Parent)
  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  parents_id!: string

  @BelongsTo(() => Parent)
  parent!: Parent

  @HasMany(() => Subject)
  subjects!: Subject[]

}
