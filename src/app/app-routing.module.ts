import { HomeComponent } from './views/home/home.component';
import { PessoasComponent } from './views/pessoas/pessoas.component';
import { EquipesComponent } from './views/equipes/equipes.component';
import { TaskComponent } from './views/task/task.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'task', component: TaskComponent},
  {path:'equipes', component: EquipesComponent},
  {path:'pessoas', component: PessoasComponent},
  {path:'', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
