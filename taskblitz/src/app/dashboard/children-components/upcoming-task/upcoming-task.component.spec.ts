import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingTaskComponent } from './upcoming-task.component';

describe('UpcomingTaskComponent', () => {
  let component: UpcomingTaskComponent;
  let fixture: ComponentFixture<UpcomingTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingTaskComponent]
    });
    fixture = TestBed.createComponent(UpcomingTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
