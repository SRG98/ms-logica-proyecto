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
import {ParqueZona} from '../models';
import {ParqueZonaRepository} from '../repositories';

export class ParqueZonaController {
  constructor(
    @repository(ParqueZonaRepository)
    public parqueZonaRepository : ParqueZonaRepository,
  ) {}

  @post('/parque-zonas')
  @response(200, {
    description: 'ParqueZona model instance',
    content: {'application/json': {schema: getModelSchemaRef(ParqueZona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParqueZona, {
            title: 'NewParqueZona',
            exclude: ['Codigo'],
          }),
        },
      },
    })
    parqueZona: Omit<ParqueZona, 'Codigo'>,
  ): Promise<ParqueZona> {
    return this.parqueZonaRepository.create(parqueZona);
  }

  @get('/parque-zonas/count')
  @response(200, {
    description: 'ParqueZona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ParqueZona) where?: Where<ParqueZona>,
  ): Promise<Count> {
    return this.parqueZonaRepository.count(where);
  }

  @get('/parque-zonas')
  @response(200, {
    description: 'Array of ParqueZona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ParqueZona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ParqueZona) filter?: Filter<ParqueZona>,
  ): Promise<ParqueZona[]> {
    return this.parqueZonaRepository.find(filter);
  }

  @patch('/parque-zonas')
  @response(200, {
    description: 'ParqueZona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParqueZona, {partial: true}),
        },
      },
    })
    parqueZona: ParqueZona,
    @param.where(ParqueZona) where?: Where<ParqueZona>,
  ): Promise<Count> {
    return this.parqueZonaRepository.updateAll(parqueZona, where);
  }

  @get('/parque-zonas/{id}')
  @response(200, {
    description: 'ParqueZona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ParqueZona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ParqueZona, {exclude: 'where'}) filter?: FilterExcludingWhere<ParqueZona>
  ): Promise<ParqueZona> {
    return this.parqueZonaRepository.findById(id, filter);
  }

  @patch('/parque-zonas/{id}')
  @response(204, {
    description: 'ParqueZona PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParqueZona, {partial: true}),
        },
      },
    })
    parqueZona: ParqueZona,
  ): Promise<void> {
    await this.parqueZonaRepository.updateById(id, parqueZona);
  }

  @put('/parque-zonas/{id}')
  @response(204, {
    description: 'ParqueZona PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parqueZona: ParqueZona,
  ): Promise<void> {
    await this.parqueZonaRepository.replaceById(id, parqueZona);
  }

  @del('/parque-zonas/{id}')
  @response(204, {
    description: 'ParqueZona DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parqueZonaRepository.deleteById(id);
  }
}
