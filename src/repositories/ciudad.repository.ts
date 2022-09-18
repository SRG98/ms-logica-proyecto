import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Parque, Departamento} from '../models';
import {ParqueRepository} from './parque.repository';
import {DepartamentoRepository} from './departamento.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.Codigo,
  CiudadRelations
> {

  public readonly Parques: HasManyRepositoryFactory<Parque, typeof Ciudad.prototype.Codigo>;

  public readonly departamentCodigo: BelongsToAccessor<Departamento, typeof Ciudad.prototype.Codigo>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ParqueRepository') protected parqueRepositoryGetter: Getter<ParqueRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>,
  ) {
    super(Ciudad, dataSource);
    this.departamentCodigo = this.createBelongsToAccessorFor('departamentCodigo', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamentCodigo', this.departamentCodigo.inclusionResolver);
    this.Parques = this.createHasManyRepositoryFactoryFor('Parques', parqueRepositoryGetter,);
    this.registerInclusionResolver('Parques', this.Parques.inclusionResolver);
  }
}
