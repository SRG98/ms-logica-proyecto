import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Atraccion, AtraccionRelations, Zona, Plan, AtraccionPlan} from '../models';
import {ZonaRepository} from './zona.repository';
import {AtraccionPlanRepository} from './atraccion-plan.repository';
import {PlanRepository} from './plan.repository';

export class AtraccionRepository extends DefaultCrudRepository<
  Atraccion,
  typeof Atraccion.prototype.Codigo,
  AtraccionRelations
> {

  public readonly Zona: BelongsToAccessor<Zona, typeof Atraccion.prototype.Codigo>;

  public readonly planes: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.Codigo,
          AtraccionPlan,
          typeof Atraccion.prototype.Codigo
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>, @repository.getter('AtraccionPlanRepository') protected atraccionPlanRepositoryGetter: Getter<AtraccionPlanRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Atraccion, dataSource);
    this.planes = this.createHasManyThroughRepositoryFactoryFor('planes', planRepositoryGetter, atraccionPlanRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.Zona = this.createBelongsToAccessorFor('Zona', zonaRepositoryGetter,);
    this.registerInclusionResolver('Zona', this.Zona.inclusionResolver);
  }
}
