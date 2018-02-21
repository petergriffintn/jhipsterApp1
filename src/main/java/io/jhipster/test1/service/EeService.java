package io.jhipster.test1.service;

import io.jhipster.test1.service.dto.EeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Ee.
 */
public interface EeService {

    /**
     * Save a ee.
     *
     * @param eeDTO the entity to save
     * @return the persisted entity
     */
    EeDTO save(EeDTO eeDTO);

    /**
     * Get all the ees.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EeDTO> findAll(Pageable pageable);

    /**
     * Get the "id" ee.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EeDTO findOne(Long id);

    /**
     * Delete the "id" ee.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
