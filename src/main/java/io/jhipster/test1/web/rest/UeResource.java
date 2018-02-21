package io.jhipster.test1.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.jhipster.test1.service.UeService;
import io.jhipster.test1.web.rest.errors.BadRequestAlertException;
import io.jhipster.test1.web.rest.util.HeaderUtil;
import io.jhipster.test1.web.rest.util.PaginationUtil;
import io.jhipster.test1.service.dto.UeDTO;
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
 * REST controller for managing Ue.
 */
@RestController
@RequestMapping("/api")
public class UeResource {

    private final Logger log = LoggerFactory.getLogger(UeResource.class);

    private static final String ENTITY_NAME = "ue";

    private final UeService ueService;

    public UeResource(UeService ueService) {
        this.ueService = ueService;
    }

    /**
     * POST  /ues : Create a new ue.
     *
     * @param ueDTO the ueDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ueDTO, or with status 400 (Bad Request) if the ue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ues")
    @Timed
    public ResponseEntity<UeDTO> createUe(@Valid @RequestBody UeDTO ueDTO) throws URISyntaxException {
        log.debug("REST request to save Ue : {}", ueDTO);
        if (ueDTO.getId() != null) {
            throw new BadRequestAlertException("A new ue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UeDTO result = ueService.save(ueDTO);
        return ResponseEntity.created(new URI("/api/ues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ues : Updates an existing ue.
     *
     * @param ueDTO the ueDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ueDTO,
     * or with status 400 (Bad Request) if the ueDTO is not valid,
     * or with status 500 (Internal Server Error) if the ueDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ues")
    @Timed
    public ResponseEntity<UeDTO> updateUe(@Valid @RequestBody UeDTO ueDTO) throws URISyntaxException {
        log.debug("REST request to update Ue : {}", ueDTO);
        if (ueDTO.getId() == null) {
            return createUe(ueDTO);
        }
        UeDTO result = ueService.save(ueDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ueDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ues : get all the ues.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ues in body
     */
    @GetMapping("/ues")
    @Timed
    public ResponseEntity<List<UeDTO>> getAllUes(Pageable pageable) {
        log.debug("REST request to get a page of Ues");
        Page<UeDTO> page = ueService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ues");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ues/:id : get the "id" ue.
     *
     * @param id the id of the ueDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ueDTO, or with status 404 (Not Found)
     */
    @GetMapping("/ues/{id}")
    @Timed
    public ResponseEntity<UeDTO> getUe(@PathVariable Long id) {
        log.debug("REST request to get Ue : {}", id);
        UeDTO ueDTO = ueService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ueDTO));
    }

    /**
     * DELETE  /ues/:id : delete the "id" ue.
     *
     * @param id the id of the ueDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ues/{id}")
    @Timed
    public ResponseEntity<Void> deleteUe(@PathVariable Long id) {
        log.debug("REST request to delete Ue : {}", id);
        ueService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
