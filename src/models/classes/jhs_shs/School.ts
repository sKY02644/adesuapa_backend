import { UUIDV4 } from "sequelize";
import {
  Model,
  Table,
  DataType,
  BelongsTo,
  HasMany,
  Column,
  ForeignKey,
  BeforeCreate,
} from "sequelize-typescript";

import {
  MInstitution,
  MCountry,
  Student,
  Teacher,
  User,
  AcademicYear,
  Bill,
  Class,
  GradingSystem,
  SubscriptionHistory,
  Bus,
  Subject,
} from "../../index.models";

@Table({
  tableName: "schools",
  timestamps: true,
  paranoid: false,
  charset: "utf8",
  collate: "utf8_general_ci",
  modelName: "School",
})
export class School extends Model {
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone_numbers!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  motto!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city_town!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  initials!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  crest!: string | null;

  @Column({
    type: DataType.ENUM("active", "blocked", "pending"),
    allowNull: true,
  })
  status!: string;

  // @ForeignKey(() => MInstitution)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  institutions_id!: string;

  // @BelongsTo(() => MInstitution)
  // institution!: MInstitution;

  // @ForeignKey(() => MCountry)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  countries_id!: string;

  // @BelongsTo(() => MCountry)
  // country!: MCountry;

  @HasMany(() => Student)
  students!: Student[];

  @HasMany(() => Teacher)
  teachers!: Teacher[];

  @HasMany(() => User)
  users!: User[];

  @HasMany(() => AcademicYear)
  academic_years!: AcademicYear[];

  @HasMany(() => Bill)
  bills!: Bill[];

  @HasMany(() => Class)
  classes!: Class[];

  @HasMany(() => GradingSystem)
  grading_systems!: GradingSystem[];

  @HasMany(() => SubscriptionHistory)
  subscription_histories!: SubscriptionHistory[];

  @HasMany(() => Bus)
  busses!: Bus[];

  @HasMany(() => Subject)
  subjects!: Subject[];

}
