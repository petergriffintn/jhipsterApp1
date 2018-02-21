package io.jhipster.test1.web.rest;

import io.jhipster.test1.JhipsterApp1App;

import io.jhipster.test1.domain.Ue;
import io.jhipster.test1.repository.UeRepository;
import io.jhipster.test1.service.UeService;
import io.jhipster.test1.service.dto.UeDTO;
import io.jhipster.test1.service.mapper.UeMapper;
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

import io.jhipster.test1.domain.enumeration.TypeUe;
import io.jhipster.test1.domain.enumeration.Qualification;
import io.jhipster.test1.domain.enumeration.RegimeExamen;
import io.jhipster.test1.domain.enumeration.Nature;
/**
 * Test class for the UeResource REST controller.
 *
 * @see UeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp1App.class)
public class UeResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final TypeUe DEFAULT_TYPE = TypeUe.OBLIGATOIRE;
    private static final TypeUe UPDATED_TYPE = TypeUe.OPTIONNEL;

    private static final Qualification DEFAULT_QUALIF = Qualification.ENSEIGNEMENT;
    private static final Qualification UPDATED_QUALIF = Qualification.PROJET;

    private static final RegimeExamen DEFAULT_REGIME = RegimeExamen.MX;
    private static final RegimeExamen UPDATED_REGIME = RegimeExamen.CC;

    private static final Nature DEFAULT_NATURE = Nature.TRANSVERSALE;
    private static final Nature UPDATED_NATURE = Nature.FONDAMENTALE;

    @Autowired
    private UeRepository ueRepository;

    @Autowired
    private UeMapper ueMapper;

    @Autowired
    private UeService ueService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUeMockMvc;

    private Ue ue;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UeResource ueResource = new UeResource(ueService);
        this.restUeMockMvc = MockMvcBuilders.standaloneSetup(ueResource)
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
    public static Ue createEntity(EntityManager em) {
        Ue ue = new Ue()
            .nom(DEFAULT_NOM)
            .type(DEFAULT_TYPE)
            .qualif(DEFAULT_QUALIF)
            .regime(DEFAULT_REGIME)
            .nature(DEFAULT_NATURE);
        return ue;
    }

    @Before
    public void initTest() {
        ue = createEntity(em);
    }

    @Test
    @Transactional
    public void createUe() throws Exception {
        int databaseSizeBeforeCreate = ueRepository.findAll().size();

        // Create the Ue
        UeDTO ueDTO = ueMapper.toDto(ue);
        restUeMockMvc.perform(post("/api/ues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ueDTO)))
            .andExpect(status().isCreated());

        // Validate the Ue in the database
        List<Ue> ueList = ueRepository.findAll();
        assertThat(ueList).hasSize(databaseSizeBeforeCreate + 1);
        Ue testUe = ueList.get(ueList.size() - 1);
        assertThat(testUe.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testUe.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testUe.getQualif()).isEqualTo(DEFAULT_QUALIF);
        assertThat(testUe.getRegime()).isEqualTo(DEFAULT_REGIME);
        assertThat(testUe.getNature()).isEqualTo(DEFAULT_NATURE);
    }

    @Test
    @Transactional
    public void createUeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ueRepository.findAll().size();

        // Create the Ue with an existing ID
        ue.setId(1L);
        UeDTO ueDTO = ueMapper.toDto(ue);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUeMockMvc.perform(post("/api/ues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ueDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Ue in the database
        List<Ue> ueList = ueRepository.findAll();
        assertThat(ueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = ueRepository.findAll().size();
        // set the field null
        ue.setNom(null);

        // Create the Ue, which fails.
        UeDTO ueDTO = ueMapper.toDto(ue);

        restUeMockMvc.perform(post("/api/ues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ueDTO)))
            .andExpect(status().isBadRequest());

        List<Ue> ueList = ueRepository.findAll();
        assertThat(ueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUes() throws Exception {
        // Initialize the database
        ueRepository.saveAndFlush(ue);

        // Get all the ueList
        restUeMockMvc.perform(get("/api/ues?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ue.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].qualif").value(hasItem(DEFAULT_QUALIF.toString())))
            .andExpect(jsonPath("$.[*].regime").value(hasItem(DEFAULT_REGIME.toString())))
            .andExpect(jsonPath("$.[*].nature").value(hasItem(DEFAULT_NATURE.toString())));
    }

    @Test
    @Transactional
    public void getUe() throws Exception {
        // Initialize the database
        ueRepository.saveAndFlush(ue);

        // Get the ue
        restUeMockMvc.perform(get("/api/ues/{id}", ue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ue.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.qualif").value(DEFAULT_QUALIF.toString()))
            .andExpect(jsonPath("$.regime").value(DEFAULT_REGIME.toString()))
            .andExpect(jsonPath("$.nature").value(DEFAULT_NATURE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUe() throws Exception {
        // Get the ue
        restUeMockMvc.perform(get("/api/ues/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUe() throws Exception {
        // Initialize the database
        ueRepository.saveAndFlush(ue);
        int databaseSizeBeforeUpdate = ueRepository.findAll().size();

        // Update the ue
        Ue updatedUe = ueRepository.findOne(ue.getId());
        // Disconnect from session so that the updates on updatedUe are not directly saved in db
        em.detach(updatedUe);
        updatedUe
            .nom(UPDATED_NOM)
            .type(UPDATED_TYPE)
            .qualif(UPDATED_QUALIF)
            .regime(UPDATED_REGIME)
            .nature(UPDATED_NATURE);
        UeDTO ueDTO = ueMapper.toDto(updatedUe);

        restUeMockMvc.perform(put("/api/ues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ueDTO)))
            .andExpect(status().isOk());

        // Validate the Ue in the database
        List<Ue> ueList = ueRepository.findAll();
        assertThat(ueList).hasSize(databaseSizeBeforeUpdate);
        Ue testUe = ueList.get(ueList.size() - 1);
        assertThat(testUe.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testUe.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testUe.getQualif()).isEqualTo(UPDATED_QUALIF);
        assertThat(testUe.getRegime()).isEqualTo(UPDATED_REGIME);
        assertThat(testUe.getNature()).isEqualTo(UPDATED_NATURE);
    }

    @Test
    @Transactional
    public void updateNonExistingUe() throws Exception {
        int databaseSizeBeforeUpdate = ueRepository.findAll().size();

        // Create the Ue
        UeDTO ueDTO = ueMapper.toDto(ue);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUeMockMvc.perform(put("/api/ues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ueDTO)))
            .andExpect(status().isCreated());

        // Validate the Ue in the database
        List<Ue> ueList = ueRepository.findAll();
        assertThat(ueList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUe() throws Exception {
        // Initialize the database
        ueRepository.saveAndFlush(ue);
        int databaseSizeBeforeDelete = ueRepository.findAll().size();

        // Get the ue
        restUeMockMvc.perform(delete("/api/ues/{id}", ue.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ue> ueList = ueRepository.findAll();
        assertThat(ueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ue.class);
        Ue ue1 = new Ue();
        ue1.setId(1L);
        Ue ue2 = new Ue();
        ue2.setId(ue1.getId());
        assertThat(ue1).isEqualTo(ue2);
        ue2.setId(2L);
        assertThat(ue1).isNotEqualTo(ue2);
        ue1.setId(null);
        assertThat(ue1).isNotEqualTo(ue2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UeDTO.class);
        UeDTO ueDTO1 = new UeDTO();
        ueDTO1.setId(1L);
        UeDTO ueDTO2 = new UeDTO();
        assertThat(ueDTO1).isNotEqualTo(ueDTO2);
        ueDTO2.setId(ueDTO1.getId());
        assertThat(ueDTO1).isEqualTo(ueDTO2);
        ueDTO2.setId(2L);
        assertThat(ueDTO1).isNotEqualTo(ueDTO2);
        ueDTO1.setId(null);
        assertThat(ueDTO1).isNotEqualTo(ueDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(ueMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(ueMapper.fromId(null)).isNull();
    }
}
