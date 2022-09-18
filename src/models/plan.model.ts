import {Entity, model, property, hasMany} from '@loopback/repository';
import {Atraccion} from './atraccion.model';
import {AtraccionPlan} from './atraccion-plan.model';

@model()
export class Plan extends Entity {
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
    type: 'number',
    required: true,
  })
  Valor: number;

  @hasMany(() => Atraccion, {through: {model: () => AtraccionPlan, keyFrom: 'planCodigo', keyTo: 'atraccionCodigo'}})
  atracciones: Atraccion[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
