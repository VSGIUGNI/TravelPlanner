import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', // Define 'dashboard' como a página inicial
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'create-travel',
    loadChildren: () => import('./pages/create-travel/create-travel.module').then(m => m.CreateTravelPageModule)
  },
  {
    path: 'travel/:id',
    loadChildren: () => import('./pages/travel-details/travel-details.module').then(m => m.TravelDetailsPageModule)
  },
  { path: 'edit-travel/:id', loadChildren: () => import('./pages/edit-travel/edit-travel.module').then(m => m.EditTravelPageModule) },

  { path: 'map', loadChildren: () => import('./pages/map/map.module').then(m => m.MapPageModule) },

  { path: 'comments', loadChildren: () => import('./pages/comments/comments.module').then(m => m.CommentsPageModule) },
  
  { path: 'opinions', loadChildren: () => import('./pages/opinions/opinions.module').then(m => m.OpinionsPageModule) }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
