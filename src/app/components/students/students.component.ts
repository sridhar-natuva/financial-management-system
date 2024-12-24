import { afterRender, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  imports: [ReactiveFormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  studentsForm = new FormGroup({
    title: new FormControl('students'),
    students: new FormArray([
      new FormGroup({
        name: new FormControl('John'),
        age: new FormControl(25)
      }),
      new FormGroup({
        name: new FormControl('Joe'),
        age: new FormControl(20)
      })
    ])
  })

  constructor() {
    afterRender(() => {
      console.log('Students component rendered');
    });
    console.log('Students component created');
  }

  get students(): FormArray {
    return this.studentsForm.get('students') as FormArray;
  }

  buttons = [
    { id: 1, label: 'Save', action: () => { console.log('Save button clicked'); }, attrName: 'data-custom', attrValue: 'custom-3' },
  ]
}


// {
// 	title:"students",
// 	students:[
// 		{ 
// 			name:"john", age:25
// 		},
// 		{ 
// 			name:"joe", age:20
// 		},
// 	]
// }
