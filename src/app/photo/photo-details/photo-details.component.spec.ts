import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoDetailsComponent } from './photo-details.component';
import { AlbumService } from '../../albums/album.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;
  let albumServiceMock: any;
  let dialogRefMock: any;

  beforeEach(async () => {
    albumServiceMock = {
      getPhoto: jasmine.createSpy('getPhoto').and.returnValue(of({ id: 1, title: 'Test Photo', url: 'test-url.jpg' })),
      updatePhotoTitle: jasmine.createSpy('updatePhotoTitle').and.returnValue(of({ id: 1, title: 'Updated Title' }))
    };

    dialogRefMock = {
      close: jasmine.createSpy('close')
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PhotoDetailsComponent],
      providers: [
        { provide: AlbumService, useValue: albumServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { userId: 1 } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load photo data on init', () => {
    expect(albumServiceMock.getPhoto).toHaveBeenCalledWith(1);
    expect(component.photo.title).toBe('Test Photo');
  });

  it('should enable editing mode when editTitle() is called', () => {
    component.editTitle();
    expect(component.isEditing).toBeTrue();
  });

  it('should save the updated title when saveTitle() is called', () => {
    component.newTitle = 'Updated Title';
    component.saveTitle();

    expect(albumServiceMock.updatePhotoTitle).toHaveBeenCalledWith(1, 'Updated Title');
    expect(component.photo.title).toBe('Updated Title');
    expect(component.isEditing).toBeFalse();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should not update if the title is unchanged or empty', () => {
    component.newTitle = component.photo.title;
    component.saveTitle();
    expect(albumServiceMock.updatePhotoTitle).not.toHaveBeenCalled();

    component.newTitle = '';
    component.saveTitle();
    expect(albumServiceMock.updatePhotoTitle).not.toHaveBeenCalled();
  });

  it('should close the dialog when closeDialog() is called', () => {
    component.closeDialog();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
