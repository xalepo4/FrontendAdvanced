import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {HeroService} from './hero.service';
import {MessageService} from './message.service';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';

describe('HeroService', () => {
  let heroService;
  let httpTestingController: HttpTestingController;
  let mockHeroes: Hero[];
  let mockHero: Hero;
  let mockId: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HeroService, MessageService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    mockHeroes = HEROES;
    mockHero = mockHeroes[0];
    mockId = mockHero.id;
    heroService = TestBed.inject(HeroService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  describe('getHeroNo404', () => {
    beforeEach(() => {
      heroService = TestBed.inject(HeroService);
    });

    it('should return expected heroe because exists', () => {
      heroService.getHeroNo404(mockId).subscribe(
        hero => expect(hero).toEqual(mockHero, 'should return expected hero'),
        fail
      );

      // HeroService should have made one request to GET hero
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/?id=${mockId}`);
      expect(req.request.method).toEqual('GET');

      // Respond to request with expected hero
      req.flush(mockHeroes);
    });

    it('should return undefined because it doesn\'t exists', () => {
      mockHeroes = [];

      heroService.getHeroNo404(mockId).subscribe(
        hero => expect(hero).toEqual(undefined, 'should return undefined'),
        fail
      );

      // HeroService should have made one request to GET hero
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/?id=${mockId}`);
      expect(req.request.method).toEqual('GET');

      // Respond to request with expected hero
      req.flush(mockHeroes);
    });
  });

  describe('getHero', () => {

// TODO
  });

  describe('addHero', () => {

// TODO
  });

  describe('deleteHero', () => {

// TODO
  });

  describe('updateHero', () => {

// TODO
  });
});
