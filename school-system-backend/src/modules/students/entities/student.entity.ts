import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Class } from '../../classes/entities/class.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar', {
    nullable: false,
  })
  public name: string;

  @Column('varchar', {
    nullable: false,
  })
  public lastname: string;

  @Column('varchar', {
    nullable: false,
    unique: true,
  })
  public email: string;

  @Column('boolean', {
    default: true,
  })
  public isActive: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  //* ---- RELATIONS ---- *//
  @ManyToMany(() => Class, (classEntity) => classEntity.students)
  public classes: Class[];
}
