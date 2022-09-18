import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
PuestoComida,
ZonaComida,
Zona,
} from '../models';
import {PuestoComidaRepository} from '../repositories';

export class PuestoComidaZonaController {
  constructor(
    @repository(PuestoComidaRepository) protected puestoComidaRepository: PuestoComidaRepository,
  ) { }

  @get('/puesto-comidas/{id}/zonas', {
    responses: {
      '200': {
        description: 'Array of PuestoComida has many Zona through ZonaComida',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Zona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Zona>,
  ): Promise<Zona[]> {
    return this.puestoComidaRepository.zonas(id).find(filter);
  }

  @post('/puesto-comidas/{id}/zonas', {
    responses: {
      '200': {
        description: 'create a Zona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Zona)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PuestoComida.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zona, {
            title: 'NewZonaInPuestoComida',
            exclude: ['Codigo'],
          }),
        },
      },
    }) zona: Omit<Zona, 'Codigo'>,
  ): Promise<Zona> {
    return this.puestoComidaRepository.zonas(id).create(zona);
  }

  @patch('/puesto-comidas/{id}/zonas', {
    responses: {
      '200': {
        description: 'PuestoComida.Zona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zona, {partial: true}),
        },
      },
    })
    zona: Partial<Zona>,
    @param.query.object('where', getWhereSchemaFor(Zona)) where?: Where<Zona>,
  ): Promise<Count> {
    return this.puestoComidaRepository.zonas(id).patch(zona, where);
  }

  @del('/puesto-comidas/{id}/zonas', {
    responses: {
      '200': {
        description: 'PuestoComida.Zona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Zona)) where?: Where<Zona>,
  ): Promise<Count> {
    return this.puestoComidaRepository.zonas(id).delete(where);
  }
}
