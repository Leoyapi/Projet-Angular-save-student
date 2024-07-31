package io.dev.spring.projetApp.projetApp.modele;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
public class Eleve {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String numeroInscription;

    @Column(name = "date_naissance")
    private LocalDate dateNaissance;

    private String residence;

    public Eleve() {
    }

    public Eleve(Long id, String nom, String prenom, String numeroInscription, LocalDate dateNaissance, String residence) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.numeroInscription = numeroInscription;
        this.dateNaissance = dateNaissance;
        this.residence = residence;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNumeroInscription() {
        return numeroInscription;
    }

    public void setNumeroInscription(String numeroInscription) {
        this.numeroInscription = numeroInscription;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getResidence() {
        return residence;
    }

    public void setResidence(String residence) {
        this.residence = residence;
    }
}
