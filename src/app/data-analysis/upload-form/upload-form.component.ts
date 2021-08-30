import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  uploadDataForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  numberIntegerRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  ngOnInit(): void {
    this.uploadDataForm = this.formBuilder.group({
      age: [null, [Validators.required, Validators.pattern(this.numberIntegerRegex)]],
      password: [null, Validators.required]
    });
  }

  submit() {

  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
