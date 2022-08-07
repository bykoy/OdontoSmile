import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private URL_BASE = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

    uploadFile(formData) {
        let urlAPI = 'api/upload';
        return this.http.post(this.URL_BASE + urlAPI, formData);
    }
}
