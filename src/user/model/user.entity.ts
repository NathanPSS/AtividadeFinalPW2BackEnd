
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../project/model/project.entity";



@Entity()
export class User {

    @PrimaryGeneratedColumn("increment",{type:"int"})
    id: number

    @Column({type:"varchar",length:200})
    name: string

    @Column({type:"varchar",length:200})
    lastName: string
    
    @Column({type:"varchar",length:300,unique:true})
    email: string

    @Column({type:"text"})
    password: string

    @Column({type:"varchar",length:300,nullable: true})
    phone?:string

    @Column({type:'text', nullable:true})
    github?: string

    @Column({type:'text',nullable: true})
    bio?: string

    @ManyToMany(() => Project,{nullable:true,cascade:true})
    @JoinTable({name:'collaborator'})
    colabProjects?: Project[]


    serializable(){
        return {
            id: this.id,
            username: this.email
        }
    }
}
