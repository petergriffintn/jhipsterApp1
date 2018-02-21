package io.jhipster.test1.service.impl;

import io.jhipster.test1.service.ProgrammeService;
import io.jhipster.test1.domain.Programme;
import io.jhipster.test1.repository.ProgrammeRepository;
import io.jhipster.test1.service.dto.ProgrammeDTO;
import io.jhipster.test1.service.mapper.ProgrammeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Programme.
 */
@Service
@Transactional
public class ProgrammeServiceImpl implements ProgrammeService {

    private final Logger log = LoggerFactory.getLogger(ProgrammeServiceImpl.class);

    private final ProgrammeRepository programmeRepository;

    private final ProgrammeMapper programmeMapper;

    public ProgrammeServiceImpl(ProgrammeRepository programmeRepository, ProgrammeMapper programmeMapper) {
        this.programmeRepository = programmeRepository;
        this.programmeMapper = programmeMapper;
    }

    /**
     * Save a programme.
     *
     * @param programmeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProgrammeDTO save(ProgrammeDTO programmeDTO) {
        log.debug("Request to save Programme : {}", programmeDTO);
        Programme programme = programmeMapper.toEntity(programmeDTO);
        programme = programmeRepository.save(programme);
        return programmeMapper.toDto(programme);
    }

    /**
     * Get all the programmes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProgrammeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Programmes");
        return programmeRepository.findAll(pageable)
            .map(programmeMapper::toDto);
    }

    /**
     * Get one programme by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProgrammeDTO findOne(Long id) {
        log.debug("Request to get Programme : {}", id);
        Programme programme = programmeRepository.findOne(id);
        return programmeMapper.toDto(programme);
    }

    /**
     * Delete the programme by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Programme : {}", id);
        programmeRepository.delete(id);
    }
}
