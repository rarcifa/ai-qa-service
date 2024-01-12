import { Column, DataType, Model, Table, Unique } from 'sequelize-typescript';

import { Query } from '#src/lib/interfaces/query.js';

@Table({ tableName: 'Queries', timestamps: true })
export default class Queries extends Model<Query, Query> implements Query {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id!: string;

  @Unique
  @Column
  query!: string;

  @Column({ allowNull: true, type: DataType.DATE })
  createdAt?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updatedAt?: Date;
}
