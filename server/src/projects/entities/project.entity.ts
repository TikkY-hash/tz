import { User } from 'src/users/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Index(['repoPath', 'userId'], { unique: true })
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  repoPath: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  owner: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  url: string;

  @Column({ type: 'int', default: 0 })
  stars: number;

  @Column({ type: 'int', default: 0 })
  forks: number;

  @Column({ type: 'int', default: 0 })
  issues: number;

  @Column({ type: 'bigint' })
  createdAt: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int' })
  userId: number;
}
