package io.jhipster.test1.service;

import io.jhipster.test1.service.dto.MentionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Mention.
 */
public interface MentionService {

    /**
     * Save a mention.
     *
     * @param mentionDTO the entity to save
     * @return the persisted entity
     */
    MentionDTO save(MentionDTO mentionDTO);

    /**
     * Get all the mentions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MentionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" mention.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MentionDTO findOne(Long id);

    /**
     * Delete the "id" mention.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
