import {Entity, model, property, hasMany} from '@loopback/repository';
import {Zona} from './zona.model';
import {ZonaComida} from './zona-comida.model';

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

  @hasMany(() => Zona, {through: {model: () => ZonaComida, keyFrom: 'puestoComidaCodigo', keyTo: 'zonaCodigo'}})
  zonas: Zona[];

  constructor(data?: Partial<PuestoComida>) {
    super(data);
  }
}

export interface PuestoComidaRelations {
  // describe navigational properties here
}

export type PuestoComidaWithRelations = PuestoComida & PuestoComidaRelations;
