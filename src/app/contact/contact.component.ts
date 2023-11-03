import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  driverNames: string[] = [];
  currentYear: number;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.currentYear = new Date().getFullYear();

    this.contactForm = this.fb.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
      driverName: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.http.get(`http://ergast.com/api/f1/${this.currentYear}/drivers.json`).subscribe({
      next: (data: any) => {
        if (data?.MRData?.DriverTable?.Drivers) {
          this.driverNames = data.MRData.DriverTable.Drivers.map((driver: any) => {
            return driver.givenName + ' ' + driver.familyName;
          });
        }
      },
      error: (error) => {
        console.error('Failed to fetch driver data:', error);
      }
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitted = true;
      const formData = this.contactForm.value;
      console.log('Form Data:', formData);
  
      const fakeApiUrl = 'https://jsonplaceholder.typicode.com/posts';
  
      this.http.post(fakeApiUrl, formData).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
        },
        error: (error) => {
          console.error('Form submission error:', error);
        }
      });
    } else {
      Object.keys(this.contactForm.controls).forEach((controlName) => {
        this.contactForm.get(controlName)!.markAsTouched();
      });
    }
  }
  

}
