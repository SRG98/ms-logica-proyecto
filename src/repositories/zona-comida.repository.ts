import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ZonaComida, ZonaComidaRelations} from '../models';

export class ZonaComidaRepository extends DefaultCrudRepository<
  ZonaComida,
  typeof ZonaComida.prototype.Codigo,
  ZonaComidaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ZonaComida, dataSource);
  }
}
