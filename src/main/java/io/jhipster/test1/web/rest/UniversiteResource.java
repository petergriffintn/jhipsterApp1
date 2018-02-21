package io.jhipster.test1.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.jhipster.test1.service.UniversiteService;
import io.jhipster.test1.web.rest.errors.BadRequestAlertException;
import io.jhipster.test1.web.rest.util.HeaderUtil;
import io.jhipster.test1.web.rest.util.PaginationUtil;
import io.jhipster.test1.service.dto.UniversiteDTO;
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
 * REST controller for managing Universite.
 */
@RestController
@RequestMapping("/api")
public class UniversiteResource {

    private final Logger log = LoggerFactory.getLogger(UniversiteResource.class);

    private static final String ENTITY_NAME = "universite";

    private final UniversiteService universiteService;

    public UniversiteResource(UniversiteService universiteService) {
        this.universiteService = universiteService;
    }

    /**
     * POST  /universites : Create a new universite.
     *
     * @param universiteDTO the universiteDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new universiteDTO, or with status 400 (Bad Request) if the universite has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/universites")
    @Timed
    public ResponseEntity<UniversiteDTO> createUniversite(@Valid @RequestBody UniversiteDTO universiteDTO) throws URISyntaxException {
        log.debug("REST request to save Universite : {}", universiteDTO);
        if (universiteDTO.getId() != null) {
            throw new BadRequestAlertException("A new universite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UniversiteDTO result = universiteService.save(universiteDTO);
        return ResponseEntity.created(new URI("/api/universites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /universites : Updates an existing universite.
     *
     * @param universiteDTO the universiteDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated universiteDTO,
     * or with status 400 (Bad Request) if the universiteDTO is not valid,
     * or with status 500 (Internal Server Error) if the universiteDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/universites")
    @Timed
    public ResponseEntity<UniversiteDTO> updateUniversite(@Valid @RequestBody UniversiteDTO universiteDTO) throws URISyntaxException {
        log.debug("REST request to update Universite : {}", universiteDTO);
        if (universiteDTO.getId() == null) {
            return createUniversite(universiteDTO);
        }
        UniversiteDTO result = universiteService.save(universiteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, universiteDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /universites : get all the universites.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of universites in body
     */
    @GetMapping("/universites")
    @Timed
    public ResponseEntity<List<UniversiteDTO>> getAllUniversites(Pageable pageable) {
        log.debug("REST request to get a page of Universites");
        Page<UniversiteDTO> page = universiteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/universites");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /universites/:id : get the "id" universite.
     *
     * @param id the id of the universiteDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the universiteDTO, or with status 404 (Not Found)
     */
    @GetMapping("/universites/{id}")
    @Timed
    public ResponseEntity<UniversiteDTO> getUniversite(@PathVariable Long id) {
        log.debug("REST request to get Universite : {}", id);
        UniversiteDTO universiteDTO = universiteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(universiteDTO));
    }

    /**
     * DELETE  /universites/:id : delete the "id" universite.
     *
     * @param id the id of the universiteDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/universites/{id}")
    @Timed
    public ResponseEntity<Void> deleteUniversite(@PathVariable Long id) {
        log.debug("REST request to delete Universite : {}", id);
        universiteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
