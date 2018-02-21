package io.jhipster.test1.service.impl;

import io.jhipster.test1.service.UniversiteService;
import io.jhipster.test1.domain.Universite;
import io.jhipster.test1.repository.UniversiteRepository;
import io.jhipster.test1.service.dto.UniversiteDTO;
import io.jhipster.test1.service.mapper.UniversiteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Universite.
 */
@Service
@Transactional
public class UniversiteServiceImpl implements UniversiteService {

    private final Logger log = LoggerFactory.getLogger(UniversiteServiceImpl.class);

    private final UniversiteRepository universiteRepository;

    private final UniversiteMapper universiteMapper;

    public UniversiteServiceImpl(UniversiteRepository universiteRepository, UniversiteMapper universiteMapper) {
        this.universiteRepository = universiteRepository;
        this.universiteMapper = universiteMapper;
    }

    /**
     * Save a universite.
     *
     * @param universiteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UniversiteDTO save(UniversiteDTO universiteDTO) {
        log.debug("Request to save Universite : {}", universiteDTO);
        Universite universite = universiteMapper.toEntity(universiteDTO);
        universite = universiteRepository.save(universite);
        return universiteMapper.toDto(universite);
    }

    /**
     * Get all the universites.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UniversiteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Universites");
        return universiteRepository.findAll(pageable)
            .map(universiteMapper::toDto);
    }

    /**
     * Get one universite by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UniversiteDTO findOne(Long id) {
        log.debug("Request to get Universite : {}", id);
        Universite universite = universiteRepository.findOne(id);
        return universiteMapper.toDto(universite);
    }

    /**
     * Delete the universite by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Universite : {}", id);
        universiteRepository.delete(id);
    }
}
