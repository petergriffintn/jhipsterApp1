package io.jhipster.test1.service.impl;

import io.jhipster.test1.service.EtablissementService;
import io.jhipster.test1.domain.Etablissement;
import io.jhipster.test1.repository.EtablissementRepository;
import io.jhipster.test1.service.dto.EtablissementDTO;
import io.jhipster.test1.service.mapper.EtablissementMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Etablissement.
 */
@Service
@Transactional
public class EtablissementServiceImpl implements EtablissementService {

    private final Logger log = LoggerFactory.getLogger(EtablissementServiceImpl.class);

    private final EtablissementRepository etablissementRepository;

    private final EtablissementMapper etablissementMapper;

    public EtablissementServiceImpl(EtablissementRepository etablissementRepository, EtablissementMapper etablissementMapper) {
        this.etablissementRepository = etablissementRepository;
        this.etablissementMapper = etablissementMapper;
    }

    /**
     * Save a etablissement.
     *
     * @param etablissementDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EtablissementDTO save(EtablissementDTO etablissementDTO) {
        log.debug("Request to save Etablissement : {}", etablissementDTO);
        Etablissement etablissement = etablissementMapper.toEntity(etablissementDTO);
        etablissement = etablissementRepository.save(etablissement);
        return etablissementMapper.toDto(etablissement);
    }

    /**
     * Get all the etablissements.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EtablissementDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Etablissements");
        return etablissementRepository.findAll(pageable)
            .map(etablissementMapper::toDto);
    }

    /**
     * Get one etablissement by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EtablissementDTO findOne(Long id) {
        log.debug("Request to get Etablissement : {}", id);
        Etablissement etablissement = etablissementRepository.findOne(id);
        return etablissementMapper.toDto(etablissement);
    }

    /**
     * Delete the etablissement by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Etablissement : {}", id);
        etablissementRepository.delete(id);
    }
}
