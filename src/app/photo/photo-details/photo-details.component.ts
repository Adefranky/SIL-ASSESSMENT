import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlbumService } from '../../albums/album.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.scss'
})
export class PhotoDetailsComponent implements OnInit {
  photo: any;
  isEditing = false;
  newTitle = '';

  constructor(
    private albumService: AlbumService,
    public dialogRef: MatDialogRef<PhotoDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loadPhoto();
  }


  loadPhoto(): void {
    const photoId = this.data.userId;

    this.albumService.getPhoto(photoId).subscribe({
      next: (photo) => {
        console.log('Photo Data:', photo);
        this.photo = photo;
        this.newTitle = photo.title;
      },
      error: (err) => console.error('Error fetching photo:', err)
    });
  }

  editTitle(): void {
    this.isEditing = true;
  }

  saveTitle(): void {
    if (this.newTitle.trim() === '' || this.newTitle === this.photo.title) {
      this.isEditing = false;
      return;
    }

    // Save the updated title
    this.albumService.updatePhotoTitle(this.photo.id, this.newTitle).subscribe({
      next: (updatedPhoto) => {
        console.log('Updated Photo:', updatedPhoto);
        this.photo.title = this.newTitle;
        this.isEditing = false;

        // Close the dialog after saving
        this.dialogRef.close();
      },
      error: (err) => console.error('Error updating title:', err)
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
