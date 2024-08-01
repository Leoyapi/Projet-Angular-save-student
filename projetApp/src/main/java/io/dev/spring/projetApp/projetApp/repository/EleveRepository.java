package io.dev.spring.projetApp.projetApp.repository;

import io.dev.spring.projetApp.projetApp.modele.Eleve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EleveRepository extends JpaRepository<Eleve, Long> {

    // Trouver tous les élèves triés par date de création (du plus récent au plus ancien)
    List<Eleve> findAllByOrderByCreatedAtDesc();
}
