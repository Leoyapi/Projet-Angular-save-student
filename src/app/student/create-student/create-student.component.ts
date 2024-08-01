import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { Router} from '@angular/router';
import { RouterModule } from '@angular/router';
import { Eleve } from '../../core/models/eleve';
import { EleveService } from '../../core/sevices/eleve';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  eleveForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading: boolean=false; //spinner decla


  constructor(
    private fb: FormBuilder,
    private eleveService: EleveService,
    //private router: Router
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.eleveForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numeroInscription: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      residence: ['', Validators.required]
    });
  }

  saveEleve(): void {
    if (this.eleveForm.valid) {
      const eleve: Eleve = {
        ...this.eleveForm.value,
        createdAt: new Date().toISOString() // Ajoutez la date de création ici
      };
      console.log('Début du chargement...'); // spin
      this.isLoading = true; // spin
      this.cdr.detectChanges();
      this.eleveService.createEleve(eleve).subscribe({
        next: () => {
          console.log('Chargement terminé avec succès.'); // spin
          this.isLoading = false; // spin
          this.cdr.detectChanges();
          console.log('Chargement terminé avec succès.'); // spin
          this.successMessage = "Élève créé avec succès!";
          this.errorMessage = null;
          this.eleveForm.reset();
        },
        error: (error) => {
          console.log('Erreur lors du chargement.'); // spin
          this.isLoading = false; // spin
          this.cdr.detectChanges();
          this.errorMessage = "Erreur lors de la création de l'élève. Veuillez réessayer.";
          this.successMessage = null;
          console.error('Erreur:', error);
        }
      });
    } else {
      this.errorMessage = "Veuillez remplir tous les champs requis.";
      this.successMessage = null;
    }
  }
}


