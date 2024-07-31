package io.dev.spring.projetApp.projetApp.service;

import io.dev.spring.projetApp.projetApp.modele.Eleve;
import io.dev.spring.projetApp.projetApp.repository.EleveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EleveService {

    private final EleveRepository eleveRepository;

    @Autowired
    public EleveService(EleveRepository eleveRepository) {
        this.eleveRepository = eleveRepository;
    }

    public List<Eleve> getAllEleves() {
        return (List<Eleve>) eleveRepository.findAll();
    }

    public Eleve getEleveById(Long id) {
        return eleveRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Élève non trouvé avec l'ID: " + id));
    }

    public Eleve saveEleve(Eleve eleve) {
        return eleveRepository.save(eleve);
    }

    public void deleteEleve(Long id) {
        if (!eleveRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Élève non trouvé avec l'ID: " + id);
        }
        eleveRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return eleveRepository.existsById(id);
    }
}
