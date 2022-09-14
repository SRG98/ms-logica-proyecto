import {Entity, model, property} from '@loopback/repository';

@model()
export class ParqueZona extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Codigo?: number;


  constructor(data?: Partial<ParqueZona>) {
    super(data);
  }
}

export interface ParqueZonaRelations {
  // describe navigational properties here
}

export type ParqueZonaWithRelations = ParqueZona & ParqueZonaRelations;
