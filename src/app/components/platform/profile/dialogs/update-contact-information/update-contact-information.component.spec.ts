import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContactInformationComponent } from './update-contact-information.component';

describe('UpdateContactInformationComponent', () => {
  let component: UpdateContactInformationComponent;
  let fixture: ComponentFixture<UpdateContactInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateContactInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContactInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
