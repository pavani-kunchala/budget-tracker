 import { Routes } from '@angular/router';

import { HomePage } from '../pages/home/home';   // NEW homepage
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ExpensePage } from '../pages/expense/expense';
import { ExpenseFormPage } from '../pages/expense-form/expense-form';
import { IncomePage } from '../pages/income/income';
import { IncomeFormPage } from '../pages/income-form/income-form';

import { AuthLayout } from '../pages/auth-layout/auth-layout';
import { MainLayout } from '../pages/main-layout/main-layout';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  // Homepage is now the default route
  { path: '', component: HomePage },

  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginPage },
      { path: 'signup', component: SignupPage }
    ]
  },

  {
    path: 'dashboard',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardPage }, // dashboard home
      { path: 'expense', component: ExpensePage },
      { path: 'expense/new', component: ExpenseFormPage },
      { path: 'expense/edit/:id', component: ExpenseFormPage },
      { path: 'income', component: IncomePage },
      { path: 'income/new', component: IncomeFormPage },
      { path: 'income/edit/:id', component: IncomeFormPage }
    ]
  },

  { path: '**', redirectTo: '' }
];
