package io.jhipster.test1.service.impl;

import io.jhipster.test1.service.ParcoursService;
import io.jhipster.test1.domain.Parcours;
import io.jhipster.test1.repository.ParcoursRepository;
import io.jhipster.test1.service.dto.ParcoursDTO;
import io.jhipster.test1.service.mapper.ParcoursMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Parcours.
 */
@Service
@Transactional
public class ParcoursServiceImpl implements ParcoursService {

    private final Logger log = LoggerFactory.getLogger(ParcoursServiceImpl.class);

    private final ParcoursRepository parcoursRepository;

    private final ParcoursMapper parcoursMapper;

    public ParcoursServiceImpl(ParcoursRepository parcoursRepository, ParcoursMapper parcoursMapper) {
        this.parcoursRepository = parcoursRepository;
        this.parcoursMapper = parcoursMapper;
    }

    /**
     * Save a parcours.
     *
     * @param parcoursDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ParcoursDTO save(ParcoursDTO parcoursDTO) {
        log.debug("Request to save Parcours : {}", parcoursDTO);
        Parcours parcours = parcoursMapper.toEntity(parcoursDTO);
        parcours = parcoursRepository.save(parcours);
        return parcoursMapper.toDto(parcours);
    }

    /**
     * Get all the parcours.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ParcoursDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Parcours");
        return parcoursRepository.findAll(pageable)
            .map(parcoursMapper::toDto);
    }

    /**
     * Get one parcours by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ParcoursDTO findOne(Long id) {
        log.debug("Request to get Parcours : {}", id);
        Parcours parcours = parcoursRepository.findOne(id);
        return parcoursMapper.toDto(parcours);
    }

    /**
     * Delete the parcours by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Parcours : {}", id);
        parcoursRepository.delete(id);
    }
}
