import {Entity, model, property} from '@loopback/repository';

@model()
export class Parque extends Entity {
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
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'number',
    required: true,
  })
  Capacidad: number;

  @property({
    type: 'string',
    required: true,
  })
  Logo: string;

  @property({
    type: 'string',
    required: true,
  })
  Mapa: string;

  @property({
    type: 'string',
    required: true,
  })
  Eslogan: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;


  constructor(data?: Partial<Parque>) {
    super(data);
  }
}

export interface ParqueRelations {
  // describe navigational properties here
}

export type ParqueWithRelations = Parque & ParqueRelations;
