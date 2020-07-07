import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '1225479',
      provider_id: '1225479',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 6, 10, 11);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: '1225479',
      provider_id: '1225479',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '1225479',
        provider_id: '1225479',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
