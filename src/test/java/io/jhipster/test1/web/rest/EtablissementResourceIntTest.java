package io.jhipster.test1.web.rest;

import io.jhipster.test1.JhipsterApp1App;

import io.jhipster.test1.domain.Etablissement;
import io.jhipster.test1.repository.EtablissementRepository;
import io.jhipster.test1.service.EtablissementService;
import io.jhipster.test1.service.dto.EtablissementDTO;
import io.jhipster.test1.service.mapper.EtablissementMapper;
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
 * Test class for the EtablissementResource REST controller.
 *
 * @see EtablissementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp1App.class)
public class EtablissementResourceIntTest {

    private static final String DEFAULT_LIBELLE_FR = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_FR = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE_AR = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_AR = "BBBBBBBBBB";

    @Autowired
    private EtablissementRepository etablissementRepository;

    @Autowired
    private EtablissementMapper etablissementMapper;

    @Autowired
    private EtablissementService etablissementService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEtablissementMockMvc;

    private Etablissement etablissement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtablissementResource etablissementResource = new EtablissementResource(etablissementService);
        this.restEtablissementMockMvc = MockMvcBuilders.standaloneSetup(etablissementResource)
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
    public static Etablissement createEntity(EntityManager em) {
        Etablissement etablissement = new Etablissement()
            .libelleFr(DEFAULT_LIBELLE_FR)
            .libelleAr(DEFAULT_LIBELLE_AR);
        return etablissement;
    }

    @Before
    public void initTest() {
        etablissement = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtablissement() throws Exception {
        int databaseSizeBeforeCreate = etablissementRepository.findAll().size();

        // Create the Etablissement
        EtablissementDTO etablissementDTO = etablissementMapper.toDto(etablissement);
        restEtablissementMockMvc.perform(post("/api/etablissements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etablissementDTO)))
            .andExpect(status().isCreated());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeCreate + 1);
        Etablissement testEtablissement = etablissementList.get(etablissementList.size() - 1);
        assertThat(testEtablissement.getLibelleFr()).isEqualTo(DEFAULT_LIBELLE_FR);
        assertThat(testEtablissement.getLibelleAr()).isEqualTo(DEFAULT_LIBELLE_AR);
    }

    @Test
    @Transactional
    public void createEtablissementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etablissementRepository.findAll().size();

        // Create the Etablissement with an existing ID
        etablissement.setId(1L);
        EtablissementDTO etablissementDTO = etablissementMapper.toDto(etablissement);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtablissementMockMvc.perform(post("/api/etablissements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etablissementDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLibelleFrIsRequired() throws Exception {
        int databaseSizeBeforeTest = etablissementRepository.findAll().size();
        // set the field null
        etablissement.setLibelleFr(null);

        // Create the Etablissement, which fails.
        EtablissementDTO etablissementDTO = etablissementMapper.toDto(etablissement);

        restEtablissementMockMvc.perform(post("/api/etablissements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etablissementDTO)))
            .andExpect(status().isBadRequest());

        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLibelleArIsRequired() throws Exception {
        int databaseSizeBeforeTest = etablissementRepository.findAll().size();
        // set the field null
        etablissement.setLibelleAr(null);

        // Create the Etablissement, which fails.
        EtablissementDTO etablissementDTO = etablissementMapper.toDto(etablissement);

        restEtablissementMockMvc.perform(post("/api/etablissements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etablissementDTO)))
            .andExpect(status().isBadRequest());

        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEtablissements() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);

        // Get all the etablissementList
        restEtablissementMockMvc.perform(get("/api/etablissements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etablissement.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelleFr").value(hasItem(DEFAULT_LIBELLE_FR.toString())))
            .andExpect(jsonPath("$.[*].libelleAr").value(hasItem(DEFAULT_LIBELLE_AR.toString())));
    }

    @Test
    @Transactional
    public void getEtablissement() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);

        // Get the etablissement
        restEtablissementMockMvc.perform(get("/api/etablissements/{id}", etablissement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(etablissement.getId().intValue()))
            .andExpect(jsonPath("$.libelleFr").value(DEFAULT_LIBELLE_FR.toString()))
            .andExpect(jsonPath("$.libelleAr").value(DEFAULT_LIBELLE_AR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEtablissement() throws Exception {
        // Get the etablissement
        restEtablissementMockMvc.perform(get("/api/etablissements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtablissement() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);
        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();

        // Update the etablissement
        Etablissement updatedEtablissement = etablissementRepository.findOne(etablissement.getId());
        // Disconnect from session so that the updates on updatedEtablissement are not directly saved in db
        em.detach(updatedEtablissement);
        updatedEtablissement
            .libelleFr(UPDATED_LIBELLE_FR)
            .libelleAr(UPDATED_LIBELLE_AR);
        EtablissementDTO etablissementDTO = etablissementMapper.toDto(updatedEtablissement);

        restEtablissementMockMvc.perform(put("/api/etablissements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etablissementDTO)))
            .andExpect(status().isOk());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate);
        Etablissement testEtablissement = etablissementList.get(etablissementList.size() - 1);
        assertThat(testEtablissement.getLibelleFr()).isEqualTo(UPDATED_LIBELLE_FR);
        assertThat(testEtablissement.getLibelleAr()).isEqualTo(UPDATED_LIBELLE_AR);
    }

    @Test
    @Transactional
    public void updateNonExistingEtablissement() throws Exception {
        int databaseSizeBeforeUpdate = etablissementRepository.findAll().size();

        // Create the Etablissement
        EtablissementDTO etablissementDTO = etablissementMapper.toDto(etablissement);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEtablissementMockMvc.perform(put("/api/etablissements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etablissementDTO)))
            .andExpect(status().isCreated());

        // Validate the Etablissement in the database
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEtablissement() throws Exception {
        // Initialize the database
        etablissementRepository.saveAndFlush(etablissement);
        int databaseSizeBeforeDelete = etablissementRepository.findAll().size();

        // Get the etablissement
        restEtablissementMockMvc.perform(delete("/api/etablissements/{id}", etablissement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Etablissement> etablissementList = etablissementRepository.findAll();
        assertThat(etablissementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Etablissement.class);
        Etablissement etablissement1 = new Etablissement();
        etablissement1.setId(1L);
        Etablissement etablissement2 = new Etablissement();
        etablissement2.setId(etablissement1.getId());
        assertThat(etablissement1).isEqualTo(etablissement2);
        etablissement2.setId(2L);
        assertThat(etablissement1).isNotEqualTo(etablissement2);
        etablissement1.setId(null);
        assertThat(etablissement1).isNotEqualTo(etablissement2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtablissementDTO.class);
        EtablissementDTO etablissementDTO1 = new EtablissementDTO();
        etablissementDTO1.setId(1L);
        EtablissementDTO etablissementDTO2 = new EtablissementDTO();
        assertThat(etablissementDTO1).isNotEqualTo(etablissementDTO2);
        etablissementDTO2.setId(etablissementDTO1.getId());
        assertThat(etablissementDTO1).isEqualTo(etablissementDTO2);
        etablissementDTO2.setId(2L);
        assertThat(etablissementDTO1).isNotEqualTo(etablissementDTO2);
        etablissementDTO1.setId(null);
        assertThat(etablissementDTO1).isNotEqualTo(etablissementDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(etablissementMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(etablissementMapper.fromId(null)).isNull();
    }
}
