package io.jhipster.test1.service.impl;

import io.jhipster.test1.service.DomaineService;
import io.jhipster.test1.domain.Domaine;
import io.jhipster.test1.repository.DomaineRepository;
import io.jhipster.test1.service.dto.DomaineDTO;
import io.jhipster.test1.service.mapper.DomaineMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Domaine.
 */
@Service
@Transactional
public class DomaineServiceImpl implements DomaineService {

    private final Logger log = LoggerFactory.getLogger(DomaineServiceImpl.class);

    private final DomaineRepository domaineRepository;

    private final DomaineMapper domaineMapper;

    public DomaineServiceImpl(DomaineRepository domaineRepository, DomaineMapper domaineMapper) {
        this.domaineRepository = domaineRepository;
        this.domaineMapper = domaineMapper;
    }

    /**
     * Save a domaine.
     *
     * @param domaineDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DomaineDTO save(DomaineDTO domaineDTO) {
        log.debug("Request to save Domaine : {}", domaineDTO);
        Domaine domaine = domaineMapper.toEntity(domaineDTO);
        domaine = domaineRepository.save(domaine);
        return domaineMapper.toDto(domaine);
    }

    /**
     * Get all the domaines.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DomaineDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Domaines");
        return domaineRepository.findAll(pageable)
            .map(domaineMapper::toDto);
    }

    /**
     * Get one domaine by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DomaineDTO findOne(Long id) {
        log.debug("Request to get Domaine : {}", id);
        Domaine domaine = domaineRepository.findOne(id);
        return domaineMapper.toDto(domaine);
    }

    /**
     * Delete the domaine by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Domaine : {}", id);
        domaineRepository.delete(id);
    }
}
