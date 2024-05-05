import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { ServerMetrics } from "./serverMetrics.entity";
import { EServerType } from "src/server/enums/serverType.enum";

@Entity()
export class Server {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    address: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    name: string;

    @Column({ type: "smallint", nullable: false })
    type: EServerType;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated: Date;

    @OneToMany(() => ServerMetrics, serverMetrics => serverMetrics.server)
    serverMetrics: ServerMetrics[];
}