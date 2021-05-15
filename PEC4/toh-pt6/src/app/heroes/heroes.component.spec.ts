import {HeroesComponent} from './heroes.component';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HeroService} from '../hero.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HeroService],
      declarations: [HeroesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('exists h2 with My Heroes text', () => {
    const h2Element: HTMLElement = fixture.nativeElement;
    const h2 = h2Element.querySelector('h2');
    expect(h2.textContent).toEqual('My Heroes');
  });

  it('clicked invokes add method', () => {
    spyOn(component, 'add');

    const addButton = fixture.debugElement.nativeElement.querySelector('button');
    addButton.click();
    fixture.whenStable().then(() => {
      expect(component.add).toHaveBeenCalled();
    });
  });
});



