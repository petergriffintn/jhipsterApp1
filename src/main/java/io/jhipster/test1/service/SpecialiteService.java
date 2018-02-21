package io.jhipster.test1.service;

import io.jhipster.test1.service.dto.SpecialiteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Specialite.
 */
public interface SpecialiteService {

    /**
     * Save a specialite.
     *
     * @param specialiteDTO the entity to save
     * @return the persisted entity
     */
    SpecialiteDTO save(SpecialiteDTO specialiteDTO);

    /**
     * Get all the specialites.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SpecialiteDTO> findAll(Pageable pageable);

    /**
     * Get the "id" specialite.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SpecialiteDTO findOne(Long id);

    /**
     * Delete the "id" specialite.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
