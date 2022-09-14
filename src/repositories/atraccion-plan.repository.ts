import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AtraccionPlan, AtraccionPlanRelations} from '../models';

export class AtraccionPlanRepository extends DefaultCrudRepository<
  AtraccionPlan,
  typeof AtraccionPlan.prototype.Codigo,
  AtraccionPlanRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(AtraccionPlan, dataSource);
  }
}
