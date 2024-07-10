import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../config/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationResultDialogComponent } from '../registration-result-dialog/registration-result-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GeneralService } from '../config/general.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ActorService } from '../config/actor.service';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { FavoriteService } from '../config/favorite.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  public id: string = localStorage.getItem('user_id') || '';
  public role: string = localStorage.getItem('role_id') || '';
  public username: string | null | undefined;
  public email: string | null | undefined;
  public activeInfo: string | null | undefined;
  public updateForm!: FormGroup;
  public loading$!: Observable<boolean>;
  private _destroy$ = new Subject<boolean>();
  public shows: any = [];
  public movies: any = [];
  public actors: any = [];
  public activeSection: string = '';
  public favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
  public unapprovedUsers: any = [];
  public allUsersAndAuthors: any = [];
  public roles: any = [];

  constructor(
    public authService: AuthService,
    public favoriteService: FavoriteService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private generalService: GeneralService,
    private actorService: ActorService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.toggleInfo('user');
    this.activeSection = 'movies'
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');

    if (this.role === '1') {
      this.loadRoles();

      this.authService.getUnapprovedUsers().subscribe(
        response => {
          this.unapprovedUsers = response;
        },
        error => {
          this.openDialog('Error', 'Fetching unapproved users failed.');
        }
      );

      this.authService.getAllUsersAndAuthors().subscribe(
        response => {
          this.allUsersAndAuthors = response;
        },
        error => {
          this.openDialog('Error', 'Fetching the users failed.');
        }
      );
    }

    this.updateForm = this.formBuilder.group({
      editedUsername: [this.username, Validators.required],
      editedEmail: [this.email, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    if (this.favorites.movie) {
      // Fetch details for favorite movies
      this.favorites.movie.forEach((element: { movie_id: string; }) => {
        this.generalService.title$.subscribe(() => {
          this.loading$ = this.generalService.getLoading();
          this.generalService.getFavoriteProjectionDetails(element.movie_id).pipe(
            takeUntil(this._destroy$)
            ).subscribe(results => this.movies.push(results.details));
        });
      });
    }
  }

  toggleInfo(infoType: string) {
    this.activeInfo = infoType;
    document.getElementById('user')?.classList.remove('active');
    document.getElementById('favorites')?.classList.remove('active');
    document.getElementById('approve')?.classList.remove('active');
    document.getElementById('allUsersAndAuthors')?.classList.remove('active');
    document.getElementById(infoType)?.classList.add('active');
  }

  setActiveSection(section: string) {
    this.activeSection = section;

    if (section == 'actors') {
      if (!this.actors.length && this.favorites.actor) {
        // Fetch details for favorite actors
        this.favorites.actor.forEach((element: { actor_id: string; }) => {
          this.generalService.title$.subscribe(() => {
            this.loading$ = this.generalService.getLoading();
            this.actorService.getFavoriteActorsById(element.actor_id).pipe(
              takeUntil(this._destroy$)
              ).subscribe(results => this.actors.push(results.bio));
          });
        });
      }
    } else if (section == 'tvShows') {
      if (!this.shows.length && this.favorites.show) {
        // Fetch details for favorite shows
        this.favorites.show.forEach((element: { show_id: string; }) => {
          this.generalService.title$.subscribe(() => {
            this.loading$ = this.generalService.getLoading();
            this.generalService.getFavoriteProjectionDetails(element.show_id).pipe(
              takeUntil(this._destroy$)
              ).subscribe(results => this.shows.push(results.details));
          });
        });
      }
    }
  }

  removeFavoriteFromList(id: string) {
    const element = document.getElementById(id);

    if (element) {
      this.renderer.removeChild(element.parentElement, element);
    }
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
    // Redirect logic here
  }

  updateUserInfo() {
    if (this.updateForm.invalid) {
      return;
    }
    const formData = {
      username: this.updateForm.value['editedUsername'],
      email: this.updateForm.value['editedEmail'],
      password: this.updateForm.value['password']
    };
    // Call your AuthService method to update user info
    this.authService.updateUserInfo(this.id, formData.username, formData.email, formData.password).subscribe(
      response => {
        // Update local storage with new user info
        localStorage.setItem('username', formData.username);
        localStorage.setItem('email', formData.email);

        this.username = localStorage.getItem('username');
        this.email = localStorage.getItem('email');

        this.openDialog('Success', 'Update successful');
      },
      error => {
        this.openDialog('Error', 'Update failed');
      }
    );
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  private openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(RegistrationResultDialogComponent, {
      data: { title, message },
    });
  }

  loadRoles(): void {
    this.authService.fetchRoles().subscribe(
      response => {
        this.roles = response;
    },
      error => {
        this.openDialog('Error', 'Something went wrong while fetching all the roles');
    });
  }

  changeUserRole(userId: number, roleId: number): void {
    this.authService.changeUserRole(userId, roleId).subscribe(() => {
      this.openDialog('Success', 'User role updated successful');
    });
  }

  confirmApproval(userId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: 'Are you sure of the approval of this user?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.approveUser(userId);
      }
    });
  }

  approveUser(userId: string): void {
    this.authService.approveUser(userId).subscribe(
      response => {
        this.unapprovedUsers = this.unapprovedUsers.filter((item: { id: string; }) => item.id !== userId);
        this.openDialog('Success', 'User approved successful');
      },
      error => {
        this.openDialog('Error', 'Approving failed');
      }
    );
  }

  confirmDelete(userId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: 'Do you really want to delete this user?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }

  deleteUser(userId: string): void {
    this.authService.deleteUser(userId).subscribe(
      response => {
        this.unapprovedUsers = this.unapprovedUsers.filter((item: { id: string; }) => item.id !== userId);
        this.openDialog('Success', response.message);
      },
      error => {
        this.openDialog('Error', 'Deleting failed');
      }
    );
  }

  isRoleReadOnly(userRoleId: string): boolean {
    if (userRoleId === '1') {
      return true;
    }

    return false;
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
