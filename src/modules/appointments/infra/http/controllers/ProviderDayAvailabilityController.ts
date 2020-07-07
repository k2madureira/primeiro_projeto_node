import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDaysAvailabilityService from '@modules/appointments/services/ListProviderDaysAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id, day, month, year } = request.body;

    const listProviderDaysAvailabilityService = container.resolve(
      ListProviderDaysAvailabilityService,
    );

    const availability = await listProviderDaysAvailabilityService.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
