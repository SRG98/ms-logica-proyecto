import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Atraccion>) {
    super(data);
  }
}

export interface AtraccionRelations {
  // describe navigational properties here
}

export type AtraccionWithRelations = Atraccion & AtraccionRelations;
