import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Project } from "./project.entity";


@Entity()
export class Attachment {
    
    @PrimaryColumn({name:'project_id'})
    projectId: number;
  
    @ManyToOne(() => Project, project => project.id,{onDelete:"CASCADE"})
    @JoinColumn({ name: 'project_id' })
    project: Project;
    
    @Column({type:'text'})
    firebaseUrlFile: string

    @Column({type:'text',nullable: true})
    storageReference: string
}