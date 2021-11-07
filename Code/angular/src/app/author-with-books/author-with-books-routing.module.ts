import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorWithBooksComponent } from './author-with-books.component';

const routes: Routes = [{ path: '', component: AuthorWithBooksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorWithBooksRoutingModule { }
