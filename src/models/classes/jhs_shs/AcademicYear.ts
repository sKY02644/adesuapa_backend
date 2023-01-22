import { Model, Table, DataType, BelongsTo, Column, ForeignKey } from 'sequelize-typescript'

import { School } from '../../index.models'

@Table({
  tableName: 'academic_years',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'AcademicYear',
})
export class AcademicYear extends Model {


  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    autoIncrement: false,
    primaryKey: true
  })
  id!: string

  @ForeignKey(() => School)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  school_id!: string

  @BelongsTo(() => School)
  school!: School

}
