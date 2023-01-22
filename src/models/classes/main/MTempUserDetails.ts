import { UUIDV4 } from 'sequelize'
import { Model, Table, DataType, Column } from 'sequelize-typescript'

@Table({
  tableName: 'temp_users_details',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'MTempUserDetails'
})
export class MTempUserDetails extends Model {

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
  })
  name!: string

  @Column({
    type: DataType.STRING,
  })
  email!: string

  @Column({
    type: DataType.STRING,
  })
  institution_name!: string

  @Column({
    type: DataType.STRING,
  })
  phone_number!: string

  @Column({
    type: DataType.UUID,
  })
  selected_institution!: string

  @Column({
    type: DataType.UUID,
  })
  selected_subscription!: string

  @Column({
    type: DataType.UUID,
  })
  selected_country!: string
}
