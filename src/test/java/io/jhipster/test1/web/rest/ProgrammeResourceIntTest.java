package io.jhipster.test1.web.rest;

import io.jhipster.test1.JhipsterApp1App;

import io.jhipster.test1.domain.Programme;
import io.jhipster.test1.repository.ProgrammeRepository;
import io.jhipster.test1.service.ProgrammeService;
import io.jhipster.test1.service.dto.ProgrammeDTO;
import io.jhipster.test1.service.mapper.ProgrammeMapper;
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
 * Test class for the ProgrammeResource REST controller.
 *
 * @see ProgrammeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp1App.class)
public class ProgrammeResourceIntTest {

    private static final String DEFAULT_LIBELLE_FR = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_FR = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE_AR = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_AR = "BBBBBBBBBB";

    @Autowired
    private ProgrammeRepository programmeRepository;

    @Autowired
    private ProgrammeMapper programmeMapper;

    @Autowired
    private ProgrammeService programmeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProgrammeMockMvc;

    private Programme programme;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProgrammeResource programmeResource = new ProgrammeResource(programmeService);
        this.restProgrammeMockMvc = MockMvcBuilders.standaloneSetup(programmeResource)
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
    public static Programme createEntity(EntityManager em) {
        Programme programme = new Programme()
            .libelleFr(DEFAULT_LIBELLE_FR)
            .libelleAr(DEFAULT_LIBELLE_AR);
        return programme;
    }

    @Before
    public void initTest() {
        programme = createEntity(em);
    }

    @Test
    @Transactional
    public void createProgramme() throws Exception {
        int databaseSizeBeforeCreate = programmeRepository.findAll().size();

        // Create the Programme
        ProgrammeDTO programmeDTO = programmeMapper.toDto(programme);
        restProgrammeMockMvc.perform(post("/api/programmes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(programmeDTO)))
            .andExpect(status().isCreated());

        // Validate the Programme in the database
        List<Programme> programmeList = programmeRepository.findAll();
        assertThat(programmeList).hasSize(databaseSizeBeforeCreate + 1);
        Programme testProgramme = programmeList.get(programmeList.size() - 1);
        assertThat(testProgramme.getLibelleFr()).isEqualTo(DEFAULT_LIBELLE_FR);
        assertThat(testProgramme.getLibelleAr()).isEqualTo(DEFAULT_LIBELLE_AR);
    }

    @Test
    @Transactional
    public void createProgrammeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = programmeRepository.findAll().size();

        // Create the Programme with an existing ID
        programme.setId(1L);
        ProgrammeDTO programmeDTO = programmeMapper.toDto(programme);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProgrammeMockMvc.perform(post("/api/programmes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(programmeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Programme in the database
        List<Programme> programmeList = programmeRepository.findAll();
        assertThat(programmeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLibelleFrIsRequired() throws Exception {
        int databaseSizeBeforeTest = programmeRepository.findAll().size();
        // set the field null
        programme.setLibelleFr(null);

        // Create the Programme, which fails.
        ProgrammeDTO programmeDTO = programmeMapper.toDto(programme);

        restProgrammeMockMvc.perform(post("/api/programmes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(programmeDTO)))
            .andExpect(status().isBadRequest());

        List<Programme> programmeList = programmeRepository.findAll();
        assertThat(programmeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLibelleArIsRequired() throws Exception {
        int databaseSizeBeforeTest = programmeRepository.findAll().size();
        // set the field null
        programme.setLibelleAr(null);

        // Create the Programme, which fails.
        ProgrammeDTO programmeDTO = programmeMapper.toDto(programme);

        restProgrammeMockMvc.perform(post("/api/programmes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(programmeDTO)))
            .andExpect(status().isBadRequest());

        List<Programme> programmeList = programmeRepository.findAll();
        assertThat(programmeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProgrammes() throws Exception {
        // Initialize the database
        programmeRepository.saveAndFlush(programme);

        // Get all the programmeList
        restProgrammeMockMvc.perform(get("/api/programmes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(programme.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelleFr").value(hasItem(DEFAULT_LIBELLE_FR.toString())))
            .andExpect(jsonPath("$.[*].libelleAr").value(hasItem(DEFAULT_LIBELLE_AR.toString())));
    }

    @Test
    @Transactional
    public void getProgramme() throws Exception {
        // Initialize the database
        programmeRepository.saveAndFlush(programme);

        // Get the programme
        restProgrammeMockMvc.perform(get("/api/programmes/{id}", programme.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(programme.getId().intValue()))
            .andExpect(jsonPath("$.libelleFr").value(DEFAULT_LIBELLE_FR.toString()))
            .andExpect(jsonPath("$.libelleAr").value(DEFAULT_LIBELLE_AR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProgramme() throws Exception {
        // Get the programme
        restProgrammeMockMvc.perform(get("/api/programmes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProgramme() throws Exception {
        // Initialize the database
        programmeRepository.saveAndFlush(programme);
        int databaseSizeBeforeUpdate = programmeRepository.findAll().size();

        // Update the programme
        Programme updatedProgramme = programmeRepository.findOne(programme.getId());
        // Disconnect from session so that the updates on updatedProgramme are not directly saved in db
        em.detach(updatedProgramme);
        updatedProgramme
            .libelleFr(UPDATED_LIBELLE_FR)
            .libelleAr(UPDATED_LIBELLE_AR);
        ProgrammeDTO programmeDTO = programmeMapper.toDto(updatedProgramme);

        restProgrammeMockMvc.perform(put("/api/programmes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(programmeDTO)))
            .andExpect(status().isOk());

        // Validate the Programme in the database
        List<Programme> programmeList = programmeRepository.findAll();
        assertThat(programmeList).hasSize(databaseSizeBeforeUpdate);
        Programme testProgramme = programmeList.get(programmeList.size() - 1);
        assertThat(testProgramme.getLibelleFr()).isEqualTo(UPDATED_LIBELLE_FR);
        assertThat(testProgramme.getLibelleAr()).isEqualTo(UPDATED_LIBELLE_AR);
    }

    @Test
    @Transactional
    public void updateNonExistingProgramme() throws Exception {
        int databaseSizeBeforeUpdate = programmeRepository.findAll().size();

        // Create the Programme
        ProgrammeDTO programmeDTO = programmeMapper.toDto(programme);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProgrammeMockMvc.perform(put("/api/programmes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(programmeDTO)))
            .andExpect(status().isCreated());

        // Validate the Programme in the database
        List<Programme> programmeList = programmeRepository.findAll();
        assertThat(programmeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProgramme() throws Exception {
        // Initialize the database
        programmeRepository.saveAndFlush(programme);
        int databaseSizeBeforeDelete = programmeRepository.findAll().size();

        // Get the programme
        restProgrammeMockMvc.perform(delete("/api/programmes/{id}", programme.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Programme> programmeList = programmeRepository.findAll();
        assertThat(programmeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Programme.class);
        Programme programme1 = new Programme();
        programme1.setId(1L);
        Programme programme2 = new Programme();
        programme2.setId(programme1.getId());
        assertThat(programme1).isEqualTo(programme2);
        programme2.setId(2L);
        assertThat(programme1).isNotEqualTo(programme2);
        programme1.setId(null);
        assertThat(programme1).isNotEqualTo(programme2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProgrammeDTO.class);
        ProgrammeDTO programmeDTO1 = new ProgrammeDTO();
        programmeDTO1.setId(1L);
        ProgrammeDTO programmeDTO2 = new ProgrammeDTO();
        assertThat(programmeDTO1).isNotEqualTo(programmeDTO2);
        programmeDTO2.setId(programmeDTO1.getId());
        assertThat(programmeDTO1).isEqualTo(programmeDTO2);
        programmeDTO2.setId(2L);
        assertThat(programmeDTO1).isNotEqualTo(programmeDTO2);
        programmeDTO1.setId(null);
        assertThat(programmeDTO1).isNotEqualTo(programmeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(programmeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(programmeMapper.fromId(null)).isNull();
    }
}
