import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCrudComponent } from './activity-crud.component';

describe('ActivityCrudComponent', () => {
  let component: ActivityCrudComponent;
  let fixture: ComponentFixture<ActivityCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
