import { Column, DataType, Model, Table, Unique } from 'sequelize-typescript';

import { Document } from '#src/lib/interfaces/document.js';

@Table({ tableName: 'Documents', timestamps: true })
export default class Documents extends Model<Document, Document> implements Document {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id!: string;

  @Unique
  @Column
  document!: string;

  @Column({ allowNull: true, type: DataType.DATE })
  createdAt?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updatedAt?: Date;
}
