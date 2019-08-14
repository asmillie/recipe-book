import { TestBed } from '@angular/core/testing';

import { AppRepositoryService } from './app-repository.service';

describe('AppRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppRepositoryService = TestBed.get(AppRepositoryService);
    expect(service).toBeTruthy();
  });
});
