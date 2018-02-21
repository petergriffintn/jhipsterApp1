package io.jhipster.test1.service;

import io.jhipster.test1.service.dto.UniversiteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Universite.
 */
public interface UniversiteService {

    /**
     * Save a universite.
     *
     * @param universiteDTO the entity to save
     * @return the persisted entity
     */
    UniversiteDTO save(UniversiteDTO universiteDTO);

    /**
     * Get all the universites.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<UniversiteDTO> findAll(Pageable pageable);

    /**
     * Get the "id" universite.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UniversiteDTO findOne(Long id);

    /**
     * Delete the "id" universite.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
