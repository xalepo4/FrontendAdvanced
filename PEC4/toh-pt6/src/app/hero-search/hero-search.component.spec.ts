import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HeroService} from '../hero.service';
import {HEROES} from '../mock-heroes';
import {of} from 'rxjs';
import {HeroSearchComponent} from './hero-search.component';

// Exercise 6

class HeroServiceStub {
  mockHero = HEROES[1];

  searchHeroes(term: string) {
    return of([this.mockHero]);
  }
}

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  const mockHero = HEROES[1];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      providers: [
        {provide: HeroService, useClass: HeroServiceStub}
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('exists label with text', () => {
    expect(fixture.nativeElement.querySelector('label').textContent).toEqual('Hero Search');
  });

  it('text is updated when write in input', () => {
    const input = fixture.nativeElement.querySelector('input');

    input.value = 'New Hero';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(input.value).toEqual('New Hero');
    });
  });

  it('search method should find one hero', (done) => {
    component.heroes$.subscribe(heroes => {
      expect(heroes.length).toEqual(1);
      done();
    });

    component.search(mockHero.name);
  });
});

