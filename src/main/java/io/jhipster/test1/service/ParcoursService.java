package io.jhipster.test1.service;

import io.jhipster.test1.service.dto.ParcoursDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Parcours.
 */
public interface ParcoursService {

    /**
     * Save a parcours.
     *
     * @param parcoursDTO the entity to save
     * @return the persisted entity
     */
    ParcoursDTO save(ParcoursDTO parcoursDTO);

    /**
     * Get all the parcours.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ParcoursDTO> findAll(Pageable pageable);

    /**
     * Get the "id" parcours.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ParcoursDTO findOne(Long id);

    /**
     * Delete the "id" parcours.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
