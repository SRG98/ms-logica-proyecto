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
import {AtraccionPlan} from '../models';
import {AtraccionPlanRepository} from '../repositories';

export class AtraccionPlanController {
  constructor(
    @repository(AtraccionPlanRepository)
    public atraccionPlanRepository : AtraccionPlanRepository,
  ) {}

  @post('/atraccion-planes')
  @response(200, {
    description: 'AtraccionPlan model instance',
    content: {'application/json': {schema: getModelSchemaRef(AtraccionPlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AtraccionPlan, {
            title: 'NewAtraccionPlan',
            exclude: ['Codigo'],
          }),
        },
      },
    })
    atraccionPlan: Omit<AtraccionPlan, 'Codigo'>,
  ): Promise<AtraccionPlan> {
    return this.atraccionPlanRepository.create(atraccionPlan);
  }

  @get('/atraccion-planes/count')
  @response(200, {
    description: 'AtraccionPlan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AtraccionPlan) where?: Where<AtraccionPlan>,
  ): Promise<Count> {
    return this.atraccionPlanRepository.count(where);
  }

  @get('/atraccion-planes')
  @response(200, {
    description: 'Array of AtraccionPlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AtraccionPlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AtraccionPlan) filter?: Filter<AtraccionPlan>,
  ): Promise<AtraccionPlan[]> {
    return this.atraccionPlanRepository.find(filter);
  }

  @patch('/atraccion-planes')
  @response(200, {
    description: 'AtraccionPlan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AtraccionPlan, {partial: true}),
        },
      },
    })
    atraccionPlan: AtraccionPlan,
    @param.where(AtraccionPlan) where?: Where<AtraccionPlan>,
  ): Promise<Count> {
    return this.atraccionPlanRepository.updateAll(atraccionPlan, where);
  }

  @get('/atraccion-planes/{id}')
  @response(200, {
    description: 'AtraccionPlan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AtraccionPlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AtraccionPlan, {exclude: 'where'}) filter?: FilterExcludingWhere<AtraccionPlan>
  ): Promise<AtraccionPlan> {
    return this.atraccionPlanRepository.findById(id, filter);
  }

  @patch('/atraccion-planes/{id}')
  @response(204, {
    description: 'AtraccionPlan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AtraccionPlan, {partial: true}),
        },
      },
    })
    atraccionPlan: AtraccionPlan,
  ): Promise<void> {
    await this.atraccionPlanRepository.updateById(id, atraccionPlan);
  }

  @put('/atraccion-planes/{id}')
  @response(204, {
    description: 'AtraccionPlan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() atraccionPlan: AtraccionPlan,
  ): Promise<void> {
    await this.atraccionPlanRepository.replaceById(id, atraccionPlan);
  }

  @del('/atraccion-planes/{id}')
  @response(204, {
    description: 'AtraccionPlan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.atraccionPlanRepository.deleteById(id);
  }
}
