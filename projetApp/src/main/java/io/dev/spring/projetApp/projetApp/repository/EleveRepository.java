package io.dev.spring.projetApp.projetApp.repository;

import io.dev.spring.projetApp.projetApp.modele.Eleve;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface EleveRepository extends CrudRepository<Eleve, Long> {
}
