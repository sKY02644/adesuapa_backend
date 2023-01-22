import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, Column } from 'sequelize-typescript'

@Table({
  tableName: 'payment_methods',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'MPaymentMethod'
})
export class MPaymentMethod extends Model {

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

}
