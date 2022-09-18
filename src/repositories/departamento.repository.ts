import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Ciudad} from '../models';
import {CiudadRepository} from './ciudad.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.Codigo,
  DepartamentoRelations
> {

  public readonly Ciudades: HasManyRepositoryFactory<Ciudad, typeof Departamento.prototype.Codigo>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Departamento, dataSource);
    this.Ciudades = this.createHasManyRepositoryFactoryFor('Ciudades', ciudadRepositoryGetter,);
    this.registerInclusionResolver('Ciudades', this.Ciudades.inclusionResolver);
  }
}
