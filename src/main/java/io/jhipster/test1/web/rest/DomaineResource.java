package io.jhipster.test1.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.jhipster.test1.service.DomaineService;
import io.jhipster.test1.web.rest.errors.BadRequestAlertException;
import io.jhipster.test1.web.rest.util.HeaderUtil;
import io.jhipster.test1.web.rest.util.PaginationUtil;
import io.jhipster.test1.service.dto.DomaineDTO;
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
 * REST controller for managing Domaine.
 */
@RestController
@RequestMapping("/api")
public class DomaineResource {

    private final Logger log = LoggerFactory.getLogger(DomaineResource.class);

    private static final String ENTITY_NAME = "domaine";

    private final DomaineService domaineService;

    public DomaineResource(DomaineService domaineService) {
        this.domaineService = domaineService;
    }

    /**
     * POST  /domaines : Create a new domaine.
     *
     * @param domaineDTO the domaineDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new domaineDTO, or with status 400 (Bad Request) if the domaine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/domaines")
    @Timed
    public ResponseEntity<DomaineDTO> createDomaine(@Valid @RequestBody DomaineDTO domaineDTO) throws URISyntaxException {
        log.debug("REST request to save Domaine : {}", domaineDTO);
        if (domaineDTO.getId() != null) {
            throw new BadRequestAlertException("A new domaine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DomaineDTO result = domaineService.save(domaineDTO);
        return ResponseEntity.created(new URI("/api/domaines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /domaines : Updates an existing domaine.
     *
     * @param domaineDTO the domaineDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated domaineDTO,
     * or with status 400 (Bad Request) if the domaineDTO is not valid,
     * or with status 500 (Internal Server Error) if the domaineDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/domaines")
    @Timed
    public ResponseEntity<DomaineDTO> updateDomaine(@Valid @RequestBody DomaineDTO domaineDTO) throws URISyntaxException {
        log.debug("REST request to update Domaine : {}", domaineDTO);
        if (domaineDTO.getId() == null) {
            return createDomaine(domaineDTO);
        }
        DomaineDTO result = domaineService.save(domaineDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, domaineDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /domaines : get all the domaines.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of domaines in body
     */
    @GetMapping("/domaines")
    @Timed
    public ResponseEntity<List<DomaineDTO>> getAllDomaines(Pageable pageable) {
        log.debug("REST request to get a page of Domaines");
        Page<DomaineDTO> page = domaineService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/domaines");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /domaines/:id : get the "id" domaine.
     *
     * @param id the id of the domaineDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the domaineDTO, or with status 404 (Not Found)
     */
    @GetMapping("/domaines/{id}")
    @Timed
    public ResponseEntity<DomaineDTO> getDomaine(@PathVariable Long id) {
        log.debug("REST request to get Domaine : {}", id);
        DomaineDTO domaineDTO = domaineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(domaineDTO));
    }

    /**
     * DELETE  /domaines/:id : delete the "id" domaine.
     *
     * @param id the id of the domaineDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/domaines/{id}")
    @Timed
    public ResponseEntity<Void> deleteDomaine(@PathVariable Long id) {
        log.debug("REST request to delete Domaine : {}", id);
        domaineService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
