import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientForm } from '../../models/patient-form.model';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  uploadDataForm: FormGroup;
  @Output() submitted = new EventEmitter<PatientForm>();
  constructor(private formBuilder: FormBuilder) { }
  numberIntegerRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  heightRegext = /\d+(\.\d{1,3})?/;
  weightRegex = /^(0|[1-9]\d*)(,\d+)?$/;
  fileUploadQueue:any;
  fileAttr = "Select CPET file";
  fileBase64:any;
  ngOnInit(): void {
    this.uploadDataForm = this.formBuilder.group({
      age: [null, [Validators.required, Validators.pattern(this.numberIntegerRegex)]],
      gender:[null, [Validators.required]],
      height: [null, [Validators.required, Validators.pattern(this.heightRegext)]],
      weight: [null, [Validators.required, Validators.pattern(this.weightRegex)]],
      cpetFile: [null,[Validators.required]]
    });
  }

  uploadFileEvt(imgFile: any){
    if (imgFile.target.files && imgFile.target.files[0]) {
      console.log(imgFile)
      let file = imgFile.target.files[0];
      console.log(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log(reader.result);
          this.fileBase64 = reader.result;
      };

    }
  }

  submit() {
    console.log('Form submitted');
    console.log(this.uploadDataForm.valid);
    console.log(this.uploadDataForm.value);
    console.log(this.fileBase64);
    if (!this.uploadDataForm.valid) {
      return;
    }
    let result = new PatientForm();
    result.Age = parseInt(this.uploadDataForm.get('age')?.value);
    result.Sex = this.uploadDataForm.get('gender')?.value;
    result.Height = parseInt(this.uploadDataForm.get('height')?.value);
    result.Weight = parseInt(this.uploadDataForm.get('weight')?.value);
    result.Upload = this.fileBase64.toString().split(",", 2)[1];
    result.Action = true;
    console.log('-----------------');
    console.log(result);
    this.submitted.emit(result);
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
