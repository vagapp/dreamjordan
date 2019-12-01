import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LanguageSelectionPage } from './language-selection.page';

describe('LanguageSelectionPage', () => {
  let component: LanguageSelectionPage;
  let fixture: ComponentFixture<LanguageSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageSelectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
