import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ZonaComida} from '../models';
import {ZonaComidaRepository} from '../repositories';

export class ZonaComidaController {
  constructor(
    @repository(ZonaComidaRepository)
    public zonaComidaRepository : ZonaComidaRepository,
  ) {}

  @post('/zona-comidas')
  @response(200, {
    description: 'ZonaComida model instance',
    content: {'application/json': {schema: getModelSchemaRef(ZonaComida)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonaComida, {
            title: 'NewZonaComida',
            exclude: ['Codigo'],
          }),
        },
      },
    })
    zonaComida: Omit<ZonaComida, 'Codigo'>,
  ): Promise<ZonaComida> {
    return this.zonaComidaRepository.create(zonaComida);
  }

  @get('/zona-comidas/count')
  @response(200, {
    description: 'ZonaComida model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ZonaComida) where?: Where<ZonaComida>,
  ): Promise<Count> {
    return this.zonaComidaRepository.count(where);
  }

  @get('/zona-comidas')
  @response(200, {
    description: 'Array of ZonaComida model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ZonaComida, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ZonaComida) filter?: Filter<ZonaComida>,
  ): Promise<ZonaComida[]> {
    return this.zonaComidaRepository.find(filter);
  }

  @patch('/zona-comidas')
  @response(200, {
    description: 'ZonaComida PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonaComida, {partial: true}),
        },
      },
    })
    zonaComida: ZonaComida,
    @param.where(ZonaComida) where?: Where<ZonaComida>,
  ): Promise<Count> {
    return this.zonaComidaRepository.updateAll(zonaComida, where);
  }

  @get('/zona-comidas/{id}')
  @response(200, {
    description: 'ZonaComida model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ZonaComida, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ZonaComida, {exclude: 'where'}) filter?: FilterExcludingWhere<ZonaComida>
  ): Promise<ZonaComida> {
    return this.zonaComidaRepository.findById(id, filter);
  }

  @patch('/zona-comidas/{id}')
  @response(204, {
    description: 'ZonaComida PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonaComida, {partial: true}),
        },
      },
    })
    zonaComida: ZonaComida,
  ): Promise<void> {
    await this.zonaComidaRepository.updateById(id, zonaComida);
  }

  @put('/zona-comidas/{id}')
  @response(204, {
    description: 'ZonaComida PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() zonaComida: ZonaComida,
  ): Promise<void> {
    await this.zonaComidaRepository.replaceById(id, zonaComida);
  }

  @del('/zona-comidas/{id}')
  @response(204, {
    description: 'ZonaComida DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.zonaComidaRepository.deleteById(id);
  }
}
