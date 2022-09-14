import {Entity, model, property} from '@loopback/repository';

@model()
export class ZonaComida extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Codigo?: number;


  constructor(data?: Partial<ZonaComida>) {
    super(data);
  }
}

export interface ZonaComidaRelations {
  // describe navigational properties here
}

export type ZonaComidaWithRelations = ZonaComida & ZonaComidaRelations;
