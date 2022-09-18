import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Zona, ZonaRelations, Atraccion, Parque, ParqueZona, PuestoComida, ZonaComida} from '../models';
import {AtraccionRepository} from './atraccion.repository';
import {ParqueZonaRepository} from './parque-zona.repository';
import {ParqueRepository} from './parque.repository';
import {ZonaComidaRepository} from './zona-comida.repository';
import {PuestoComidaRepository} from './puesto-comida.repository';

export class ZonaRepository extends DefaultCrudRepository<
  Zona,
  typeof Zona.prototype.Codigo,
  ZonaRelations
> {

  public readonly Atracciones: HasManyRepositoryFactory<Atraccion, typeof Zona.prototype.Codigo>;

  public readonly parques: HasManyThroughRepositoryFactory<Parque, typeof Parque.prototype.Codigo,
          ParqueZona,
          typeof Zona.prototype.Codigo
        >;

  public readonly puestoComidas: HasManyThroughRepositoryFactory<PuestoComida, typeof PuestoComida.prototype.Codigo,
          ZonaComida,
          typeof Zona.prototype.Codigo
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>, @repository.getter('ParqueZonaRepository') protected parqueZonaRepositoryGetter: Getter<ParqueZonaRepository>, @repository.getter('ParqueRepository') protected parqueRepositoryGetter: Getter<ParqueRepository>, @repository.getter('ZonaComidaRepository') protected zonaComidaRepositoryGetter: Getter<ZonaComidaRepository>, @repository.getter('PuestoComidaRepository') protected puestoComidaRepositoryGetter: Getter<PuestoComidaRepository>,
  ) {
    super(Zona, dataSource);
    this.puestoComidas = this.createHasManyThroughRepositoryFactoryFor('puestoComidas', puestoComidaRepositoryGetter, zonaComidaRepositoryGetter,);
    this.registerInclusionResolver('puestoComidas', this.puestoComidas.inclusionResolver);
    this.parques = this.createHasManyThroughRepositoryFactoryFor('parques', parqueRepositoryGetter, parqueZonaRepositoryGetter,);
    this.registerInclusionResolver('parques', this.parques.inclusionResolver);
    this.Atracciones = this.createHasManyRepositoryFactoryFor('Atracciones', atraccionRepositoryGetter,);
    this.registerInclusionResolver('Atracciones', this.Atracciones.inclusionResolver);
  }
}
