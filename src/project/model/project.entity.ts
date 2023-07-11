import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/model/user.entity";
import { Attachment } from "./attachment.entity";


@Entity()
export class Project {
    @PrimaryGeneratedColumn("increment",{type:"int"})
    id: number

    @Column({type:'text', nullable:true})
    github?: string

    @Column({type:'text',nullable: true})
    prototype?: string

    @Column({type:'text'})
    description: string

    @Column({type:'text',nullable:true})
    gpWhatzap: string

    @Column({type:'varchar',length:300})
    title: string

    @ManyToOne(() => User, user => user.id,{onDelete:"CASCADE"})
    @JoinColumn({name: 'authorId'})
    author: number

    @ManyToMany(() => User,{nullable:true,onDelete:"CASCADE"})
    @JoinTable({name: 'collaborator'})
    collaborators?: User[]


}
