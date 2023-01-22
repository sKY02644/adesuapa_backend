import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, HasMany, Column } from 'sequelize-typescript'

@Table({
  tableName: 'countries',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'MCountry'
})
export class MCountry extends Model {

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
  code!: string

  @Column({
    type: DataType.ENUM('active', 'blocked', 'pending'),
    allowNull: false
  })
  status!: string

}
