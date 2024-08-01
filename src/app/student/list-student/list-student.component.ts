import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { Eleve } from "../../core/models/eleve";
import { EleveService } from "../../core/sevices/eleve";

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
  successMessage: string | null = null;

  constructor(private eleveService: EleveService, private router: Router) {}

  ngOnInit(): void {
    this.loadEleves();
  }

  loadEleves(): void {
    this.eleveService.getEleves().subscribe({
      next: (data: Eleve[]) => {
        this.eleves = this.sortElevesByCreationDate(data); // Assurez-vous d'utiliser la méthode de tri correcte
        this.filteredEleves = [...this.eleves];
        this.errorMessage = null;
        this.successMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des élèves. Veuillez réessayer.';
        this.successMessage = null;
        console.error('Erreur:', error);
      }
    });
  }

  sortElevesByCreationDate(eleves: Eleve[]): Eleve[] {
    return eleves.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
    console.log('Navigating to update-student with ID:', eleve.id);
    this.router.navigate(['/update-student', eleve.id]);
  }

  trackById(_index: number, eleve: Eleve): number {
    return eleve.id;
  }
}
