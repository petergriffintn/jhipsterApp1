package io.jhipster.test1.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.jhipster.test1.service.ParcoursService;
import io.jhipster.test1.web.rest.errors.BadRequestAlertException;
import io.jhipster.test1.web.rest.util.HeaderUtil;
import io.jhipster.test1.web.rest.util.PaginationUtil;
import io.jhipster.test1.service.dto.ParcoursDTO;
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
 * REST controller for managing Parcours.
 */
@RestController
@RequestMapping("/api")
public class ParcoursResource {

    private final Logger log = LoggerFactory.getLogger(ParcoursResource.class);

    private static final String ENTITY_NAME = "parcours";

    private final ParcoursService parcoursService;

    public ParcoursResource(ParcoursService parcoursService) {
        this.parcoursService = parcoursService;
    }

    /**
     * POST  /parcours : Create a new parcours.
     *
     * @param parcoursDTO the parcoursDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parcoursDTO, or with status 400 (Bad Request) if the parcours has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parcours")
    @Timed
    public ResponseEntity<ParcoursDTO> createParcours(@Valid @RequestBody ParcoursDTO parcoursDTO) throws URISyntaxException {
        log.debug("REST request to save Parcours : {}", parcoursDTO);
        if (parcoursDTO.getId() != null) {
            throw new BadRequestAlertException("A new parcours cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParcoursDTO result = parcoursService.save(parcoursDTO);
        return ResponseEntity.created(new URI("/api/parcours/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parcours : Updates an existing parcours.
     *
     * @param parcoursDTO the parcoursDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parcoursDTO,
     * or with status 400 (Bad Request) if the parcoursDTO is not valid,
     * or with status 500 (Internal Server Error) if the parcoursDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parcours")
    @Timed
    public ResponseEntity<ParcoursDTO> updateParcours(@Valid @RequestBody ParcoursDTO parcoursDTO) throws URISyntaxException {
        log.debug("REST request to update Parcours : {}", parcoursDTO);
        if (parcoursDTO.getId() == null) {
            return createParcours(parcoursDTO);
        }
        ParcoursDTO result = parcoursService.save(parcoursDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parcoursDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parcours : get all the parcours.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of parcours in body
     */
    @GetMapping("/parcours")
    @Timed
    public ResponseEntity<List<ParcoursDTO>> getAllParcours(Pageable pageable) {
        log.debug("REST request to get a page of Parcours");
        Page<ParcoursDTO> page = parcoursService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/parcours");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /parcours/:id : get the "id" parcours.
     *
     * @param id the id of the parcoursDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parcoursDTO, or with status 404 (Not Found)
     */
    @GetMapping("/parcours/{id}")
    @Timed
    public ResponseEntity<ParcoursDTO> getParcours(@PathVariable Long id) {
        log.debug("REST request to get Parcours : {}", id);
        ParcoursDTO parcoursDTO = parcoursService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(parcoursDTO));
    }

    /**
     * DELETE  /parcours/:id : delete the "id" parcours.
     *
     * @param id the id of the parcoursDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parcours/{id}")
    @Timed
    public ResponseEntity<Void> deleteParcours(@PathVariable Long id) {
        log.debug("REST request to delete Parcours : {}", id);
        parcoursService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
