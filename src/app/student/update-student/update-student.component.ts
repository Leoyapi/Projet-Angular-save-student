import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,} from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EleveService } from '../../core/sevices/eleve';
import { Eleve } from '../../core/models/eleve';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  eleveForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  eleveId!: number;

  constructor(
    private fb: FormBuilder,
    private eleveService: EleveService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eleveId = Number(this.route.snapshot.paramMap.get('id'));
    this.eleveForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numeroInscription: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      residence: ['', Validators.required]
    });

    this.loadEleve();
  }

  loadEleve(): void {
    this.eleveService.getEleveById(this.eleveId).subscribe({
      next: (data: Eleve) => {
        // Convertir la date au format 'yyyy-MM-dd'
        if (data.dateNaissance) {
          const date = new Date(data.dateNaissance);
          const formattedDate = date.toISOString().split('T')[0]; // 'yyyy-MM-dd'
          data.dateNaissance = formattedDate;
        }

        this.eleveForm.patchValue(data);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des données de l\'élève.';
        console.error('Erreur:', error);
      }
    });
  }

  updateEleve(): void {
    if (this.eleveForm.valid) {
      const updatedEleve = this.eleveForm.value;

      // Convertir la date au format 'yyyy-MM-dd'
      if (updatedEleve.dateNaissance) {
        const date = new Date(updatedEleve.dateNaissance);
        const formattedDate = date.toISOString().split('T')[0]; // 'yyyy-MM-dd'
        updatedEleve.dateNaissance = formattedDate;
      }

      this.eleveService.updateEleve(this.eleveId, updatedEleve).subscribe({
        next: () => {
          this.successMessage = "Élève mis à jour avec succès!";
          this.errorMessage = null;
          this.router.navigate(['/list-student']);
        },
        error: (error) => {
          this.errorMessage = "Erreur lors de la mise à jour de l'élève. Veuillez réessayer.";
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
