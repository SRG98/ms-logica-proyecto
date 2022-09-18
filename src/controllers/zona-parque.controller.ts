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
Zona,
ParqueZona,
Parque,
} from '../models';
import {ZonaRepository} from '../repositories';

export class ZonaParqueController {
  constructor(
    @repository(ZonaRepository) protected zonaRepository: ZonaRepository,
  ) { }

  @get('/zonas/{id}/parques', {
    responses: {
      '200': {
        description: 'Array of Zona has many Parque through ParqueZona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parque)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Parque>,
  ): Promise<Parque[]> {
    return this.zonaRepository.parques(id).find(filter);
  }

  @post('/zonas/{id}/parques', {
    responses: {
      '200': {
        description: 'create a Parque model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parque)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Zona.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {
            title: 'NewParqueInZona',
            exclude: ['Codigo'],
          }),
        },
      },
    }) parque: Omit<Parque, 'Codigo'>,
  ): Promise<Parque> {
    return this.zonaRepository.parques(id).create(parque);
  }

  @patch('/zonas/{id}/parques', {
    responses: {
      '200': {
        description: 'Zona.Parque PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {partial: true}),
        },
      },
    })
    parque: Partial<Parque>,
    @param.query.object('where', getWhereSchemaFor(Parque)) where?: Where<Parque>,
  ): Promise<Count> {
    return this.zonaRepository.parques(id).patch(parque, where);
  }

  @del('/zonas/{id}/parques', {
    responses: {
      '200': {
        description: 'Zona.Parque DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Parque)) where?: Where<Parque>,
  ): Promise<Count> {
    return this.zonaRepository.parques(id).delete(where);
  }
}
