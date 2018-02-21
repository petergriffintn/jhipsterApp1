package io.jhipster.test1.service.impl;

import io.jhipster.test1.service.EeService;
import io.jhipster.test1.domain.Ee;
import io.jhipster.test1.repository.EeRepository;
import io.jhipster.test1.service.dto.EeDTO;
import io.jhipster.test1.service.mapper.EeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Ee.
 */
@Service
@Transactional
public class EeServiceImpl implements EeService {

    private final Logger log = LoggerFactory.getLogger(EeServiceImpl.class);

    private final EeRepository eeRepository;

    private final EeMapper eeMapper;

    public EeServiceImpl(EeRepository eeRepository, EeMapper eeMapper) {
        this.eeRepository = eeRepository;
        this.eeMapper = eeMapper;
    }

    /**
     * Save a ee.
     *
     * @param eeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EeDTO save(EeDTO eeDTO) {
        log.debug("Request to save Ee : {}", eeDTO);
        Ee ee = eeMapper.toEntity(eeDTO);
        ee = eeRepository.save(ee);
        return eeMapper.toDto(ee);
    }

    /**
     * Get all the ees.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Ees");
        return eeRepository.findAll(pageable)
            .map(eeMapper::toDto);
    }

    /**
     * Get one ee by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EeDTO findOne(Long id) {
        log.debug("Request to get Ee : {}", id);
        Ee ee = eeRepository.findOne(id);
        return eeMapper.toDto(ee);
    }

    /**
     * Delete the ee by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ee : {}", id);
        eeRepository.delete(id);
    }
}
