import {EntityManager, Repository} from "typeorm";
import {UserEntity} from "../entities";
import {InjectEntityManager} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(@InjectEntityManager() entityManager: EntityManager) {
        super(UserEntity, entityManager);
    }
}