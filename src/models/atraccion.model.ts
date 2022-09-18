import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Zona} from './zona.model';
import {Plan} from './plan.model';
import {AtraccionPlan} from './atraccion-plan.model';

@model()
export class Atraccion extends Entity {
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
  Imagen: string;

  @property({
    type: 'number',
    required: true,
  })
  EstaturaMinima: number;

  @property({
    type: 'string',
    required: true,
  })
  Video: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @belongsTo(() => Zona, {name: 'Zona'})
  zonaCodigo: number;

  @hasMany(() => Plan, {through: {model: () => AtraccionPlan, keyFrom: 'atraccionCodigo', keyTo: 'planCodigo'}})
  planes: Plan[];

  constructor(data?: Partial<Atraccion>) {
    super(data);
  }
}

export interface AtraccionRelations {
  // describe navigational properties here
}

export type AtraccionWithRelations = Atraccion & AtraccionRelations;
