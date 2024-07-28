import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryDrawingComponent } from './query-drawing.component';

describe('QueryDrawingComponent', () => {
  let component: QueryDrawingComponent;
  let fixture: ComponentFixture<QueryDrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryDrawingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueryDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
