import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { User } from "./user.entity";


@Entity()
export class PhotoUser {
    
    @PrimaryColumn({name:'user_id'})
    userId: number;
  
    @ManyToOne(() => User,user => user.id,{onDelete:"CASCADE"})
    @JoinColumn({ name: 'user_id' })
    user: User;
    
    @Column({type:'text'})
    firebaseUrlFile: string

    @Column({type:'text',nullable: true})
    storageReference: string
}