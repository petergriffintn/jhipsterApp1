package io.jhipster.test1.service.impl;

import io.jhipster.test1.service.UeService;
import io.jhipster.test1.domain.Ue;
import io.jhipster.test1.repository.UeRepository;
import io.jhipster.test1.service.dto.UeDTO;
import io.jhipster.test1.service.mapper.UeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Ue.
 */
@Service
@Transactional
public class UeServiceImpl implements UeService {

    private final Logger log = LoggerFactory.getLogger(UeServiceImpl.class);

    private final UeRepository ueRepository;

    private final UeMapper ueMapper;

    public UeServiceImpl(UeRepository ueRepository, UeMapper ueMapper) {
        this.ueRepository = ueRepository;
        this.ueMapper = ueMapper;
    }

    /**
     * Save a ue.
     *
     * @param ueDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UeDTO save(UeDTO ueDTO) {
        log.debug("Request to save Ue : {}", ueDTO);
        Ue ue = ueMapper.toEntity(ueDTO);
        ue = ueRepository.save(ue);
        return ueMapper.toDto(ue);
    }

    /**
     * Get all the ues.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Ues");
        return ueRepository.findAll(pageable)
            .map(ueMapper::toDto);
    }

    /**
     * Get one ue by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UeDTO findOne(Long id) {
        log.debug("Request to get Ue : {}", id);
        Ue ue = ueRepository.findOne(id);
        return ueMapper.toDto(ue);
    }

    /**
     * Delete the ue by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ue : {}", id);
        ueRepository.delete(id);
    }
}
