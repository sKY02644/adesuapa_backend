import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, Column, BelongsTo, ForeignKey } from 'sequelize-typescript'

import { MInstitution } from '../../index.models'
import { Json } from '../../types'

@Table({
  tableName: 'resources',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'MResource'
})
export class MResource extends Model {

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
    type: DataType.JSON
  })
  resource!: string

  @Column({
    type: DataType.ENUM('active', 'blocked'),
    allowNull: false
  })
  status!: string

  @ForeignKey(() => MInstitution)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  institution_id!: string

  @BelongsTo(() => MInstitution)
  institution!: MInstitution

}
