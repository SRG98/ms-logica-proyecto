import {Entity, model, property} from '@loopback/repository';

@model()
export class PuestoComida extends Entity {
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
    type: 'string',
    required: true,
  })
  Menu: string;


  constructor(data?: Partial<PuestoComida>) {
    super(data);
  }
}

export interface PuestoComidaRelations {
  // describe navigational properties here
}

export type PuestoComidaWithRelations = PuestoComida & PuestoComidaRelations;
