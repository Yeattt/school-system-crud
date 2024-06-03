import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Teacher } from '../../teachers/entities/teacher.entity';
import { Student } from '../../students/entities/student.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar', {
    nullable: false,
  })
  public name: string;

  @Column('varchar', {
    nullable: false,
  })
  public description: string;

  @Column('boolean', {
    default: true,
  })
  public isActive: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  //* ---- RELATIONS ---- *//
  @ManyToOne(() => Teacher, (teacher) => teacher.classes, { onDelete: 'CASCADE' })
  public teacher: Teacher;

  @ManyToMany(() => Student, (student) => student.classes)
  @JoinTable({
    name: 'classes_have_students',
    joinColumn: {
      name: 'classId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'studentId',
      referencedColumnName: 'id',
    },
  })
  public students: Student[];
}