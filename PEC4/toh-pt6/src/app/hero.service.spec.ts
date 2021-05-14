import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {HeroService} from './hero.service';
import {MessageService} from './message.service';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {HttpErrorResponse} from '@angular/common/http';

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
        hero => expect(hero).toBeUndefined(),
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
    beforeEach(() => {
      heroService = TestBed.inject(HeroService);
    });

    it('should return expected heroe because exists', () => {
      heroService.getHero(mockId).subscribe(
        hero => expect(hero).toEqual(mockHero, 'should return expected hero'),
        fail
      );

      // HeroService should have made one request to GET hero
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/${mockId}`);
      expect(req.request.method).toEqual('GET');

      // Respond to request with expected hero
      req.flush(mockHero);
    });

    it('should return 404 because it doesn\'t exists', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'Invalid request parameters', status: 404, statusText: 'Bad Request', url: `${heroService.heroesUrl}/${mockId}`
      });

      heroService.getHero(mockId).subscribe(
        hero => expect(hero.status).toBe(404),
        error => expect(error.status).toBe(404),
      );

      // HeroService should have made one request to GET hero
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/${mockId}`);
      expect(req.request.method).toEqual('GET');

      // Respond to request with error response
      req.flush(errorResponse);
    });
  });

  describe('addHero', () => {
    beforeEach(() => {
      heroService = TestBed.inject(HeroService);
    });

    it('should add a hero', () => {
      const newHero: Hero = {id: 21, name: 'xavi'};

      heroService.addHero(newHero).subscribe(
        hero => expect(hero).toEqual(newHero, 'should return added hero'),
        fail
      );

      // HeroService should have made one request to GET hero
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('POST');

      // Respond to request with new hero
      req.flush(newHero);
    });

    it('should fail on error', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'Invalid request parameters', status: 404, statusText: 'Bad Request', url: heroService.heroesUrl
      });

      heroService.addHero(mockHero).subscribe(
        hero => expect(hero).toEqual(errorResponse, 'should return error response'),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('POST');
      // Respond with the mock heroes
      req.flush(errorResponse);
    });
  });

  describe('deleteHero', () => {
    beforeEach(() => {
      heroService = TestBed.inject(HeroService);
    });

    it('should delete existing hero', () => {
      heroService.deleteHero(mockId).subscribe(
        hero => expect(hero).toEqual(mockHero, 'should return deleted hero'),
        fail
      );

      // HeroService should have made one request to GET hero
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/${mockId}`);
      expect(req.request.method).toEqual('DELETE');

      // Respond to request with new hero
      req.flush(mockHero);
    });

    it('should fail on error', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'Invalid request parameters', status: 404, statusText: 'Bad Request', url: `${heroService.heroesUrl}/${mockId}`
      });

      heroService.deleteHero(mockId).subscribe(
        hero => expect(hero).toEqual(errorResponse, 'should return error response'),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroService.heroesUrl}/${mockId}`);
      expect(req.request.method).toEqual('DELETE');
      // Respond with the mock heroes
      req.flush(errorResponse);
    });
  });

  describe('updateHero', () => {
    beforeEach(() => {
      heroService = TestBed.inject(HeroService);
    });

    it('should update existing hero', () => {
      mockHero.name = 'Xavi';

      heroService.updateHero(mockHero).subscribe(
        hero => expect(hero.name).toEqual('Xavi'),
        fail
      );

      // HeroService should have made one request to GET hero
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('PUT');

      // Respond to request with new hero
      req.flush(mockHero);
    });

    it('should fail on error', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'Invalid request parameters', status: 404, statusText: 'Bad Request', url: heroService.heroesUrl
      });

      heroService.updateHero(mockHero).subscribe(
        hero => expect(hero).toEqual(errorResponse, 'should return error response'),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('PUT');
      // Respond with the mock heroes
      req.flush(errorResponse);
    });
  });
});
