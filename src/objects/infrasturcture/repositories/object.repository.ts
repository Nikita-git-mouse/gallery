import {EntityManager, Repository} from "typeorm";
import {ObjectEntity} from "../entities";
import {InjectEntityManager} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ObjectRepository extends Repository<ObjectEntity> {
    constructor(@InjectEntityManager() entityManager: EntityManager) {
        super(ObjectEntity, entityManager);
    }
}