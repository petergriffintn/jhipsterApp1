package io.jhipster.test1.service;

import io.jhipster.test1.service.dto.UeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Ue.
 */
public interface UeService {

    /**
     * Save a ue.
     *
     * @param ueDTO the entity to save
     * @return the persisted entity
     */
    UeDTO save(UeDTO ueDTO);

    /**
     * Get all the ues.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<UeDTO> findAll(Pageable pageable);

    /**
     * Get the "id" ue.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UeDTO findOne(Long id);

    /**
     * Delete the "id" ue.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
