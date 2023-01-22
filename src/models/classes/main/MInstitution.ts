import { Model, Table, DataType, HasMany, Column } from 'sequelize-typescript'

import { MSubscription } from '../../index.models'

import { Json } from '../../types'

@Table({
  tableName: 'institutions',
  timestamps: true,
  paranoid: false,
  underscored: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  modelName: 'MInstitution'
})
export class MInstitution extends Model {

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
    allowNull: true
  })
  name!: string

  @Column({
    type: DataType.STRING(10),
  })
  category!: string

  @Column({
    type: DataType.STRING(10),
  })
  sub_category!: string

  @Column({
    type: DataType.STRING(10),
  })
  status!: string

  @Column({
    type: DataType.STRING,
  })
  users_id_format!: string

  @Column({
    type: DataType.JSON,
  })
  user_type!: { [x: string]: any; }

  @Column({
    type: DataType.JSON,
  })
  role_permission!: { [x: string]: any; }

  @HasMany(() => MSubscription)
  subscriptions!: MSubscription[]

}
