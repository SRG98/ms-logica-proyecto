import {Entity, model, property, hasMany} from '@loopback/repository';
import {Atraccion} from './atraccion.model';
import {Parque} from './parque.model';
import {ParqueZona} from './parque-zona.model';
import {PuestoComida} from './puesto-comida.model';
import {ZonaComida} from './zona-comida.model';

@model()
export class Zona extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  Color: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @hasMany(() => Atraccion, {keyTo: 'zonaCodigo'})
  Atracciones: Atraccion[];

  @hasMany(() => Parque, {through: {model: () => ParqueZona, keyFrom: 'zonaCodigo', keyTo: 'parqueCodigo'}})
  parques: Parque[];

  @hasMany(() => PuestoComida, {through: {model: () => ZonaComida, keyFrom: 'zonaCodigo', keyTo: 'puestoComidaCodigo'}})
  puestoComidas: PuestoComida[];

  constructor(data?: Partial<Zona>) {
    super(data);
  }
}

export interface ZonaRelations {
  // describe navigational properties here
}

export type ZonaWithRelations = Zona & ZonaRelations;
