import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Parque} from './parque.model';
import {Departamento} from './departamento.model';

@model()
export class Ciudad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Codigo?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;
  @hasMany(() => Parque, {keyTo: 'ciudadCodigo'})
  Parques: Parque[];

  @belongsTo(() => Departamento, {name: 'departamentCodigo'})
  departamentoCodigo: number;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
