import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Eleve } from '../../core/models/eleve';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EleveService } from '../../core/sevices/eleve';

@Component({
  selector: 'app-list-student',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  nomFilter: string = '';
  prenomFilter: string = '';
  eleves: Eleve[] = [];
  filteredEleves: Eleve[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null; // Ajouté la déclaration

  constructor(private eleveService: EleveService, private router: Router) {}

  ngOnInit(): void {
    this.loadEleves();
  }

  loadEleves(): void {
    this.eleveService.getEleves().subscribe({
      next: (data: Eleve[]) => {
        this.eleves = data;
        this.filteredEleves = data;
        this.errorMessage = null;
        this.successMessage = null; // Réinitialisation du message de succès
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des élèves. Veuillez réessayer.';
        this.successMessage = null; // Réinitialisation du message de succès
        console.error('Erreur:', error);
      }
    });
  }

  filterEleves(): void {
    this.filteredEleves = this.eleves.filter(eleve => {
      const nomMatch = this.nomFilter ? eleve.nom.toLowerCase().includes(this.nomFilter.toLowerCase()) : true;
      const prenomMatch = this.prenomFilter ? eleve.prenom.toLowerCase().includes(this.prenomFilter.toLowerCase()) : true;
      return nomMatch && prenomMatch;
    });
  }

  deleteEleve(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      this.eleveService.deleteEleve(id).subscribe({
        next: () => {
          this.successMessage = 'Élève supprimé avec succès!';
          this.errorMessage = null;
          this.loadEleves(); // Recharger les élèves après suppression
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression de l\'élève.';
          this.successMessage = null;
          console.error('Erreur:', error);
        }
      });
    }
  }

  updateEleve(eleve: Eleve): void {
    // Vérifiez si l'ID est correct
    console.log('Navigating to update-student with ID:', eleve.id);

    this.router.navigate(['/update-student', eleve.id]);
  }

  trackById(_index: number, eleve: Eleve): number {
    return eleve.id;
  }
}
