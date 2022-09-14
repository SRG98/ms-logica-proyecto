import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ParqueZona, ParqueZonaRelations} from '../models';

export class ParqueZonaRepository extends DefaultCrudRepository<
  ParqueZona,
  typeof ParqueZona.prototype.Codigo,
  ParqueZonaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ParqueZona, dataSource);
  }
}
