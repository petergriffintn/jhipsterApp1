package io.jhipster.test1.service.impl;

import io.jhipster.test1.service.MentionService;
import io.jhipster.test1.domain.Mention;
import io.jhipster.test1.repository.MentionRepository;
import io.jhipster.test1.service.dto.MentionDTO;
import io.jhipster.test1.service.mapper.MentionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Mention.
 */
@Service
@Transactional
public class MentionServiceImpl implements MentionService {

    private final Logger log = LoggerFactory.getLogger(MentionServiceImpl.class);

    private final MentionRepository mentionRepository;

    private final MentionMapper mentionMapper;

    public MentionServiceImpl(MentionRepository mentionRepository, MentionMapper mentionMapper) {
        this.mentionRepository = mentionRepository;
        this.mentionMapper = mentionMapper;
    }

    /**
     * Save a mention.
     *
     * @param mentionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MentionDTO save(MentionDTO mentionDTO) {
        log.debug("Request to save Mention : {}", mentionDTO);
        Mention mention = mentionMapper.toEntity(mentionDTO);
        mention = mentionRepository.save(mention);
        return mentionMapper.toDto(mention);
    }

    /**
     * Get all the mentions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MentionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Mentions");
        return mentionRepository.findAll(pageable)
            .map(mentionMapper::toDto);
    }

    /**
     * Get one mention by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MentionDTO findOne(Long id) {
        log.debug("Request to get Mention : {}", id);
        Mention mention = mentionRepository.findOne(id);
        return mentionMapper.toDto(mention);
    }

    /**
     * Delete the mention by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Mention : {}", id);
        mentionRepository.delete(id);
    }
}
