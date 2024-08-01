package io.dev.spring.projetApp.projetApp.service;

import io.dev.spring.projetApp.projetApp.modele.Eleve;
import io.dev.spring.projetApp.projetApp.repository.EleveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EleveService {

    @Autowired
    private EleveRepository eleveRepository;

    public List<Eleve> getAllEleves() {
        // Trier par date de création (createdAt) du plus récent au plus ancien
        return eleveRepository.findAllByOrderByCreatedAtDesc();
    }

    public Eleve getEleveById(Long id) {
        return eleveRepository.findById(id).orElse(null);
    }

    public Eleve saveEleve(Eleve eleve) {
        return eleveRepository.save(eleve);
    }

    public void deleteEleve(Long id) {
        eleveRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return eleveRepository.existsById(id);
    }
}
