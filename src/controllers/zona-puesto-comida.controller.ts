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
ZonaComida,
PuestoComida,
} from '../models';
import {ZonaRepository} from '../repositories';

export class ZonaPuestoComidaController {
  constructor(
    @repository(ZonaRepository) protected zonaRepository: ZonaRepository,
  ) { }

  @get('/zonas/{id}/puesto-comidas', {
    responses: {
      '200': {
        description: 'Array of Zona has many PuestoComida through ZonaComida',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PuestoComida)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PuestoComida>,
  ): Promise<PuestoComida[]> {
    return this.zonaRepository.puestoComidas(id).find(filter);
  }

  @post('/zonas/{id}/puesto-comidas', {
    responses: {
      '200': {
        description: 'create a PuestoComida model instance',
        content: {'application/json': {schema: getModelSchemaRef(PuestoComida)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Zona.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoComida, {
            title: 'NewPuestoComidaInZona',
            exclude: ['Codigo'],
          }),
        },
      },
    }) puestoComida: Omit<PuestoComida, 'Codigo'>,
  ): Promise<PuestoComida> {
    return this.zonaRepository.puestoComidas(id).create(puestoComida);
  }

  @patch('/zonas/{id}/puesto-comidas', {
    responses: {
      '200': {
        description: 'Zona.PuestoComida PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoComida, {partial: true}),
        },
      },
    })
    puestoComida: Partial<PuestoComida>,
    @param.query.object('where', getWhereSchemaFor(PuestoComida)) where?: Where<PuestoComida>,
  ): Promise<Count> {
    return this.zonaRepository.puestoComidas(id).patch(puestoComida, where);
  }

  @del('/zonas/{id}/puesto-comidas', {
    responses: {
      '200': {
        description: 'Zona.PuestoComida DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PuestoComida)) where?: Where<PuestoComida>,
  ): Promise<Count> {
    return this.zonaRepository.puestoComidas(id).delete(where);
  }
}
