import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTagComponent } from './tool-tag.component';

describe('ToolTagComponent', () => {
  let component: ToolTagComponent;
  let fixture: ComponentFixture<ToolTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToolTagComponent]
    });
    fixture = TestBed.createComponent(ToolTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
