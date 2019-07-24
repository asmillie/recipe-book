import { TestBed } from '@angular/core/testing';

import { RecipeDetailResolverService } from './recipe-detail-resolver.service';

describe('RecipeDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeDetailResolverService = TestBed.get(RecipeDetailResolverService);
    expect(service).toBeTruthy();
  });
});
