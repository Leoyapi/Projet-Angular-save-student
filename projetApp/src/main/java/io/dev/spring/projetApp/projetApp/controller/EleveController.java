package io.dev.spring.projetApp.projetApp.controller;

import io.dev.spring.projetApp.projetApp.modele.Eleve;
import io.dev.spring.projetApp.projetApp.service.EleveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eleves")
@CrossOrigin(origins = "http://localhost:4200")
public class EleveController {

    @Autowired
    private EleveService eleveService;

    @GetMapping
    public ResponseEntity<List<Eleve>> getAllEleves() {
        try {
            List<Eleve> eleves = eleveService.getAllEleves();
            return ResponseEntity.ok(eleves);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Eleve> getEleve(@PathVariable Long id) {
        try {
            Eleve eleve = eleveService.getEleveById(id);
            if (eleve != null) {
                return ResponseEntity.ok(eleve);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Eleve> addEleve(@RequestBody Eleve eleve) {
        try {
            Eleve savedEleve = eleveService.saveEleve(eleve);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedEleve);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Eleve> updateEleve(@PathVariable Long id, @RequestBody Eleve eleve) {
        try {
            eleve.setId(id);
            Eleve updatedEleve = eleveService.saveEleve(eleve);
            return ResponseEntity.ok(updatedEleve);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEleve(@PathVariable Long id) {
        try {
            System.out.println("Tentative de suppression de l'élève avec ID : " + id);

            // Vérifiez si l'élève existe avant de tenter de le supprimer
            boolean exists = eleveService.existsById(id); // Ajouter cette méthode dans EleveService

            if (!exists) {
                System.out.println("Élève avec ID " + id + " n'existe pas.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Réponse HTTP 404 Not Found
            }

            eleveService.deleteEleve(id); // Suppression de l'élève
            System.out.println("Élève avec ID " + id + " supprimé avec succès.");
            return ResponseEntity.noContent().build(); // Réponse HTTP 204 No Content
        } catch (Exception e) {
            System.out.println("Erreur lors de la suppression de l'élève avec ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Réponse HTTP 500
        }
    }
}
