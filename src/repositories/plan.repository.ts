import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plan, PlanRelations, Atraccion, AtraccionPlan} from '../models';
import {AtraccionPlanRepository} from './atraccion-plan.repository';
import {AtraccionRepository} from './atraccion.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.Codigo,
  PlanRelations
> {

  public readonly atracciones: HasManyThroughRepositoryFactory<Atraccion, typeof Atraccion.prototype.Codigo,
          AtraccionPlan,
          typeof Plan.prototype.Codigo
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AtraccionPlanRepository') protected atraccionPlanRepositoryGetter: Getter<AtraccionPlanRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>,
  ) {
    super(Plan, dataSource);
    this.atracciones = this.createHasManyThroughRepositoryFactoryFor('atracciones', atraccionRepositoryGetter, atraccionPlanRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
  }
}
