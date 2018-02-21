package io.jhipster.test1.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.jhipster.test1.service.EeService;
import io.jhipster.test1.web.rest.errors.BadRequestAlertException;
import io.jhipster.test1.web.rest.util.HeaderUtil;
import io.jhipster.test1.web.rest.util.PaginationUtil;
import io.jhipster.test1.service.dto.EeDTO;
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
 * REST controller for managing Ee.
 */
@RestController
@RequestMapping("/api")
public class EeResource {

    private final Logger log = LoggerFactory.getLogger(EeResource.class);

    private static final String ENTITY_NAME = "ee";

    private final EeService eeService;

    public EeResource(EeService eeService) {
        this.eeService = eeService;
    }

    /**
     * POST  /ees : Create a new ee.
     *
     * @param eeDTO the eeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eeDTO, or with status 400 (Bad Request) if the ee has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ees")
    @Timed
    public ResponseEntity<EeDTO> createEe(@Valid @RequestBody EeDTO eeDTO) throws URISyntaxException {
        log.debug("REST request to save Ee : {}", eeDTO);
        if (eeDTO.getId() != null) {
            throw new BadRequestAlertException("A new ee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EeDTO result = eeService.save(eeDTO);
        return ResponseEntity.created(new URI("/api/ees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ees : Updates an existing ee.
     *
     * @param eeDTO the eeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eeDTO,
     * or with status 400 (Bad Request) if the eeDTO is not valid,
     * or with status 500 (Internal Server Error) if the eeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ees")
    @Timed
    public ResponseEntity<EeDTO> updateEe(@Valid @RequestBody EeDTO eeDTO) throws URISyntaxException {
        log.debug("REST request to update Ee : {}", eeDTO);
        if (eeDTO.getId() == null) {
            return createEe(eeDTO);
        }
        EeDTO result = eeService.save(eeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ees : get all the ees.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ees in body
     */
    @GetMapping("/ees")
    @Timed
    public ResponseEntity<List<EeDTO>> getAllEes(Pageable pageable) {
        log.debug("REST request to get a page of Ees");
        Page<EeDTO> page = eeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ees");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ees/:id : get the "id" ee.
     *
     * @param id the id of the eeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/ees/{id}")
    @Timed
    public ResponseEntity<EeDTO> getEe(@PathVariable Long id) {
        log.debug("REST request to get Ee : {}", id);
        EeDTO eeDTO = eeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(eeDTO));
    }

    /**
     * DELETE  /ees/:id : delete the "id" ee.
     *
     * @param id the id of the eeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ees/{id}")
    @Timed
    public ResponseEntity<Void> deleteEe(@PathVariable Long id) {
        log.debug("REST request to delete Ee : {}", id);
        eeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
