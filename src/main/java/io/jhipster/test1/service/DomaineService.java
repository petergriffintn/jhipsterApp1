package io.jhipster.test1.service;

import io.jhipster.test1.service.dto.DomaineDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Domaine.
 */
public interface DomaineService {

    /**
     * Save a domaine.
     *
     * @param domaineDTO the entity to save
     * @return the persisted entity
     */
    DomaineDTO save(DomaineDTO domaineDTO);

    /**
     * Get all the domaines.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<DomaineDTO> findAll(Pageable pageable);

    /**
     * Get the "id" domaine.
     *
     * @param id the id of the entity
     * @return the entity
     */
    DomaineDTO findOne(Long id);

    /**
     * Delete the "id" domaine.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
