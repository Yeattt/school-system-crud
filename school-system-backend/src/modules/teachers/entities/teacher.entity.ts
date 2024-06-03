import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Class } from '../../classes/entities/class.entity';

@Entity('teachers')
export class Teacher {
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
  @OneToMany(() => Class, (classEntity) => classEntity.teacher)
  public classes: Class[];
}
