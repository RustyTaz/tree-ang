import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeUniComponent } from './tree-uni.component';

describe('TreeUniComponent', () => {
  let component: TreeUniComponent;
  let fixture: ComponentFixture<TreeUniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeUniComponent]
    });
    fixture = TestBed.createComponent(TreeUniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
