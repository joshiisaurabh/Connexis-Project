import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const routes: Routes = [
  { path: 'add-employee', component: AddEmployeeComponent},
  {path : '', component : EmployeeListComponent}
];

export const routing = RouterModule.forRoot(routes);
