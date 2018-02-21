package io.jhipster.test1.web.rest;

import io.jhipster.test1.JhipsterApp1App;

import io.jhipster.test1.domain.Universite;
import io.jhipster.test1.repository.UniversiteRepository;
import io.jhipster.test1.service.UniversiteService;
import io.jhipster.test1.service.dto.UniversiteDTO;
import io.jhipster.test1.service.mapper.UniversiteMapper;
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
 * Test class for the UniversiteResource REST controller.
 *
 * @see UniversiteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp1App.class)
public class UniversiteResourceIntTest {

    private static final String DEFAULT_LIBELLE_FR = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_FR = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE_AR = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_AR = "BBBBBBBBBB";

    @Autowired
    private UniversiteRepository universiteRepository;

    @Autowired
    private UniversiteMapper universiteMapper;

    @Autowired
    private UniversiteService universiteService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUniversiteMockMvc;

    private Universite universite;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UniversiteResource universiteResource = new UniversiteResource(universiteService);
        this.restUniversiteMockMvc = MockMvcBuilders.standaloneSetup(universiteResource)
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
    public static Universite createEntity(EntityManager em) {
        Universite universite = new Universite()
            .libelleFr(DEFAULT_LIBELLE_FR)
            .libelleAr(DEFAULT_LIBELLE_AR);
        return universite;
    }

    @Before
    public void initTest() {
        universite = createEntity(em);
    }

    @Test
    @Transactional
    public void createUniversite() throws Exception {
        int databaseSizeBeforeCreate = universiteRepository.findAll().size();

        // Create the Universite
        UniversiteDTO universiteDTO = universiteMapper.toDto(universite);
        restUniversiteMockMvc.perform(post("/api/universites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(universiteDTO)))
            .andExpect(status().isCreated());

        // Validate the Universite in the database
        List<Universite> universiteList = universiteRepository.findAll();
        assertThat(universiteList).hasSize(databaseSizeBeforeCreate + 1);
        Universite testUniversite = universiteList.get(universiteList.size() - 1);
        assertThat(testUniversite.getLibelleFr()).isEqualTo(DEFAULT_LIBELLE_FR);
        assertThat(testUniversite.getLibelleAr()).isEqualTo(DEFAULT_LIBELLE_AR);
    }

    @Test
    @Transactional
    public void createUniversiteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = universiteRepository.findAll().size();

        // Create the Universite with an existing ID
        universite.setId(1L);
        UniversiteDTO universiteDTO = universiteMapper.toDto(universite);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUniversiteMockMvc.perform(post("/api/universites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(universiteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Universite in the database
        List<Universite> universiteList = universiteRepository.findAll();
        assertThat(universiteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLibelleFrIsRequired() throws Exception {
        int databaseSizeBeforeTest = universiteRepository.findAll().size();
        // set the field null
        universite.setLibelleFr(null);

        // Create the Universite, which fails.
        UniversiteDTO universiteDTO = universiteMapper.toDto(universite);

        restUniversiteMockMvc.perform(post("/api/universites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(universiteDTO)))
            .andExpect(status().isBadRequest());

        List<Universite> universiteList = universiteRepository.findAll();
        assertThat(universiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLibelleArIsRequired() throws Exception {
        int databaseSizeBeforeTest = universiteRepository.findAll().size();
        // set the field null
        universite.setLibelleAr(null);

        // Create the Universite, which fails.
        UniversiteDTO universiteDTO = universiteMapper.toDto(universite);

        restUniversiteMockMvc.perform(post("/api/universites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(universiteDTO)))
            .andExpect(status().isBadRequest());

        List<Universite> universiteList = universiteRepository.findAll();
        assertThat(universiteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUniversites() throws Exception {
        // Initialize the database
        universiteRepository.saveAndFlush(universite);

        // Get all the universiteList
        restUniversiteMockMvc.perform(get("/api/universites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(universite.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelleFr").value(hasItem(DEFAULT_LIBELLE_FR.toString())))
            .andExpect(jsonPath("$.[*].libelleAr").value(hasItem(DEFAULT_LIBELLE_AR.toString())));
    }

    @Test
    @Transactional
    public void getUniversite() throws Exception {
        // Initialize the database
        universiteRepository.saveAndFlush(universite);

        // Get the universite
        restUniversiteMockMvc.perform(get("/api/universites/{id}", universite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(universite.getId().intValue()))
            .andExpect(jsonPath("$.libelleFr").value(DEFAULT_LIBELLE_FR.toString()))
            .andExpect(jsonPath("$.libelleAr").value(DEFAULT_LIBELLE_AR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUniversite() throws Exception {
        // Get the universite
        restUniversiteMockMvc.perform(get("/api/universites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUniversite() throws Exception {
        // Initialize the database
        universiteRepository.saveAndFlush(universite);
        int databaseSizeBeforeUpdate = universiteRepository.findAll().size();

        // Update the universite
        Universite updatedUniversite = universiteRepository.findOne(universite.getId());
        // Disconnect from session so that the updates on updatedUniversite are not directly saved in db
        em.detach(updatedUniversite);
        updatedUniversite
            .libelleFr(UPDATED_LIBELLE_FR)
            .libelleAr(UPDATED_LIBELLE_AR);
        UniversiteDTO universiteDTO = universiteMapper.toDto(updatedUniversite);

        restUniversiteMockMvc.perform(put("/api/universites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(universiteDTO)))
            .andExpect(status().isOk());

        // Validate the Universite in the database
        List<Universite> universiteList = universiteRepository.findAll();
        assertThat(universiteList).hasSize(databaseSizeBeforeUpdate);
        Universite testUniversite = universiteList.get(universiteList.size() - 1);
        assertThat(testUniversite.getLibelleFr()).isEqualTo(UPDATED_LIBELLE_FR);
        assertThat(testUniversite.getLibelleAr()).isEqualTo(UPDATED_LIBELLE_AR);
    }

    @Test
    @Transactional
    public void updateNonExistingUniversite() throws Exception {
        int databaseSizeBeforeUpdate = universiteRepository.findAll().size();

        // Create the Universite
        UniversiteDTO universiteDTO = universiteMapper.toDto(universite);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUniversiteMockMvc.perform(put("/api/universites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(universiteDTO)))
            .andExpect(status().isCreated());

        // Validate the Universite in the database
        List<Universite> universiteList = universiteRepository.findAll();
        assertThat(universiteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUniversite() throws Exception {
        // Initialize the database
        universiteRepository.saveAndFlush(universite);
        int databaseSizeBeforeDelete = universiteRepository.findAll().size();

        // Get the universite
        restUniversiteMockMvc.perform(delete("/api/universites/{id}", universite.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Universite> universiteList = universiteRepository.findAll();
        assertThat(universiteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Universite.class);
        Universite universite1 = new Universite();
        universite1.setId(1L);
        Universite universite2 = new Universite();
        universite2.setId(universite1.getId());
        assertThat(universite1).isEqualTo(universite2);
        universite2.setId(2L);
        assertThat(universite1).isNotEqualTo(universite2);
        universite1.setId(null);
        assertThat(universite1).isNotEqualTo(universite2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UniversiteDTO.class);
        UniversiteDTO universiteDTO1 = new UniversiteDTO();
        universiteDTO1.setId(1L);
        UniversiteDTO universiteDTO2 = new UniversiteDTO();
        assertThat(universiteDTO1).isNotEqualTo(universiteDTO2);
        universiteDTO2.setId(universiteDTO1.getId());
        assertThat(universiteDTO1).isEqualTo(universiteDTO2);
        universiteDTO2.setId(2L);
        assertThat(universiteDTO1).isNotEqualTo(universiteDTO2);
        universiteDTO1.setId(null);
        assertThat(universiteDTO1).isNotEqualTo(universiteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(universiteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(universiteMapper.fromId(null)).isNull();
    }
}
