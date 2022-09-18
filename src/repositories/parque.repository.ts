import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Parque, ParqueRelations, Ciudad, Zona, ParqueZona} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {ParqueZonaRepository} from './parque-zona.repository';
import {ZonaRepository} from './zona.repository';

export class ParqueRepository extends DefaultCrudRepository<
  Parque,
  typeof Parque.prototype.Codigo,
  ParqueRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Parque.prototype.Codigo>;

  public readonly zonas: HasManyThroughRepositoryFactory<Zona, typeof Zona.prototype.Codigo,
          ParqueZona,
          typeof Parque.prototype.Codigo
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('ParqueZonaRepository') protected parqueZonaRepositoryGetter: Getter<ParqueZonaRepository>, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>,
  ) {
    super(Parque, dataSource);
    this.zonas = this.createHasManyThroughRepositoryFactoryFor('zonas', zonaRepositoryGetter, parqueZonaRepositoryGetter,);
    this.registerInclusionResolver('zonas', this.zonas.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
