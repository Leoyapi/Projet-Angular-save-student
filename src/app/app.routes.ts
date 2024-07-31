import { Routes } from '@angular/router';
import { CreateStudentComponent } from './student/create-student/create-student.component';
import { UpdateStudentComponent } from './student/update-student/update-student.component';
import { ListStudentComponent } from './student/list-student/list-student.component';
import { FooterComponent } from './widget/footer/footer.component';


export const routes: Routes = [
  {path:'create-student',component: CreateStudentComponent},
  {path:'update-student/:id',component:UpdateStudentComponent},
  {path:'list-student',component:ListStudentComponent},
  { path: '', redirectTo: '/list-student', pathMatch: 'full' },
  {path:'footer',component:FooterComponent}

];
