package io.jhipster.test1.web.rest;

import io.jhipster.test1.JhipsterApp1App;

import io.jhipster.test1.domain.Parcours;
import io.jhipster.test1.repository.ParcoursRepository;
import io.jhipster.test1.service.ParcoursService;
import io.jhipster.test1.service.dto.ParcoursDTO;
import io.jhipster.test1.service.mapper.ParcoursMapper;
import io.jhipster.test1.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.jhipster.test1.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ParcoursResource REST controller.
 *
 * @see ParcoursResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp1App.class)
public class ParcoursResourceIntTest {

    private static final String DEFAULT_LIBELLE_FR = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_FR = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE_AR = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_AR = "BBBBBBBBBB";

    @Autowired
    private ParcoursRepository parcoursRepository;

    @Autowired
    private ParcoursMapper parcoursMapper;

    @Autowired
    private ParcoursService parcoursService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restParcoursMockMvc;

    private Parcours parcours;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParcoursResource parcoursResource = new ParcoursResource(parcoursService);
        this.restParcoursMockMvc = MockMvcBuilders.standaloneSetup(parcoursResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Parcours createEntity(EntityManager em) {
        Parcours parcours = new Parcours()
            .libelleFr(DEFAULT_LIBELLE_FR)
            .libelleAr(DEFAULT_LIBELLE_AR);
        return parcours;
    }

    @Before
    public void initTest() {
        parcours = createEntity(em);
    }

    @Test
    @Transactional
    public void createParcours() throws Exception {
        int databaseSizeBeforeCreate = parcoursRepository.findAll().size();

        // Create the Parcours
        ParcoursDTO parcoursDTO = parcoursMapper.toDto(parcours);
        restParcoursMockMvc.perform(post("/api/parcours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcoursDTO)))
            .andExpect(status().isCreated());

        // Validate the Parcours in the database
        List<Parcours> parcoursList = parcoursRepository.findAll();
        assertThat(parcoursList).hasSize(databaseSizeBeforeCreate + 1);
        Parcours testParcours = parcoursList.get(parcoursList.size() - 1);
        assertThat(testParcours.getLibelleFr()).isEqualTo(DEFAULT_LIBELLE_FR);
        assertThat(testParcours.getLibelleAr()).isEqualTo(DEFAULT_LIBELLE_AR);
    }

    @Test
    @Transactional
    public void createParcoursWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parcoursRepository.findAll().size();

        // Create the Parcours with an existing ID
        parcours.setId(1L);
        ParcoursDTO parcoursDTO = parcoursMapper.toDto(parcours);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParcoursMockMvc.perform(post("/api/parcours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcoursDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Parcours in the database
        List<Parcours> parcoursList = parcoursRepository.findAll();
        assertThat(parcoursList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLibelleFrIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcoursRepository.findAll().size();
        // set the field null
        parcours.setLibelleFr(null);

        // Create the Parcours, which fails.
        ParcoursDTO parcoursDTO = parcoursMapper.toDto(parcours);

        restParcoursMockMvc.perform(post("/api/parcours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcoursDTO)))
            .andExpect(status().isBadRequest());

        List<Parcours> parcoursList = parcoursRepository.findAll();
        assertThat(parcoursList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLibelleArIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcoursRepository.findAll().size();
        // set the field null
        parcours.setLibelleAr(null);

        // Create the Parcours, which fails.
        ParcoursDTO parcoursDTO = parcoursMapper.toDto(parcours);

        restParcoursMockMvc.perform(post("/api/parcours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcoursDTO)))
            .andExpect(status().isBadRequest());

        List<Parcours> parcoursList = parcoursRepository.findAll();
        assertThat(parcoursList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllParcours() throws Exception {
        // Initialize the database
        parcoursRepository.saveAndFlush(parcours);

        // Get all the parcoursList
        restParcoursMockMvc.perform(get("/api/parcours?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parcours.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelleFr").value(hasItem(DEFAULT_LIBELLE_FR.toString())))
            .andExpect(jsonPath("$.[*].libelleAr").value(hasItem(DEFAULT_LIBELLE_AR.toString())));
    }

    @Test
    @Transactional
    public void getParcours() throws Exception {
        // Initialize the database
        parcoursRepository.saveAndFlush(parcours);

        // Get the parcours
        restParcoursMockMvc.perform(get("/api/parcours/{id}", parcours.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parcours.getId().intValue()))
            .andExpect(jsonPath("$.libelleFr").value(DEFAULT_LIBELLE_FR.toString()))
            .andExpect(jsonPath("$.libelleAr").value(DEFAULT_LIBELLE_AR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParcours() throws Exception {
        // Get the parcours
        restParcoursMockMvc.perform(get("/api/parcours/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParcours() throws Exception {
        // Initialize the database
        parcoursRepository.saveAndFlush(parcours);
        int databaseSizeBeforeUpdate = parcoursRepository.findAll().size();

        // Update the parcours
        Parcours updatedParcours = parcoursRepository.findOne(parcours.getId());
        // Disconnect from session so that the updates on updatedParcours are not directly saved in db
        em.detach(updatedParcours);
        updatedParcours
            .libelleFr(UPDATED_LIBELLE_FR)
            .libelleAr(UPDATED_LIBELLE_AR);
        ParcoursDTO parcoursDTO = parcoursMapper.toDto(updatedParcours);

        restParcoursMockMvc.perform(put("/api/parcours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcoursDTO)))
            .andExpect(status().isOk());

        // Validate the Parcours in the database
        List<Parcours> parcoursList = parcoursRepository.findAll();
        assertThat(parcoursList).hasSize(databaseSizeBeforeUpdate);
        Parcours testParcours = parcoursList.get(parcoursList.size() - 1);
        assertThat(testParcours.getLibelleFr()).isEqualTo(UPDATED_LIBELLE_FR);
        assertThat(testParcours.getLibelleAr()).isEqualTo(UPDATED_LIBELLE_AR);
    }

    @Test
    @Transactional
    public void updateNonExistingParcours() throws Exception {
        int databaseSizeBeforeUpdate = parcoursRepository.findAll().size();

        // Create the Parcours
        ParcoursDTO parcoursDTO = parcoursMapper.toDto(parcours);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restParcoursMockMvc.perform(put("/api/parcours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parcoursDTO)))
            .andExpect(status().isCreated());

        // Validate the Parcours in the database
        List<Parcours> parcoursList = parcoursRepository.findAll();
        assertThat(parcoursList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteParcours() throws Exception {
        // Initialize the database
        parcoursRepository.saveAndFlush(parcours);
        int databaseSizeBeforeDelete = parcoursRepository.findAll().size();

        // Get the parcours
        restParcoursMockMvc.perform(delete("/api/parcours/{id}", parcours.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Parcours> parcoursList = parcoursRepository.findAll();
        assertThat(parcoursList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parcours.class);
        Parcours parcours1 = new Parcours();
        parcours1.setId(1L);
        Parcours parcours2 = new Parcours();
        parcours2.setId(parcours1.getId());
        assertThat(parcours1).isEqualTo(parcours2);
        parcours2.setId(2L);
        assertThat(parcours1).isNotEqualTo(parcours2);
        parcours1.setId(null);
        assertThat(parcours1).isNotEqualTo(parcours2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParcoursDTO.class);
        ParcoursDTO parcoursDTO1 = new ParcoursDTO();
        parcoursDTO1.setId(1L);
        ParcoursDTO parcoursDTO2 = new ParcoursDTO();
        assertThat(parcoursDTO1).isNotEqualTo(parcoursDTO2);
        parcoursDTO2.setId(parcoursDTO1.getId());
        assertThat(parcoursDTO1).isEqualTo(parcoursDTO2);
        parcoursDTO2.setId(2L);
        assertThat(parcoursDTO1).isNotEqualTo(parcoursDTO2);
        parcoursDTO1.setId(null);
        assertThat(parcoursDTO1).isNotEqualTo(parcoursDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(parcoursMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(parcoursMapper.fromId(null)).isNull();
    }
}
