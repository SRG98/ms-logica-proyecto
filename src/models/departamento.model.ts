import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';

@model()
export class Departamento extends Entity {
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

  @hasMany(() => Ciudad, {keyTo: 'departamentoCodigo'})
  Ciudades: Ciudad[];

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
