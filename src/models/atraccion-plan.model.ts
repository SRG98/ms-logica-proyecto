import {Entity, model, property} from '@loopback/repository';

@model()
export class AtraccionPlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Codigo?: number;

  @property({
    type: 'number',
  })
  atraccionCodigo?: number;

  @property({
    type: 'number',
  })
  planCodigo?: number;

  constructor(data?: Partial<AtraccionPlan>) {
    super(data);
  }
}

export interface AtraccionPlanRelations {
  // describe navigational properties here
}

export type AtraccionPlanWithRelations = AtraccionPlan & AtraccionPlanRelations;
