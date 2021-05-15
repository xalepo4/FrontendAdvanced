import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';
import {HeroDetailComponent} from './hero-detail.component';
import {HEROES} from '../mock-heroes';
import {of} from 'rxjs';
import {Hero} from '../hero';
import {FormsModule} from '@angular/forms';


// Exercise 6

class HeroServiceStub {
  mockHero = HEROES[1];

  getHero(id: number) {
    return of(this.mockHero);
  }

  updateHero(hero: Hero) {
    return of(hero);
  }
}

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(waitForAsync(() => {
    const activatedRouteStub = () => ({
      snapshot: {paramMap: {get: () => ({})}}
    });

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useFactory: activatedRouteStub},
        {provide: HeroService, useClass: HeroServiceStub}
      ],
      imports: [FormsModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('exists h2 with hero name text', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('NARCO Details');
  });

  it('click back invokes goBack method', () => {
    spyOn(component, 'goBack').and.callThrough();

    const backButton = fixture.nativeElement.querySelector('button');
    backButton.click();
    expect(component.goBack).toHaveBeenCalled();

  });

  it('click save invokes save method', () => {
    spyOn(component, 'save').and.callThrough();

    const saveButton = fixture.nativeElement.querySelectorAll('button')[1];
    saveButton.click();
    expect(component.save).toHaveBeenCalled();
  });
});

