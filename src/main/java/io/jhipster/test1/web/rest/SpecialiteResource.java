package io.jhipster.test1.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.jhipster.test1.service.SpecialiteService;
import io.jhipster.test1.web.rest.errors.BadRequestAlertException;
import io.jhipster.test1.web.rest.util.HeaderUtil;
import io.jhipster.test1.web.rest.util.PaginationUtil;
import io.jhipster.test1.service.dto.SpecialiteDTO;
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
 * REST controller for managing Specialite.
 */
@RestController
@RequestMapping("/api")
public class SpecialiteResource {

    private final Logger log = LoggerFactory.getLogger(SpecialiteResource.class);

    private static final String ENTITY_NAME = "specialite";

    private final SpecialiteService specialiteService;

    public SpecialiteResource(SpecialiteService specialiteService) {
        this.specialiteService = specialiteService;
    }

    /**
     * POST  /specialites : Create a new specialite.
     *
     * @param specialiteDTO the specialiteDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new specialiteDTO, or with status 400 (Bad Request) if the specialite has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/specialites")
    @Timed
    public ResponseEntity<SpecialiteDTO> createSpecialite(@Valid @RequestBody SpecialiteDTO specialiteDTO) throws URISyntaxException {
        log.debug("REST request to save Specialite : {}", specialiteDTO);
        if (specialiteDTO.getId() != null) {
            throw new BadRequestAlertException("A new specialite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SpecialiteDTO result = specialiteService.save(specialiteDTO);
        return ResponseEntity.created(new URI("/api/specialites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /specialites : Updates an existing specialite.
     *
     * @param specialiteDTO the specialiteDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated specialiteDTO,
     * or with status 400 (Bad Request) if the specialiteDTO is not valid,
     * or with status 500 (Internal Server Error) if the specialiteDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/specialites")
    @Timed
    public ResponseEntity<SpecialiteDTO> updateSpecialite(@Valid @RequestBody SpecialiteDTO specialiteDTO) throws URISyntaxException {
        log.debug("REST request to update Specialite : {}", specialiteDTO);
        if (specialiteDTO.getId() == null) {
            return createSpecialite(specialiteDTO);
        }
        SpecialiteDTO result = specialiteService.save(specialiteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, specialiteDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /specialites : get all the specialites.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of specialites in body
     */
    @GetMapping("/specialites")
    @Timed
    public ResponseEntity<List<SpecialiteDTO>> getAllSpecialites(Pageable pageable) {
        log.debug("REST request to get a page of Specialites");
        Page<SpecialiteDTO> page = specialiteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/specialites");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /specialites/:id : get the "id" specialite.
     *
     * @param id the id of the specialiteDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the specialiteDTO, or with status 404 (Not Found)
     */
    @GetMapping("/specialites/{id}")
    @Timed
    public ResponseEntity<SpecialiteDTO> getSpecialite(@PathVariable Long id) {
        log.debug("REST request to get Specialite : {}", id);
        SpecialiteDTO specialiteDTO = specialiteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(specialiteDTO));
    }

    /**
     * DELETE  /specialites/:id : delete the "id" specialite.
     *
     * @param id the id of the specialiteDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/specialites/{id}")
    @Timed
    public ResponseEntity<Void> deleteSpecialite(@PathVariable Long id) {
        log.debug("REST request to delete Specialite : {}", id);
        specialiteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
