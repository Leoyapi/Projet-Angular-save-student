export class Eleve {
  id: number;
  nom: string;
  prenom: string;
  numeroInscription: string;
  dateNaissance: string;
  residence: string;
  createdAt: Date; // Ajouté pour la date de création

  constructor(
    id: number = 0,
    nom: string = "",
    prenom: string = "",
    numeroInscription: string = "",
    dateNaissance: string = "",
    residence: string = "",
    createdAt: Date = new Date() // Initialisé à la date actuelle par défaut
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.numeroInscription = numeroInscription;
    this.dateNaissance = dateNaissance;
    this.residence = residence;
    this.createdAt = createdAt;
  }
}
