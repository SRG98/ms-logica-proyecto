import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PuestoComida, PuestoComidaRelations, Zona, ZonaComida} from '../models';
import {ZonaComidaRepository} from './zona-comida.repository';
import {ZonaRepository} from './zona.repository';

export class PuestoComidaRepository extends DefaultCrudRepository<
  PuestoComida,
  typeof PuestoComida.prototype.Codigo,
  PuestoComidaRelations
> {

  public readonly zonas: HasManyThroughRepositoryFactory<Zona, typeof Zona.prototype.Codigo,
          ZonaComida,
          typeof PuestoComida.prototype.Codigo
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ZonaComidaRepository') protected zonaComidaRepositoryGetter: Getter<ZonaComidaRepository>, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>,
  ) {
    super(PuestoComida, dataSource);
    this.zonas = this.createHasManyThroughRepositoryFactoryFor('zonas', zonaRepositoryGetter, zonaComidaRepositoryGetter,);
    this.registerInclusionResolver('zonas', this.zonas.inclusionResolver);
  }
}
