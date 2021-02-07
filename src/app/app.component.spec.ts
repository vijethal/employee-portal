import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have pre defined path', () => {
    expect(component.path).toEqual('/');
  });

  it('should render content', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('Employment Portal');
  });

  it('should have Employee register link when employee-list is path', () => {
    component.path='/employee-list';
    fixture.detectChanges();
    const path = fixture.nativeElement.querySelector('.nav-item > a');
    expect(path.textContent).toContain('Employee register');
  });

  it('should check routing', fakeAsync(() => {
    const routerSpy = spyOn(router, 'navigate');
    router.navigate(['employee-list']);
    tick();
    expect(routerSpy).toHaveBeenCalledWith(['employee-list']);
  }));

  // it('should close all the unsubscriptions when the component destroys', () => {
  //   const spy = spyOn(component.unsubscribe$, 'unsubscribe');
  //   component.ngOnDestroy();
  //   expect(spy).toHaveBeenCalled();
  // });
});
