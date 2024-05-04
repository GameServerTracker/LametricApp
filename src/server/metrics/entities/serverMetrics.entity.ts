import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Server } from "./server.entity";

@Entity()
export class ServerMetrics {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    server_id: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    agent: string;

    @Column({ type: "int", nullable: true })
    player_current: number;

    @Column({ type: "int", nullable: true })
    player_max: number;

    @Column({ type: "json", nullable: true })
    player_list: string;

    @Column({ type: "boolean", default: false })
    is_online: boolean;

    @Column({ type: "text", nullable: true })
    error_message: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated: Date;

    @ManyToOne(() => Server, server => server.serverMetrics, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "server_id", referencedColumnName: "id"})
    server: Server;
}