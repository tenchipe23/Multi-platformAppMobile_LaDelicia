// profile.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profilePhotoSubject = new BehaviorSubject<string | null>(null);
  profilePhoto$ = this.profilePhotoSubject.asObservable();

  setProfilePhoto(photoUrl: string) {
    this.profilePhotoSubject.next(photoUrl);
  }
}