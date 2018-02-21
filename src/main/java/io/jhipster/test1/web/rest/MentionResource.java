package io.jhipster.test1.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.jhipster.test1.service.MentionService;
import io.jhipster.test1.web.rest.errors.BadRequestAlertException;
import io.jhipster.test1.web.rest.util.HeaderUtil;
import io.jhipster.test1.web.rest.util.PaginationUtil;
import io.jhipster.test1.service.dto.MentionDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Mention.
 */
@RestController
@RequestMapping("/api")
public class MentionResource {

    private final Logger log = LoggerFactory.getLogger(MentionResource.class);

    private static final String ENTITY_NAME = "mention";

    private final MentionService mentionService;

    public MentionResource(MentionService mentionService) {
        this.mentionService = mentionService;
    }

    /**
     * POST  /mentions : Create a new mention.
     *
     * @param mentionDTO the mentionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mentionDTO, or with status 400 (Bad Request) if the mention has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mentions")
    @Timed
    public ResponseEntity<MentionDTO> createMention(@Valid @RequestBody MentionDTO mentionDTO) throws URISyntaxException {
        log.debug("REST request to save Mention : {}", mentionDTO);
        if (mentionDTO.getId() != null) {
            throw new BadRequestAlertException("A new mention cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MentionDTO result = mentionService.save(mentionDTO);
        return ResponseEntity.created(new URI("/api/mentions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mentions : Updates an existing mention.
     *
     * @param mentionDTO the mentionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mentionDTO,
     * or with status 400 (Bad Request) if the mentionDTO is not valid,
     * or with status 500 (Internal Server Error) if the mentionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mentions")
    @Timed
    public ResponseEntity<MentionDTO> updateMention(@Valid @RequestBody MentionDTO mentionDTO) throws URISyntaxException {
        log.debug("REST request to update Mention : {}", mentionDTO);
        if (mentionDTO.getId() == null) {
            return createMention(mentionDTO);
        }
        MentionDTO result = mentionService.save(mentionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mentionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mentions : get all the mentions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mentions in body
     */
    @GetMapping("/mentions")
    @Timed
    public ResponseEntity<List<MentionDTO>> getAllMentions(Pageable pageable) {
        log.debug("REST request to get a page of Mentions");
        Page<MentionDTO> page = mentionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mentions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /mentions/:id : get the "id" mention.
     *
     * @param id the id of the mentionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mentionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/mentions/{id}")
    @Timed
    public ResponseEntity<MentionDTO> getMention(@PathVariable Long id) {
        log.debug("REST request to get Mention : {}", id);
        MentionDTO mentionDTO = mentionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mentionDTO));
    }

    /**
     * DELETE  /mentions/:id : delete the "id" mention.
     *
     * @param id the id of the mentionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mentions/{id}")
    @Timed
    public ResponseEntity<Void> deleteMention(@PathVariable Long id) {
        log.debug("REST request to delete Mention : {}", id);
        mentionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
